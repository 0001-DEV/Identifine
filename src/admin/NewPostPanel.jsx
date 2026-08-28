import React, { useState, useEffect, useRef } from 'react';
import { analyzeSeo } from '../utils/seoAnalyzer';
import { getCustomArticles, saveCustomArticles } from '../pages/BlogAdminPage';
import { getGlobalSettings } from '../utils/roleManager';
import MediaPickerModal from './MediaPickerModal';

function slugify(title) {
  if (!title) return '';
  return title.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

const CATEGORIES = [
  'Smart Hardware',
  'Design Strategy',
  'Executive Strategy',
  'Personal Branding',
  'Security & Hardware',
  'Neuromarketing',
  'Uncategorized',
];

export default function NewPostPanel({ editArticle, onPublished, darkMode = false }) {
  const [editingId, setEditingId] = useState(null);

  // Core Post Attributes
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [category, setCategory] = useState('Uncategorized');
  const [tags, setTags] = useState('');
  const [readTime, setReadTime] = useState('3 min read');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('published');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  const [summary, setSummary] = useState('');
  
  // Rank Math & SEO
  const [focusKeyword, setFocusKeyword] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [activeRmTab, setActiveRmTab] = useState('general');

  // Gutenberg Blocks Array
  const [blocks, setBlocks] = useState([
    { id: 'b-1', type: 'paragraph', content: '' }
  ]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  // Gutenberg UI State
  const [showBlockInserter, setShowBlockInserter] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [rightSidebarTab, setRightSidebarTab] = useState('post'); // 'post' | 'block' | 'rankmath'
  const [blockSearch, setBlockSearch] = useState('');
  const [contextMenu, setContextMenu] = useState(null); // { x, y, blockId }
  
  // Media Picker state
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaTargetBlockId, setMediaTargetBlockId] = useState(null); // 'featured' or blockId

  const [toast, setToast] = useState('');

  useEffect(() => {
    if (editArticle && editArticle.id !== editingId) {
      setEditingId(editArticle.id);
      setTitle(editArticle.title || '');
      setSlug(editArticle.slug || '');
      setAutoSlug(false);
      setCategory(editArticle.category || 'Uncategorized');
      setTags(editArticle.tags || '');
      setReadTime(editArticle.readTime || '3 min read');
      setFeaturedImage(editArticle.image || '');
      setStatus(editArticle.status || 'published');
      setDate(editArticle.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
      setSummary(editArticle.summary || '');
      setFocusKeyword(editArticle.focusKeyword || '');
      setSeoTitle(editArticle.seoTitle || '');
      setMetaDesc(editArticle.metaDesc || '');

      // Load content as Gutenberg blocks
      if (editArticle.sections && editArticle.sections.length > 0) {
        const loadedBlocks = [];
        if (editArticle.intro) {
          loadedBlocks.push({ id: `b-intro`, type: 'paragraph', content: editArticle.intro });
        }
        editArticle.sections.forEach((sec, idx) => {
          if (sec.heading) loadedBlocks.push({ id: `b-h-${idx}`, type: 'heading', content: sec.heading, level: 'h2' });
          if (sec.body) loadedBlocks.push({ id: `b-p-${idx}`, type: 'paragraph', content: sec.body });
        });
        setBlocks(loadedBlocks.length > 0 ? loadedBlocks : [{ id: 'b-1', type: 'paragraph', content: '' }]);
      } else if (editArticle.intro) {
        setBlocks([{ id: 'b-1', type: 'paragraph', content: editArticle.intro }]);
      }
    }
  }, [editArticle?.id]);

  // Gutenberg Block Operations
  const addBlock = (type = 'paragraph', targetId = null, extraProps = {}) => {
    const newBlock = { id: `b-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, type, content: '', ...extraProps };
    if (targetId) {
      const idx = blocks.findIndex(b => b.id === targetId);
      const next = [...blocks];
      next.splice(idx + 1, 0, newBlock);
      setBlocks(next);
    } else {
      setBlocks(prev => [...prev, newBlock]);
    }
    setSelectedBlockId(newBlock.id);
    setShowBlockInserter(false);
  };

  const updateBlock = (id, fields) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...fields } : b));
  };

  const removeBlock = (id) => {
    if (blocks.length === 1) {
      setBlocks([{ id: `b-${Date.now()}`, type: 'paragraph', content: '' }]);
      return;
    }
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const moveBlock = (id, direction) => {
    const idx = blocks.findIndex(b => b.id === id);
    if (idx < 0) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;
    const next = [...blocks];
    const temp = next[idx];
    next[idx] = next[targetIdx];
    next[targetIdx] = temp;
    setBlocks(next);
  };

  // Convert blocks to single content string for saving & SEO analyzer
  const fullContentString = blocks.map(b => {
    if (b.type === 'heading') return `## ${b.content}`;
    if (b.type === 'image') return `![${b.alt || 'Image'}](${b.url})`;
    if (b.type === 'quote') return `> ${b.content}`;
    return b.content;
  }).join('\n\n');

  // Media Picker Callback
  const handleMediaSelected = (item) => {
    const imgUrl = item.dataUrl || item.url;
    if (mediaTargetBlockId === 'featured') {
      setFeaturedImage(imgUrl);
    } else if (mediaTargetBlockId) {
      updateBlock(mediaTargetBlockId, { type: 'image', url: imgUrl, alt: item.alt || item.name || '' });
    }
    setShowMediaPicker(false);
  };

  // SEO Analysis
  const seoData = analyzeSeo({
    title,
    slug,
    content: fullContentString,
    sections: [],
    summary,
    focusKeyword,
    seoTitle,
    metaDesc,
    hasImage: !!featuredImage || blocks.some(b => b.type === 'image'),
  });

  const { score, color, checks } = seoData;

  const handleSave = (newStatus) => {
    if (!title.trim()) {
      alert('Please enter a post title.');
      return;
    }
    const finalSlug = slug.trim() || slugify(title);
    
    // Map blocks back to sections for public site renderer compatibility
    const introBlock = blocks.find(b => b.type === 'paragraph')?.content || '';
    const formattedSections = [];
    let currentSec = null;

    blocks.forEach(b => {
      if (b.type === 'heading') {
        if (currentSec) formattedSections.push(currentSec);
        currentSec = { heading: b.content, body: '' };
      } else if (currentSec) {
        if (b.type === 'image') currentSec.body += `\n\n![${b.alt || 'Image'}](${b.url})\n\n`;
        else currentSec.body += `\n\n${b.content}`;
      }
    });
    if (currentSec) formattedSections.push(currentSec);

    const article = {
      id: editingId || finalSlug || `art-${Date.now()}`,
      slug: finalSlug,
      title: title.trim(),
      date,
      readTime,
      category,
      tags,
      featured: true,
      image: featuredImage || (blocks.find(b => b.type === 'image')?.url) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      summary: summary.trim() || fullContentString.slice(0, 140),
      intro: introBlock,
      sections: formattedSections,
      takeaway: '',
      focusKeyword,
      seoTitle: seoTitle || title + getGlobalSettings().siteTitleSeparator,
      metaDesc: metaDesc || summary || fullContentString.slice(0, 155),
      seoScore: score,
      status: newStatus || status,
      createdAt: new Date().toISOString(),
    };

    const existing = getCustomArticles();
    const updated = editingId ? existing.map(a => a.id === editingId ? article : a) : [article, ...existing];
    saveCustomArticles(updated);
    setToast(newStatus === 'draft' ? 'Draft saved.' : 'Post published!');
    setTimeout(() => setToast(''), 3000);
    if (onPublished) onPublished(article);
  };

  // Theme Styles
  const bgCanvas = darkMode ? '#000000' : '#ffffff';
  const bgCard = darkMode ? '#0a0a0a' : '#ffffff';
  const borderCard = darkMode ? '#1f1f1f' : '#e0e0e0';
  const textColor = darkMode ? '#f1f5f9' : '#1d2327';
  const textMuted = darkMode ? '#94a3b8' : '#646970';
  const inputBg = darkMode ? '#000000' : '#ffffff';

  const inputStyle = {
    width: '100%', padding: '6px 8px', fontSize: 13,
    border: `1px solid ${darkMode ? '#333' : '#8c8f94'}`,
    borderRadius: 3, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
    background: inputBg, color: textColor,
  };

  const wordCount = fullContentString ? fullContentString.trim().split(/\s+/).length : 0;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor, margin: '-20px -20px -40px', minHeight: 'calc(100vh - 32px)', display: 'flex', flexDirection: 'column' }}>
      
      {/* ── GUTENBERG TOP HEADER BAR ────────────────────────────────────────────── */}
      <div style={{
        height: 56, borderBottom: `1px solid ${borderCard}`, background: bgCard,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', sticky: 'top', zIndex: 100, boxSizing: 'border-box',
      }}>
        {/* Left Side: + Block Inserter Button & Document Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Black Gutenberg + Button */}
          <button
            onClick={() => setShowBlockInserter(!showBlockInserter)}
            title="Toggle Gutenberg Block Inserter (+)"
            style={{
              width: 36, height: 36, background: '#1e1e1e', color: '#fff', border: 'none',
              borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 300, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            +
          </button>
          
          <div style={{ height: 24, width: 1, background: borderCard }} />

          <button title="Undo" style={{ background: 'none', border: 'none', color: textMuted, fontSize: 16, cursor: 'pointer', padding: 4 }}>↶</button>
          <button title="Redo" style={{ background: 'none', border: 'none', color: textMuted, fontSize: 16, cursor: 'pointer', padding: 4 }}>↷</button>
          
          <div style={{ fontSize: 12, color: textMuted, marginLeft: 8 }}>
            <span>{wordCount} words</span>
          </div>
        </div>

        {/* Right Side: Save Draft, Preview, Publish, Settings ⚙ & Rank Math Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {toast && <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>{toast}</span>}

          <button
            onClick={() => handleSave('draft')}
            style={{ background: 'none', border: `1px solid ${borderCard}`, borderRadius: 3, padding: '6px 12px', fontSize: 13, cursor: 'pointer', color: textColor, fontWeight: 500 }}
          >
            Save draft
          </button>

          <button
            onClick={() => alert('Post Preview Mode Active')}
            style={{ background: 'none', border: `1px solid ${borderCard}`, borderRadius: 3, padding: '6px 12px', fontSize: 13, cursor: 'pointer', color: textColor, fontWeight: 500 }}
          >
            Preview ▾
          </button>

          <button
            onClick={() => handleSave('published')}
            style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '6px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 0 #135e96' }}
          >
            Publish…
          </button>

          <div style={{ height: 24, width: 1, background: borderCard, margin: '0 4px' }} />

          {/* Settings ⚙ Gear Button */}
          <button
            onClick={() => {
              if (showRightSidebar && rightSidebarTab === 'post') {
                setShowRightSidebar(false);
              } else {
                setShowRightSidebar(true);
                setRightSidebarTab('post');
              }
            }}
            title="Toggle Post / Block Settings Sidebar"
            style={{
              background: showRightSidebar && rightSidebarTab !== 'rankmath' ? (darkMode ? '#333' : '#e0e0e0') : 'none',
              border: 'none', borderRadius: 4, padding: '6px 8px', fontSize: 16, cursor: 'pointer', color: textColor,
            }}
          >
            ⚙
          </button>

          {/* Rank Math SEO Top Action Icon Button [R score/100] */}
          <button
            onClick={() => {
              if (showRightSidebar && rightSidebarTab === 'rankmath') {
                setShowRightSidebar(false);
              } else {
                setShowRightSidebar(true);
                setRightSidebarTab('rankmath');
              }
            }}
            title="Toggle Rank Math SEO Sidebar"
            style={{
              background: rightSidebarTab === 'rankmath' && showRightSidebar ? '#f86434' : 'rgba(248, 100, 52, 0.1)',
              color: rightSidebarTab === 'rankmath' && showRightSidebar ? '#fff' : '#f86434',
              border: '1px solid #f86434', borderRadius: 4, padding: '4px 8px', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <span>R</span>
            <span>{score}/100</span>
          </button>
        </div>
      </div>

      {/* ── MAIN GUTENBERG WORKSPACE AREA (LEFT INSERTER + CANVAS + SIDEBAR) ───── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        
        {/* ── 1. LEFT GUTENBERG BLOCK INSERTER DRAWER ─────────────────────────── */}
        {showBlockInserter && (
          <div style={{
            width: 300, borderRight: `1px solid ${borderCard}`, background: bgCard,
            padding: 16, boxSizing: 'border-box', overflowY: 'auto', zIndex: 90,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: textColor }}>Add a block</h3>
              <button onClick={() => setShowBlockInserter(false)} style={{ background: 'none', border: 'none', fontSize: 16, cursor: 'pointer', color: textMuted }}>✕</button>
            </div>
            
            <input
              type="text"
              value={blockSearch}
              onChange={e => setBlockSearch(e.target.value)}
              placeholder="Search blocks…"
              style={{ ...inputStyle, marginBottom: 16 }}
            />

            <div style={{ fontSize: 11, fontWeight: 700, color: textMuted, textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 }}>Text</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              <button onClick={() => addBlock('paragraph')} style={{ padding: 12, border: `1px solid ${borderCard}`, borderRadius: 4, background: bgCanvas, color: textColor, cursor: 'pointer', textAlign: 'left', fontSize: 12 }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>¶</div>
                <strong>Paragraph</strong>
              </button>
              <button onClick={() => addBlock('heading', null, { level: 'h2' })} style={{ padding: 12, border: `1px solid ${borderCard}`, borderRadius: 4, background: bgCanvas, color: textColor, cursor: 'pointer', textAlign: 'left', fontSize: 12 }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>H</div>
                <strong>Heading</strong>
              </button>
              <button onClick={() => addBlock('quote')} style={{ padding: 12, border: `1px solid ${borderCard}`, borderRadius: 4, background: bgCanvas, color: textColor, cursor: 'pointer', textAlign: 'left', fontSize: 12 }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>“</div>
                <strong>Quote</strong>
              </button>
              <button onClick={() => addBlock('list')} style={{ padding: 12, border: `1px solid ${borderCard}`, borderRadius: 4, background: bgCanvas, color: textColor, cursor: 'pointer', textAlign: 'left', fontSize: 12 }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>•</div>
                <strong>List</strong>
              </button>
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: textMuted, textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 }}>Media</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button onClick={() => addBlock('image')} style={{ padding: 12, border: `1px solid ${borderCard}`, borderRadius: 4, background: bgCanvas, color: textColor, cursor: 'pointer', textAlign: 'left', fontSize: 12 }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>📷</div>
                <strong>Image</strong>
              </button>
              <button onClick={() => addBlock('separator')} style={{ padding: 12, border: `1px solid ${borderCard}`, borderRadius: 4, background: bgCanvas, color: textColor, cursor: 'pointer', textAlign: 'left', fontSize: 12 }}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>―</div>
                <strong>Separator</strong>
              </button>
            </div>
          </div>
        )}

        {/* ── 2. CENTER GUTENBERG WRITING CANVAS ─────────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', background: bgCanvas, padding: '40px 60px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: 720 }}>
            
            {/* Big Title Input (Add title) Container */}
            <div style={{ position: 'relative', zIndex: 200, marginBottom: 32 }}>
              <input
                type="text"
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="Add title"
                autoFocus
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBlockId(null);
                }}
                style={{
                  width: '100%', fontSize: 36, fontWeight: 700, border: 'none', outline: 'none',
                  background: 'transparent', color: textColor, padding: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  display: 'block', cursor: 'text', zIndex: 200, position: 'relative',
                }}
              />
            </div>

            {/* Blocks Stream Container (Clean Borderless Canvas) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {blocks.map((block, idx) => {
                const isSelected = selectedBlockId === block.id;

                return (
                  <div
                    key={block.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBlockId(block.id);
                    }}
                    style={{
                      position: 'relative', padding: '6px 0', border: 'none', outline: 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {/* Inline Gutenberg Block Toolbar (Appears above Selected Block) */}
                    {isSelected && (
                      <div style={{
                        marginBottom: 6, height: 32, background: '#1e1e1e', color: '#fff',
                        borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '0 8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 50, fontSize: 12,
                      }}>
                        <span style={{ padding: '0 4px', fontWeight: 700, color: '#a7aaad' }}>
                          {block.type === 'heading' ? 'H2' : block.type === 'image' ? '📷' : '¶'}
                        </span>
                        <div style={{ width: 1, height: 16, background: '#444' }} />
                        
                        <button onClick={() => moveBlock(block.id, 'up')} title="Move Up" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px 4px' }}>▲</button>
                        <button onClick={() => moveBlock(block.id, 'down')} title="Move Down" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px 4px' }}>▼</button>
                        
                        <div style={{ width: 1, height: 16, background: '#444' }} />

                        {block.type !== 'image' && (
                          <>
                            <button onClick={() => updateBlock(block.id, { content: block.content + '**bold**' })} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700, padding: '2px 6px' }}>B</button>
                            <button onClick={() => updateBlock(block.id, { content: block.content + '*italic*' })} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontStyle: 'italic', padding: '2px 6px' }}>I</button>
                            <button onClick={() => updateBlock(block.id, { content: block.content + ' [link](https://)' })} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '2px 6px' }}>🔗</button>
                          </>
                        )}

                        <div style={{ width: 1, height: 16, background: '#444' }} />
                        <button onClick={() => removeBlock(block.id)} title="Delete Block" style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: '2px 6px' }}>🗑</button>
                      </div>
                    )}

                    {/* Block Render Types */}
                    {block.type === 'heading' && (
                      <input
                        type="text"
                        value={block.content}
                        onChange={e => updateBlock(block.id, { content: e.target.value })}
                        placeholder="Heading 2..."
                        style={{
                          width: '100%', fontSize: 24, fontWeight: 700, border: 'none', outline: 'none',
                          background: 'transparent', color: textColor, fontFamily: 'inherit',
                        }}
                      />
                    )}

                    {block.type === 'paragraph' && (
                      <textarea
                        value={block.content}
                        onChange={e => updateBlock(block.id, { content: e.target.value })}
                        placeholder="Type / to choose a block or write text..."
                        rows={Math.max(2, (block.content.match(/\n/g) || []).length + 2)}
                        style={{
                          width: '100%', fontSize: 16, lineHeight: 1.7, border: 'none', outline: 'none',
                          background: 'transparent', color: textColor, fontFamily: 'inherit', resize: 'none',
                        }}
                      />
                    )}

                    {block.type === 'quote' && (
                      <div style={{ borderLeft: '4px solid #2271b1', paddingLeft: 12 }}>
                        <textarea
                          value={block.content}
                          onChange={e => updateBlock(block.id, { content: e.target.value })}
                          placeholder="Write a quote..."
                          rows={2}
                          style={{
                            width: '100%', fontSize: 18, fontStyle: 'italic', border: 'none', outline: 'none',
                            background: 'transparent', color: textColor, fontFamily: 'inherit', resize: 'none',
                          }}
                        />
                      </div>
                    )}

                    {block.type === 'image' && (
                      <div style={{ border: `1px dashed ${borderCard}`, padding: 16, borderRadius: 4, background: darkMode ? '#121212' : '#f9f9f9', textAlign: 'center' }}>
                        {block.url ? (
                          <div>
                            <img src={block.url} alt={block.alt || 'Uploaded'} style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 4, objectFit: 'cover' }} />
                            <input
                              type="text"
                              value={block.alt || ''}
                              onChange={e => updateBlock(block.id, { alt: e.target.value })}
                              placeholder="Write caption or alt text..."
                              style={{ width: '80%', margin: '8px auto 0', padding: '4px 8px', fontSize: 12, border: 'none', textAlign: 'center', background: 'transparent', color: textMuted, outline: 'none' }}
                            />
                          </div>
                        ) : (
                          <div>
                            <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: textColor, marginBottom: 12 }}>Image Block</div>
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                              <button
                                onClick={() => {
                                  setMediaTargetBlockId(block.id);
                                  setShowMediaPicker(true);
                                }}
                                style={{ background: '#2271b1', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                              >
                                Media Library
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {block.type === 'separator' && (
                      <div style={{ height: 1, background: borderCard, margin: '16px 0' }} />
                    )}

                    {/* Faint Action Line with Quick Action Icons (Image, Video, Link, Heading, Quote) */}
                    <div
                      style={{
                        marginTop: 10, paddingTop: 6, borderTop: `1px dashed ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(34,113,177,0.2)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        opacity: isSelected ? 1 : 0.4, transition: 'opacity 0.15s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = 1}
                      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.opacity = 0.4; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: textMuted, marginRight: 4 }}>Faint Action Line ──</span>
                        
                        {/* 📷 Add Image */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addBlock('image', block.id);
                            setMediaTargetBlockId(null);
                          }}
                          title="Add Image"
                          style={{
                            background: darkMode ? '#18181b' : '#f4f4f5', color: textColor,
                            border: `1px solid ${borderCard}`, borderRadius: 3, padding: '2px 8px',
                            fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                          }}
                        >
                          <span>📷</span>
                          <span>Image</span>
                        </button>

                        {/* 🔤 Add Heading */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addBlock('heading', block.id, { level: 'h2' });
                          }}
                          title="Add Heading H2"
                          style={{
                            background: darkMode ? '#18181b' : '#f4f4f5', color: textColor,
                            border: `1px solid ${borderCard}`, borderRadius: 3, padding: '2px 8px',
                            fontSize: 12, cursor: 'pointer',
                          }}
                        >
                          H2 Heading
                        </button>

                        {/* 💬 Add Quote */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addBlock('quote', block.id);
                          }}
                          title="Add Quote"
                          style={{
                            background: darkMode ? '#18181b' : '#f4f4f5', color: textColor,
                            border: `1px solid ${borderCard}`, borderRadius: 3, padding: '2px 8px',
                            fontSize: 12, cursor: 'pointer',
                          }}
                        >
                          “ Quote
                        </button>

                        {/* 🔗 Add Link / Paragraph */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addBlock('paragraph', block.id);
                          }}
                          title="Add Paragraph Line"
                          style={{
                            background: darkMode ? '#18181b' : '#f4f4f5', color: textColor,
                            border: `1px solid ${borderCard}`, borderRadius: 3, padding: '2px 8px',
                            fontSize: 12, cursor: 'pointer',
                          }}
                        >
                          + Text
                        </button>
                      </div>

                      {/* + Quick Plus Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addBlock('paragraph', block.id);
                        }}
                        title="Add Block below"
                        style={{
                          width: 20, height: 20, borderRadius: '50%', background: '#2271b1',
                          color: '#fff', border: 'none', fontSize: 14, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* ── 3. RIGHT GUTENBERG INSPECTOR SIDEBAR (POST / BLOCK / RANK MATH) ── */}
        {showRightSidebar && (
          <div style={{
            width: 320, borderLeft: `1px solid ${borderCard}`, background: bgCard,
            overflowY: 'auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
          }}>
            {/* Right Sidebar Inspector Tabs */}
            <div style={{ display: 'flex', borderBottom: `1px solid ${borderCard}`, background: bgCard }}>
              <button
                onClick={() => setRightSidebarTab('post')}
                style={{
                  flex: 1, padding: '12px 8px', fontSize: 13, border: 'none', cursor: 'pointer',
                  borderBottom: rightSidebarTab === 'post' ? '2px solid #2271b1' : 'none',
                  color: rightSidebarTab === 'post' ? '#2271b1' : textMuted, fontWeight: rightSidebarTab === 'post' ? 700 : 400,
                  background: 'transparent',
                }}
              >
                Post
              </button>
              <button
                onClick={() => setRightSidebarTab('block')}
                style={{
                  flex: 1, padding: '12px 8px', fontSize: 13, border: 'none', cursor: 'pointer',
                  borderBottom: rightSidebarTab === 'block' ? '2px solid #2271b1' : 'none',
                  color: rightSidebarTab === 'block' ? '#2271b1' : textMuted, fontWeight: rightSidebarTab === 'block' ? 700 : 400,
                  background: 'transparent',
                }}
              >
                Block
              </button>
              <button
                onClick={() => setRightSidebarTab('rankmath')}
                style={{
                  flex: 1, padding: '12px 8px', fontSize: 13, border: 'none', cursor: 'pointer',
                  borderBottom: rightSidebarTab === 'rankmath' ? '2px solid #f86434' : 'none',
                  color: rightSidebarTab === 'rankmath' ? '#f86434' : textMuted, fontWeight: rightSidebarTab === 'rankmath' ? 700 : 400,
                  background: 'transparent',
                }}
              >
                Rank Math
              </button>
            </div>

            {/* TAB 1: POST SETTINGS */}
            {rightSidebarTab === 'post' && (
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>
                
                {/* Summary */}
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 12px', color: textColor, textTransform: 'uppercase', letterSpacing: 0.5 }}>Summary</h4>
                  <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: textMuted }}>Visibility</span>
                      <span style={{ color: '#2271b1', cursor: 'pointer', fontWeight: 600 }}>Public</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: textMuted }}>Publish</span>
                      <span style={{ color: '#2271b1', cursor: 'pointer', fontWeight: 600 }}>{date}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: textMuted }}>URL Slug</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={e => { setSlug(e.target.value); setAutoSlug(false); }}
                        style={{ ...inputStyle, width: 140, padding: '2px 4px', fontSize: 12 }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ height: 1, background: borderCard }} />

                {/* Categories */}
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 12px', color: textColor, textTransform: 'uppercase', letterSpacing: 0.5 }}>Categories</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 140, overflowY: 'auto' }}>
                    {CATEGORIES.map(cat => (
                      <label key={cat} style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: textColor }}>
                        <input
                          type="checkbox"
                          checked={category === cat}
                          onChange={() => setCategory(cat)}
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ height: 1, background: borderCard }} />

                {/* Featured Image */}
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 12px', color: textColor, textTransform: 'uppercase', letterSpacing: 0.5 }}>Featured Image</h4>
                  {featuredImage ? (
                    <div>
                      <img src={featuredImage} alt="Featured" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 4, marginBottom: 8 }} />
                      <button
                        onClick={() => { setMediaTargetBlockId('featured'); setShowMediaPicker(true); }}
                        style={{ background: 'none', border: `1px solid ${borderCard}`, borderRadius: 3, padding: '4px 8px', fontSize: 12, cursor: 'pointer', color: textColor, width: '100%' }}
                      >
                        Replace Image
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setMediaTargetBlockId('featured'); setShowMediaPicker(true); }}
                      style={{
                        width: '100%', height: 100, border: `2px dashed ${borderCard}`, borderRadius: 4,
                        background: 'transparent', color: '#2271b1', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                      }}
                    >
                      Set featured image
                    </button>
                  )}
                </div>

                <div style={{ height: 1, background: borderCard }} />

                {/* Excerpt Summary */}
                <div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 8px', color: textColor, textTransform: 'uppercase', letterSpacing: 0.5 }}>Excerpt</h4>
                  <textarea
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    rows={3}
                    placeholder="Write an excerpt (optional)..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

              </div>
            )}

            {/* TAB 2: BLOCK SETTINGS */}
            {rightSidebarTab === 'block' && (
              <div style={{ padding: 16 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 12px', color: textColor, textTransform: 'uppercase', letterSpacing: 0.5 }}>Block Settings</h4>
                <p style={{ fontSize: 13, color: textMuted }}>Select any block in the canvas to customize typography and layout.</p>
              </div>
            )}

            {/* TAB 3: RANK MATH SEO SIDEBAR */}
            {rightSidebarTab === 'rankmath' && (
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: '#f86434', color: '#fff', fontWeight: 900, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>R</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: textColor }}>Rank Math SEO</h3>
                  <div style={{ marginLeft: 'auto', background: color, color: '#fff', fontWeight: 900, fontSize: 12, padding: '2px 8px', borderRadius: 12 }}>{score}/100</div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: textColor, marginBottom: 4 }}>Focus Keyword</label>
                  <input
                    type="text"
                    value={focusKeyword}
                    onChange={e => setFocusKeyword(e.target.value)}
                    placeholder="e.g. NFC digital business cards"
                    style={inputStyle}
                  />
                </div>

                <div style={{ fontSize: 13, fontWeight: 700, color: textColor, marginBottom: 8 }}>SEO Tests Checklist</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {checks.map((chk, i) => (
                    <div key={i} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: chk.pass ? '#10b981' : '#ef4444' }}>
                      <span>{chk.pass ? '✓' : '✕'}</span>
                      <span>{chk.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* ── MEDIA PICKER MODAL ─────────────────────────────────────────────────── */}
      {showMediaPicker && (
        <MediaPickerModal
          isOpen={showMediaPicker}
          onClose={() => setShowMediaPicker(false)}
          onSelectMedia={handleMediaSelected}
        />
      )}

    </div>
  );
}
