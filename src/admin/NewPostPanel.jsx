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

  // Core Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [content, setContent] = useState(''); // Main article HTML/Text
  const [sections, setSections] = useState([]);
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [tags, setTags] = useState('');
  const [readTime, setReadTime] = useState('3 min read');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('published');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  
  // Rank Math & SEO
  const [focusKeyword, setFocusKeyword] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [activeRmTab, setActiveRmTab] = useState('general');

  // UI State
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'text'
  const [rightSidebarTab, setRightSidebarTab] = useState('post'); // 'post' | 'rankmath'
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaTarget, setMediaTarget] = useState('content');
  const [toast, setToast] = useState('');

  const visualEditorRef = useRef(null);

  useEffect(() => {
    if (editArticle && editArticle.id !== editingId) {
      setEditingId(editArticle.id);
      setTitle(editArticle.title || '');
      setSlug(editArticle.slug || '');
      setAutoSlug(false);
      const initialHtml = editArticle.intro || '';
      setContent(initialHtml);
      if (visualEditorRef.current) {
        visualEditorRef.current.innerHTML = initialHtml;
      }
      setSections(editArticle.sections || []);
      setSummary(editArticle.summary || '');
      setCategory(editArticle.category || 'Uncategorized');
      setTags(editArticle.tags || '');
      setReadTime(editArticle.readTime || '3 min read');
      setFeaturedImage(editArticle.image || '');
      setStatus(editArticle.status || 'published');
      setDate(editArticle.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
      setFocusKeyword(editArticle.focusKeyword || '');
      setSeoTitle(editArticle.seoTitle || '');
      setMetaDesc(editArticle.metaDesc || '');
    }
  }, [editArticle?.id]);

  const handleTitleChange = (val) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

  const addSection = () => {
    setSections([...sections, { heading: '', body: '' }]);
  };

  const updateSection = (idx, field, val) => {
    const next = [...sections];
    next[idx] = { ...next[idx], [field]: val };
    setSections(next);
  };

  const removeSection = (idx) => {
    setSections(sections.filter((_, i) => i !== idx));
  };

  // Sync contentEditable div HTML to content state
  const handleVisualInput = () => {
    if (visualEditorRef.current) {
      setContent(visualEditorRef.current.innerHTML);
    }
  };

  // True Rich Text Formatting Commands (execCommand)
  const execCmd = (command, value = null) => {
    if (editorMode === 'visual' && visualEditorRef.current) {
      visualEditorRef.current.focus();
      document.execCommand(command, false, value);
      handleVisualInput();
    } else {
      // In Text/HTML mode fallback
      if (command === 'bold') setContent(prev => prev + '<strong>bold</strong>');
      if (command === 'italic') setContent(prev => prev + '<em>italic</em>');
      if (command === 'strikeThrough') setContent(prev => prev + '<del>text</del>');
    }
  };

  // Media selected callback
  const handleMediaSelected = (item) => {
    const imgUrl = item.dataUrl || item.url;
    const imgHtml = `<p><img src="${imgUrl}" alt="${item.alt || item.name || 'Image'}" style="max-width:100%; height:auto; border-radius:4px; margin:12px 0;" /></p>`;

    if (mediaTarget === 'featured') {
      setFeaturedImage(imgUrl);
    } else if (mediaTarget === 'content') {
      if (editorMode === 'visual' && visualEditorRef.current) {
        visualEditorRef.current.focus();
        document.execCommand('insertHTML', false, imgHtml);
        handleVisualInput();
      } else {
        setContent(prev => prev + `\n${imgHtml}\n`);
      }
    } else if (typeof mediaTarget === 'object' && mediaTarget.type === 'section') {
      const idx = mediaTarget.index;
      updateSection(idx, 'body', (sections[idx]?.body || '') + `\n\n![${item.alt || 'Image'}](${imgUrl})\n\n`);
    }
    setShowMediaPicker(false);
  };

  // SEO Analysis
  const seoData = analyzeSeo({
    title,
    slug,
    content,
    sections,
    summary,
    focusKeyword,
    seoTitle,
    metaDesc,
    hasImage: !!featuredImage || content.includes('<img'),
  });

  const { score, color, checks } = seoData;

  const handleSave = (newStatus) => {
    if (!title.trim()) {
      alert('Please enter a post title.');
      return;
    }
    const finalSlug = slug.trim() || slugify(title);
    const finalContent = editorMode === 'visual' && visualEditorRef.current ? visualEditorRef.current.innerHTML : content;

    const article = {
      id: editingId || finalSlug || `art-${Date.now()}`,
      slug: finalSlug,
      title: title.trim(),
      date,
      readTime,
      category,
      tags,
      featured: true,
      image: featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      summary: summary.trim() || finalContent.replace(/<[^>]+>/g, '').slice(0, 140),
      intro: finalContent,
      sections,
      takeaway: '',
      focusKeyword,
      seoTitle: seoTitle || title + getGlobalSettings().siteTitleSeparator,
      metaDesc: metaDesc || summary || finalContent.replace(/<[^>]+>/g, '').slice(0, 155),
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

  // Theme colors
  const bgCard = darkMode ? '#0a0a0a' : '#fff';
  const borderCard = darkMode ? '#1f1f1f' : '#c3c4c7';
  const textColor = darkMode ? '#f1f5f9' : '#1d2327';
  const textMuted = darkMode ? '#94a3b8' : '#646970';
  const inputBg = darkMode ? '#000000' : '#fff';

  const inputStyle = {
    width: '100%', padding: '6px 8px', fontSize: 13,
    border: `1px solid ${darkMode ? '#333' : '#8c8f94'}`,
    borderRadius: 3, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
    background: inputBg, color: textColor,
  };
  const textareaStyle = { ...inputStyle, resize: 'vertical' };
  const metaBoxStyle = { background: bgCard, border: `1px solid ${borderCard}`, boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 16, borderRadius: 2 };
  const metaBoxHeadStyle = { padding: '8px 12px', borderBottom: `1px solid ${borderCard}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: darkMode ? '#121212' : '#f9f9f9' };
  const metaBoxBodyStyle = { padding: 12 };

  const plainText = content.replace(/<[^>]+>/g, '');
  const wordCount = plainText ? plainText.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor }}>
      
      {/* ───── CLASSIC WORDPRESS EDITOR TOP ACTION BAR ───── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: textColor }}>
          {editingId ? 'Edit Post' : 'Add New Post'}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {toast && <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>{toast}</span>}

          <button
            onClick={() => handleSave('draft')}
            style={{ background: darkMode ? '#18181b' : '#f6f7f7', border: `1px solid ${borderCard}`, borderRadius: 3, padding: '5px 12px', fontSize: 13, cursor: 'pointer', color: textColor, fontWeight: 500 }}
          >
            Save Draft
          </button>

          <button
            onClick={() => handleSave('published')}
            style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '5px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 0 #135e96' }}
          >
            Publish
          </button>

          <div style={{ height: 20, width: 1, background: borderCard, margin: '0 2px' }} />

          {/* Rank Math SEO Top Action Icon Button [R score/100] */}
          <button
            onClick={() => setRightSidebarTab(rightSidebarTab === 'rankmath' ? 'post' : 'rankmath')}
            title="Toggle Rank Math SEO Panel"
            style={{
              background: rightSidebarTab === 'rankmath' ? '#f86434' : 'rgba(248, 100, 52, 0.1)',
              color: rightSidebarTab === 'rankmath' ? '#fff' : '#f86434',
              border: '1px solid #f86434', borderRadius: 3, padding: '4px 10px', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <span>R</span>
            <span>{score}/100</span>
          </button>
        </div>
      </div>

      {/* ───── CLASSIC WORDPRESS 2-COLUMN LAYOUT (LEFT MAIN 70% | RIGHT SIDEBAR 30%) ───── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
        
        {/* ── LEFT MAIN COLUMN ────────────────────────────────────────────────── */}
        <div>
          
          {/* 1. Post Title Box ("Enter title here") */}
          <div style={{ ...metaBoxStyle, padding: 12 }}>
            <input
              type="text"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Enter title here"
              style={{
                width: '100%', fontSize: 22, fontWeight: 600, border: `1px solid ${borderCard}`,
                padding: '8px 12px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                background: inputBg, color: textColor, borderRadius: 2,
              }}
            />
            
            {/* Permalink Display & Edit */}
            <div style={{ marginTop: 8, fontSize: 12, color: textMuted, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>Permalink:</span>
              <span style={{ color: textColor }}>
                https://identifine.com.ng/blog/
                <input
                  type="text"
                  value={slug}
                  onChange={e => { setSlug(e.target.value); setAutoSlug(false); }}
                  style={{ border: `1px solid ${darkMode ? '#333' : '#d0d5dd'}`, padding: '1px 6px', fontSize: 12, borderRadius: 2, outline: 'none', background: inputBg, color: textColor }}
                />
              </span>
            </div>
          </div>

          {/* 2. Classic WP Add Media Bar + Visual / Text Mode Tabs */}
          <div style={metaBoxStyle}>
            <div style={{
              padding: '8px 12px', borderBottom: `1px solid ${borderCard}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: darkMode ? '#121212' : '#f9f9f9',
            }}>
              {/* WordPress "Add Media" Button */}
              <button
                onClick={() => { setMediaTarget('content'); setShowMediaPicker(true); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: darkMode ? '#1e293b' : '#fff', color: textColor,
                  border: `1px solid ${darkMode ? '#334155' : '#8c8f94'}`,
                  borderRadius: 3, padding: '4px 12px', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                <span style={{ fontSize: 14 }}>📷</span>
                <span>Add Media</span>
              </button>

              {/* Visual / Text Mode Switcher */}
              <div style={{ display: 'flex', border: `1px solid ${darkMode ? '#333' : '#8c8f94'}`, borderRadius: 3, overflow: 'hidden' }}>
                <button
                  onClick={() => {
                    if (editorMode === 'text' && visualEditorRef.current) {
                      visualEditorRef.current.innerHTML = content;
                    }
                    setEditorMode('visual');
                  }}
                  style={{
                    padding: '3px 12px', fontSize: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    background: editorMode === 'visual' ? (darkMode ? '#334155' : '#e0e0e0') : 'transparent',
                    color: textColor, fontWeight: editorMode === 'visual' ? 700 : 400,
                  }}
                >
                  Visual
                </button>
                <button
                  onClick={() => {
                    if (visualEditorRef.current) {
                      setContent(visualEditorRef.current.innerHTML);
                    }
                    setEditorMode('text');
                  }}
                  style={{
                    padding: '3px 12px', fontSize: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    background: editorMode === 'text' ? (darkMode ? '#334155' : '#e0e0e0') : 'transparent',
                    color: textColor, fontWeight: editorMode === 'text' ? 700 : 400,
                  }}
                >
                  Text (HTML)
                </button>
              </div>
            </div>

            {/* WYSIWYG Formatting Action Line Toolbar */}
            <div style={{
              padding: '6px 12px', borderBottom: `1px solid ${borderCard}`,
              display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap',
              background: darkMode ? '#151a21' : '#f0f0f1',
            }}>
              {/* Paragraph format dropdown */}
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    execCmd('formatBlock', `<${e.target.value}>`);
                    e.target.value = '';
                  }
                }}
                style={{
                  padding: '2px 6px', fontSize: 12, border: `1px solid ${darkMode ? '#333' : '#8c8f94'}`,
                  borderRadius: 3, outline: 'none', background: inputBg, color: textColor,
                  cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                }}
              >
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="blockquote">Blockquote</option>
              </select>

              <div style={{ height: 16, width: 1, background: borderCard, margin: '0 2px' }} />

              <button title="Bold (Ctrl+B)" onClick={() => execCmd('bold')} style={{ ...inputStyle, width: 'auto', padding: '2px 10px', fontWeight: 700, cursor: 'pointer' }}>B</button>
              <button title="Italic (Ctrl+I)" onClick={() => execCmd('italic')} style={{ ...inputStyle, width: 'auto', padding: '2px 10px', fontStyle: 'italic', cursor: 'pointer' }}>I</button>
              <button title="Strikethrough" onClick={() => execCmd('strikeThrough')} style={{ ...inputStyle, width: 'auto', padding: '2px 10px', textDecoration: 'line-through', cursor: 'pointer' }}>S</button>

              <div style={{ height: 16, width: 1, background: borderCard, margin: '0 2px' }} />

              <button title="Bullet List" onClick={() => execCmd('insertUnorderedList')} style={{ ...inputStyle, width: 'auto', padding: '2px 8px', cursor: 'pointer' }}>• List</button>
              <button title="Numbered List" onClick={() => execCmd('insertOrderedList')} style={{ ...inputStyle, width: 'auto', padding: '2px 8px', cursor: 'pointer' }}>1. List</button>
              <button title="Blockquote" onClick={() => execCmd('formatBlock', '<blockquote>')} style={{ ...inputStyle, width: 'auto', padding: '2px 8px', cursor: 'pointer' }}>“ Quote</button>

              <div style={{ height: 16, width: 1, background: borderCard, margin: '0 2px' }} />

              <button title="Insert Link" onClick={() => {
                const url = prompt('Enter destination URL:', 'https://');
                if (url) execCmd('createLink', url);
              }} style={{ ...inputStyle, width: 'auto', padding: '2px 8px', cursor: 'pointer' }}>🔗 Link</button>
              
              <button title="Insert Image" onClick={() => { setMediaTarget('content'); setShowMediaPicker(true); }} style={{ ...inputStyle, width: 'auto', padding: '2px 8px', cursor: 'pointer' }}>📷 Insert Image</button>
            </div>

            {/* Main Article Writing Canvas (Visual Mode vs Text Mode) */}
            <div style={metaBoxBodyStyle}>
              {editorMode === 'visual' ? (
                /* Authentic WYSIWYG Visual Mode Canvas (contentEditable) */
                <div
                  ref={visualEditorRef}
                  contentEditable
                  onInput={handleVisualInput}
                  onBlur={handleVisualInput}
                  dangerouslySetInnerHTML={{ __html: content }}
                  style={{
                    minHeight: 520, padding: 16, fontSize: 16, lineHeight: 1.7, outline: 'none',
                    background: inputBg, color: textColor, border: `1px solid ${darkMode ? '#333' : '#c3c4c7'}`,
                    borderRadius: 2, boxSizing: 'border-box', overflowY: 'auto',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                />
              ) : (
                /* Text (HTML Code) Mode Canvas */
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={26}
                  placeholder="<p>Write your HTML article content here...</p>"
                  style={{
                    ...textareaStyle,
                    minHeight: 520, fontSize: 14, lineHeight: 1.6, padding: 14,
                    fontFamily: 'Consolas, Monaco, monospace', background: inputBg, color: textColor,
                    border: `1px solid ${darkMode ? '#333' : '#c3c4c7'}`,
                  }}
                />
              )}

              <div style={{ fontSize: 12, color: textMuted, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span>Word count: <strong>{wordCount}</strong> words</span>
                <span>Tip: Highlight any text and click <strong>B</strong> or <em>I</em> to instantly format it!</span>
              </div>
            </div>
          </div>

          {/* Sub-topic Sections (Optional Extra Sections) */}
          <div style={metaBoxStyle}>
            <div style={metaBoxHeadStyle}>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Sub-topic Sections (Optional)</h3>
              <button
                onClick={addSection}
                style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '3px 10px', fontSize: 12, cursor: 'pointer' }}
              >
                + Add Sub-topic Section
              </button>
            </div>
            <div style={metaBoxBodyStyle}>
              {sections.length === 0 && (
                <div style={{ fontSize: 12, color: textMuted, padding: '8px 0', textAlign: 'center' }}>
                  No additional sub-topics. You can write your full article inside the main content box above or add sub-topics here.
                </div>
              )}
              {sections.map((sec, i) => (
                <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < sections.length - 1 ? `1px solid ${borderCard}` : 'none' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: textMuted }}>#{i + 1}</span>
                    <input
                      type="text"
                      value={sec.heading}
                      onChange={e => updateSection(i, 'heading', e.target.value)}
                      placeholder={`Section ${i + 1} Heading (e.g. 1. Why Digital NFC Cards Win)`}
                      style={{ ...inputStyle, fontWeight: 600 }}
                    />
                    <button
                      onClick={() => { setMediaTarget({ type: 'section', index: i }); setShowMediaPicker(true); }}
                      style={{ background: darkMode ? '#334155' : '#f0f0f1', color: textColor, border: `1px solid ${borderCard}`, borderRadius: 3, padding: '3px 8px', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      📷 Add Image
                    </button>
                    <button
                      onClick={() => removeSection(i)}
                      style={{ background: darkMode ? '#450a0a' : '#fcf0f1', color: '#d63638', border: '1px solid #f5b9b9', borderRadius: 3, padding: '3px 8px', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      Remove
                    </button>
                  </div>
                  <textarea
                    value={sec.body}
                    onChange={e => updateSection(i, 'body', e.target.value)}
                    rows={4}
                    placeholder="Section write-up content..."
                    style={textareaStyle}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT SIDEBAR ────────────────────────────────────────────────────── */}
        <div>
          
          {/* TAB SYSTEM: POST SETTINGS vs RANK MATH SEO */}
          {rightSidebarTab === 'post' ? (
            <>
              {/* Publish Meta Box */}
              <div style={metaBoxStyle}>
                <div style={metaBoxHeadStyle}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0, color: textColor }}>Publish</h3>
                </div>
                <div style={{ ...metaBoxBodyStyle, fontSize: 13, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: textMuted }}>Status:</span>
                    <span style={{ fontWeight: 600, color: textColor }}>{status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: textMuted }}>Visibility:</span>
                    <span style={{ fontWeight: 600, color: textColor }}>Public</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: textMuted }}>Date:</span>
                    <span style={{ fontWeight: 600, color: textColor }}>{date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: textMuted }}>SEO Score:</span>
                    <span style={{ fontWeight: 700, color }}>{score}/100</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button
                      onClick={() => handleSave('draft')}
                      style={{ flex: 1, background: darkMode ? '#18181b' : '#f6f7f7', border: `1px solid ${borderCard}`, borderRadius: 3, padding: '6px', fontSize: 12, cursor: 'pointer', color: textColor, fontWeight: 600 }}
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={() => handleSave('published')}
                      style={{ flex: 1, background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '6px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories Meta Box */}
              <div style={metaBoxStyle}>
                <div style={metaBoxHeadStyle}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0, color: textColor }}>Categories</h3>
                </div>
                <div style={metaBoxBodyStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 150, overflowY: 'auto' }}>
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
              </div>

              {/* Featured Image Meta Box */}
              <div style={metaBoxStyle}>
                <div style={metaBoxHeadStyle}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0, color: textColor }}>Featured Image</h3>
                </div>
                <div style={metaBoxBodyStyle}>
                  {featuredImage ? (
                    <div>
                      <img src={featuredImage} alt="Featured" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 3, marginBottom: 8 }} />
                      <button
                        onClick={() => { setMediaTarget('featured'); setShowMediaPicker(true); }}
                        style={{ background: 'none', border: `1px solid ${borderCard}`, borderRadius: 3, padding: '4px 8px', fontSize: 12, cursor: 'pointer', color: textColor, width: '100%' }}
                      >
                        Replace Featured Image
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setMediaTarget('featured'); setShowMediaPicker(true); }}
                      style={{
                        width: '100%', height: 110, border: `2px dashed ${borderCard}`, borderRadius: 3,
                        background: 'transparent', color: '#2271b1', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                      }}
                    >
                      + Set featured image
                    </button>
                  )}
                </div>
              </div>

              {/* Excerpt Meta Box */}
              <div style={metaBoxStyle}>
                <div style={metaBoxHeadStyle}>
                  <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0, color: textColor }}>Excerpt</h3>
                </div>
                <div style={{ ...metaBoxBodyStyle }}>
                  <textarea
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    rows={3}
                    placeholder="Write an excerpt (optional)..."
                    style={textareaStyle}
                  />
                </div>
              </div>
            </>
          ) : (
            /* RANK MATH SEO PANEL */
            <div style={metaBoxStyle}>
              <div style={metaBoxHeadStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 3, background: '#f86434', color: '#fff', fontWeight: 900, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>R</div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0, color: textColor }}>Rank Math SEO</h3>
                </div>
                <button onClick={() => setRightSidebarTab('post')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#2271b1', cursor: 'pointer' }}>Close ✕</button>
              </div>
              <div style={metaBoxBodyStyle}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontSize: 12, color: textMuted }}>Overall Score:</span>
                  <span style={{ background: color, color: '#fff', fontWeight: 900, fontSize: 12, padding: '2px 8px', borderRadius: 10 }}>{score}/100</span>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: textColor, marginBottom: 4 }}>Focus Keyword</label>
                  <input
                    type="text"
                    value={focusKeyword}
                    onChange={e => setFocusKeyword(e.target.value)}
                    placeholder="e.g. NFC business cards"
                    style={inputStyle}
                  />
                </div>

                <div style={{ fontSize: 12, fontWeight: 600, color: textColor, marginBottom: 8 }}>Rank Math Checklist</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 300, overflowY: 'auto' }}>
                  {checks.map((chk, i) => (
                    <div key={i} style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 6, color: chk.pass ? '#10b981' : '#ef4444' }}>
                      <span>{chk.pass ? '✓' : '✕'}</span>
                      <span>{chk.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ───── MEDIA PICKER MODAL ───── */}
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
