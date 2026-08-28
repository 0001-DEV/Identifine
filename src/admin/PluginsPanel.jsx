import React, { useState } from 'react';

const INITIAL_PLUGINS = [
  {
    id: 'rank-math-seo',
    name: 'Rank Math SEO',
    slug: 'rank-math-seo',
    version: '1.0.123',
    author: 'Rank Math',
    authorUrl: 'https://rankmath.com',
    description: 'Rank Math is a revolutionary SEO plugin that combines features of multiple SEO tools and helps you multiply your traffic in easy steps.',
    active: true,
    autoUpdate: true,
    settingsNav: 'rm-dashboard',
  },
  {
    id: 'classic-editor',
    name: 'Classic Editor',
    slug: 'classic-editor',
    version: '1.6.3',
    author: 'WordPress Contributors',
    authorUrl: 'https://wordpress.org',
    description: 'Enables the WordPress classic editor and the old-style post editing screen layout.',
    active: true,
    autoUpdate: true,
    settingsNav: 'add-new',
  },
  {
    id: 'elementor',
    name: 'Elementor Website Builder',
    slug: 'elementor',
    version: '3.23.4',
    author: 'Elementor.com',
    authorUrl: 'https://elementor.com',
    description: 'The Elementor Website Builder has it all: drag and drop page builder, pixel-perfect design, mobile responsive editing, and more.',
    active: true,
    autoUpdate: false,
    settingsNav: null,
  },
  {
    id: 'wp-rocket',
    name: 'WP Rocket',
    slug: 'wp-rocket',
    version: '3.16.2',
    author: 'WP Media',
    authorUrl: 'https://wp-rocket.me',
    description: 'The best WordPress caching plugin to speed up your website, improve your PageSpeed score, and optimize Core Web Vitals.',
    active: false,
    autoUpdate: false,
    settingsNav: null,
  },
];

const STORAGE_KEY = 'identifine_plugins_state';

function getSavedPlugins() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : INITIAL_PLUGINS;
  } catch {
    return INITIAL_PLUGINS;
  }
}

function savePlugins(plugins) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plugins));
  } catch {}
}

