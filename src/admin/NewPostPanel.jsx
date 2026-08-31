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
  FileText,
  MessageSquare,
  Radio
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

const POPULAR_BLOCKS = [
  { id: 'paragraph', name: 'Paragraph', icon: '¶', isTextIcon: true },
  { id: 'heading-2', name: 'Heading 2', icon: 'H2', isTextIcon: true, type: 'heading', level: 2 },
  { id: 'heading-3', name: 'Heading 3', icon: 'H3', isTextIcon: true, type: 'heading', level: 3 },
  { id: 'list', name: 'List', icon: 'list', isListIcon: true, type: 'list' },
  { id: 'heading-1', name: 'Heading 1', icon: 'H1', isTextIcon: true, type: 'heading', level: 1 },
  { id: 'image', name: 'Image', icon: 'image', isImageIcon: true, type: 'image' },
];

export default function NewPostPanel({ editArticle, onPublished, onBack, darkMode = false }) {
  const [editingId, setEditingId] = useState(null);

  // ── Core Post Fields ──
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('3993');
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
  const [inlineInserterBlockId, setInlineInserterBlockId] = useState(null);
  const [inlineSearch, setInlineSearch] = useState('');
  const [showTopBlockInserter, setShowTopBlockInserter] = useState(false);

  // ── UI States ──
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState('post'); // 'post' | 'block' | 'rankmath'
  const [activeAccordion, setActiveAccordion] = useState({
    summary: true,
    trx: false,
    categories: false,
    tags: false,
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

  // Close inline inserter on outside click
  const inlineInserterRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (inlineInserterRef.current && !inlineInserterRef.current.contains(e.target)) {
        setInlineInserterBlockId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load article for editing if provided
  useEffect(() => {
    if (editArticle && editArticle.id !== editingId) {
      setEditingId(editArticle.id);
      setTitle(editArticle.title || '');
      setSlug(editArticle.slug || `${Math.floor(1000 + Math.random() * 9000)}`);
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

  const handleTitleChange = (val) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val) || `${Math.floor(1000 + Math.random() * 9000)}`);
    }
  };

  const updateBlock = (id, newProps) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...newProps } : b));
  };

  const handleInsertBlockFromInline = (blockTypeConfig, targetBlockId) => {
    setInlineInserterBlockId(null);
    setInlineSearch('');

    if (blockTypeConfig.id === 'image') {
      const newId = `b-img-${Date.now()}`;
      addBlock('image', targetBlockId, { id: newId, url: '', caption: '', alt: '' });
      setMediaTarget({ type: 'block', id: newId });
      setShowMediaPicker(true);
      return;
    }

    if (blockTypeConfig.type === 'heading') {
      // If current paragraph is empty, transform it directly; otherwise insert after
      const currentBlock = blocks.find(b => b.id === targetBlockId);
      if (currentBlock && !currentBlock.content.trim()) {
        updateBlock(targetBlockId, { type: 'heading', level: blockTypeConfig.level || 2, content: '' });
      } else {
        addBlock('heading', targetBlockId, { level: blockTypeConfig.level || 2 });
      }
      return;
    }

    if (blockTypeConfig.type === 'list') {
      const currentBlock = blocks.find(b => b.id === targetBlockId);
      if (currentBlock && !currentBlock.content.trim()) {
        updateBlock(targetBlockId, { type: 'list', items: [''] });
      } else {
        addBlock('list', targetBlockId, { items: [''] });
      }
      return;
    }

    addBlock('paragraph', targetBlockId);
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
    setShowTopBlockInserter(false);
  };

  const deleteBlock = (id) => {
    if (blocks.length === 1) {
      updateBlock(id, { content: '', type: 'paragraph' });
      return;
    }
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const rawHtmlContent = blocks.map(b => {
    if (b.type === 'heading') return `<h${b.level || 2}>${b.content}</h${b.level || 2}>`;
    if (b.type === 'image') return `<figure><img src="${b.url}" alt="${b.alt || ''}" /><figcaption>${b.caption || ''}</figcaption></figure>`;
    if (b.type === 'quote') return `<blockquote><p>${b.content}</p></blockquote>`;
    if (b.type === 'list') return `<ul>${(b.items || [b.content]).map(i => `<li>${i}</li>`).join('')}</ul>`;
    if (b.type === 'code') return `<pre><code>${b.content}</code></pre>`;
    return `<p>${b.content}</p>`;
  }).join('\n');

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

  const { score } = seoData;

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
    setToast(newStatus === 'Draft' ? 'Draft saved.' : 'Post published!');
    setTimeout(() => setToast(''), 3000);
    if (onPublished) onPublished(article);
  };

  const handleMediaSelected = (item) => {
    const imgUrl = item.dataUrl || item.url;
    if (mediaTarget === 'featured') {
      setFeaturedImage(imgUrl);
    } else if (typeof mediaTarget === 'object' && mediaTarget.type === 'block') {
      updateBlock(mediaTarget.id, { url: imgUrl, alt: item.alt || item.name || 'Image' });
    }
    setShowMediaPicker(false);
  };

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

  const filteredPopularBlocks = POPULAR_BLOCKS.filter(b =>
    b.name.toLowerCase().includes(inlineSearch.toLowerCase())
  );

  const wpBg = darkMode ? '#121212' : '#ffffff';
  const wpHeaderBg = darkMode ? '#18181b' : '#ffffff';
  const wpBorder = darkMode ? '#27272a' : '#e0e0e0';
  const wpText = darkMode ? '#f4f4f5' : '#1e1e1e';
  const wpMuted = darkMode ? '#a1a1aa' : '#757575';
  const wpBlue = '#2271b1';

  return (
    <div className="min-h-screen flex flex-col font-sans select-text" style={{ background: wpBg, color: wpText }}>

      {/* ─────────────────────────────────────────────────────────────
          1. TOPMOST WORDPRESS ADMIN BLACK BAR (Exact match to screenshot)
      ───────────────────────────────────────────────────────────── */}
      <div className="h-8 bg-[#1d2327] text-[#c3c4c7] flex items-center justify-between px-3 text-xs select-none z-50">
        <div className="flex items-center gap-4">
          {/* WordPress W Logo */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-white transition">
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[#1d2327] text-[10px] font-black">
              W
            </div>
          </div>

          {/* Site name + icon */}
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition">
            <span className="w-3.5 h-3.5 bg-[#e2b857] text-black font-black text-[9px] rounded-sm flex items-center justify-center leading-none">
              i
            </span>
            <span className="font-semibold text-white">Identifine</span>
          </div>

          {/* Quick Search */}
          <div className="flex items-center gap-1 text-[11px] text-[#a7aaad] bg-[#2c3338] px-2 py-0.5 rounded cursor-pointer hover:text-white">
            <Search size={11} />
            <span>Ctrl+K</span>
          </div>

          {/* Comments Bubble */}
          <div className="flex items-center gap-1 text-[#a7aaad] hover:text-white cursor-pointer">
            <MessageSquare size={12} />
            <span>0</span>
          </div>

          {/* + New Link */}
          <div
            onClick={() => onBack ? onBack() : null}
            className="flex items-center gap-1 text-[#a7aaad] hover:text-white cursor-pointer"
          >
            <Plus size={13} />
            <span>New</span>
          </div>
        </div>

        {/* Right side: User Profile */}
        <div className="flex items-center gap-2 text-[#a7aaad] text-xs">
          <span>Howdy, Love Olaoye</span>
          <div className="w-5 h-5 rounded-full bg-[#8c8f94] flex items-center justify-center text-white text-[10px] font-bold">
            L
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. GUTENBERG EDITOR HEADER BAR (Exact Match to Screenshot)
      ───────────────────────────────────────────────────────────── */}
      <header
        className="h-14 border-b flex items-center justify-between px-3 sticky top-0 z-40 select-none shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        style={{ background: wpHeaderBg, borderColor: wpBorder }}
      >
        {/* Left Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Back Arrow Button */}
          <button
            onClick={() => onBack ? onBack() : window.history.back()}
            title="View Posts"
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition text-gray-700 dark:text-gray-300"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Blue Block Inserter Button (+) */}
          <button
            onClick={() => setShowTopBlockInserter(!showTopBlockInserter)}
            title="Toggle block inserter"
            className="w-9 h-9 rounded flex items-center justify-center text-white transition shadow-sm"
            style={{ background: wpBlue }}
          >
            <Plus size={20} />
          </button>

          {/* Undo / Redo */}
          <button
            title="Undo"
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-300 transition"
          >
            <RotateCcw size={16} />
          </button>
          <button
            title="Redo"
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
            className="flex items-center gap-2 px-3.5 py-1.5 rounded text-white text-xs font-semibold tracking-wide transition shadow-sm ml-2"
            style={{ background: wpBlue }}
          >
            <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[10px] font-black" style={{ color: wpBlue }}>
              E
            </span>
            Edit with Elementor
          </button>
        </div>

        {/* Center: Document Title Capsule */}
        <div className="hidden md:flex items-center">
          <div
            className="px-6 py-1.5 rounded text-xs font-medium border"
            style={{
              background: darkMode ? '#27272a' : '#f0f0f1',
              borderColor: darkMode ? '#3f3f46' : '#dcdcde',
              color: darkMode ? '#e4e4e7' : '#50575e',
              minWidth: '240px',
              textAlign: 'center'
            }}
          >
            {title.trim() ? `${title.trim().slice(0, 34)} - Post` : 'No title - Post'}
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {toast && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mr-2">
              {toast}
            </span>
          )}

          {/* Save Draft */}
          <button
            onClick={() => handleSave('Draft')}
            className="text-xs font-medium px-2.5 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition text-[#50575e] dark:text-gray-300"
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

          {/* Rank Math SEO Pill (Red badge matching screenshot) */}
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

          {/* Sidebar Toggle Icon */}
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
          3. MAIN CONTENT & CANVAS CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* ── WRITING CANVAS (Center Document) ── */}
        <main className="flex-1 overflow-y-auto px-6 py-14 flex justify-center custom-scrollbar">
          <div className="w-full max-w-[840px]">

            {/* Document H1 Title (Exact match Gutenberg 'Add title') */}
            <div className="mb-8">
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Add title"
                className="w-full text-5xl font-bold tracking-tight border-none outline-none bg-transparent placeholder-[#757575] leading-tight"
                style={{ color: wpText, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif' }}
                autoFocus
              />
            </div>

            {/* Gutenberg Blocks Canvas */}
            <div className="space-y-4 min-h-[380px]">
              {blocks.map((block) => {
                const isActive = activeBlockId === block.id;
                const isInlineOpen = inlineInserterBlockId === block.id;

                return (
                  <div
                    key={block.id}
                    className={`relative group rounded transition duration-150 ${
                      isActive ? 'ring-1 ring-blue-500/30 bg-blue-50/5' : ''
                    }`}
                    onClick={() => setActiveBlockId(block.id)}
                  >
                    {/* Floating Block Toolbar */}
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
                      <div className="relative flex items-center justify-between py-1">
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
                          className="w-full min-h-[30px] text-lg text-gray-800 dark:text-gray-200 outline-none leading-relaxed empty:before:content-[attr(data-placeholder)] empty:before:text-[#757575]"
                          dangerouslySetInnerHTML={{ __html: block.content }}
                        />

                        {/* ── [+] / [✕] IN-LINE BLOCK INSERTER BUTTON (Exact match) ── */}
                        <div className="relative flex-shrink-0 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setInlineInserterBlockId(isInlineOpen ? null : block.id);
                              setInlineSearch('');
                            }}
                            title="Add block"
                            className={`w-6 h-6 rounded flex items-center justify-center shadow transition cursor-pointer select-none ${
                              isInlineOpen
                                ? 'bg-[#2271b1] text-white'
                                : 'bg-[#1e1e1e] dark:bg-white text-white dark:text-[#1e1e1e]'
                            }`}
                          >
                            {isInlineOpen ? <X size={14} /> : <Plus size={14} />}
                          </button>

                          {/* "Add block" tooltip badge when open */}
                          {isInlineOpen && (
                            <div className="absolute top-7 -left-5 z-40 bg-black text-white text-[10px] px-1.5 py-0.5 rounded shadow whitespace-nowrap pointer-events-none">
                              Add block
                            </div>
                          )}

                          {/* ─────────────────────────────────────────────────────────────
                              IN-LINE BLOCK INSERTER POPUP (Exact 1-to-1 Match to Screenshot)
                          ───────────────────────────────────────────────────────────── */}
                          {isInlineOpen && (
                            <div
                              ref={inlineInserterRef}
                              onClick={(e) => e.stopPropagation()}
                              className="absolute top-10 right-0 z-50 w-[290px] rounded border shadow-2xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 overflow-hidden animate-scale-in"
                              style={{ borderColor: wpBorder }}
                            >
                              {/* 1. Search Box with Focused Blue Border */}
                              <div className="p-3 pb-2">
                                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-[#2271b1] ring-1 ring-[#2271b1] bg-white dark:bg-zinc-800 text-xs">
                                  <Search size={14} className="text-gray-400" />
                                  <input
                                    type="text"
                                    value={inlineSearch}
                                    onChange={(e) => setInlineSearch(e.target.value)}
                                    placeholder="Search"
                                    autoFocus
                                    className="w-full bg-transparent border-none outline-none text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400"
                                  />
                                </div>
                              </div>

                              {/* 2. 6-Block Quick Grid (Paragraph, Heading 2, Heading 3, List, Heading 1, Image) */}
                              <div className="px-3 py-2 grid grid-cols-3 gap-2">
                                {filteredPopularBlocks.map((bItem) => (
                                  <button
                                    key={bItem.id}
                                    onClick={() => handleInsertBlockFromInline(bItem, block.id)}
                                    className="flex flex-col items-center justify-center p-3 rounded hover:bg-gray-100 dark:hover:bg-zinc-800/80 transition cursor-pointer group text-center"
                                  >
                                    {/* Icon renderer */}
                                    <div className="w-8 h-8 flex items-center justify-center text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition">
                                      {bItem.isTextIcon && (
                                        <span className="font-serif text-lg font-bold leading-none">{bItem.icon}</span>
                                      )}
                                      {bItem.isListIcon && (
                                        <div className="flex flex-col gap-1 items-start w-4">
                                          <div className="flex items-center gap-1 w-full"><span className="w-1 h-1 rounded-full bg-current"></span><span className="h-0.5 w-full bg-current"></span></div>
                                          <div className="flex items-center gap-1 w-full"><span className="w-1 h-1 rounded-full bg-current"></span><span className="h-0.5 w-full bg-current"></span></div>
                                          <div className="flex items-center gap-1 w-full"><span className="w-1 h-1 rounded-full bg-current"></span><span className="h-0.5 w-full bg-current"></span></div>
                                        </div>
                                      )}
                                      {bItem.isImageIcon && (
                                        <ImageIcon size={20} />
                                      )}
                                    </div>
                                    <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 mt-1 leading-tight">
                                      {bItem.name}
                                    </span>
                                  </button>
                                ))}
                              </div>

                              {/* 3. Bottom Black 'Browse all' Button */}
                              <button
                                onClick={() => {
                                  setInlineInserterBlockId(null);
                                  setShowTopBlockInserter(true);
                                }}
                                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#1e1e1e] hover:bg-black transition cursor-pointer"
                              >
                                Browse all
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {block.type === 'heading' && (
                      <div className="flex items-center gap-2 py-1">
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                          placeholder="Heading text..."
                          className="w-full text-3xl font-bold tracking-tight border-none outline-none bg-transparent placeholder-[#757575]"
                        />
                        <select
                          value={block.level || 2}
                          onChange={(e) => updateBlock(block.id, { level: parseInt(e.target.value) })}
                          className="text-xs font-semibold px-2 py-1 rounded border bg-transparent"
                          style={{ borderColor: wpBorder }}
                        >
                          <option value={1}>H1</option>
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
          </div>
        </main>

        {/* ─────────────────────────────────────────────────────────────
            4. RIGHT SIDEBAR (Exact Match: Post / Block / Rank Math)
        ───────────────────────────────────────────────────────────── */}
        {sidebarOpen && (
          <aside
            className="w-80 border-l flex flex-col h-full overflow-y-auto select-none custom-scrollbar"
            style={{ background: wpHeaderBg, borderColor: wpBorder }}
          >
            {/* Sidebar Top Tab Switcher (Post | Block - Exact 1-to-1) */}
            <div className="flex items-center justify-between border-b px-2 sticky top-0 z-20" style={{ background: wpHeaderBg, borderColor: wpBorder }}>
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarTab('post')}
                  className={`px-4 py-3 text-[13px] font-semibold tracking-wide transition border-b-2 ${
                    sidebarTab === 'post'
                      ? 'border-[#1e1e1e] dark:border-white text-[#1e1e1e] dark:text-white'
                      : 'border-transparent text-[#757575] hover:text-[#1e1e1e] dark:hover:text-white'
                  }`}
                >
                  Post
                </button>
                <button
                  onClick={() => setSidebarTab('block')}
                  className={`px-4 py-3 text-[13px] font-semibold tracking-wide transition border-b-2 ${
                    sidebarTab === 'block'
                      ? 'border-[#1e1e1e] dark:border-white text-[#1e1e1e] dark:text-white'
                      : 'border-transparent text-[#757575] hover:text-[#1e1e1e] dark:hover:text-white'
                  }`}
                >
                  Block
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

            {/* TAB CONTENT: POST (Exact match to screenshot) */}
            {sidebarTab === 'post' && (
              <div className="p-4 space-y-5 text-xs">

                {/* 1. Post Header Summary Item (Feather Icon + Title + ⋮) */}
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: wpBorder }}>
                  <div className="flex items-center gap-2">
                    <Feather size={16} className="text-gray-700 dark:text-gray-300" />
                    <span className="font-semibold text-sm truncate max-w-[190px]">
                      {title.trim() || 'No title'}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={14} />
                  </button>
                </div>

                {/* 2. Featured Image Section (Button: Set featured image) */}
                <div>
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
                      className="w-full py-2.5 px-4 border rounded font-medium text-gray-800 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2 text-xs"
                      style={{ borderColor: wpBorder }}
                    >
                      Set featured image
                    </button>
                  )}
                </div>

                {/* 3. Elementor AI Helper Link (Magenta/purple sparkles icon + text) */}
                <div className="flex items-center gap-1.5 text-[#a020f0] hover:text-purple-700 cursor-pointer font-medium text-xs">
                  <Sparkles size={14} />
                  <span onClick={() => setElementorAiOpen(true)}>Generate with Elementor AI</span>
                </div>

                {/* 4. Excerpt Link */}
                <div>
                  <button
                    onClick={() => setShowExcerptField(!showExcerptField)}
                    className="text-[#2271b1] hover:underline font-medium cursor-pointer"
                  >
                    {excerpt ? 'Edit excerpt...' : 'Add an excerpt...'}
                  </button>
                  {showExcerptField && (
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Write a short summary or excerpt..."
                      rows={3}
                      className="w-full mt-2 p-2 rounded border outline-none text-xs bg-transparent"
                      style={{ borderColor: wpBorder }}
                    />
                  )}
                </div>

                {/* 5. Last edited timestamp */}
                <div className="text-[11px] text-[#757575]">
                  Last edited 15 minutes ago.
                </div>

                {/* 6. Post Status Details Grid (Exact Layout from screenshot) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <div className="relative">
                      <button
                        onClick={() => setShowStatusPicker(!showStatusPicker)}
                        className="text-[#2271b1] font-medium hover:underline flex items-center gap-1.5"
                      >
                        <span className="w-2.5 h-2.5 rounded-full border-2 border-[#2271b1] flex items-center justify-center">
                          <span className="w-1 h-1 rounded-full bg-[#2271b1]"></span>
                        </span>
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
                    <span className="text-gray-600 dark:text-gray-400">Publish</span>
                    <span className="text-[#2271b1] font-medium cursor-pointer hover:underline">{publishDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Slug</span>
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
                        className="text-[#2271b1] font-medium cursor-pointer hover:underline truncate max-w-[140px]"
                      >
                        {slug || '3993'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Author</span>
                    <div className="relative">
                      <button
                        onClick={() => setShowAuthorPicker(!showAuthorPicker)}
                        className="text-[#2271b1] font-medium hover:underline"
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
                    <span className="text-gray-600 dark:text-gray-400">Template</span>
                    <span className="text-[#2271b1] font-medium cursor-pointer hover:underline">{template}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Discussion</span>
                    <span className="text-[#2271b1] font-medium cursor-pointer hover:underline">{discussion}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Format</span>
                    <span className="text-[#2271b1] font-medium cursor-pointer hover:underline">{format}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setLockModifiedDate(!lockModifiedDate)}
                        className={`w-7 h-4 rounded-full transition relative ${
                          lockModifiedDate ? 'bg-[#2271b1]' : 'bg-gray-300 dark:bg-zinc-700'
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition ${
                            lockModifiedDate ? 'left-3.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                      <span className="text-gray-600 dark:text-gray-400 text-xs">Lock Modified Date</span>
                    </div>
                  </div>
                </div>

                {/* 7. Accordion: TRX Addons AI Helper */}
                <div className="border-t pt-3" style={{ borderColor: wpBorder }}>
                  <button
                    onClick={() => setActiveAccordion(prev => ({ ...prev, trx: !prev.trx }))}
                    className="w-full flex items-center justify-between font-semibold text-gray-800 dark:text-gray-200"
                  >
                    <span>TRX Addons AI Helper</span>
                    {activeAccordion.trx ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {activeAccordion.trx && (
                    <div className="mt-2.5 p-2.5 rounded border space-y-2" style={{ borderColor: wpBorder }}>
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

                {/* 8. Accordion: Categories */}
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
                          className="text-xs text-[#2271b1] hover:underline font-semibold"
                        >
                          + Add New Category
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* 9. Accordion: Tags */}
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

            {/* TAB CONTENT: BLOCK SETTINGS (Exact 1-to-1 match to screenshot) */}
            {sidebarTab === 'block' && (
              <div className="p-4 space-y-5 text-xs">

                {/* 1. Block Header (¶ Paragraph + Description + Elementor AI) */}
                <div className="space-y-1.5 pb-3 border-b" style={{ borderColor: wpBorder }}>
                  <div className="flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-serif text-base">¶</span>
                    <span>Paragraph</span>
                  </div>
                  <p className="text-[11px] text-[#757575] leading-relaxed">
                    Start with the basic building block of all narrative.
                  </p>
                  <div className="pt-1">
                    <button
                      onClick={() => setElementorAiOpen(true)}
                      className="flex items-center gap-1.5 text-[#a020f0] hover:text-purple-700 font-medium text-xs cursor-pointer"
                    >
                      <Sparkles size={13} />
                      <span>Generate with Elementor AI</span>
                    </button>
                  </div>
                </div>

                {/* 2. Typography Card */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">Typography</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={14} />
                    </button>
                  </div>

                  {/* Color selector button */}
                  <button
                    onClick={() => {
                      const color = prompt('Enter text hex color (e.g. #2271b1):', '#1e1e1e');
                      if (color) updateBlock(activeBlockId, { textColor: color });
                    }}
                    className="w-full py-2 px-3 border rounded flex items-center gap-2.5 text-xs text-gray-800 dark:text-gray-200 hover:border-gray-400 transition cursor-pointer"
                    style={{ borderColor: wpBorder }}
                  >
                    <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-zinc-700 flex items-center justify-center relative overflow-hidden bg-white">
                      <span className="w-full h-px bg-red-400 -rotate-45 absolute" />
                    </span>
                    <span>Color</span>
                  </button>

                  {/* Font Size header + toggle */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-[#757575]">
                      <span>FONT SIZE</span>
                      <button title="Reset size" className="hover:text-gray-800 dark:hover:text-gray-200">
                        <span className="text-xs">⇄</span>
                      </button>
                    </div>

                    {/* S | M | L | XL Segmented Buttons */}
                    <div className="grid grid-cols-4 border rounded overflow-hidden text-center text-xs font-semibold" style={{ borderColor: wpBorder }}>
                      {['S', 'M', 'L', 'XL'].map((sizeKey) => {
                        const currentSize = blocks.find(b => b.id === activeBlockId)?.fontSize || 'M';
                        const isSelected = currentSize === sizeKey;

                        return (
                          <button
                            key={sizeKey}
                            onClick={() => updateBlock(activeBlockId, { fontSize: sizeKey })}
                            className={`py-1.5 transition border-r last:border-r-0 ${
                              isSelected
                                ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white font-bold'
                                : 'hover:bg-gray-50 dark:hover:bg-zinc-800/50 text-[#757575]'
                            }`}
                            style={{ borderColor: wpBorder }}
                          >
                            {sizeKey}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3. Background Card */}
                <div className="space-y-3 pt-2 border-t" style={{ borderColor: wpBorder }}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">Background</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={14} />
                    </button>
                  </div>

                  {/* Solid Color & Gradient buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        const bg = prompt('Enter background hex color (e.g. #f0f0f1):', '#f8fafc');
                        if (bg) updateBlock(activeBlockId, { bg });
                      }}
                      className="w-full py-2 px-3 border rounded flex items-center gap-2.5 text-xs text-gray-800 dark:text-gray-200 hover:border-gray-400 transition cursor-pointer"
                      style={{ borderColor: wpBorder }}
                    >
                      <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-zinc-700 flex items-center justify-center relative overflow-hidden bg-white">
                        <span className="w-full h-px bg-red-400 -rotate-45 absolute" />
                      </span>
                      <span>Color</span>
                    </button>

                    <button
                      onClick={() => updateBlock(activeBlockId, { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' })}
                      className="w-full py-2 px-3 border rounded flex items-center gap-2.5 text-xs text-gray-800 dark:text-gray-200 hover:border-gray-400 transition cursor-pointer"
                      style={{ borderColor: wpBorder }}
                    >
                      <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-zinc-700 flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-blue-400 to-purple-500" />
                      <span>Gradient</span>
                    </button>
                  </div>
                </div>

                {/* 4. Collapsible Settings Items (Dimensions, Border, Elements, Advanced) */}
                <div className="space-y-0 pt-2 border-t" style={{ borderColor: wpBorder }}>
                  {/* Dimensions */}
                  <div className="py-2.5 border-b flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 transition" style={{ borderColor: wpBorder }}>
                    <span>Dimensions</span>
                    <Plus size={14} className="text-gray-400" />
                  </div>

                  {/* Border */}
                  <div className="py-2.5 border-b flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 transition" style={{ borderColor: wpBorder }}>
                    <span>Border</span>
                    <Plus size={14} className="text-gray-400" />
                  </div>

                  {/* Elements */}
                  <div className="py-2.5 border-b flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 transition" style={{ borderColor: wpBorder }}>
                    <span>Elements</span>
                    <Plus size={14} className="text-gray-400" />
                  </div>

                  {/* Advanced */}
                  <div className="py-2.5 flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 transition">
                    <span>Advanced</span>
                    <ChevronDown size={14} className="text-gray-400" />
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
          5. BOTTOM STATUS BAR (Exact Match: Meta Boxes ⌵ / Post › Paragraph)
      ───────────────────────────────────────────────────────────── */}
      <footer
        className="h-7 border-t flex items-center justify-between px-4 text-xs select-none"
        style={{ background: wpHeaderBg, borderColor: wpBorder, color: wpMuted }}
      >
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-800 dark:hover:text-gray-200 font-medium">
            Meta Boxes ▾
          </button>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="hover:underline cursor-pointer">Post</span>
            <span>›</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">Paragraph</span>
          </div>
        </div>
        <div className="w-16 h-1 bg-gray-200 dark:bg-zinc-700 rounded-full mx-auto hidden sm:block"></div>
        <div className="text-[11px] text-gray-400">
          Gutenberg Block Editor
        </div>
      </footer>

      {/* Floating Green WhatsApp/Support Assistant Button (Exact match bottom-right) */}
      <button
        title="Identifine Assistant"
        onClick={() => alert('Identifine Live Assistant ready.')}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#25d366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition active:scale-95 cursor-pointer"
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

      {/* Elementor AI Modal */}
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
