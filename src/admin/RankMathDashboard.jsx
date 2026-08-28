import React, { useState, useEffect } from 'react';
import { getCustomArticles } from '../pages/BlogAdminPage';

const MODULE_DEFAULTS = [
  { id: 'links', label: 'Link Counter', desc: 'Count internal and external links in posts.', enabled: true },
  { id: 'sitemap', label: 'Sitemap', desc: 'Generate XML sitemaps for search engines.', enabled: true },
  { id: 'rich-snippet', label: 'Rich Snippets (Structured Data)', desc: 'Add JSON-LD schema to posts.', enabled: true },
  { id: 'social', label: 'Social Meta', desc: 'Add Open Graph and Twitter Card meta tags.', enabled: true },
  { id: 'local-seo', label: 'Local SEO', desc: 'Add local business structured data.', enabled: true },
  { id: 'breadcrumbs', label: 'Breadcrumbs', desc: 'Enable breadcrumb navigation.', enabled: true },
  { id: '404-monitor', label: '404 Monitor', desc: 'Track 404 errors on your site.', enabled: true },
  { id: 'redirections', label: 'Redirections', desc: 'Set up 301/302 URL redirections.', enabled: true },
  { id: 'acf', label: 'ACF (Custom Fields) SEO', desc: 'Extract content from ACF fields for SEO.', enabled: true },
];

export default function RankMathDashboard({ onNavigate, darkMode = false }) {
  const articles = getCustomArticles();
  const avgScore = articles.length
    ? Math.round(articles.reduce((s, a) => s + (a.seoScore || 0), 0) / articles.length)
    : 0;

  const scoreColor = avgScore >= 80 ? '#00b32c' : avgScore >= 50 ? '#dba617' : '#d63638';

  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem('identifine_rankmath_modules');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all defaults exist and are enabled
        return MODULE_DEFAULTS.map(def => {
          const found = parsed.find(m => m.id === def.id);
          return found ? { ...def, enabled: found.enabled } : def;
        });
      } catch (e) {
        return MODULE_DEFAULTS;
      }
    }
    return MODULE_DEFAULTS;
  });

  useEffect(() => {
    localStorage.setItem('identifine_rankmath_modules', JSON.stringify(modules));
  }, [modules]);

  const toggleModule = (id) => {
    setModules(m => m.map(mod => mod.id === id ? { ...mod, enabled: !mod.enabled } : mod));
  };

  const enableAll = () => {
    setModules(m => m.map(mod => ({ ...mod, enabled: true })));
  };

  // Theme colors
  const bgCard = darkMode ? '#0a0a0a' : '#fff';
  const borderCard = darkMode ? '#1f1f1f' : '#c3c4c7';
  const textColor = darkMode ? '#f1f5f9' : '#1d2327';
  const textMuted = darkMode ? '#94a3b8' : '#646970';

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor }}>
      
      {/* RM Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 40, height: 40, borderRadius: 6, background: '#f86434', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(248,100,52,0.3)' }}>
          <span style={{ color: '#fff', fontSize: 22, fontWeight: 900 }}>R</span>
        </div>
        <div>
          <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: textColor }}>Rank Math SEO Dashboard</h1>
          <p style={{ fontSize: 12, color: textMuted, margin: 0 }}>Version 1.0.123 — <span style={{ color: '#00b32c', fontWeight: 600 }}>All Modules Active</span></p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={enableAll} style={{ background: '#00b32c', color: '#fff', border: '1px solid #008a22', borderRadius: 3, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
            ✓ Enable All Modules
          </button>
          <button onClick={() => onNavigate('rm-general')} style={{ background: '#f86434', color: '#fff', border: '1px solid #d9531e', borderRadius: 3, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
            Setup Wizard
          </button>
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
          <div key={s.label} style={{ background: bgCard, border: `1px solid ${borderCard}`, padding: 16, boxShadow: '0 1px 1px rgba(0,0,0,.04)', borderTop: `4px solid ${s.color}`, borderRadius: 2 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: textColor, marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: textMuted, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Rank Math Features & Modules */}
      <div style={{ background: bgCard, border: `1px solid ${borderCard}`, boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 20, borderRadius: 2 }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${borderCard}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: darkMode ? '#121212' : '#f9f9f9' }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: textColor, display: 'inline' }}>Rank Math Features & Modules</h2>
            <span style={{ fontSize: 12, color: textMuted, marginLeft: 8 }}>— Enable or disable Rank Math features</span>
          </div>
          <button onClick={enableAll} style={{ background: 'none', border: 'none', color: '#f86434', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
            Enable All ({modules.filter(m => m.enabled).length}/{modules.length} Active)
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          {modules.map((mod, i) => (
            <div
              key={mod.id}
              style={{
                padding: 16, borderBottom: `1px solid ${borderCard}`,
                borderRight: (i + 1) % 3 !== 0 ? `1px solid ${borderCard}` : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
                background: mod.enabled ? (darkMode ? '#0f172a' : '#fcfdfd') : 'transparent',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: textColor, marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{mod.label}</span>
                  {mod.enabled && <span style={{ fontSize: 10, background: 'rgba(0,179,44,0.15)', color: '#00b32c', padding: '1px 6px', borderRadius: 10, fontWeight: 700 }}>ACTIVE</span>}
                </div>
                <div style={{ fontSize: 11, color: textMuted, lineHeight: 1.4 }}>{mod.desc}</div>
              </div>
              <label style={{ position: 'relative', width: 38, height: 22, flexShrink: 0, marginTop: 2, cursor: 'pointer' }}>
                <input type="checkbox" checked={mod.enabled} onChange={() => toggleModule(mod.id)} style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: 20,
                  background: mod.enabled ? '#00b32c' : (darkMode ? '#333' : '#c3c4c7'),
                  transition: 'background 0.2s',
                }} />
                <span style={{
                  position: 'absolute', left: mod.enabled ? 18 : 2, top: 2, width: 18, height: 18,
                  borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,.3)',
                }} />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rank Math Quick Configuration Panels */}
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: textColor, margin: '0 0 10px' }}>Global SEO Settings & Configuration</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'General Settings', desc: 'Links, Breadcrumbs, Noindex config', action: 'rm-general', icon: '⚙' },
          { label: 'Titles & Meta', desc: 'Global title & meta tag settings', action: 'rm-titles', icon: '🏷' },
          { label: 'Sitemap Settings', desc: 'XML sitemap configuration', action: 'rm-sitemap', icon: '🗺' },
          { label: 'Role Manager', desc: 'Manage who can use SEO features', action: 'rm-roles', icon: '👤' },
          { label: 'Status & Tools', desc: 'Tools, logs, and import/export', action: 'rm-tools', icon: '🛠' },
          { label: 'Help & FAQ', desc: 'Documentation, guides and support', action: 'rm-help', icon: '❓' },
        ].map(q => (
          <div
            key={q.label}
            onClick={() => onNavigate(q.action)}
            style={{
              background: bgCard, border: `1px solid ${borderCard}`, padding: '16px',
              cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.04)', borderRadius: 3,
              transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', gap: 12,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#f86434';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = borderCard;
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 4, background: 'rgba(248,100,52,0.1)', color: '#f86434', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              {q.icon}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#f86434', marginBottom: 2 }}>{q.label}</div>
              <div style={{ fontSize: 12, color: textMuted }}>{q.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