export default function PluginsPanel({ onNavigate, darkMode = false }) {
  const [plugins, setPlugins] = useState(getSavedPlugins);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'inactive'
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [toast, setToast] = useState('');
  const [showAddNew, setShowAddNew] = useState(false);

  const toggleActivate = (id) => {
    const next = plugins.map(p => p.id === id ? { ...p, active: !p.active } : p);
    setPlugins(next);
    savePlugins(next);
    const target = next.find(p => p.id === id);
    showToast(`${target.name} ${target.active ? 'activated' : 'deactivated'}.`);
  };

  const toggleAutoUpdate = (id) => {
    const next = plugins.map(p => p.id === id ? { ...p, autoUpdate: !p.autoUpdate } : p);
    setPlugins(next);
    savePlugins(next);
    const target = next.find(p => p.id === id);
    showToast(`Auto-updates ${target.autoUpdate ? 'enabled' : 'disabled'} for ${target.name}.`);
  };

  const deletePlugin = (id) => {
    if (!window.confirm('Are you sure you want to delete this plugin and its data?')) return;
    const next = plugins.filter(p => p.id !== id);
    setPlugins(next);
    savePlugins(next);
    showToast('Plugin deleted.');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = plugins.filter(p => {
    if (filter === 'active' && !p.active) return false;
    if (filter === 'inactive' && p.active) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeCount = plugins.filter(p => p.active).length;
  const inactiveCount = plugins.filter(p => !p.active).length;

  const bgCard = darkMode ? '#1e242c' : '#fff';
  const borderCard = darkMode ? '#2c3540' : '#c3c4c7';
  const textColor = darkMode ? '#f1f5f9' : '#1d2327';
  const textMuted = darkMode ? '#94a3b8' : '#646970';
  const tableHeaderBg = darkMode ? '#151a21' : '#f9f9f9';

  const thStyle = { padding: '8px 10px', borderBottom: `1px solid ${borderCard}`, fontSize: 13, fontWeight: 600, color: textColor, textAlign: 'left', background: tableHeaderBg };
  const tdStyle = { padding: '10px 10px', borderBottom: `1px solid ${darkMode ? '#232c37' : '#f0f0f1'}`, fontSize: 13, verticalAlign: 'top' };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: textColor }}>Plugins</h1>
          <button
            onClick={() => setShowAddNew(!showAddNew)}
            style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer' }}
          >
            {showAddNew ? 'Installed Plugins' : 'Add New Plugin'}
          </button>
        </div>
      </div>

      {toast && (
        <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 16, fontSize: 13, borderRadius: 3 }}>
          {toast}
        </div>
      )}

      {showAddNew ? (
        /* Add New Plugins View */
        <div style={{ background: bgCard, border: `1px solid ${borderCard}`, padding: 20, borderRadius: 4 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px', color: textColor }}>Add Plugins from Plugin Directory</h2>
          <p style={{ fontSize: 13, color: textMuted, marginBottom: 16 }}>Search over 60,000 free plugins to extend your site's functionality.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { name: 'Yoast SEO', desc: 'Improve your SEO: Write better content and have a fully optimized site.', installed: false },
              { name: 'WooCommerce', desc: 'An eCommerce toolkit that helps you sell anything. Beautifully.', installed: false },
              { name: 'Contact Form 7', desc: 'Just another contact form plugin. Simple but flexible.', installed: false },
              { name: 'Jetpack', desc: 'Security, performance, and marketing tools for your blog.', installed: false },
            ].map(item => (
              <div key={item.name} style={{ border: `1px solid ${borderCard}`, padding: 14, borderRadius: 4, background: darkMode ? '#151a21' : '#fafafa' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: textColor, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: textMuted, marginBottom: 12, lineHeight: 1.4 }}>{item.desc}</div>
                <button
                  onClick={() => {
                    const newP = {
                      id: item.name.toLowerCase().replace(/\s+/g, '-'),
                      name: item.name,
                      slug: item.name.toLowerCase().replace(/\s+/g, '-'),
                      version: '1.0.0',
                      author: 'WordPress Developer',
                      authorUrl: 'https://wordpress.org',
                      description: item.desc,
                      active: true,
                      autoUpdate: true,
                      settingsNav: null,
                    };
                    const next = [newP, ...plugins];
                    setPlugins(next);
                    savePlugins(next);
                    showToast(`${item.name} installed and activated!`);
                    setShowAddNew(false);
                  }}
                  style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}
                >
                  Install Now
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Main Plugins List */
        <>
          {/* Status Tabs */}
          <div style={{ marginBottom: 10, fontSize: 13 }}>
            {[
              { id: 'all', label: `All (${plugins.length})` },
              { id: 'active', label: `Active (${activeCount})` },
              { id: 'inactive', label: `Inactive (${inactiveCount})` },
            ].map((tab, idx) => (
              <React.Fragment key={tab.id}>
                {idx > 0 && <span style={{ color: textMuted, margin: '0 6px' }}>|</span>}
                <span
                  onClick={() => setFilter(tab.id)}
                  style={{
                    color: filter === tab.id ? textColor : '#2271b1',
                    fontWeight: filter === tab.id ? 700 : 400,
                    cursor: 'pointer',
                  }}
                >
                  {tab.label}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Filter Bar */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
            <select style={{ padding: '4px 8px', fontSize: 13, border: `1px solid ${darkMode ? '#475569' : '#8c8f94'}`, borderRadius: 3, outline: 'none', background: bgCard, color: textColor }}>
              <option>Bulk actions</option>
              <option>Activate</option>
              <option>Deactivate</option>
              <option>Update</option>
              <option>Delete</option>
            </select>
            <button style={{ background: darkMode ? '#334155' : '#f0f0f1', border: `1px solid ${darkMode ? '#475569' : '#8c8f94'}`, borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer', color: textColor }}>
              Apply
            </button>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search installed plugins…"
              style={{ marginLeft: 'auto', padding: '4px 8px', fontSize: 13, border: `1px solid ${darkMode ? '#475569' : '#8c8f94'}`, borderRadius: 3, width: 220, outline: 'none', background: bgCard, color: textColor }}
            />
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', background: bgCard, border: `1px solid ${borderCard}`, boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: 20 }}><input type="checkbox" /></th>
                <th style={thStyle}>Plugin</th>
                <th style={thStyle}>Description</th>
                <th style={{ ...thStyle, width: 140 }}>Automatic Updates</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: 20, textAlign: 'center', color: textMuted, fontSize: 13 }}>
                    No plugins found.
                  </td>
                </tr>
              )}
              {filtered.map(p => {
                const isActive = p.active;
                return (
                  <tr
                    key={p.id}
                    style={{
                      background: isActive
                        ? (darkMode ? '#16222f' : '#f0f6fc')
                        : (darkMode ? '#1b222a' : '#fff'),
                      borderLeft: isActive ? '4px solid #2271b1' : '4px solid transparent',
                    }}
                  >
                    <td style={tdStyle}><input type="checkbox" /></td>
                    <td style={{ ...tdStyle, width: 220 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: textColor }}>{p.name}</div>
                      <div style={{ marginTop: 6, fontSize: 12, color: textMuted, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <span
                          onClick={() => toggleActivate(p.id)}
                          style={{ color: isActive ? '#d63638' : '#2271b1', cursor: 'pointer', fontWeight: 600 }}
                        >
                          {isActive ? 'Deactivate' : 'Activate'}
                        </span>

                        {isActive && p.settingsNav && (
                          <>
                            <span>|</span>
                            <span
                              onClick={() => onNavigate && onNavigate(p.settingsNav)}
                              style={{ color: '#2271b1', cursor: 'pointer' }}
                            >
                              Settings
                            </span>
                          </>
                        )}

                        {!isActive && (
                          <>
                            <span>|</span>
                            <span
                              onClick={() => deletePlugin(p.id)}
                              style={{ color: '#d63638', cursor: 'pointer' }}
                            >
                              Delete
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontSize: 13, color: textColor, lineHeight: 1.5 }}>{p.description}</div>
                      <div style={{ fontSize: 12, color: textMuted, marginTop: 6 }}>
                        Version {p.version} | By{' '}
                        <a href={p.authorUrl} target="_blank" rel="noreferrer" style={{ color: '#2271b1', textDecoration: 'none' }}>
                          {p.author}
                        </a>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => toggleAutoUpdate(p.id)}
                        style={{
                          background: 'none', border: 'none', color: '#2271b1', cursor: 'pointer',
                          fontSize: 12, padding: 0, textDecoration: 'underline',
                        }}
                      >
                        {p.autoUpdate ? 'Disable auto-updates' : 'Enable auto-updates'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ fontSize: 12, color: textMuted, marginTop: 8 }}>
            {filtered.length} plugin{filtered.length !== 1 ? 's' : ''}
          </div>
        </>
      )}
    </div>
  );
}
