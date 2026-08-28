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

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [content, setContent] = useState(''); // Intro
  const [sections, setSections] = useState([]);
  const [takeaway, setTakeaway] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [tags, setTags] = useState('');
  const [readTime, setReadTime] = useState('3 min read');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('published');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  const [focusKeyword, setFocusKeyword] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [toast, setToast] = useState('');
  const [activeRmTab, setActiveRmTab] = useState('general');
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  // Right sidebar tab: 'post' (Post Settings) or 'rankmath' (Rank Math SEO)
  const [rightSidebarTab, setRightSidebarTab] = useState('post');

  useEffect(() => {
    if (editArticle) {
      setEditingId(editArticle.id);
      setTitle(editArticle.title || '');
      setSlug(editArticle.slug || '');
      setAutoSlug(false);
      setContent(editArticle.intro || '');
      setSections(editArticle.sections || []);
      setTakeaway(editArticle.takeaway || '');
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
  }, [editArticle]);

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
    hasImage: !!featuredImage,
  });

  const { score, color, checks } = seoData;

  const handleSave = (newStatus) => {
    if (!title.trim()) {
      alert('Please enter a post title.');
      return;
    }
    const finalSlug = slug.trim() || slugify(title);
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
      summary: summary.trim() || content.slice(0, 140),
      intro: content,
      sections,
      takeaway,
      focusKeyword,
      seoTitle: seoTitle || title + getGlobalSettings().siteTitleSeparator,
      metaDesc: metaDesc || summary || content.slice(0, 155),
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

  // Theme styles
  const bgCard = darkMode ? '#1e242c' : '#fff';
  const borderCard = darkMode ? '#2c3540' : '#c3c4c7';
  const textColor = darkMode ? '#f1f5f9' : '#1d2327';
  const textMuted = darkMode ? '#94a3b8' : '#646970';
  const inputBg = darkMode ? '#151a21' : '#fff';

  const inputStyle = {
    width: '100%', padding: '6px 8px', fontSize: 14,
    border: `1px solid ${darkMode ? '#334155' : '#8c8f94'}`,
    borderRadius: 3, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
    background: inputBg, color: textColor,
  };
  const textareaStyle = { ...inputStyle, resize: 'vertical' };
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: darkMode ? '#cbd5e1' : '#3c434a', marginBottom: 4 };
  const metaBoxStyle = { background: bgCard, border: `1px solid ${borderCard}`, boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 16 };
  const metaBoxHeadStyle = { padding: '8px 12px', borderBottom: `1px solid ${borderCard}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: darkMode ? '#181f26' : '#fff' };
  const metaBoxBodyStyle = { padding: 12 };

  const rmTabStyle = (t) => ({
    padding: '6px 12px', fontSize: 12, cursor: 'pointer', border: 'none', background: 'none',
    borderBottom: activeRmTab === t ? '2px solid #f86434' : '2px solid transparent',
    color: activeRmTab === t ? '#f86434' : textMuted, fontWeight: activeRmTab === t ? 700 : 400,
    fontFamily: 'inherit',
  });

  const passChecks = checks.filter(c => c.pass).length;
  const failChecks = checks.filter(c => !c.pass).length;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor }}>

      {/* ── TOP ACTION HEADER (WP Block Editor Style) ────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
        background: bgCard, border: `1px solid ${borderCard}`, padding: '10px 16px', borderRadius: 4,
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, margin: 0, color: textColor }}>
          {editingId ? 'Edit Post' : 'Add New Post'}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Save Draft */}
          <button
            onClick={() => handleSave('draft')}
            style={{ background: darkMode ? '#334155' : '#f0f0f1', border: `1px solid ${darkMode ? '#475569' : '#8c8f94'}`, borderRadius: 3, padding: '5px 12px', fontSize: 13, cursor: 'pointer', color: darkMode ? '#e2e8f0' : '#3c434a' }}
          >
            Save Draft
          </button>

          {/* Publish / Update */}
          <button
            onClick={() => handleSave('published')}
            style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '5px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
          >
            {editingId ? 'Update' : 'Publish'}
          </button>

          <div style={{ height: 18, width: 1, background: borderCard, margin: '0 2px' }} />

          {/* Rank Math SEO Icon Button with live Score Pill */}
          <button
            onClick={() => setRightSidebarTab(rightSidebarTab === 'rankmath' ? 'post' : 'rankmath')}
            title="Rank Math SEO Analysis"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: rightSidebarTab === 'rankmath' ? '#f86434' : (darkMode ? '#181f26' : '#fff'),
              color: rightSidebarTab === 'rankmath' ? '#fff' : textColor,
              border: `1px solid ${rightSidebarTab === 'rankmath' ? '#d9531e' : borderCard}`,
              borderRadius: 4, padding: '4px 10px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'all 0.15s ease',
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: 3,
              background: rightSidebarTab === 'rankmath' ? '#fff' : '#f86434',
              color: rightSidebarTab === 'rankmath' ? '#f86434' : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900
            }}>
              R
            </div>
            <span>{score}/100</span>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
          </button>

          {/* Post Settings Icon Button (⚙) */}
          <button
            onClick={() => setRightSidebarTab('post')}
            title="Post Settings (Categories, Featured Image, Publish)"
            style={{
              background: rightSidebarTab === 'post' ? (darkMode ? '#334155' : '#1d2327') : (darkMode ? '#181f26' : '#fff'),
              color: rightSidebarTab === 'post' ? '#fff' : textMuted,
              border: `1px solid ${borderCard}`,
              borderRadius: 4, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, cursor: 'pointer', transition: 'all 0.15s ease',
            }}
          >
            ⚙
          </button>
        </div>
      </div>

      {toast && (
        <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 12, fontSize: 13, borderRadius: 3 }}>
          {toast}
        </div>
      )}

      {/* Two-column layout: Editor Left, Sidebar Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, alignItems: 'start' }}>

        {/* ── LEFT: EDITOR ────────────────────────────────────────────────── */}
        <div>
          {/* Post Title */}
          <div style={{ background: bgCard, border: `1px solid ${borderCard}`, boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 16, borderRadius: 3 }}>
            <input
              type="text"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Add title"
              style={{
                width: '100%', padding: '12px 16px', fontSize: 24, fontWeight: 300, border: 'none',
                outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', color: textColor, background: 'transparent',
              }}
            />
            <div style={{ borderTop: `1px solid ${borderCard}`, padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: textMuted }}>Permalink:</span>
              <span style={{ fontSize: 12, color: textColor }}>
                <span style={{ color: textMuted }}>https://identifine.com.ng/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={e => { setSlug(e.target.value); setAutoSlug(false); }}
                  style={{ border: `1px solid ${darkMode ? '#475569' : '#d0d5dd'}`, padding: '1px 4px', fontSize: 12, borderRadius: 2, outline: 'none', fontFamily: 'inherit', background: inputBg, color: textColor }}
                />
              </span>
            </div>
          </div>

          {/* Intro / Content */}
          <div style={metaBoxStyle}>
            <div style={metaBoxHeadStyle}>
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Content / Introduction</h2>
            </div>
            <div style={metaBoxBodyStyle}>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={8}
                placeholder="Write your introduction paragraph here..."
                style={textareaStyle}
              />
            </div>
          </div>

          {/* Body Sections */}
          <div style={metaBoxStyle}>
            <div style={metaBoxHeadStyle}>
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Body Sections</h2>
              <button
                onClick={addSection}
                style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '2px 8px', fontSize: 12, cursor: 'pointer' }}
              >
                + Add Section
              </button>
            </div>
            <div style={metaBoxBodyStyle}>
              {sections.length === 0 && (
                <p style={{ fontSize: 13, color: textMuted, margin: 0 }}>No sections yet. Click "+ Add Section" to add body content.</p>
              )}
              {sections.map((sec, i) => (
                <div key={i} style={{ marginBottom: 16, borderBottom: i < sections.length - 1 ? `1px solid ${borderCard}` : 'none', paddingBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                    <input
                      type="text"
                      value={sec.heading}
                      onChange={e => updateSection(i, 'heading', e.target.value)}
                      placeholder="Section heading (H2)"
                      style={{ ...inputStyle, fontWeight: 600 }}
                    />
                    <button
                      onClick={() => removeSection(i)}
                      style={{ background: darkMode ? '#450a0a' : '#fcf0f1', color: '#d63638', border: '1px solid #f5b9b9', borderRadius: 3, padding: '4px 8px', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      Remove
                    </button>
                  </div>
                  <textarea
                    value={sec.body}
                    onChange={e => updateSection(i, 'body', e.target.value)}
                    rows={5}
                    placeholder="Section body content..."
                    style={textareaStyle}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaway */}
          <div style={metaBoxStyle}>
            <div style={metaBoxHeadStyle}>
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Key Takeaway</h2>
            </div>
            <div style={metaBoxBodyStyle}>
              <textarea
                value={takeaway}
                onChange={e => setTakeaway(e.target.value)}
                rows={3}
                placeholder="A bold conclusion or call-to-action for the reader..."
                style={textareaStyle}
              />
            </div>
          </div>

          {/* Excerpt / Summary */}
          <div style={metaBoxStyle}>
            <div style={metaBoxHeadStyle}>
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Excerpt</h2>
            </div>
            <div style={metaBoxBodyStyle}>
              <textarea
                value={summary}
                onChange={e => setSummary(e.target.value)}
                rows={3}
                placeholder="Write a short excerpt (used in blog cards and SEO meta description)..."
                style={textareaStyle}
              />
              <p style={{ fontSize: 11, color: textMuted, marginTop: 4, marginBottom: 0 }}>
                Excerpts are optional hand-crafted summaries of your content.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ───────────────────────────────────────────────── */}
        <div>
          {/* TAB HEADER SWITCHER */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${borderCard}`, marginBottom: 12, background: bgCard, borderRadius: 3, overflow: 'hidden' }}>
            <button
              onClick={() => setRightSidebarTab('post')}
              style={{
                flex: 1, padding: '8px 10px', fontSize: 13, fontWeight: rightSidebarTab === 'post' ? 700 : 400,
                border: 'none', background: rightSidebarTab === 'post' ? (darkMode ? '#334155' : '#f0f0f1') : 'transparent',
                color: rightSidebarTab === 'post' ? textColor : textMuted, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              ⚙ Post Settings
            </button>
            <button
              onClick={() => setRightSidebarTab('rankmath')}
              style={{
                flex: 1, padding: '8px 10px', fontSize: 13, fontWeight: rightSidebarTab === 'rankmath' ? 700 : 400,
                border: 'none', background: rightSidebarTab === 'rankmath' ? '#f86434' : 'transparent',
                color: rightSidebarTab === 'rankmath' ? '#fff' : textMuted, cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <span>Rank Math</span>
              <span style={{
                background: rightSidebarTab === 'rankmath' ? '#fff' : color,
                color: rightSidebarTab === 'rankmath' ? '#f86434' : '#fff',
                fontSize: 10, fontWeight: 800, padding: '1px 5px', borderRadius: 8,
              }}>
                {score}
              </span>
            </button>
          </div>

          {/* SIDEBAR TAB 1: RANK MATH SEO PANEL */}
          {rightSidebarTab === 'rankmath' && (
            <div style={{ ...metaBoxStyle, border: '1px solid #f86434' }}>
              <div style={{ ...metaBoxHeadStyle, background: '#f86434', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 3, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#f86434', fontSize: 13, fontWeight: 900 }}>R</span>
                  </div>
                  <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#fff' }}>Rank Math SEO</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{score}/100</span>
                </div>
              </div>

              {/* Focus Keyword */}
              <div style={{ padding: '12px', borderBottom: `1px solid ${borderCard}` }}>
                <label style={labelStyle}>Focus Keyword</label>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={e => setFocusKeyword(e.target.value)}
                  placeholder="e.g. NFC business cards"
                  style={inputStyle}
                />
                <p style={{ fontSize: 11, color: textMuted, marginTop: 4, marginBottom: 0 }}>
                  {focusKeyword ? `Analyzing for: "${focusKeyword}"` : 'Enter a focus keyword to start SEO analysis.'}
                </p>
              </div>

              {/* RM Sub-tabs */}
              <div style={{ display: 'flex', borderBottom: `1px solid ${borderCard}`, background: darkMode ? '#151a21' : '#fafafa' }}>
                {[['general', 'General'], ['snippet', 'Snippet'], ['schema', 'Schema']].map(([t, l]) => (
                  <button key={t} style={rmTabStyle(t)} onClick={() => setActiveRmTab(t)}>{l}</button>
                ))}
              </div>

              {/* General Tab: SEO Checks */}
              {activeRmTab === 'general' && (
                <div style={{ padding: 12 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <div style={{ flex: 1, textAlign: 'center', padding: '6px 0', background: darkMode ? '#151a21' : '#f9f9f9', borderRadius: 3, border: `1px solid ${borderCard}` }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#00b32c' }}>{passChecks}</div>
                      <div style={{ fontSize: 10, color: textMuted }}>Passed</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', padding: '6px 0', background: darkMode ? '#151a21' : '#f9f9f9', borderRadius: 3, border: `1px solid ${borderCard}` }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#d63638' }}>{failChecks}</div>
                      <div style={{ fontSize: 10, color: textMuted }}>Failed</div>
                    </div>
                  </div>
                  {checks.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', borderBottom: `1px solid ${borderCard}` }}>
                      <span style={{ fontSize: 13, lineHeight: 1, marginTop: 1 }}>{c.pass ? '✅' : '❌'}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: textColor }}>{c.label}</div>
                        {!c.pass && c.fix && (
                          <div style={{ fontSize: 11, color: textMuted, marginTop: 1 }}>{c.fix}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Snippet Preview Tab */}
              {activeRmTab === 'snippet' && (
                <div style={{ padding: 12 }}>
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>SEO Title</label>
                    <input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder="SEO Title" style={inputStyle} />
                    <div style={{ height: 4, background: darkMode ? '#334155' : '#f0f0f1', marginTop: 4, borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, (seoTitle.length / 60) * 100)}%`, background: seoTitle.length > 60 ? '#d63638' : '#00b32c', transition: 'width 0.2s' }} />
                    </div>
                    <div style={{ fontSize: 11, color: textMuted, marginTop: 2 }}>{seoTitle.length} / 60 chars</div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Meta Description</label>
                    <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={3} placeholder="Meta description..." style={textareaStyle} />
                    <div style={{ height: 4, background: darkMode ? '#334155' : '#f0f0f1', marginTop: 4, borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, (metaDesc.length / 155) * 100)}%`, background: metaDesc.length > 155 ? '#d63638' : '#00b32c', transition: 'width 0.2s' }} />
                    </div>
                    <div style={{ fontSize: 11, color: textMuted, marginTop: 2 }}>{metaDesc.length} / 155 chars</div>
                  </div>
                  {/* SERP Preview */}
                  <div style={{ background: darkMode ? '#151a21' : '#fff', border: `1px solid ${borderCard}`, borderRadius: 6, padding: 10 }}>
                    <div style={{ fontSize: 10, color: textMuted, marginBottom: 4, fontWeight: 600, textTransform: 'uppercase' }}>Google Preview</div>
                    <div style={{ fontSize: 15, color: '#4285f4', cursor: 'pointer', marginBottom: 2, lineHeight: 1.3, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {seoTitle || title || 'Post Title - Identifine'}
                    </div>
                    <div style={{ fontSize: 12, color: '#006621', marginBottom: 4 }}>
                      https://identifine.com.ng/blog/{slug || 'post-slug'}
                    </div>
                    <div style={{ fontSize: 12, color: textMuted, lineHeight: 1.4 }}>
                      {(metaDesc || summary || content).slice(0, 140) || 'Write a meta description for SERP preview.'}
                    </div>
                  </div>
                </div>
              )}

              {/* Schema Tab */}
              {activeRmTab === 'schema' && (
                <div style={{ padding: 12 }}>
                  <div style={{ background: darkMode ? '#151a21' : '#f9f9f9', border: `1px solid ${borderCard}`, borderRadius: 4, padding: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: textColor, marginBottom: 4 }}>📄 Article Schema</div>
                    <div style={{ fontSize: 11, color: textMuted, fontFamily: 'monospace', lineHeight: 1.6 }}>
                      <div><span style={{ color: '#9b59b6' }}>@type</span>: Article</div>
                      <div><span style={{ color: '#9b59b6' }}>headline</span>: "{title || 'Post Title'}"</div>
                      <div><span style={{ color: '#9b59b6' }}>author</span>: Admin</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SIDEBAR TAB 2: POST SETTINGS */}
          {rightSidebarTab === 'post' && (
            <>
              {/* Publish Box */}
              <div style={metaBoxStyle}>
                <div style={metaBoxHeadStyle}>
                  <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Publish</h2>
                </div>
                <div style={metaBoxBodyStyle}>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: textColor }}>
                      <strong>Status:</strong>{' '}
                      <select value={status} onChange={e => setStatus(e.target.value)} style={{ fontSize: 13, border: `1px solid ${darkMode ? '#334155' : '#8c8f94'}`, borderRadius: 3, padding: '2px 4px', outline: 'none', background: inputBg, color: textColor }}>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="pending">Pending Review</option>
                      </select>
                    </span>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: textColor }}>
                      <strong>Visibility:</strong> Public
                    </span>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 13, color: textColor, fontWeight: 600 }}>Publish Date: </label>
                    <input type="text" value={date} onChange={e => setDate(e.target.value)}
                      style={{ fontSize: 13, border: `1px solid ${darkMode ? '#334155' : '#8c8f94'}`, borderRadius: 3, padding: '2px 4px', width: '100%', marginTop: 4, boxSizing: 'border-box', outline: 'none', background: inputBg, color: textColor }} />
                  </div>
                  <hr style={{ margin: '8px 0', border: 'none', borderTop: `1px solid ${borderCard}` }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => handleSave('draft')}
                      style={{ background: darkMode ? '#334155' : '#f0f0f1', border: `1px solid ${darkMode ? '#475569' : '#8c8f94'}`, borderRadius: 3, padding: '4px 8px', fontSize: 12, cursor: 'pointer', color: darkMode ? '#e2e8f0' : '#3c434a' }}
                    >
                      Save Draft
                    </button>
                    <button
                      onClick={() => handleSave('published')}
                      style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
                    >
                      {editingId ? 'Update' : 'Publish'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div style={metaBoxStyle}>
                <div style={metaBoxHeadStyle}>
                  <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Categories</h2>
                </div>
                <div style={metaBoxBodyStyle}>
                  {CATEGORIES.map(cat => (
                    <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontSize: 13, color: textColor, cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={category === cat}
                        onChange={() => setCategory(cat)}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div style={metaBoxStyle}>
                <div style={metaBoxHeadStyle}>
                  <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Tags</h2>
                </div>
                <div style={metaBoxBodyStyle}>
                  <input type="text" value={tags} onChange={e => setTags(e.target.value)}
                    placeholder="e.g. NFC, business cards, networking"
                    style={{ ...inputStyle, marginBottom: 4 }} />
                  <p style={{ fontSize: 11, color: textMuted, margin: 0 }}>Separate tags with commas.</p>
                </div>
              </div>

              {/* Featured Image */}
              {showMediaPicker && (
                <MediaPickerModal
                  title="Set Featured Image"
                  onSelect={(item) => { setFeaturedImage(item.dataUrl || item.url); setShowMediaPicker(false); }}
                  onClose={() => setShowMediaPicker(false)}
                />
              )}

              <div style={metaBoxStyle}>
                <div style={metaBoxHeadStyle}>
                  <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Featured Image</h2>
                </div>
                <div style={metaBoxBodyStyle}>
                  {featuredImage ? (
                    <div>
                      <img
                        src={featuredImage} alt="Featured"
                        style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 3, marginBottom: 8, border: `1px solid ${borderCard}`, display: 'block' }}
                        onError={e => e.target.style.display = 'none'}
                      />
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button
                          onClick={() => setShowMediaPicker(true)}
                          style={{ background: 'none', border: 'none', color: '#2271b1', cursor: 'pointer', fontSize: 12, padding: 0, textDecoration: 'underline' }}
                        >
                          Replace image
                        </button>
                        <span style={{ color: textMuted }}>|</span>
                        <button
                          onClick={() => setFeaturedImage('')}
                          style={{ background: 'none', border: 'none', color: '#d63638', cursor: 'pointer', fontSize: 12, padding: 0 }}
                        >
                          Remove image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => setShowMediaPicker(true)}
                        style={{ display: 'block', width: '100%', textAlign: 'center', padding: '24px 12px', background: darkMode ? '#151a21' : '#f9f9f9', border: `2px dashed ${borderCard}`, borderRadius: 3, cursor: 'pointer', color: '#2271b1', fontSize: 13, fontWeight: 600, marginBottom: 8, fontFamily: 'inherit' }}
                      >
                        + Set featured image
                      </button>
                      <div style={{ fontSize: 11, color: textMuted, textAlign: 'center', marginBottom: 8 }}>— or paste a URL —</div>
                      <input type="text" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)}
                        placeholder="https://..."
                        style={{ ...inputStyle }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Read Time */}
              <div style={metaBoxStyle}>
                <div style={metaBoxHeadStyle}>
                  <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Read Time</h2>
                </div>
                <div style={metaBoxBodyStyle}>
                  <input type="text" value={readTime} onChange={e => setReadTime(e.target.value)}
                    placeholder="e.g. 3 min read" style={inputStyle} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
