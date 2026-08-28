import React, { useState } from 'react';
import { getCustomArticles, saveCustomArticles } from '../pages/BlogAdminPage';

export default function DashboardHome({ onNavigate }) {
  const articles = getCustomArticles();
  const [quickTitle, setQuickTitle] = useState('');
  const [quickContent, setQuickContent] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);

  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    const slug = quickTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const draft = {
      id: slug || `draft-${Date.now()}`,
      slug,
      title: quickTitle.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '2 min read',
      category: 'Uncategorized',
      featured: false,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      summary: quickContent.slice(0, 140),
      intro: quickContent,
      sections: [],
      takeaway: '',
      focusKeyword: '',
      seoScore: 0,
      status: 'draft',
      createdAt: new Date().toISOString(),
    };
    const existing = getCustomArticles();
    saveCustomArticles([draft, ...existing]);
    setQuickTitle('');
    setQuickContent('');
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const stats = [
    { label: 'Posts', count: articles.length + 12, sub: `${articles.length} by you`, color: '#2271b1', page: 'all-posts' },
    { label: 'Pages', count: 8, sub: '8 published', color: '#2271b1', page: null },
    { label: 'Comments', count: 3, sub: '0 pending', color: '#2271b1', page: 'comments' },
    { label: 'Media', count: 47, sub: '47 files', color: '#2271b1', page: 'media-library' },
  ];

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h1 style={{ fontSize: 23, fontWeight: 400, lineHeight: '1.3', color: '#1d2327', margin: '0 0 20px' }}>
        Dashboard
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* At a Glance */}
        <div style={{ background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
          <div style={{ padding: '8px 12px', background: '#fff', borderBottom: '1px solid #c3c4c7' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>At a Glance</h2>
          </div>
          <div style={{ padding: '8px 0' }}>
            {stats.map(s => (
              <div
                key={s.label}
                onClick={() => s.page && onNavigate(s.page)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '4px 12px', cursor: s.page ? 'pointer' : 'default',
                }}
              >
                <span style={{
                  display: 'inline-block', width: 20, height: 20, borderRadius: '50%',
                  background: s.color, color: '#fff', fontSize: 11, fontWeight: 700,
                  textAlign: 'center', lineHeight: '20px', flexShrink: 0,
                }}>
                  {s.count}
                </span>
                <span style={{ fontSize: 13, color: s.page ? '#2271b1' : '#3c434a' }}>
                  {s.label}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: '#646970' }}>{s.sub}</span>
              </div>
            ))}
            <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #f0f0f1' }} />
            <div style={{ padding: '4px 12px', fontSize: 13, color: '#3c434a' }}>
              Identifine Engine v2.0 running <strong>Blog Theme</strong>
            </div>
            <div style={{ padding: '4px 12px', fontSize: 13, color: '#3c434a' }}>
              Rank Math SEO <span style={{ color: '#00b32c', fontWeight: 600 }}>v1.0.123</span>
            </div>
          </div>
        </div>

        {/* Quick Draft */}
        <div style={{ background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
          <div style={{ padding: '8px 12px', background: '#fff', borderBottom: '1px solid #c3c4c7' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Quick Draft</h2>
          </div>
          <form onSubmit={handleSaveDraft} style={{ padding: '12px' }}>
            {draftSaved && (
              <div style={{ background: '#d1e7dd', color: '#0a3622', padding: '8px 12px', marginBottom: 10, fontSize: 13, borderRadius: 3 }}>
                Draft saved! <button type="button" onClick={() => onNavigate('all-posts')} style={{ background: 'none', border: 'none', color: '#0a3622', textDecoration: 'underline', cursor: 'pointer', fontSize: 13 }}>View all posts</button>
              </div>
            )}
            <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: '#3c434a', fontWeight: 600 }}>Title</label>
            <input
              type="text"
              value={quickTitle}
              onChange={e => setQuickTitle(e.target.value)}
              placeholder="What's on your mind?"
              style={{
                width: '100%', padding: '6px 8px', fontSize: 14, border: '1px solid #8c8f94',
                borderRadius: 3, marginBottom: 10, boxSizing: 'border-box', outline: 'none',
              }}
            />
            <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: '#3c434a', fontWeight: 600 }}>Content</label>
            <textarea
              value={quickContent}
              onChange={e => setQuickContent(e.target.value)}
              rows={5}
              placeholder="What are you thinking about?"
              style={{
                width: '100%', padding: '6px 8px', fontSize: 13, border: '1px solid #8c8f94',
                borderRadius: 3, marginBottom: 10, boxSizing: 'border-box', resize: 'vertical', outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3,
                padding: '4px 10px', fontSize: 13, cursor: 'pointer', fontWeight: 400,
              }}
            >
              Save Draft
            </button>
          </form>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Activity */}
        <div style={{ background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #c3c4c7' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Activity</h2>
          </div>
          <div style={{ padding: '12px' }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 13, color: '#3c434a', fontWeight: 600, borderBottom: '1px solid #f0f0f1', paddingBottom: 6 }}>
              Recently Published
            </h4>
            {articles.slice(0, 5).map(a => (
              <div key={a.id} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 11, color: '#646970', whiteSpace: 'nowrap', marginTop: 1 }}>{a.date}</span>
                <span style={{ fontSize: 13, color: '#2271b1', cursor: 'pointer' }} onClick={() => onNavigate('all-posts')}>{a.title}</span>
              </div>
            ))}
            {articles.length === 0 && (
              <p style={{ fontSize: 13, color: '#646970', margin: 0 }}>No activity yet.</p>
            )}
          </div>
        </div>

        {/* Rank Math SEO Overview */}
        <div style={{ background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #c3c4c7' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>
              <span style={{ color: '#f86434', marginRight: 4 }}>▲</span> Rank Math SEO
            </h2>
          </div>
          <div style={{ padding: '12px' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '12px 8px', background: '#f0f0f1', borderRadius: 4 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#00b32c' }}>{articles.filter(a => a.seoScore >= 80).length}</div>
                <div style={{ fontSize: 11, color: '#646970' }}>Good SEO Score</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', padding: '12px 8px', background: '#f0f0f1', borderRadius: 4 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#dba617' }}>{articles.filter(a => a.seoScore >= 50 && a.seoScore < 80).length}</div>
                <div style={{ fontSize: 11, color: '#646970' }}>Needs Improvement</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', padding: '12px 8px', background: '#f0f0f1', borderRadius: 4 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#d63638' }}>{articles.filter(a => !a.seoScore || a.seoScore < 50).length}</div>
                <div style={{ fontSize: 11, color: '#646970' }}>Poor SEO Score</div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('rm-dashboard')}
              style={{ background: 'none', border: '1px solid #2271b1', color: '#2271b1', padding: '4px 10px', fontSize: 12, borderRadius: 3, cursor: 'pointer' }}
            >
              View Rank Math Dashboard →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
