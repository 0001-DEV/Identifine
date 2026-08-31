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
  Radio,
  Sliders,
  Settings,
  Crop,
  Layers,
  Upload as UploadIcon,
  ExternalLink
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
  const [imageSubTab, setImageSubTab] = useState('styles'); // 'styles' | 'settings' | 'duotone'
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

  // Link Insertion State
  const [linkModalData, setLinkModalData] = useState({
    open: false,
    blockId: null,
    selectedText: '',
    url: '',
    newTab: true,
    start: 0,
    end: 0,
  });

  // ── Rank Math & SEO Fields ──
  const [focusKeyword, setFocusKeyword] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [activeRmTab, setActiveRmTab] = useState('general');

  // Hidden native file input for direct upload
  const fileInputRef = useRef(null);

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

  // ── Global Floating Highlight Selection Bubble ──
  const [selectionToolbar, setSelectionToolbar] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: '',
    blockId: null,
    start: 0,
    end: 0,
  });

  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const trackMouse = (e) => {
      if (e.clientX > 0 && e.clientY > 0) {
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    window.addEventListener('mousemove', trackMouse, { passive: true });
    window.addEventListener('mouseup', trackMouse, { passive: true });
    return () => {
      window.removeEventListener('mousemove', trackMouse);
      window.removeEventListener('mouseup', trackMouse);
    };
  }, []);

  const handleTextSelection = (e, blockId) => {
    const target = e?.currentTarget || e?.target;
    if (!target) return;
    let selectedText = '';
    let start = 0;
    let end = 0;
    let posX = 0;
    let posY = 0;

    if (typeof target.selectionStart === 'number' && target.selectionStart !== target.selectionEnd) {
      start = target.selectionStart;
      end = target.selectionEnd;
      selectedText = (target.value || '').substring(start, end).trim();

      const rect = target.getBoundingClientRect();
      const lastMouse = lastMousePosRef.current;
      if (lastMouse.x >= rect.left - 30 && lastMouse.x <= rect.right + 30 && lastMouse.y >= rect.top - 30 && lastMouse.y <= rect.bottom + 30) {
        posX = lastMouse.x;
        posY = lastMouse.y - 12;
      } else {
        try {
          const midPos = Math.floor((start + end) / 2);
          const mirror = document.createElement('div');
          const style = window.getComputedStyle(target);
          mirror.style.position = 'absolute';
          mirror.style.visibility = 'hidden';
          mirror.style.whiteSpace = 'pre-wrap';
          mirror.style.wordBreak = 'break-word';
          mirror.style.width = `${target.clientWidth}px`;
          mirror.style.font = style.font;
          mirror.style.fontSize = style.fontSize;
          mirror.style.fontFamily = style.fontFamily;
          mirror.style.lineHeight = style.lineHeight;
          mirror.style.padding = style.padding;
          mirror.textContent = target.value.substring(0, midPos);
          const marker = document.createElement('span');
          marker.textContent = target.value.substring(midPos, midPos + 1) || '|';
          mirror.appendChild(marker);
          document.body.appendChild(mirror);

          const mRect = marker.getBoundingClientRect();
          const tRect = target.getBoundingClientRect();
          posX = tRect.left + marker.offsetLeft - (target.scrollLeft || 0);
          posY = tRect.top + marker.offsetTop - (target.scrollTop || 0) - 10;
          document.body.removeChild(mirror);
        } catch (err) {
          posX = rect.left + rect.width / 2;
          posY = rect.top - 12;
        }
      }
    } else {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && sel.rangeCount > 0) {
        selectedText = sel.toString().trim();
        try {
          const range = sel.getRangeAt(0);
          const rRect = range.getBoundingClientRect();
          posX = rRect.left + rRect.width / 2;
          posY = rRect.top - 10;
        } catch (err) {}
      }
    }

    if (selectedText.length > 0) {
      setSelectionToolbar({
        visible: true,
        x: Math.max(120, Math.min(window.innerWidth - 120, posX)),
        y: Math.max(50, posY),
        text: selectedText,
        blockId: blockId || activeBlockId || blocks[0]?.id,
        start,
        end,
      });
    } else {
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) {
          setSelectionToolbar(prev => ({ ...prev, visible: false }));
        }
      }, 120);
    }
  };

  useEffect(() => {
    const handleGlobalMouseDown = (e) => {
      if (e.target.closest('#floating-selection-bubble')) return;
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) {
          const activeEl = document.activeElement;
          if (!activeEl || (typeof activeEl.selectionStart === 'number' && activeEl.selectionStart === activeEl.selectionEnd)) {
            setSelectionToolbar(prev => ({ ...prev, visible: false }));
          }
        }
      }, 120);
    };

    document.addEventListener('mousedown', handleGlobalMouseDown);
    return () => document.removeEventListener('mousedown', handleGlobalMouseDown);
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
      const currentBlock = blocks.find(b => b.id === targetBlockId);
      if (currentBlock && !currentBlock.content?.trim()) {
        updateBlock(targetBlockId, { type: 'image', url: '', caption: '', alt: '', decorative: false });
        setActiveBlockId(targetBlockId);
      } else {
        addBlock('image', targetBlockId, { id: newId, url: '', caption: '', alt: '', decorative: false });
      }
      setSidebarTab('block');
      return;
    }

    if (blockTypeConfig.type === 'heading') {
      const currentBlock = blocks.find(b => b.id === targetBlockId);
      if (currentBlock && !currentBlock.content?.trim()) {
        updateBlock(targetBlockId, { type: 'heading', level: blockTypeConfig.level || 2, content: '' });
      } else {
        addBlock('heading', targetBlockId, { level: blockTypeConfig.level || 2 });
      }
      return;
    }

    if (blockTypeConfig.type === 'list') {
      const currentBlock = blocks.find(b => b.id === targetBlockId);
      if (currentBlock && !currentBlock.content?.trim()) {
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

    if (type === 'image') {
      const followUpParagraph = {
        id: `b-${Date.now() + 1}-${Math.random().toString(36).substr(2, 4)}`,
        type: 'paragraph',
        content: '',
        fontSize: 'M'
      };
      if (insertAfterId) {
        const idx = blocks.findIndex(b => b.id === insertAfterId);
        if (idx !== -1) {
          const copy = [...blocks];
          copy.splice(idx + 1, 0, newBlock, followUpParagraph);
          setBlocks(copy);
        } else {
          setBlocks(prev => [...prev, newBlock, followUpParagraph]);
        }
      } else {
        setBlocks(prev => [...prev, newBlock, followUpParagraph]);
      }
      setActiveBlockId(newBlock.id);
      setShowTopBlockInserter(false);
      return;
    }

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
      updateBlock(id, { content: '', type: 'paragraph', url: '', caption: '', alt: '' });
      return;
    }
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const handleFormatSelection = (blockId, formatType) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;

    const textarea = document.getElementById(`block-input-${blockId}`);
    let selected = '';
    let start = 0;
    let end = 0;

    if (textarea && typeof textarea.selectionStart === 'number' && textarea.selectionStart !== textarea.selectionEnd) {
      start = textarea.selectionStart;
      end = textarea.selectionEnd;
      selected = (textarea.value || '').substring(start, end);
    }

    if (!selected) {
      const winSel = window.getSelection();
      if (winSel && winSel.toString().trim()) {
        selected = winSel.toString().trim();
      }
    }

    const currentContent = block.content || '';

    if (formatType === 'bold') {
      const isBold = selected.startsWith('<b>') || selected.startsWith('<strong>');
      const clean = selected.replace(/<\/?(b|strong)>/gi, '');
      const replacement = isBold ? clean : `<b>${clean || 'bold text'}</b>`;
      let updated = '';
      if (selected && currentContent.includes(selected)) {
        updated = currentContent.replace(selected, replacement);
      } else if (start !== end) {
        updated = currentContent.substring(0, start) + replacement + currentContent.substring(end);
      } else {
        updated = currentContent ? `${currentContent} ${replacement}` : replacement;
      }
      updateBlock(blockId, { content: updated });
    } else if (formatType === 'italic') {
      const isItalic = selected.startsWith('<i>') || selected.startsWith('<em>');
      const clean = selected.replace(/<\/?(i|em)>/gi, '');
      const replacement = isItalic ? clean : `<i>${clean || 'italic text'}</i>`;
      let updated = '';
      if (selected && currentContent.includes(selected)) {
        updated = currentContent.replace(selected, replacement);
      } else if (start !== end) {
        updated = currentContent.substring(0, start) + replacement + currentContent.substring(end);
      } else {
        updated = currentContent ? `${currentContent} ${replacement}` : replacement;
      }
      updateBlock(blockId, { content: updated });
    } else if (formatType === 'link') {
      setLinkModalData({
        open: true,
        blockId,
        selectedText: selected || '',
        url: '',
        newTab: true,
        start,
        end,
      });
    } else if (formatType === 'color') {
      const color = prompt('Enter text hex color (e.g. #2271b1):', '#2271b1');
      if (color) {
        const replacement = `<span style="color: ${color}">${selected || 'colored text'}</span>`;
        let updated = '';
        if (selected && currentContent.includes(selected)) {
          updated = currentContent.replace(selected, replacement);
        } else if (start !== end) {
          updated = currentContent.substring(0, start) + replacement + currentContent.substring(end);
        } else {
          updated = currentContent ? `${currentContent} ${replacement}` : replacement;
        }
        updateBlock(blockId, { content: updated });
      }
    }
  };

  const handleApplyLink = () => {
    if (!linkModalData.blockId || !linkModalData.url.trim()) {
      setLinkModalData({ open: false, blockId: null, selectedText: '', url: '', newTab: true, start: 0, end: 0 });
      return;
    }
    const block = blocks.find(b => b.id === linkModalData.blockId);
    if (!block) return;

    const currentContent = block.content || '';
    let url = linkModalData.url.trim();
    if (!/^https?:\/\//i.test(url) && !url.startsWith('/') && !url.startsWith('#')) {
      url = `https://${url}`;
    }

    const displayText = linkModalData.selectedText.trim() || url;
    const targetAttr = linkModalData.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    const linkStyle = 'color: #2271b1 !important; text-decoration: underline !important; text-decoration-color: rgba(34, 113, 177, 0.45) !important; text-underline-offset: 3px !important; cursor: pointer !important; font-weight: 500 !important;';
    const linkHtml = `<a href="${url}"${targetAttr} style="${linkStyle}" class="wp-attached-link" contenteditable="false">${displayText}</a>`;

    let newContent = '';
    if (linkModalData.selectedText && currentContent.includes(linkModalData.selectedText)) {
      newContent = currentContent.replace(linkModalData.selectedText, linkHtml);
    } else if (linkModalData.start !== undefined && linkModalData.end !== undefined && linkModalData.start !== linkModalData.end) {
      newContent = currentContent.substring(0, linkModalData.start) + linkHtml + currentContent.substring(linkModalData.end);
    } else {
      newContent = currentContent ? `${currentContent} ${linkHtml}` : linkHtml;
    }

    updateBlock(linkModalData.blockId, { content: newContent });
    setLinkModalData({ open: false, blockId: null, selectedText: '', url: '', newTab: true, start: 0, end: 0 });
    setToast('Link attached successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  const extractLinksFromContent = (content) => {
    if (!content) return [];
    const links = [];
    const regex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      links.push({ url: match[1], text: match[2].replace(/<[^>]+>/g, '') });
    }
    return links;
  };

  const handleRemoveLink = (blockId, url) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;
    const regex = new RegExp(`<a[^>]*href=["']${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>(.*?)<\\/a>`, 'gi');
    const cleaned = (block.content || '').replace(regex, '$1');
    updateBlock(blockId, { content: cleaned });
    setToast('Link removed');
    setTimeout(() => setToast(''), 2000);
  };

  const focusNextParagraph = (afterBlockId) => {
    setTimeout(() => {
      setBlocks(currentBlocks => {
        let nextBlock = null;
        if (afterBlockId) {
          const idx = currentBlocks.findIndex(b => b.id === afterBlockId);
          if (idx !== -1 && idx + 1 < currentBlocks.length && currentBlocks[idx + 1].type === 'paragraph') {
            nextBlock = currentBlocks[idx + 1];
          }
        }
        if (!nextBlock) {
          nextBlock = currentBlocks.find(b => b.type === 'paragraph');
        }
        if (nextBlock) {
          setActiveBlockId(nextBlock.id);
          setTimeout(() => {
            const el = document.getElementById(`block-input-${nextBlock.id}`);
            if (el) {
              el.focus();
              if (el.setSelectionRange) {
                el.setSelectionRange(el.value.length, el.value.length);
              }
            }
          }, 50);
        }
        return currentBlocks;
      });
    }, 100);
  };

  const handleNativeFileUpload = (e, blockId) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const base64 = loadEvt.target?.result;
      updateBlock(blockId, { url: base64, alt: file.name.replace(/\.[^/.]+$/, '') });
      focusNextParagraph(blockId);
    };
    reader.readAsDataURL(file);
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
      focusNextParagraph(mediaTarget.id);
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

  const activeBlock = blocks.find(b => b.id === activeBlockId) || blocks[0];

  const wpBg = darkMode ? '#121212' : '#ffffff';
  const wpHeaderBg = darkMode ? '#18181b' : '#ffffff';
  const wpBorder = darkMode ? '#27272a' : '#e0e0e0';
  const wpText = darkMode ? '#f4f4f5' : '#000000';
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

        {/* Center: Document Title Capsule (Editable & Synced) */}
        <div className="hidden md:flex items-center">
          <div
            className="px-4 py-1 rounded text-xs font-medium border flex items-center justify-center"
            style={{
              background: darkMode ? '#27272a' : '#f0f0f1',
              borderColor: darkMode ? '#3f3f46' : '#dcdcde',
              minWidth: '240px',
              maxWidth: '380px',
            }}
          >
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="No title - Post"
              className="w-full bg-transparent border-none outline-none text-center text-xs font-semibold text-black dark:text-white placeholder-[#757575]"
            />
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

        {/* Hidden Native File Input for Instant Uploads */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (activeBlockId) handleNativeFileUpload(e, activeBlockId);
          }}
        />

        {/* ── WRITING CANVAS (Center Document) ── */}
        <main className="wp-editor-canvas flex-1 overflow-y-auto px-6 py-14 flex justify-center custom-scrollbar">
          <div className="w-full max-w-[840px]">

            {/* Document H1 Title (Exact match Gutenberg 'Add title') */}
            <div className="mb-8">
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Add title"
                className="w-full text-4xl sm:text-5xl font-bold tracking-tight border-none outline-none bg-transparent placeholder-[#757575] leading-tight"
                style={{
                  color: darkMode ? '#ffffff' : '#000000',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
                }}
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
                    data-block-id={block.id}
                    className="relative group border-none bg-transparent outline-none ring-0 shadow-none"
                    onClick={() => {
                      setActiveBlockId(block.id);
                    }}
                  >
                    {/* Floating Toolbar for IMAGE block (matching screenshot) */}
                    {isActive && block.type === 'image' && (
                      <div
                        className="absolute -top-11 left-0 z-30 flex items-center gap-1.5 px-2 py-1 rounded shadow-lg border text-xs select-none bg-white dark:bg-zinc-900 animate-fade-in"
                        style={{ borderColor: wpBorder }}
                      >
                        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300">
                          <ImageIcon size={14} />
                        </button>
                        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300">
                          <AlignLeft size={14} />
                        </button>
                        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 font-serif font-bold text-xs">
                          A
                        </button>
                        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300">
                          <LinkIcon size={13} />
                        </button>
                        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold text-xs border border-gray-300 px-1 rounded-sm">
                          [A]
                        </button>
                        <button
                          onClick={() => {
                            setMediaTarget({ type: 'block', id: block.id });
                            setShowMediaPicker(true);
                          }}
                          className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-800 dark:text-gray-200 font-medium text-xs border"
                          style={{ borderColor: wpBorder }}
                        >
                          Add image
                        </button>
                        <button
                          onClick={() => deleteBlock(block.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-red-500"
                        >
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    )}

                    {/* ─────────────────────────────────────────────────────────────
                        BLOCK RENDERER: PARAGRAPH (Clean Inline Live Rich Text & Links)
                    ───────────────────────────────────────────────────────────── */}
                    {block.type === 'paragraph' && (() => {
                      const isRichHtml = /<[a-z][\s\S]*>/i.test(block.content || '');

                      return (
                        <div className="py-1">
                          <div className="relative flex items-center justify-between">
                            {isRichHtml ? (
                              <div
                                id={`block-input-${block.id}`}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={(e) => updateBlock(block.id, { content: e.currentTarget.innerHTML })}
                                onSelect={(e) => handleTextSelection(e, block.id)}
                                onMouseUp={(e) => handleTextSelection(e, block.id)}
                                onKeyUp={(e) => handleTextSelection(e, block.id)}
                                onBlur={(e) => updateBlock(block.id, { content: e.currentTarget.innerHTML })}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    addBlock('paragraph', block.id);
                                  }
                                }}
                                onClick={(e) => {
                                  const anchor = e.target.closest('a');
                                  if (anchor) {
                                    const href = anchor.getAttribute('href');
                                    if (href) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      window.open(href, '_blank', 'noopener,noreferrer');
                                    }
                                  }
                                }}
                                dangerouslySetInnerHTML={{ __html: block.content }}
                                className="w-full min-h-[32px] text-lg text-black outline-none leading-relaxed bg-transparent border-none"
                                style={{
                                  color: block.textColor || '#000000',
                                  fontSize: block.fontSize === 'S' ? '14px' : block.fontSize === 'L' ? '20px' : block.fontSize === 'XL' ? '24px' : '18px',
                                  background: block.bg || 'transparent'
                                }}
                              />
                            ) : (
                              <textarea
                                id={`block-input-${block.id}`}
                                value={block.content || ''}
                                onChange={(e) => {
                                  updateBlock(block.id, { content: e.target.value });
                                  e.target.style.height = 'auto';
                                  e.target.style.height = `${Math.max(32, e.target.scrollHeight)}px`;
                                }}
                                onSelect={(e) => handleTextSelection(e, block.id)}
                                onMouseUp={(e) => handleTextSelection(e, block.id)}
                                onKeyUp={(e) => handleTextSelection(e, block.id)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    addBlock('paragraph', block.id);
                                  } else if (e.key === 'Backspace' && !block.content && blocks.length > 1) {
                                    e.preventDefault();
                                    deleteBlock(block.id);
                                  }
                                }}
                                placeholder="Type / to choose a block"
                                rows={1}
                                className="w-full min-h-[32px] text-lg text-black outline-none leading-relaxed placeholder-[#757575] bg-transparent border-none resize-none overflow-hidden"
                                style={{
                                  color: block.textColor || '#000000',
                                  fontSize: block.fontSize === 'S' ? '14px' : block.fontSize === 'L' ? '20px' : block.fontSize === 'XL' ? '24px' : '18px',
                                  background: block.bg || 'transparent'
                                }}
                              />
                            )}

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
                                    className="w-full bg-transparent border-none outline-none text-xs text-black dark:text-white placeholder-gray-400"
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
                    </div>
                  );
                })()}

                    {/* ─────────────────────────────────────────────────────────────
                        BLOCK RENDERER: IMAGE (Exact 1-to-1 Match to Screenshot)
                    ───────────────────────────────────────────────────────────── */}
                    {block.type === 'image' && (
                      <div className="py-2">
                        {block.url ? (
                          <div className="relative group/img rounded border overflow-hidden" style={{ borderColor: wpBorder }}>
                            <img src={block.url} alt={block.alt || ''} className="w-full h-auto max-h-[500px] object-cover" />
                            <div className="p-2 bg-gray-50 dark:bg-zinc-900 border-t" style={{ borderColor: wpBorder }}>
                              <input
                                type="text"
                                value={block.caption || ''}
                                onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addBlock('paragraph', block.id);
                                  }
                                }}
                                placeholder="Add caption... (press Enter to write underneath)"
                                className="w-full text-center text-xs text-gray-600 dark:text-gray-400 italic bg-transparent border-none outline-none"
                              />
                            </div>
                          </div>
                        ) : (
                          /* Exact Gutenberg Image Placeholder Box from Screenshot */
                          <div
                            className="border rounded p-6 bg-white dark:bg-zinc-900 select-none shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                            style={{ borderColor: '#949494' }}
                          >
                            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-gray-100 mb-1">
                              <ImageIcon size={18} className="text-gray-700 dark:text-gray-300" />
                              <span>Image</span>
                            </div>
                            <p className="text-xs text-[#757575] mb-5">
                              Drag and drop an image, upload, or choose from your library.
                            </p>

                            <div className="flex flex-wrap items-center gap-3">
                              {/* 1. Upload Button (Solid Blue) */}
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 rounded text-xs font-semibold text-white shadow-sm hover:brightness-105 transition cursor-pointer"
                                style={{ background: wpBlue }}
                              >
                                Upload
                              </button>

                              {/* 2. Media Library Button (Outlined Blue) */}
                              <button
                                onClick={() => {
                                  setMediaTarget({ type: 'block', id: block.id });
                                  setShowMediaPicker(true);
                                }}
                                className="px-4 py-2 rounded text-xs font-semibold border transition hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer"
                                style={{ borderColor: wpBlue, color: wpBlue }}
                              >
                                Media Library
                              </button>

                              {/* 3. Insert from URL Button (Outlined Blue) */}
                              <button
                                onClick={() => {
                                  const url = prompt('Enter Image URL:');
                                  if (url) {
                                    updateBlock(block.id, { url, alt: 'Custom Image' });
                                    focusNextParagraph(block.id);
                                  }
                                }}
                                className="px-4 py-2 rounded text-xs font-semibold border transition hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer"
                                style={{ borderColor: wpBlue, color: wpBlue }}
                              >
                                Insert from URL
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* BLOCK RENDERER: HEADING */}
                    {block.type === 'heading' && (
                      <div className="flex items-center gap-2 py-1">
                        <input
                          id={`block-input-${block.id}`}
                          type="text"
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                          onSelect={(e) => handleTextSelection(e, block.id)}
                          onMouseUp={(e) => handleTextSelection(e, block.id)}
                          onKeyUp={(e) => handleTextSelection(e, block.id)}
                          placeholder="Heading text..."
                          className="w-full text-3xl font-bold tracking-tight border-none outline-none bg-transparent placeholder-[#757575] text-black dark:text-white"
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

                    {/* BLOCK RENDERER: QUOTE */}
                    {block.type === 'quote' && (
                      <div className="border-l-4 border-black dark:border-white pl-4 py-1">
                        <textarea
                          id={`block-input-${block.id}`}
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                          onSelect={(e) => handleTextSelection(e, block.id)}
                          onMouseUp={(e) => handleTextSelection(e, block.id)}
                          onKeyUp={(e) => handleTextSelection(e, block.id)}
                          placeholder="Quote text..."
                          className="w-full text-xl italic font-serif bg-transparent border-none outline-none resize-none text-black dark:text-white"
                          rows={2}
                        />
                      </div>
                    )}

                    {/* BLOCK RENDERER: LIST */}
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
                              className="w-full text-base bg-transparent border-none outline-none text-black dark:text-white"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* BLOCK RENDERER: CODE */}
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
            4. RIGHT SIDEBAR (Both POST and BLOCK clearly visible)
        ───────────────────────────────────────────────────────────── */}
        {sidebarOpen && (
          <aside
            className="w-80 border-l flex flex-col h-full overflow-y-auto select-none custom-scrollbar"
            style={{ background: wpHeaderBg, borderColor: wpBorder }}
          >
            {/* Sidebar Top Tab Switcher (Both Post and Block headers permanently in solid black) */}
            <div className="flex items-center justify-between border-b px-2 sticky top-0 z-20" style={{ background: wpHeaderBg, borderColor: wpBorder }}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSidebarTab('post')}
                  className={`px-4 py-3 text-[13px] font-bold tracking-wide transition border-b-2 ${
                    sidebarTab === 'post'
                      ? 'border-black text-black'
                      : 'border-transparent text-black opacity-80 hover:opacity-100'
                  }`}
                  style={{ color: '#000000' }}
                >
                  Post
                </button>
                <button
                  onClick={() => setSidebarTab('block')}
                  className={`px-4 py-3 text-[13px] font-bold tracking-wide transition border-b-2 ${
                    sidebarTab === 'block'
                      ? 'border-black text-black'
                      : 'border-transparent text-black opacity-80 hover:opacity-100'
                  }`}
                  style={{ color: '#000000' }}
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

            {/* TAB CONTENT: POST (All text in solid black) */}
            {sidebarTab === 'post' && (
              <div className="p-4 space-y-5 text-xs text-black" style={{ color: '#000000' }}>

                {/* 1. Post Header Summary Item (Feather Icon + Title + ⋮) */}
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: wpBorder }}>
                  <div className="flex items-center gap-2">
                    <Feather size={16} className="text-black" style={{ color: '#000000' }} />
                    <span className="font-bold text-sm truncate max-w-[190px] text-black" style={{ color: '#000000' }}>
                      {title.trim() || 'No title'}
                    </span>
                  </div>
                  <button className="text-black hover:opacity-70" style={{ color: '#000000' }}>
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
                          className="px-2.5 py-1 rounded bg-white text-black font-bold text-[11px] shadow"
                          style={{ color: '#000000' }}
                        >
                          Replace
                        </button>
                        <button
                          onClick={() => setFeaturedImage('')}
                          className="px-2.5 py-1 rounded bg-red-600 text-white font-bold text-[11px] shadow"
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
                      className="w-full py-2.5 px-4 border rounded font-bold text-black hover:border-black transition flex items-center justify-center gap-2 text-xs"
                      style={{ borderColor: wpBorder, color: '#000000' }}
                    >
                      Set featured image
                    </button>
                  )}
                </div>

                {/* 3. Elementor AI Helper Link */}
                <div className="flex items-center gap-1.5 text-[#a020f0] hover:text-purple-700 cursor-pointer font-bold text-xs">
                  <Sparkles size={14} />
                  <span onClick={() => setElementorAiOpen(true)}>Generate with Elementor AI</span>
                </div>

                {/* 4. Excerpt Link */}
                <div>
                  <button
                    onClick={() => setShowExcerptField(!showExcerptField)}
                    className="text-[#2271b1] hover:underline font-bold cursor-pointer"
                  >
                    {excerpt ? 'Edit excerpt...' : 'Add an excerpt...'}
                  </button>
                  {showExcerptField && (
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Write a short summary or excerpt..."
                      rows={3}
                      className="w-full mt-2 p-2 rounded border outline-none text-xs bg-transparent text-black font-medium"
                      style={{ borderColor: wpBorder, color: '#000000' }}
                    />
                  )}
                </div>

                {/* 5. Last edited timestamp */}
                <div className="text-[11px] text-black font-medium" style={{ color: '#000000' }}>
                  Last edited 15 minutes ago.
                </div>

                {/* 6. Post Status Details Grid */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-black font-semibold" style={{ color: '#000000' }}>Status</span>
                    <div className="relative">
                      <button
                        onClick={() => setShowStatusPicker(!showStatusPicker)}
                        className="text-[#2271b1] font-bold hover:underline flex items-center gap-1.5"
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
                              className="px-2.5 py-1.5 rounded hover:bg-blue-50 cursor-pointer font-bold text-black"
                              style={{ color: '#000000' }}
                            >
                              {st}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-black font-semibold" style={{ color: '#000000' }}>Publish</span>
                    <span className="text-[#2271b1] font-bold cursor-pointer hover:underline">{publishDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-black font-semibold" style={{ color: '#000000' }}>Slug</span>
                    {showSlugEdit ? (
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        onBlur={() => setShowSlugEdit(false)}
                        autoFocus
                        className="border rounded px-1.5 py-0.5 text-xs outline-none max-w-[140px] text-black font-bold"
                        style={{ borderColor: wpBorder, color: '#000000' }}
                      />
                    ) : (
                      <span
                        onClick={() => setShowSlugEdit(true)}
                        className="text-[#2271b1] font-bold cursor-pointer hover:underline truncate max-w-[140px]"
                      >
                        {slug || '3993'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-black font-semibold" style={{ color: '#000000' }}>Author</span>
                    <div className="relative">
                      <button
                        onClick={() => setShowAuthorPicker(!showAuthorPicker)}
                        className="text-[#2271b1] font-bold hover:underline"
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
                              className="px-2.5 py-1.5 rounded hover:bg-blue-50 cursor-pointer font-bold text-black"
                              style={{ color: '#000000' }}
                            >
                              {aut}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-black font-semibold" style={{ color: '#000000' }}>Template</span>
                    <span className="text-[#2271b1] font-bold cursor-pointer hover:underline">{template}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-black font-semibold" style={{ color: '#000000' }}>Discussion</span>
                    <span className="text-[#2271b1] font-bold cursor-pointer hover:underline">{discussion}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-black font-semibold" style={{ color: '#000000' }}>Format</span>
                    <span className="text-[#2271b1] font-bold cursor-pointer hover:underline">{format}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setLockModifiedDate(!lockModifiedDate)}
                        className={`w-7 h-4 rounded-full transition relative ${
                          lockModifiedDate ? 'bg-[#2271b1]' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition ${
                            lockModifiedDate ? 'left-3.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                      <span className="text-black font-semibold text-xs" style={{ color: '#000000' }}>Lock Modified Date</span>
                    </div>
                  </div>
                </div>

                {/* 7. Accordion: TRX Addons AI Helper */}
                <div className="border-t pt-3" style={{ borderColor: wpBorder }}>
                  <button
                    onClick={() => setActiveAccordion(prev => ({ ...prev, trx: !prev.trx }))}
                    className="w-full flex items-center justify-between font-bold text-black"
                    style={{ color: '#000000' }}
                  >
                    <span>TRX Addons AI Helper</span>
                    {activeAccordion.trx ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {activeAccordion.trx && (
                    <div className="mt-2.5 p-2.5 rounded border space-y-2" style={{ borderColor: wpBorder }}>
                      <p className="text-[11px] text-black font-medium" style={{ color: '#000000' }}>Generate executive copywriting and summary with AI assistance.</p>
                      <button
                        onClick={() => {
                          setExcerpt(`An executive overview of ${title || 'modern brand identity'} analyzing market trajectory and design methodology.`);
                          setToast('AI Excerpt Generated!');
                          setTimeout(() => setToast(''), 3000);
                        }}
                        className="w-full py-1.5 rounded text-xs font-bold text-white"
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
                    className="w-full flex items-center justify-between font-bold text-black"
                    style={{ color: '#000000' }}
                  >
                    <span>Categories</span>
                    {activeAccordion.categories ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {activeAccordion.categories && (
                    <div className="mt-2.5 space-y-2">
                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                        {categories.map(cat => (
                          <label key={cat} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-black" style={{ color: '#000000' }}>
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(cat)}
                              onChange={() => toggleCategory(cat)}
                              className="rounded text-blue-600 focus:ring-0"
                            />
                            <span style={{ color: '#000000' }}>{cat}</span>
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
                            className="p-1.5 text-xs rounded border outline-none bg-transparent font-medium text-black"
                            style={{ borderColor: wpBorder, color: '#000000' }}
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleAddCategory}
                              className="px-3 py-1 rounded bg-blue-600 text-white font-bold text-xs"
                            >
                              Add Category
                            </button>
                            <button
                              onClick={() => setShowAddCat(false)}
                              className="text-xs text-black font-bold hover:underline"
                              style={{ color: '#000000' }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowAddCat(true)}
                          className="text-xs text-[#2271b1] hover:underline font-bold"
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
                    className="w-full flex items-center justify-between font-bold text-black"
                    style={{ color: '#000000' }}
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
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-gray-200 text-black font-semibold"
                            style={{ color: '#000000' }}
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
                        className="w-full p-2 text-xs rounded border outline-none bg-transparent font-medium text-black"
                        style={{ borderColor: wpBorder, color: '#000000' }}
                      />
                      <p className="text-[10px] text-black font-medium" style={{ color: '#000000' }}>Separate with commas or the Enter key.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ─────────────────────────────────────────────────────────────
                TAB CONTENT: BLOCK (Image view - all text in solid black)
            ───────────────────────────────────────────────────────────── */}
            {sidebarTab === 'block' && activeBlock.type === 'image' && (
              <div className="p-4 space-y-5 text-xs text-black" style={{ color: '#000000' }}>
                {/* 1. Header: Image */}
                <div className="space-y-1 pb-3 border-b" style={{ borderColor: wpBorder }}>
                  <div className="flex items-center gap-2 font-bold text-sm text-black" style={{ color: '#000000' }}>
                    <ImageIcon size={16} />
                    <span>Image</span>
                  </div>
                  <p className="text-[11px] text-black font-medium" style={{ color: '#000000' }}>
                    Insert an image to make a visual statement.
                  </p>
                </div>

                {/* 2. Sub-Tabs */}
                <div className="flex items-center justify-around border-b pb-2 pt-1 text-black" style={{ borderColor: wpBorder }}>
                  <button
                    onClick={() => setImageSubTab('styles')}
                    className={`p-1.5 rounded transition ${imageSubTab === 'styles' ? 'text-black font-bold' : 'hover:opacity-70'}`}
                    style={{ color: '#000000' }}
                  >
                    <Layers size={16} />
                  </button>
                  <button
                    onClick={() => setImageSubTab('settings')}
                    className={`p-1.5 rounded transition ${imageSubTab === 'settings' ? 'text-black font-bold' : 'hover:opacity-70'}`}
                    style={{ color: '#000000' }}
                  >
                    <Settings size={16} />
                  </button>
                  <button
                    onClick={() => setImageSubTab('duotone')}
                    className={`p-1.5 rounded transition ${imageSubTab === 'duotone' ? 'text-black font-bold' : 'hover:opacity-70'}`}
                    style={{ color: '#000000' }}
                  >
                    <Crop size={16} />
                  </button>
                </div>

                {/* 3. Media Section */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-black" style={{ color: '#000000' }}>Media</span>
                    <button className="text-black hover:opacity-70" style={{ color: '#000000' }}>
                      <MoreVertical size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setMediaTarget({ type: 'block', id: activeBlock.id });
                      setShowMediaPicker(true);
                    }}
                    className="w-full py-2 px-3 border rounded flex items-center gap-2.5 text-xs text-black font-bold hover:border-black transition cursor-pointer"
                    style={{ borderColor: wpBorder, color: '#000000' }}
                  >
                    <span className="w-4 h-4 rounded border border-black flex items-center justify-center relative overflow-hidden bg-white">
                      <span className="w-full h-px bg-red-400 -rotate-45 absolute" />
                    </span>
                    <span>Add image</span>
                  </button>
                </div>

                {/* 4. Alternative Text Section */}
                <div className="space-y-2 pt-2 border-t" style={{ borderColor: wpBorder }}>
                  <div className="text-[11px] font-bold tracking-wider text-black" style={{ color: '#000000' }}>
                    ALTERNATIVE TEXT
                  </div>
                  <textarea
                    value={activeBlock.alt || ''}
                    onChange={(e) => updateBlock(activeBlock.id, { alt: e.target.value })}
                    rows={4}
                    className="w-full p-2.5 rounded border text-xs outline-none bg-transparent resize-y text-black font-medium"
                    style={{ borderColor: wpBorder, color: '#000000' }}
                  />
                  <div>
                    <a href="#alt-help" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#2271b1] hover:underline flex items-center gap-1 font-bold">
                      <span>Describe the purpose of the image.</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  <label className="flex items-center gap-2 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeBlock.decorative || false}
                      onChange={(e) => updateBlock(activeBlock.id, { decorative: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                    <span className="text-xs text-black font-bold" style={{ color: '#000000' }}>Mark as decorative</span>
                  </label>
                  <p className="text-[10px] text-black font-medium" style={{ color: '#000000' }}>
                    Hidden from assistive technologies.
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: BLOCK (Paragraph View - all text in solid black) */}
            {sidebarTab === 'block' && activeBlock.type !== 'image' && (
              <div className="p-4 space-y-5 text-xs text-black" style={{ color: '#000000' }}>

                {/* 1. Block Header */}
                <div className="space-y-1.5 pb-3 border-b" style={{ borderColor: wpBorder }}>
                  <div className="flex items-center gap-2 font-bold text-sm text-black" style={{ color: '#000000' }}>
                    <span className="font-serif text-base font-bold">¶</span>
                    <span>Paragraph</span>
                  </div>
                  <p className="text-[11px] text-black font-medium leading-relaxed" style={{ color: '#000000' }}>
                    Start with the basic building block of all narrative.
                  </p>
                  <div className="pt-1">
                    <button
                      onClick={() => setElementorAiOpen(true)}
                      className="flex items-center gap-1.5 text-[#a020f0] hover:text-purple-700 font-bold text-xs cursor-pointer"
                    >
                      <Sparkles size={13} />
                      <span>Generate with Elementor AI</span>
                    </button>
                  </div>
                </div>

                {/* 2. Typography Card */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-black" style={{ color: '#000000' }}>Typography</span>
                    <button className="text-black hover:opacity-70" style={{ color: '#000000' }}>
                      <MoreVertical size={14} />
                    </button>
                  </div>

                  {/* Color selector button */}
                  <button
                    onClick={() => {
                      const color = prompt('Enter text hex color (e.g. #000000):', '#000000');
                      if (color) updateBlock(activeBlockId, { textColor: color });
                    }}
                    className="w-full py-2 px-3 border rounded flex items-center gap-2.5 text-xs text-black font-bold hover:border-black transition cursor-pointer"
                    style={{ borderColor: wpBorder, color: '#000000' }}
                  >
                    <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center relative overflow-hidden bg-white">
                      <span className="w-full h-px bg-red-400 -rotate-45 absolute" />
                    </span>
                    <span>Color</span>
                  </button>

                  {/* Font Size header + toggle */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-black" style={{ color: '#000000' }}>
                      <span>FONT SIZE</span>
                      <button title="Reset size" className="hover:opacity-70" style={{ color: '#000000' }}>
                        <span className="text-xs">⇄</span>
                      </button>
                    </div>

                    {/* S | M | L | XL Segmented Buttons */}
                    <div className="grid grid-cols-4 border rounded overflow-hidden text-center text-xs font-bold" style={{ borderColor: wpBorder }}>
                      {['S', 'M', 'L', 'XL'].map((sizeKey) => {
                        const currentSize = activeBlock.fontSize || 'M';
                        const isSelected = currentSize === sizeKey;

                        return (
                          <button
                            key={sizeKey}
                            onClick={() => updateBlock(activeBlockId, { fontSize: sizeKey })}
                            className={`py-1.5 transition border-r last:border-r-0 font-bold ${
                              isSelected
                                ? 'bg-black text-white'
                                : 'hover:bg-gray-100 text-black'
                            }`}
                            style={{ borderColor: wpBorder, color: isSelected ? '#ffffff' : '#000000' }}
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
                    <span className="font-bold text-xs text-black" style={{ color: '#000000' }}>Background</span>
                    <button className="text-black hover:opacity-70" style={{ color: '#000000' }}>
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
                      className="w-full py-2 px-3 border rounded flex items-center gap-2.5 text-xs text-black font-bold hover:border-black transition cursor-pointer"
                      style={{ borderColor: wpBorder, color: '#000000' }}
                    >
                      <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center relative overflow-hidden bg-white">
                        <span className="w-full h-px bg-red-400 -rotate-45 absolute" />
                      </span>
                      <span>Color</span>
                    </button>

                    <button
                      onClick={() => updateBlock(activeBlockId, { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' })}
                      className="w-full py-2 px-3 border rounded flex items-center gap-2.5 text-xs text-black font-bold hover:border-black transition cursor-pointer"
                      style={{ borderColor: wpBorder, color: '#000000' }}
                    >
                      <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-blue-400 to-purple-500" />
                      <span>Gradient</span>
                    </button>
                  </div>
                </div>

                {/* 4. Collapsible Settings Items */}
                <div className="space-y-0 pt-2 border-t" style={{ borderColor: wpBorder }}>
                  <div className="py-2.5 border-b flex items-center justify-between text-xs font-bold text-black cursor-pointer hover:text-blue-600 transition" style={{ borderColor: wpBorder, color: '#000000' }}>
                    <span>Dimensions</span>
                    <Plus size={14} className="text-black" style={{ color: '#000000' }} />
                  </div>

                  <div className="py-2.5 border-b flex items-center justify-between text-xs font-bold text-black cursor-pointer hover:text-blue-600 transition" style={{ borderColor: wpBorder, color: '#000000' }}>
                    <span>Border</span>
                    <Plus size={14} className="text-black" style={{ color: '#000000' }} />
                  </div>

                  <div className="py-2.5 border-b flex items-center justify-between text-xs font-bold text-black cursor-pointer hover:text-blue-600 transition" style={{ borderColor: wpBorder, color: '#000000' }}>
                    <span>Elements</span>
                    <Plus size={14} className="text-black" style={{ color: '#000000' }} />
                  </div>

                  <div className="py-2.5 flex items-center justify-between text-xs font-bold text-black cursor-pointer hover:text-blue-600 transition" style={{ color: '#000000' }}>
                    <span>Advanced</span>
                    <ChevronDown size={14} className="text-black" style={{ color: '#000000' }} />
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
          5. BOTTOM STATUS BAR (Dynamic: Post › Paragraph / Post › Image)
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
            <span className="text-gray-800 dark:text-gray-200 font-medium capitalize">
              {activeBlock.type === 'image' ? 'Image' : activeBlock.type === 'heading' ? `Heading ${activeBlock.level || 2}` : 'Paragraph'}
            </span>
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
                className="w-full p-3 rounded-lg border text-sm outline-none bg-transparent text-black dark:text-white"
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

      {/* Gutenberg Link Attachment Modal */}
      {linkModalData.open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-md w-full p-5 border border-zinc-200 dark:border-zinc-800 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-[#2271b1] font-bold text-sm">
                <LinkIcon size={16} />
                <span>Attach Link to Text</span>
              </div>
              <button
                onClick={() => setLinkModalData({ open: false, blockId: null, selectedText: '', url: '', newTab: true, start: 0, end: 0 })}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Text to Display
                </label>
                <input
                  type="text"
                  value={linkModalData.selectedText}
                  onChange={(e) => setLinkModalData(prev => ({ ...prev, selectedText: e.target.value }))}
                  placeholder="e.g. Identifine Smart Cards"
                  className="w-full p-2.5 rounded border text-xs outline-none bg-transparent border-gray-300 dark:border-zinc-700 text-black dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Destination URL
                </label>
                <input
                  type="text"
                  value={linkModalData.url}
                  onChange={(e) => setLinkModalData(prev => ({ ...prev, url: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleApplyLink();
                    }
                  }}
                  placeholder="https://example.com or /programs"
                  autoFocus
                  className="w-full p-2.5 rounded border text-xs outline-none bg-transparent border-[#2271b1] ring-1 ring-[#2271b1] text-black dark:text-white font-mono"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={linkModalData.newTab}
                  onChange={(e) => setLinkModalData(prev => ({ ...prev, newTab: e.target.checked }))}
                  className="rounded text-blue-600 focus:ring-0"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Open in new tab</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setLinkModalData({ open: false, blockId: null, selectedText: '', url: '', newTab: true, start: 0, end: 0 })}
                className="px-3.5 py-1.5 rounded text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyLink}
                className="px-4 py-1.5 rounded text-xs font-semibold text-white bg-[#2271b1] hover:brightness-105 shadow transition"
              >
                Attach Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          GLOBAL FLOATING SELECTION BUBBLE (Pops up directly over highlighted text)
      ───────────────────────────────────────────────────────────── */}
      {selectionToolbar.visible && selectionToolbar.text && (
        <div
          id="floating-selection-bubble"
          className="fixed z-50 flex items-center gap-1 px-2.5 py-1.5 rounded-lg shadow-2xl border text-xs select-none bg-[#1e1e1e] text-white animate-scale-in"
          style={{
            left: `${selectionToolbar.x}px`,
            top: `${selectionToolbar.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          {/* Bold */}
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              handleFormatSelection(selectionToolbar.blockId, 'bold');
              setSelectionToolbar(prev => ({ ...prev, visible: false }));
            }}
            title="Bold"
            className="p-1.5 rounded hover:bg-white/20 text-white font-bold transition"
          >
            <Bold size={14} />
          </button>

          {/* Italic */}
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              handleFormatSelection(selectionToolbar.blockId, 'italic');
              setSelectionToolbar(prev => ({ ...prev, visible: false }));
            }}
            title="Italic"
            className="p-1.5 rounded hover:bg-white/20 text-white transition"
          >
            <Italic size={14} />
          </button>

          {/* Link */}
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setLinkModalData({
                open: true,
                blockId: selectionToolbar.blockId,
                selectedText: selectionToolbar.text,
                url: '',
                newTab: true,
                start: 0,
                end: 0,
              });
              setSelectionToolbar(prev => ({ ...prev, visible: false }));
            }}
            title="Insert Link"
            className="p-1.5 rounded hover:bg-white/20 text-blue-400 font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <LinkIcon size={14} />
            <span className="text-[11px]">Link</span>
          </button>

          <div className="w-px h-4 bg-white/20 mx-0.5" />

          {/* Heading */}
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              updateBlock(selectionToolbar.blockId, { type: 'heading', level: 2 });
              setSelectionToolbar(prev => ({ ...prev, visible: false }));
            }}
            title="Convert block to Heading"
            className="px-1.5 py-1 rounded hover:bg-white/20 text-white font-bold text-xs transition"
          >
            H2
          </button>

          {/* Text Color */}
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              handleFormatSelection(selectionToolbar.blockId, 'color');
              setSelectionToolbar(prev => ({ ...prev, visible: false }));
            }}
            title="Text Color"
            className="p-1.5 rounded hover:bg-white/20 text-amber-400 font-bold font-serif text-xs transition"
          >
            A
          </button>

          {/* Downward Pointer Arrow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1e1e1e] rotate-45 border-r border-b border-zinc-700 pointer-events-none" />
        </div>
      )}

    </div>
  );
}
