import React from 'react';
import { getCustomArticles } from '../pages/BlogAdminPage';

const MODULE_DEFAULTS = [
  { id: 'links', label: 'Link Counter', desc: 'Count internal and external links in posts.', enabled: true },
  { id: 'sitemap', label: 'Sitemap', desc: 'Generate XML sitemaps for search engines.', enabled: true },
  { id: 'rich-snippet', label: 'Rich Snippets (Structured Data)', desc: 'Add JSON-LD schema to posts.', enabled: true },
  { id: 'social', label: 'Social Meta', desc: 'Add Open Graph and Twitter Card meta tags.', enabled: true },
  { id: 'local-seo', label: 'Local SEO', desc: 'Add local business structured data.', enabled: false },
  { id: 'breadcrumbs', label: 'Breadcrumbs', desc: 'Enable breadcrumb navigation.', enabled: true },
  { id: '404-monitor', label: '404 Monitor', desc: 'Track 404 errors on your site.', enabled: false },
  { id: 'redirections', label: 'Redirections', desc: 'Set up 301/302 URL redirections.', enabled: false },
  { id: 'acf', label: 'ACF (Custom Fields) SEO', desc: 'Extract content from ACF fields for SEO.', enabled: false },
];

export default function RankMathDashboard({ onNavigate }) {
  const articles = getCustomArticles();
  const avgScore = articles.length
    ? Math.round(articles.reduce((s, a) => s + (a.seoScore || 0), 0) / articles.length)
    : 0;

  const scoreColor = avgScore >= 80 ? '#00b32c' : avgScore >= 50 ? '#dba617' : '#d63638';

  const [modules, setModules] = React.useState(MODULE_DEFAULTS);
  const toggleModule = (id) => setModules(m => m.map(mod => mod.id === id ? { ...mod, enabled: !mod.enabled } : mod));

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* RM Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 36, height: 36, borderRadius: 6, background: '#f86434', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 20, fontWeight: 900 }}>R</span>
        </div>
        <div>
          <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: '#1d2327' }}>Rank Math SEO</h1>
          <p style={{ fontSize: 12, color: '#646970', margin: 0 }}>Version 1.0.123 — <span style={{ color: '#00b32c', fontWeight: 600 }}>Active</span></p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={() => onNavigate('rm-general')} style={{ background: '#f86434', color: '#fff', border: '1px solid #d9531e', borderRadius: 3, padding: '4px 12px', fontSize: 13, cursor: 'pointer' }}>
            Setup Wizard
          </button>
          <a href="https://rankmath.com/kb/" target="_blank" rel="noreferrer" style={{ background: '#f0f0f1', color: '#3c434a', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 12px', fontSize: 13, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
            Help & Docs
          </a>
        </div>
      </div>

      {/* Score Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
        {[
          { label: 'Avg SEO Score', value: `${avgScore}/100`, color: scoreColor, sub: `${articles.length} posts analysed` },
          { label: 'Good (80–100)', value: articles.filter(a => a.seoScore >= 80).length, color: '#00b32c', sub: 'Posts with good score' },
          { label: 'Average (50–79)', value: articles.filter(a => a.seoScore >= 50 && a.seoScore < 80).length, color: '#dba617', sub: 'Posts to improve' },
          { label: 'Poor (0–49)', value: articles.filter(a => !a.seoScore || a.seoScore < 50).length, color: '#d63638', sub: 'Posts needing attention' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #c3c4c7', padding: 16, boxShadow: '0 1px 1px rgba(0,0,0,.04)', borderTop: `4px solid ${s.color}` }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1d2327', marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: '#646970', marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div style={{ background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 20 }}>
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #c3c4c7', display: 'flex', alignItems: 'center', gap: 8 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#1d2327' }}>Modules</h2>
          <span style={{ fontSize: 12, color: '#646970' }}>— Enable or disable Rank Math features</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          {modules.map((mod, i) => (
            <div
              key={mod.id}
              style={{
                padding: 16, borderBottom: '1px solid #f0f0f1',
                borderRight: (i + 1) % 3 !== 0 ? '1px solid #f0f0f1' : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1d2327', marginBottom: 3 }}>{mod.label}</div>
                <div style={{ fontSize: 11, color: '#646970', lineHeight: 1.4 }}>{mod.desc}</div>
              </div>
              <label style={{ position: 'relative', width: 36, height: 20, flexShrink: 0, marginTop: 2 }}>
                <input type="checkbox" checked={mod.enabled} onChange={() => toggleModule(mod.id)} style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: 20, cursor: 'pointer',
                  background: mod.enabled ? '#f86434' : '#c3c4c7',
                  transition: 'background 0.2s',
                }} />
                <span style={{
                  position: 'absolute', left: mod.enabled ? 18 : 2, top: 2, width: 16, height: 16,
                  borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,.3)',
                }} />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'General Settings', desc: 'Links, Breadcrumbs, Noindex', action: 'rm-general' },
          { label: 'Titles & Meta', desc: 'Global title & meta config', action: 'rm-titles' },
          { label: 'Sitemap Settings', desc: 'XML sitemap configuration', action: 'rm-sitemap' },
          { label: 'Role Manager', desc: 'Manage who can use SEO features', action: 'rm-roles' },
          { label: 'Status & Tools', desc: 'Tools, logs, and import/export', action: 'rm-tools' },
          { label: 'Help & FAQ', desc: 'Documentation and support', action: 'rm-help' },
        ].map(q => (
          <div
            key={q.label}
            onClick={() => onNavigate(q.action)}
            style={{ background: '#fff', border: '1px solid #c3c4c7', padding: '14px 16px', cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.04)', transition: 'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#f86434'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#c3c4c7'}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f86434', marginBottom: 4 }}>{q.label}</div>
            <div style={{ fontSize: 12, color: '#646970' }}>{q.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
