import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  RotateCcw,
  RotateCw,
  AlignLeft,
  Monitor,
  PanelRight,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  X,
  Feather,
  Sparkles,
  Image as ImageIcon,
  Heading,
  Quote,
  List as ListIcon,
  Code,
  Link as LinkIcon,
  Bold,
  Italic,
  Strikethrough,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Search,
  FileText
} from 'lucide-react';
import { analyzeSeo } from '../utils/seoAnalyzer';
import { getCustomArticles, saveCustomArticles } from '../pages/BlogAdminPage';
import { getGlobalSettings } from '../utils/roleManager';
import MediaPickerModal from './MediaPickerModal';
import RankMathPanel from '../components/RankMathPanel';

function slugify(title) {
  if (!title) return '';
  return title.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

const DEFAULT_CATEGORIES = [
  'Smart Hardware',
  'Design Strategy',
  'Executive Strategy',
  'Personal Branding',
  'Security & Hardware',
  'Neuromarketing',
  'Uncategorized',
];

export default function NewPostPanel({ editArticle, onPublished, onBack, darkMode = false }) {
  const [editingId, setEditingId] = useState(null);

  // ── Core Post Fields ──
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [excerpt, setExcerpt] = useState('');
  const [showExcerptField, setShowExcerptField] = useState(false);
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('Draft');
  const [author, setAuthor] = useState('Love Olaoye');
  const [template, setTemplate] = useState('Default template');
  const [discussion, setDiscussion] = useState('Pings only');
  const [format, setFormat] = useState('Standard');
  const [lockModifiedDate, setLockModifiedDate] = useState(false);
  const [publishDate, setPublishDate] = useState('Immediately');

  // Categories & Tags
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedCategories, setSelectedCategories] = useState(['Uncategorized']);
  const [newCatName, setNewCatName] = useState('');
  const [showAddCat, setShowAddCat] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  // ── Gutenberg Block Engine State ──
  const [blocks, setBlocks] = useState([
    { id: 'b-1', type: 'paragraph', content: '' }
  ]);
  const [activeBlockId, setActiveBlockId] = useState('b-1');
  const [showBlockInserter, setShowBlockInserter] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  // ── UI States ──
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState('post'); // 'post' | 'block' | 'rankmath'
  const [activeAccordion, setActiveAccordion] = useState({
    summary: true,
    trx: false,
    categories: true,
    tags: true,
  });
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaTarget, setMediaTarget] = useState('featured'); // 'featured' | { type: 'block', id: string }
  const [toast, setToast] = useState('');
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showAuthorPicker, setShowAuthorPicker] = useState(false);
  const [showSlugEdit, setShowSlugEdit] = useState(false);
  const [elementorAiOpen, setElementorAiOpen] = useState(false);

  // ── Rank Math & SEO Fields ──
  const [focusKeyword, setFocusKeyword] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [activeRmTab, setActiveRmTab] = useState('general');

  // Load article for editing if provided
  useEffect(() => {
    if (editArticle && editArticle.id !== editingId) {
      setEditingId(editArticle.id);
      setTitle(editArticle.title || '');
      setSlug(editArticle.slug || '');
      setAutoSlug(false);
      setExcerpt(editArticle.summary || '');
      setFeaturedImage(editArticle.image || '');
      setStatus(editArticle.status || 'Draft');
      setAuthor(editArticle.author || 'Love Olaoye');
      setPublishDate(editArticle.date || 'Immediately');
      setFocusKeyword(editArticle.focusKeyword || '');
      setSeoTitle(editArticle.seoTitle || '');
      setMetaDesc(editArticle.metaDesc || '');

      if (editArticle.category) {
        setSelectedCategories([editArticle.category]);
      }
      if (editArticle.tags) {
        setTags(typeof editArticle.tags === 'string' ? editArticle.tags.split(',').map(t => t.trim()).filter(Boolean) : editArticle.tags);
      }

      // Convert intro & sections to Gutenberg blocks
      if (editArticle.blocks && editArticle.blocks.length > 0) {
        setBlocks(editArticle.blocks);
      } else {
        const initialBlocks = [];
        if (editArticle.intro) {
          initialBlocks.push({ id: 'b-intro', type: 'paragraph', content: editArticle.intro });
        }
        if (editArticle.sections && editArticle.sections.length > 0) {
          editArticle.sections.forEach((sec, sIdx) => {
            if (sec.heading) {
              initialBlocks.push({ id: `b-head-${sIdx}`, type: 'heading', level: 2, content: sec.heading });
            }
            if (sec.body) {
              initialBlocks.push({ id: `b-body-${sIdx}`, type: 'paragraph', content: sec.body });
            }
          });
        }
        if (initialBlocks.length === 0) {
          initialBlocks.push({ id: 'b-1', type: 'paragraph', content: '' });
        }
        setBlocks(initialBlocks);
      }
    }
  }, [editArticle?.id]);

  // Handle title changes & auto slug
  const handleTitleChange = (val) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val) || `${Math.floor(1000 + Math.random() * 9000)}`);
    }
  };

  // Block Helpers
  const updateBlock = (id, newProps) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...newProps } : b));
  };

  const addBlock = (type = 'paragraph', insertAfterId = null, extraProps = {}) => {
    const newBlock = {
      id: `b-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      content: '',
      ...extraProps
    };
    if (insertAfterId) {
      const idx = blocks.findIndex(b => b.id === insertAfterId);
      if (idx !== -1) {
        const copy = [...blocks];
        copy.splice(idx + 1, 0, newBlock);
        setBlocks(copy);
      } else {
        setBlocks(prev => [...prev, newBlock]);
      }
    } else {
      setBlocks(prev => [...prev, newBlock]);
    }
    setActiveBlockId(newBlock.id);
    setShowBlockInserter(false);
  };

  const deleteBlock = (id) => {
    if (blocks.length === 1) {
      updateBlock(id, { content: '', type: 'paragraph' });
      return;
    }
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  // Convert blocks to full HTML content for SEO analysis & saving
  const rawHtmlContent = blocks.map(b => {
    if (b.type === 'heading') return `<h${b.level || 2}>${b.content}</h${b.level || 2}>`;
    if (b.type === 'image') return `<figure><img src="${b.url}" alt="${b.alt || ''}" /><figcaption>${b.caption || ''}</figcaption></figure>`;
    if (b.type === 'quote') return `<blockquote><p>${b.content}</p></blockquote>`;
    if (b.type === 'list') return `<ul>${(b.items || [b.content]).map(i => `<li>${i}</li>`).join('')}</ul>`;
    if (b.type === 'code') return `<pre><code>${b.content}</code></pre>`;
    return `<p>${b.content}</p>`;
  }).join('\n');

  // SEO Calculation
  const seoData = analyzeSeo({
    title,
    slug,
    content: rawHtmlContent,
    sections: [],
    summary: excerpt,
    focusKeyword,
    seoTitle,
    metaDesc,
    hasImage: !!featuredImage || rawHtmlContent.includes('<img'),
  });

  const { score, color } = seoData;

  // Save / Publish handler
  const handleSave = (newStatus = 'Draft') => {
    const finalTitle = title.trim() || 'Untitled Post';
    const finalSlug = slug.trim() || slugify(finalTitle) || `${Date.now()}`;
    const cleanExcerpt = excerpt.trim() || rawHtmlContent.replace(/<[^>]+>/g, '').slice(0, 140);
    const primaryCategory = selectedCategories[0] || 'Uncategorized';

    const article = {
      id: editingId || finalSlug || `art-${Date.now()}`,
      slug: finalSlug,
      title: finalTitle,
      date: publishDate === 'Immediately' ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : publishDate,
      readTime: `${Math.max(1, Math.ceil(rawHtmlContent.split(/\s+/).filter(Boolean).length / 200))} min read`,
      category: primaryCategory,
      categories: selectedCategories,
      tags: tags.join(', '),
      featured: true,
      image: featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      summary: cleanExcerpt,
      intro: rawHtmlContent,
      blocks,
      author,
      template,
      discussion,
      format,
      lockModifiedDate,
      focusKeyword,
      seoTitle: seoTitle || finalTitle + getGlobalSettings().siteTitleSeparator,
      metaDesc: metaDesc || cleanExcerpt,
      seoScore: score,
      status: newStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const existing = getCustomArticles();
    const updated = editingId ? existing.map(a => a.id === editingId ? article : a) : [article, ...existing];
    saveCustomArticles(updated);
    setStatus(newStatus);
    setToast(newStatus === 'Draft' ? 'Draft saved successfully.' : 'Post published!');
    setTimeout(() => setToast(''), 3000);
    if (onPublished) onPublished(article);
  };

  // Media selection callback
  const handleMediaSelected = (item) => {
    const imgUrl = item.dataUrl || item.url;
    if (mediaTarget === 'featured') {
      setFeaturedImage(imgUrl);
    } else if (typeof mediaTarget === 'object' && mediaTarget.type === 'block') {
      updateBlock(mediaTarget.id, { url: imgUrl, alt: item.alt || item.name || 'Image' });
    }
    setShowMediaPicker(false);
  };

  // Category toggle
  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    if (!categories.includes(newCatName.trim())) {
      setCategories(prev => [...prev, newCatName.trim()]);
      setSelectedCategories(prev => [...prev, newCatName.trim()]);
    }
    setNewCatName('');
    setShowAddCat(false);
  };

  // Tag helpers
  const handleAddTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const val = tagInput.trim().replace(/,$/, '');
      if (!tags.includes(val)) {
        setTags([...tags, val]);
      }
      setTagInput('');
    }
  };

  const removeTag = (t) => {
    setTags(tags.filter(tag => tag !== t));
  };

  // Theme variables
  const wpBg = darkMode ? '#121212' : '#ffffff';
  const wpHeaderBg = darkMode ? '#18181b' : '#ffffff';
  const wpBorder = darkMode ? '#27272a' : '#e0e0e0';
  const wpText = darkMode ? '#f4f4f5' : '#1e1e1e';
  const wpMuted = darkMode ? '#a1a1aa' : '#757575';
  const wpBlue = '#2271b1';

  return (
    <div className="min-h-screen flex flex-col font-sans select-text" style={{ background: wpBg, color: wpText }}>

      {/* ─────────────────────────────────────────────────────────────
          1. TOP GUTENBERG HEADER BAR (Exact Match to Screenshot)
      ───────────────────────────────────────────────────────────── */}
      <header
        className="h-14 border-b flex items-center justify-between px-3 sticky top-0 z-50 select-none"
        style={{ background: wpHeaderBg, borderColor: wpBorder }}
      >
        {/* Left Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Back to WordPress Admin */}
          <button
            onClick={() => onBack ? onBack() : window.history.back()}
            title="View Posts"
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition text-gray-700 dark:text-gray-300"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Blue Block Inserter Button (+) */}
          <button
            onClick={() => setShowBlockInserter(!showBlockInserter)}
            title="Toggle block inserter"
            className="w-9 h-9 rounded flex items-center justify-center text-white transition shadow-sm"
            style={{ background: wpBlue }}
          >
            <Plus size={20} />
          </button>

          {/* Undo / Redo */}
          <button
            title="Undo"
            onClick={() => {}}
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-300 transition"
          >
            <RotateCcw size={16} />
          </button>
          <button
            title="Redo"
            onClick={() => {}}
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-300 transition"
          >
            <RotateCw size={16} />
          </button>

          {/* List View / Document Overview */}
          <button
            title="Document Overview"
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-300 transition"
          >
            <AlignLeft size={17} />
          </button>

          {/* Edit with Elementor Button */}
          <button
            onClick={() => setElementorAiOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-white text-xs font-semibold tracking-wide transition shadow-sm ml-2"
            style={{ background: wpBlue }}
          >
            <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[10px] font-black" style={{ color: wpBlue }}>
              E
            </span>
            Edit with Elementor
          </button>
        </div>

        {/* Center: Document Title Pill */}
        <div className="hidden md:flex items-center">
          <div
            className="px-6 py-1.5 rounded text-xs font-medium border"
            style={{
              background: darkMode ? '#27272a' : '#f0f0f1',
              borderColor: darkMode ? '#3f3f46' : '#dcdcde',
              color: darkMode ? '#e4e4e7' : '#50575e',
              minWidth: '220px',
              textAlign: 'center'
            }}
          >
            {title.trim() ? `${title.trim().slice(0, 32)} - Post` : 'No title - Post'}
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Toast Notification */}
          {toast && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-fade-in mr-2">
              {toast}
            </span>
          )}

          {/* Save Draft */}
          <button
            onClick={() => handleSave('Draft')}
            className="text-xs font-medium px-2.5 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            style={{ color: wpText }}
          >
            Save draft
          </button>

          {/* Preview Button */}
          <button
            title="Preview"
            onClick={() => alert(`Previewing: ${title || 'Untitled Post'}`)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 transition"
          >
            <Monitor size={17} />
          </button>

          {/* Rank Math SEO Pill (Badge with Score) */}
          <button
            onClick={() => {
              setSidebarOpen(true);
              setSidebarTab('rankmath');
            }}
            title="Rank Math SEO Score"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold border transition cursor-pointer"
            style={{
              background: score >= 80 ? '#ecfdf5' : score >= 50 ? '#fffbeb' : '#fef2f2',
              borderColor: score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444',
              color: score >= 80 ? '#059669' : score >= 50 ? '#d97706' : '#dc2626',
            }}
          >
            <span className="w-3.5 h-3.5 rounded bg-current flex items-center justify-center text-white text-[9px] font-black leading-none">
              R
            </span>
            <span>{score} / 100</span>
          </button>

          {/* Toggle Sidebar Icon */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Settings Sidebar"
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            style={{ color: sidebarOpen ? wpBlue : wpMuted }}
          >
            <PanelRight size={18} />
          </button>

          {/* Publish Button */}
          <button
            onClick={() => handleSave('Published')}
            className="px-4 py-1.5 rounded text-xs font-semibold text-white tracking-wide transition shadow-sm"
            style={{ background: wpBlue }}
          >
            Publish
          </button>

          {/* Options Menu ⋮ */}
          <button
            title="Options"
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-300 transition"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT & CANVAS CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* ── BLOCK INSERTER POPOVER MENU ── */}
        {showBlockInserter && (
          <div
            className="absolute top-2 left-4 z-40 w-72 rounded-lg shadow-2xl border p-3 animate-scale-in"
            style={{ background: wpHeaderBg, borderColor: wpBorder }}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b" style={{ borderColor: wpBorder }}>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Add Block</span>
              <button onClick={() => setShowBlockInserter(false)} className="text-gray-400 hover:text-gray-600">
                <X size={15} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addBlock('paragraph')}
                className="flex flex-col items-center gap-1.5 p-3 rounded border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition text-left"
                style={{ borderColor: wpBorder }}
              >
                <FileText size={20} className="text-blue-600" />
                <span className="text-xs font-semibold">Paragraph</span>
              </button>
              <button
                onClick={() => addBlock('heading', null, { level: 2 })}
                className="flex flex-col items-center gap-1.5 p-3 rounded border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition text-left"
                style={{ borderColor: wpBorder }}
              >
                <Heading size={20} className="text-blue-600" />
                <span className="text-xs font-semibold">Heading</span>
              </button>
              <button
                onClick={() => {
                  const newId = `b-img-${Date.now()}`;
                  addBlock('image', null, { id: newId, url: '', caption: '', alt: '' });
                  setMediaTarget({ type: 'block', id: newId });
                  setShowMediaPicker(true);
                }}
                className="flex flex-col items-center gap-1.5 p-3 rounded border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition text-left"
                style={{ borderColor: wpBorder }}
              >
                <ImageIcon size={20} className="text-purple-600" />
                <span className="text-xs font-semibold">Image</span>
              </button>
              <button
                onClick={() => addBlock('quote')}
                className="flex flex-col items-center gap-1.5 p-3 rounded border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition text-left"
                style={{ borderColor: wpBorder }}
              >
                <Quote size={20} className="text-amber-600" />
                <span className="text-xs font-semibold">Quote</span>
              </button>
              <button
                onClick={() => addBlock('list', null, { items: ['First point', 'Second point'] })}
                className="flex flex-col items-center gap-1.5 p-3 rounded border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition text-left"
                style={{ borderColor: wpBorder }}
              >
                <ListIcon size={20} className="text-emerald-600" />
                <span className="text-xs font-semibold">List</span>
              </button>
              <button
                onClick={() => addBlock('code')}
                className="flex flex-col items-center gap-1.5 p-3 rounded border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition text-left"
                style={{ borderColor: wpBorder }}
              >
                <Code size={20} className="text-indigo-600" />
                <span className="text-xs font-semibold">Code</span>
              </button>
            </div>
          </div>
        )}

        {/* ── WRITING CANVAS (Center Document) ── */}
        <main className="flex-1 overflow-y-auto px-6 py-12 flex justify-center custom-scrollbar">
          <div className="w-full max-w-[820px]">

            {/* Document H1 Title (Exact match Gutenberg 'Add title') */}
            <div className="mb-6">
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Add title"
                className="w-full text-4xl sm:text-5xl font-bold tracking-tight border-none outline-none bg-transparent placeholder-gray-400 dark:placeholder-zinc-600 leading-tight"
                style={{ color: wpText, fontFamily: 'inherit' }}
                autoFocus
              />
            </div>

            {/* Gutenberg Blocks Canvas */}
            <div className="space-y-4 min-h-[360px]">
              {blocks.map((block, idx) => {
                const isActive = activeBlockId === block.id;

                return (
                  <div
                    key={block.id}
                    className={`relative group rounded-md transition duration-150 ${
                      isActive ? 'ring-1 ring-blue-500/50 bg-blue-50/10' : ''
                    }`}
                    onClick={() => setActiveBlockId(block.id)}
                  >
                    {/* Floating Block Toolbar when Active */}
                    {isActive && (
                      <div
                        className="absolute -top-10 left-0 z-30 flex items-center gap-1 px-2 py-1 rounded shadow-lg border text-xs select-none animate-fade-in"
                        style={{ background: wpHeaderBg, borderColor: wpBorder }}
                      >
                        <button
                          onClick={() => updateBlock(block.id, { type: block.type === 'heading' ? 'paragraph' : 'heading', level: 2 })}
                          title="Transform block"
                          className="px-1.5 py-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 font-bold"
                        >
                          {block.type === 'heading' ? `H${block.level || 2}` : '¶'}
                        </button>
                        <div className="w-px h-4 bg-gray-200 dark:bg-zinc-700" />
                        <button
                          onClick={() => {
                            const sel = window.getSelection()?.toString();
                            if (sel) document.execCommand('bold');
                          }}
                          title="Bold"
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                          <Bold size={13} />
                        </button>
                        <button
                          onClick={() => {
                            const sel = window.getSelection()?.toString();
                            if (sel) document.execCommand('italic');
                          }}
                          title="Italic"
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                          <Italic size={13} />
                        </button>
                        <button
                          onClick={() => {
                            const url = prompt('Enter link URL:');
                            if (url) document.execCommand('createLink', false, url);
                          }}
                          title="Link"
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                          <LinkIcon size={13} />
                        </button>
                        <div className="w-px h-4 bg-gray-200 dark:bg-zinc-700" />
                        <button
                          onClick={() => deleteBlock(block.id)}
                          title="Delete Block"
                          className="p-1 rounded hover:bg-red-50 text-red-500 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}

                    {/* Block Renderers */}
                    {block.type === 'paragraph' && (
                      <div className="flex items-center justify-between">
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          onInput={(e) => updateBlock(block.id, { content: e.currentTarget.innerHTML })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              addBlock('paragraph', block.id);
                            }
                          }}
                          data-placeholder="Type / to choose a block"
                          className="w-full min-h-[32px] text-lg text-gray-800 dark:text-gray-200 outline-none leading-relaxed empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 dark:empty:before:text-zinc-600"
                          dangerouslySetInnerHTML={{ __html: block.content }}
                        />
                        {/* Hover '+' Block Add Icon on the right */}
                        <button
                          onClick={() => addBlock('paragraph', block.id)}
                          title="Add block"
                          className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow transition ml-2 flex-shrink-0"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    )}

                    {block.type === 'heading' && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                          placeholder="Heading text..."
                          className="w-full text-2xl sm:text-3xl font-bold tracking-tight border-none outline-none bg-transparent placeholder-gray-400 dark:placeholder-zinc-600"
                        />
                        <select
                          value={block.level || 2}
                          onChange={(e) => updateBlock(block.id, { level: parseInt(e.target.value) })}
                          className="text-xs font-semibold px-2 py-1 rounded border bg-transparent"
                          style={{ borderColor: wpBorder }}
                        >
                          <option value={2}>H2</option>
                          <option value={3}>H3</option>
                          <option value={4}>H4</option>
                        </select>
                      </div>
                    )}

                    {block.type === 'image' && (
                      <div className="p-3 rounded border border-dashed" style={{ borderColor: wpBorder }}>
                        {block.url ? (
                          <div className="relative group/img">
                            <img src={block.url} alt={block.alt || ''} className="w-full h-auto rounded max-h-[420px] object-cover" />
                            <div className="mt-2">
                              <input
                                type="text"
                                value={block.caption || ''}
                                onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                                placeholder="Add caption..."
                                className="w-full text-center text-xs text-gray-500 italic bg-transparent border-none outline-none"
                              />
                            </div>
                            <button
                              onClick={() => {
                                setMediaTarget({ type: 'block', id: block.id });
                                setShowMediaPicker(true);
                              }}
                              className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded shadow"
                            >
                              Replace
                            </button>
                          </div>
                        ) : (
                          <div className="py-8 flex flex-col items-center justify-center gap-2 text-center">
                            <ImageIcon size={32} className="text-gray-400" />
                            <p className="text-xs font-medium text-gray-500">Upload or choose image from Media Library</p>
                            <button
                              onClick={() => {
                                setMediaTarget({ type: 'block', id: block.id });
                                setShowMediaPicker(true);
                              }}
                              className="px-3 py-1.5 rounded text-xs font-semibold text-white mt-1 shadow-sm"
                              style={{ background: wpBlue }}
                            >
                              Select Image
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {block.type === 'quote' && (
                      <div className="border-l-4 border-gray-900 dark:border-white pl-4 py-1">
                        <textarea
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                          placeholder="Quote text..."
                          className="w-full text-xl italic font-serif bg-transparent border-none outline-none resize-none"
                          rows={2}
                        />
                      </div>
                    )}

                    {block.type === 'list' && (
                      <div className="pl-6 list-disc space-y-1">
                        {(block.items || ['']).map((item, iIdx) => (
                          <div key={iIdx} className="flex items-center gap-2">
                            <span className="text-gray-400">•</span>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const nextItems = [...(block.items || [''])];
                                nextItems[iIdx] = e.target.value;
                                updateBlock(block.id, { items: nextItems });
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const nextItems = [...(block.items || [''])];
                                  nextItems.splice(iIdx + 1, 0, '');
                                  updateBlock(block.id, { items: nextItems });
                                }
                              }}
                              placeholder="List item..."
                              className="w-full text-base bg-transparent border-none outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {block.type === 'code' && (
                      <div className="p-3 rounded font-mono text-sm bg-gray-900 text-gray-100">
                        <textarea
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                          placeholder="// Write or paste code snippet here..."
                          className="w-full bg-transparent border-none outline-none resize-none text-emerald-400"
                          rows={4}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Add Block Footer Bar */}
            <div className="mt-8 pt-4 border-t flex items-center justify-between text-xs text-gray-400" style={{ borderColor: wpBorder }}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addBlock('paragraph')}
                  className="flex items-center gap-1 hover:text-blue-600 transition"
                >
                  <Plus size={14} /> Add Paragraph
                </button>
                <span>•</span>
                <button
                  onClick={() => addBlock('heading', null, { level: 2 })}
                  className="flex items-center gap-1 hover:text-blue-600 transition"
                >
                  <Heading size={14} /> Heading
                </button>
                <span>•</span>
                <button
                  onClick={() => {
                    const newId = `b-img-${Date.now()}`;
                    addBlock('image', null, { id: newId, url: '' });
                    setMediaTarget({ type: 'block', id: newId });
                    setShowMediaPicker(true);
                  }}
                  className="flex items-center gap-1 hover:text-blue-600 transition"
                >
                  <ImageIcon size={14} /> Image
                </button>
              </div>

              <span>Word count: {rawHtmlContent.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean).length}</span>
            </div>
          </div>
        </main>

        {/* ─────────────────────────────────────────────────────────────
            3. RIGHT SIDEBAR (Exact Match: Post / Block / Rank Math)
        ───────────────────────────────────────────────────────────── */}
        {sidebarOpen && (
          <aside
            className="w-80 border-l flex flex-col h-full overflow-y-auto select-none custom-scrollbar"
            style={{ background: wpHeaderBg, borderColor: wpBorder }}
          >
            {/* Sidebar Top Tab Switcher (Post | Block) */}
            <div className="flex items-center justify-between border-b px-2 sticky top-0 z-20" style={{ background: wpHeaderBg, borderColor: wpBorder }}>
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarTab('post')}
                  className={`px-4 py-3 text-xs font-semibold tracking-wide transition border-b-2 ${
                    sidebarTab === 'post' ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Post
                </button>
                <button
                  onClick={() => setSidebarTab('block')}
                  className={`px-4 py-3 text-xs font-semibold tracking-wide transition border-b-2 ${
                    sidebarTab === 'block' ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Block
                </button>
                <button
                  onClick={() => setSidebarTab('rankmath')}
                  className={`px-3 py-3 text-xs font-bold tracking-wide transition border-b-2 flex items-center gap-1 ${
                    sidebarTab === 'rankmath' ? 'border-[#f86434] text-[#f86434]' : 'border-transparent text-gray-500 hover:text-[#f86434]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded bg-[#f86434] text-white flex items-center justify-center text-[9px] font-black">R</span>
                  SEO
                </button>
              </div>

              {/* Close Sidebar 'X' */}
              <button
                onClick={() => setSidebarOpen(false)}
                title="Close settings"
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* TAB CONTENT: POST */}
            {sidebarTab === 'post' && (
              <div className="p-4 space-y-6 text-xs">

                {/* 1. Post Header Summary Item */}
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: wpBorder }}>
                  <div className="flex items-center gap-2">
                    <Feather size={16} className="text-gray-600 dark:text-gray-400" />
                    <span className="font-semibold text-sm truncate max-w-[190px]">
                      {title.trim() || 'No title'}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={14} />
                  </button>
                </div>

                {/* 2. Featured Image Section (Button: Set featured image) */}
                <div className="space-y-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Featured image</span>
                  {featuredImage ? (
                    <div className="relative group rounded border overflow-hidden" style={{ borderColor: wpBorder }}>
                      <img src={featuredImage} alt="Featured" className="w-full h-36 object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition">
                        <button
                          onClick={() => {
                            setMediaTarget('featured');
                            setShowMediaPicker(true);
                          }}
                          className="px-2.5 py-1 rounded bg-white text-gray-900 font-semibold text-[11px] shadow"
                        >
                          Replace
                        </button>
                        <button
                          onClick={() => setFeaturedImage('')}
                          className="px-2.5 py-1 rounded bg-red-600 text-white font-semibold text-[11px] shadow"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setMediaTarget('featured');
                        setShowMediaPicker(true);
                      }}
                      className="w-full py-3 px-4 border rounded font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2"
                      style={{ borderColor: wpBorder }}
                    >
                      <ImageIcon size={15} />
                      Set featured image
                    </button>
                  )}
                </div>

                {/* 3. Elementor AI Helper Link */}
                <div className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 cursor-pointer font-semibold py-1">
                  <Sparkles size={14} />
                  <span onClick={() => setElementorAiOpen(true)}>Generate with Elementor AI</span>
                </div>

                {/* 4. Excerpt Link */}
                <div>
                  <button
                    onClick={() => setShowExcerptField(!showExcerptField)}
                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                  >
                    {excerpt ? 'Edit excerpt...' : 'Add an excerpt...'}
                  </button>
                  {showExcerptField && (
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Write a short summary or excerpt for search engines and archives..."
                      rows={3}
                      className="w-full mt-2 p-2 rounded border outline-none text-xs bg-transparent"
                      style={{ borderColor: wpBorder }}
                    />
                  )}
                </div>

                <div className="text-[11px] text-gray-400 italic">
                  Last edited a few seconds ago.
                </div>

                {/* 5. Post Status Details Grid (Exact Layout) */}
                <div className="space-y-3 pt-2 border-t" style={{ borderColor: wpBorder }}>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Status</span>
                    <div className="relative">
                      <button
                        onClick={() => setShowStatusPicker(!showStatusPicker)}
                        className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                      >
                        <CheckCircle2 size={13} />
                        {status}
                      </button>
                      {showStatusPicker && (
                        <div className="absolute right-0 top-6 w-36 rounded shadow-lg border p-1 z-30" style={{ background: wpHeaderBg, borderColor: wpBorder }}>
                          {['Draft', 'Pending Review', 'Published'].map(st => (
                            <div
                              key={st}
                              onClick={() => {
                                setStatus(st);
                                setShowStatusPicker(false);
                              }}
                              className="px-2.5 py-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer font-medium"
                            >
                              {st}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Publish</span>
                    <span className="text-blue-600 font-medium cursor-pointer hover:underline">{publishDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Slug</span>
                    {showSlugEdit ? (
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        onBlur={() => setShowSlugEdit(false)}
                        autoFocus
                        className="border rounded px-1.5 py-0.5 text-xs outline-none max-w-[140px]"
                        style={{ borderColor: wpBorder }}
                      />
                    ) : (
                      <span
                        onClick={() => setShowSlugEdit(true)}
                        className="text-blue-600 font-medium cursor-pointer hover:underline truncate max-w-[140px]"
                      >
                        {slug || '3993'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Author</span>
                    <div className="relative">
                      <button
                        onClick={() => setShowAuthorPicker(!showAuthorPicker)}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        {author}
                      </button>
                      {showAuthorPicker && (
                        <div className="absolute right-0 top-6 w-36 rounded shadow-lg border p-1 z-30" style={{ background: wpHeaderBg, borderColor: wpBorder }}>
                          {['Love Olaoye', 'Admin', 'Identifine Team'].map(aut => (
                            <div
                              key={aut}
                              onClick={() => {
                                setAuthor(aut);
                                setShowAuthorPicker(false);
                              }}
                              className="px-2.5 py-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer font-medium"
                            >
                              {aut}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Template</span>
                    <span className="text-blue-600 font-medium cursor-pointer hover:underline">{template}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Discussion</span>
                    <span className="text-blue-600 font-medium cursor-pointer hover:underline">{discussion}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Format</span>
                    <span className="text-blue-600 font-medium cursor-pointer hover:underline">{format}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-gray-600 dark:text-gray-400">Lock Modified Date</span>
                    <input
                      type="checkbox"
                      checked={lockModifiedDate}
                      onChange={(e) => setLockModifiedDate(e.target.checked)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {/* 6. Accordion: TRX Addons AI Helper */}
                <div className="border-t pt-3" style={{ borderColor: wpBorder }}>
                  <button
                    onClick={() => setActiveAccordion(prev => ({ ...prev, trx: !prev.trx }))}
                    className="w-full flex items-center justify-between font-semibold text-gray-800 dark:text-gray-200"
                  >
                    <span>TRX Addons AI Helper</span>
                    {activeAccordion.trx ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {activeAccordion.trx && (
                    <div className="mt-2.5 p-2 rounded border space-y-2" style={{ borderColor: wpBorder }}>
                      <p className="text-[11px] text-gray-500">Generate executive copywriting and summary with AI assistance.</p>
                      <button
                        onClick={() => {
                          setExcerpt(`An executive overview of ${title || 'modern brand identity'} analyzing market trajectory and design methodology.`);
                          setToast('AI Excerpt Generated!');
                          setTimeout(() => setToast(''), 3000);
                        }}
                        className="w-full py-1.5 rounded text-xs font-semibold text-white"
                        style={{ background: wpBlue }}
                      >
                        Auto-Generate Summary
                      </button>
                    </div>
                  )}
                </div>

                {/* 7. Accordion: Categories */}
                <div className="border-t pt-3" style={{ borderColor: wpBorder }}>
                  <button
                    onClick={() => setActiveAccordion(prev => ({ ...prev, categories: !prev.categories }))}
                    className="w-full flex items-center justify-between font-semibold text-gray-800 dark:text-gray-200"
                  >
                    <span>Categories</span>
                    {activeAccordion.categories ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {activeAccordion.categories && (
                    <div className="mt-2.5 space-y-2">
                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                        {categories.map(cat => (
                          <label key={cat} className="flex items-center gap-2 cursor-pointer text-xs">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(cat)}
                              onChange={() => toggleCategory(cat)}
                              className="rounded text-blue-600 focus:ring-0"
                            />
                            <span>{cat}</span>
                          </label>
                        ))}
                      </div>

                      {showAddCat ? (
                        <div className="pt-2 flex flex-col gap-1.5">
                          <input
                            type="text"
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            placeholder="New category name"
                            className="p-1.5 text-xs rounded border outline-none bg-transparent"
                            style={{ borderColor: wpBorder }}
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleAddCategory}
                              className="px-3 py-1 rounded bg-blue-600 text-white font-semibold text-xs"
                            >
                              Add Category
                            </button>
                            <button
                              onClick={() => setShowAddCat(false)}
                              className="text-xs text-gray-500 hover:text-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowAddCat(true)}
                          className="text-xs text-blue-600 hover:underline font-semibold"
                        >
                          + Add New Category
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* 8. Accordion: Tags */}
                <div className="border-t pt-3" style={{ borderColor: wpBorder }}>
                  <button
                    onClick={() => setActiveAccordion(prev => ({ ...prev, tags: !prev.tags }))}
                    className="w-full flex items-center justify-between font-semibold text-gray-800 dark:text-gray-200"
                  >
                    <span>Tags</span>
                    {activeAccordion.tags ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {activeAccordion.tags && (
                    <div className="mt-2.5 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map(t => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
                          >
                            {t}
                            <button onClick={() => removeTag(t)} className="hover:text-red-500">
                              <X size={10} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add new tag (press Enter)"
                        className="w-full p-2 text-xs rounded border outline-none bg-transparent"
                        style={{ borderColor: wpBorder }}
                      />
                      <p className="text-[10px] text-gray-400">Separate with commas or the Enter key.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB CONTENT: BLOCK SETTINGS */}
            {sidebarTab === 'block' && (
              <div className="p-4 space-y-4 text-xs">
                <span className="font-semibold text-sm">Selected Block Settings</span>
                <p className="text-gray-500">Configure typography, line height, spacing, and styling for the current block.</p>
                <div className="p-3 rounded border space-y-3" style={{ borderColor: wpBorder }}>
                  <span className="font-medium block text-gray-700 dark:text-gray-300">Typography</span>
                  <div className="flex items-center justify-between">
                    <span>Size</span>
                    <select className="border rounded px-2 py-1 bg-transparent text-xs" style={{ borderColor: wpBorder }}>
                      <option>Default</option>
                      <option>Small (14px)</option>
                      <option>Medium (16px)</option>
                      <option>Large (20px)</option>
                      <option>Extra Large (24px)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: RANK MATH SEO */}
            {sidebarTab === 'rankmath' && (
              <div className="p-4 overflow-y-auto">
                <RankMathPanel
                  title={title}
                  slug={slug}
                  content={rawHtmlContent}
                  summary={excerpt}
                  focusKeyword={focusKeyword}
                  setFocusKeyword={setFocusKeyword}
                  seoTitle={seoTitle}
                  setSeoTitle={setSeoTitle}
                  metaDesc={metaDesc}
                  setMetaDesc={setMetaDesc}
                  activeTab={activeRmTab}
                  setActiveTab={setActiveRmTab}
                  onScoreChange={() => {}}
                  darkMode={darkMode}
                />
              </div>
            )}
          </aside>
        )}

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM STATUS BAR & FLOATING CHAT WIDGET
      ───────────────────────────────────────────────────────────── */}
      <footer
        className="h-8 border-t flex items-center justify-between px-4 text-xs select-none"
        style={{ background: wpHeaderBg, borderColor: wpBorder, color: wpMuted }}
      >
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-800 dark:hover:text-gray-200 font-medium">
            Meta Boxes ▾
          </button>
          <span>Post</span>
        </div>
        <div className="text-[11px]">
          Identifine Studio • Block Editor
        </div>
      </footer>

      {/* Floating Green Chat Widget (Bottom-Right matching screenshot) */}
      <button
        title="Need help?"
        onClick={() => alert('Identifine Support Assistant')}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition active:scale-95"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.632-.821A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
        </svg>
      </button>

      {/* Media Picker Modal */}
      {showMediaPicker && (
        <MediaPickerModal
          onSelect={handleMediaSelected}
          onClose={() => setShowMediaPicker(false)}
          darkMode={darkMode}
        />
      )}

      {/* Elementor AI Modal Mockup */}
      {elementorAiOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-lg w-full p-6 border border-zinc-200 dark:border-zinc-800 animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-purple-600 font-bold text-base">
                <Sparkles size={20} />
                Elementor AI Assistant
              </div>
              <button onClick={() => setElementorAiOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <div className="py-4 space-y-3">
              <p className="text-xs text-gray-500">What would you like Elementor AI to generate for this article?</p>
              <textarea
                placeholder="e.g., Write an inspiring executive introductory paragraph about smart NFC luxury cards..."
                className="w-full p-3 rounded-lg border text-sm outline-none bg-transparent"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setElementorAiOpen(false)}
                className="px-4 py-2 rounded text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  addBlock('paragraph', null, {
                    content: `In an era defined by precision and tactile luxury, modern leadership requires tools that seamlessly bridge physical presence and instant digital authority.`
                  });
                  setElementorAiOpen(false);
                  setToast('AI block inserted!');
                  setTimeout(() => setToast(''), 3000);
                }}
                className="px-4 py-2 rounded text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow"
              >
                Generate & Insert
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
