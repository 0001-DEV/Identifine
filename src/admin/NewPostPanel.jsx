import React, { useState, useEffect } from 'react';
import { analyzeSeo } from '../utils/seoAnalyzer';
import { getCustomArticles, saveCustomArticles } from '../pages/BlogAdminPage';
import { getGlobalSettings } from '../utils/roleManager';

function slugify(title) {
  if (!title) return '';
  return title.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

const CATEGORIES = ['Design Strategy', 'Smart Hardware', 'NFC Technology', 'Brand Identity', 'Networking', 'Digital Innovation', 'Uncategorized'];

export default function NewPostPanel({ editArticle, onPublished }) {
  const [articles] = useState(getCustomArticles());
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
      setDate(editArticle.date || date);
      setFocusKeyword(editArticle.focusKeyword || '');
      setSeoTitle(editArticle.seoTitle || '');
      setMetaDesc(editArticle.metaDesc || '');
    }
  }, [editArticle]);

  const handleTitleChange = (val) => {
    setTitle(val);
    if (autoSlug) setSlug(slugify(val));
    if (!seoTitle) setSeoTitle(val + getGlobalSettings().siteTitleSeparator);
  };

  const seoResult = analyzeSeo({ title, slug, excerpt: summary || content, focusKeyword, sections });

  const { score, color, checks } = seoResult;

  const addSection = () => setSections([...sections, { heading: `${sections.length + 1}. New Section`, body: '' }]);
  const updateSection = (i, f, v) => { const s = [...sections]; s[i][f] = v; setSections(s); };
  const removeSection = (i) => setSections(sections.filter((_, idx) => idx !== i));

  const handleSave = (newStatus) => {
    if (!title.trim()) { alert('Post title is required.'); return; }
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

  // WP styles
  const inputStyle = { width: '100%', padding: '6px 8px', fontSize: 14, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const textareaStyle = { ...inputStyle, resize: 'vertical' };
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#3c434a', marginBottom: 4 };
  const metaBoxStyle = { background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 16 };
  const metaBoxHeadStyle = { padding: '8px 12px', borderBottom: '1px solid #c3c4c7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
  const metaBoxBodyStyle = { padding: 12 };

  const rmTabStyle = (t) => ({
    padding: '6px 12px', fontSize: 12, cursor: 'pointer', border: 'none', background: 'none',
    borderBottom: activeRmTab === t ? '2px solid #f86434' : '2px solid transparent',
    color: activeRmTab === t ? '#f86434' : '#646970', fontWeight: activeRmTab === t ? 700 : 400,
    fontFamily: 'inherit',
  });

  const passChecks = checks.filter(c => c.pass).length;
  const failChecks = checks.filter(c => !c.pass).length;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Title + actions header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: '#1d2327' }}>
          {editingId ? 'Edit Post' : 'Add New Post'}
        </h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => handleSave('draft')}
            style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer', color: '#3c434a' }}
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer' }}
          >
            {editingId ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      {toast && (
        <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 12, fontSize: 13, borderRadius: 3 }}>
          {toast}
        </div>
      )}

      {/* Two-column layout: editor left, sidebar right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, alignItems: 'start' }}>

        {/* LEFT: Editor */}
        <div>
          {/* Post Title */}
          <div style={{ background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 16 }}>
            <input
              type="text"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Add title"
              style={{
                width: '100%', padding: '12px 16px', fontSize: 24, fontWeight: 300, border: 'none',
                outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', color: '#1d2327',
              }}
            />
            <div style={{ borderTop: '1px solid #f0f0f1', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#646970' }}>Permalink:</span>
              <span style={{ fontSize: 12, color: '#3c434a' }}>
                <span style={{ color: '#646970' }}>https://identifine.com.ng/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={e => { setSlug(e.target.value); setAutoSlug(false); }}
                  style={{ border: '1px solid #d0d5dd', padding: '1px 4px', fontSize: 12, borderRadius: 2, outline: 'none', fontFamily: 'inherit' }}
                />
              </span>
            </div>
          </div>

          {/* Intro / Content */}
          <div style={{ ...metaBoxStyle }}>
            <div style={metaBoxHeadStyle}>
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Content / Introduction</h2>
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
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Body Sections</h2>
              <button
                onClick={addSection}
                style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '2px 8px', fontSize: 12, cursor: 'pointer' }}
              >
                + Add Section
              </button>
            </div>
            <div style={metaBoxBodyStyle}>
              {sections.length === 0 && (
                <p style={{ fontSize: 13, color: '#646970', margin: 0 }}>No sections yet. Click "+ Add Section" to add body content.</p>
              )}
              {sections.map((sec, i) => (
                <div key={i} style={{ marginBottom: 16, borderBottom: i < sections.length - 1 ? '1px solid #f0f0f1' : 'none', paddingBottom: 16 }}>
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
                      style={{ background: '#fcf0f1', color: '#d63638', border: '1px solid #f5b9b9', borderRadius: 3, padding: '4px 8px', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}
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
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Key Takeaway</h2>
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
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Excerpt</h2>
            </div>
            <div style={metaBoxBodyStyle}>
              <textarea
                value={summary}
                onChange={e => setSummary(e.target.value)}
                rows={3}
                placeholder="Write a short excerpt (used in blog cards and SEO meta description)..."
                style={textareaStyle}
              />
              <p style={{ fontSize: 11, color: '#646970', marginTop: 4 }}>
                Excerpts are optional hand-crafted summaries of your content.
              </p>
            </div>
          </div>

          {/* ───── RANK MATH META BOX ───── */}
          <div style={{ ...metaBoxStyle, border: '1px solid #c3c4c7' }}>
            <div style={{ ...metaBoxHeadStyle, background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: 4, background: '#f86434', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 900 }}>R</span>
                </div>
                <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Rank Math SEO</h2>
              </div>
              {/* Score pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                <span style={{ fontSize: 12, fontWeight: 700, color }}>Score: {score}/100</span>
              </div>
            </div>

            {/* Focus Keyword */}
            <div style={{ padding: '12px', borderBottom: '1px solid #f0f0f1' }}>
              <label style={labelStyle}>Focus Keyword</label>
              <input
                type="text"
                value={focusKeyword}
                onChange={e => setFocusKeyword(e.target.value)}
                placeholder="e.g. NFC business cards"
                style={inputStyle}
              />
              <p style={{ fontSize: 11, color: '#646970', marginTop: 4, marginBottom: 0 }}>
                {focusKeyword ? `Analyzing for: "${focusKeyword}"` : 'Enter a focus keyword to start SEO analysis.'}
              </p>
            </div>

            {/* RM Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f1', background: '#fafafa' }}>
              {[['general', 'General'], ['snippet', 'Snippet Preview'], ['schema', 'Schema']].map(([t, l]) => (
                <button key={t} style={rmTabStyle(t)} onClick={() => setActiveRmTab(t)}>{l}</button>
              ))}
            </div>

            {/* General Tab: SEO Checks */}
            {activeRmTab === 'general' && (
              <div style={{ padding: 12 }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', background: '#f9f9f9', borderRadius: 3, border: '1px solid #f0f0f1' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#00b32c' }}>{passChecks}</div>
                    <div style={{ fontSize: 11, color: '#646970' }}>Passed</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', background: '#f9f9f9', borderRadius: 3, border: '1px solid #f0f0f1' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#d63638' }}>{failChecks}</div>
                    <div style={{ fontSize: 11, color: '#646970' }}>Failed</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', background: '#f9f9f9', borderRadius: 3, border: '1px solid #f0f0f1' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color }}>
                      {score < 50 ? '😟' : score < 80 ? '😐' : '😊'}
                    </div>
                    <div style={{ fontSize: 11, color: '#646970' }}>{score < 50 ? 'Poor' : score < 80 ? 'Average' : 'Good'}</div>
                  </div>
                </div>
                {checks.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '5px 0', borderBottom: '1px solid #f0f0f1' }}>
                    <span style={{ fontSize: 14, lineHeight: 1, marginTop: 1 }}>{c.pass ? '✅' : '❌'}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#3c434a' }}>{c.label}</div>
                      {!c.pass && c.fix && (
                        <div style={{ fontSize: 11, color: '#646970', marginTop: 1 }}>{c.fix}</div>
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
                  <div style={{ height: 4, background: '#f0f0f1', marginTop: 4, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, (seoTitle.length / 60) * 100)}%`, background: seoTitle.length > 60 ? '#d63638' : '#00b32c', transition: 'width 0.2s' }} />
                  </div>
                  <div style={{ fontSize: 11, color: '#646970', marginTop: 2 }}>{seoTitle.length} / 60 chars</div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Meta Description</label>
                  <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={3} placeholder="Meta description..." style={textareaStyle} />
                  <div style={{ height: 4, background: '#f0f0f1', marginTop: 4, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, (metaDesc.length / 155) * 100)}%`, background: metaDesc.length > 155 ? '#d63638' : '#00b32c', transition: 'width 0.2s' }} />
                  </div>
                  <div style={{ fontSize: 11, color: '#646970', marginTop: 2 }}>{metaDesc.length} / 155 chars</div>
                </div>
                {/* SERP Preview */}
                <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6, padding: 12 }}>
                  <div style={{ fontSize: 11, color: '#646970', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Google Preview</div>
                  <div style={{ fontSize: 18, color: '#1a0dab', cursor: 'pointer', marginBottom: 2, lineHeight: 1.3, fontFamily: 'arial, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {seoTitle || title || 'Post Title - Identifine'}
                  </div>
                  <div style={{ fontSize: 14, color: '#006621', marginBottom: 4, fontFamily: 'arial, sans-serif' }}>
                    https://identifine.com.ng/blog/{slug || 'post-slug'}
                  </div>
                  <div style={{ fontSize: 14, color: '#4d5156', lineHeight: 1.5, fontFamily: 'arial, sans-serif' }}>
                    {(metaDesc || summary || content).slice(0, 155) || 'No meta description — write one above for best results.'}
                  </div>
                </div>
              </div>
            )}

            {/* Schema Tab */}
            {activeRmTab === 'schema' && (
              <div style={{ padding: 12 }}>
                <div style={{ background: '#f9f9f9', border: '1px solid #f0f0f1', borderRadius: 4, padding: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1d2327', marginBottom: 6 }}>📄 Article Schema (Auto-generated)</div>
                  <div style={{ fontSize: 12, color: '#646970', fontFamily: 'monospace', lineHeight: 1.7 }}>
                    <div><span style={{ color: '#9b59b6' }}>@type</span>: <span style={{ color: '#2271b1' }}>Article</span></div>
                    <div><span style={{ color: '#9b59b6' }}>headline</span>: <span style={{ color: '#3c434a' }}>"{title || 'Post Title'}"</span></div>
                    <div><span style={{ color: '#9b59b6' }}>author</span>: <span style={{ color: '#3c434a' }}>Identifine Admin</span></div>
                    <div><span style={{ color: '#9b59b6' }}>datePublished</span>: <span style={{ color: '#3c434a' }}>{date}</span></div>
                    <div><span style={{ color: '#9b59b6' }}>publisher</span>: <span style={{ color: '#3c434a' }}>Identifine</span></div>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: '#646970', margin: 0 }}>
                  Article structured data is automatically added to every post. This helps Google display rich results.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Sidebar meta boxes */}
        <div>
          {/* Publish Box */}
          <div style={metaBoxStyle}>
            <div style={metaBoxHeadStyle}>
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Publish</h2>
            </div>
            <div style={metaBoxBodyStyle}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#3c434a' }}>
                  <strong>Status:</strong>{' '}
                  <select value={status} onChange={e => setStatus(e.target.value)} style={{ fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, padding: '2px 4px', outline: 'none' }}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending Review</option>
                  </select>
                </span>
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#3c434a' }}>
                  <strong>Visibility:</strong> Public
                </span>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 13, color: '#3c434a', fontWeight: 600 }}>Publish Date: </label>
                <input type="text" value={date} onChange={e => setDate(e.target.value)}
                  style={{ fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, padding: '2px 4px', width: '100%', marginTop: 4, boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #f0f0f1' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleSave('draft')}
                  style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 8px', fontSize: 12, cursor: 'pointer', color: '#3c434a' }}
                >
                  Save Draft
                </button>
                <button
                  onClick={() => handleSave(status)}
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
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Categories</h2>
            </div>
            <div style={metaBoxBodyStyle}>
              {CATEGORIES.map(cat => (
                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontSize: 13, color: '#3c434a', cursor: 'pointer' }}>
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
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Tags</h2>
            </div>
            <div style={metaBoxBodyStyle}>
              <input type="text" value={tags} onChange={e => setTags(e.target.value)}
                placeholder="e.g. NFC, business cards, networking"
                style={{ ...inputStyle, marginBottom: 4 }} />
              <p style={{ fontSize: 11, color: '#646970', margin: 0 }}>Separate tags with commas.</p>
            </div>
          </div>

          {/* Featured Image */}
          <div style={metaBoxStyle}>
            <div style={metaBoxHeadStyle}>
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Featured Image</h2>
            </div>
            <div style={metaBoxBodyStyle}>
              {featuredImage ? (
                <div>
                  <img src={featuredImage} alt="Featured" style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 3, marginBottom: 8 }} onError={e => e.target.style.display='none'} />
                  <button onClick={() => setFeaturedImage('')} style={{ background: 'none', border: 'none', color: '#d63638', cursor: 'pointer', fontSize: 12 }}>
                    Remove featured image
                  </button>
                </div>
              ) : (
                <div>
                  <input type="text" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)}
                    placeholder="Paste image URL..."
                    style={{ ...inputStyle, marginBottom: 6 }} />
                  <p style={{ fontSize: 11, color: '#646970', margin: 0 }}>Paste a URL or use a Unsplash link.</p>
                </div>
              )}
            </div>
          </div>

          {/* Read Time */}
          <div style={metaBoxStyle}>
            <div style={metaBoxHeadStyle}>
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Read Time</h2>
            </div>
            <div style={metaBoxBodyStyle}>
              <input type="text" value={readTime} onChange={e => setReadTime(e.target.value)}
                placeholder="e.g. 5 min read" style={inputStyle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
