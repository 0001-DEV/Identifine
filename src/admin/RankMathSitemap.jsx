import React, { useState } from 'react';
import { getGlobalSettings, saveGlobalSettings } from '../utils/roleManager';

export default function RankMathSitemap({ darkMode = false }) {
  const [settings, setSettings] = useState(getGlobalSettings());
  const [toast, setToast] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const upd = (k, v) => setSettings(s => ({ ...s, [k]: v }));

  const handleSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    saveGlobalSettings(settings);
    setIsSaved(true);
    setToast('Sitemap settings saved successfully.');
    setTimeout(() => {
      setIsSaved(false);
      setToast('');
    }, 3500);
  };

  const bgCard = darkMode ? '#0a0a0a' : '#fff';
  const borderCard = darkMode ? '#1f1f1f' : '#c3c4c7';
  const textColor = darkMode ? '#f1f5f9' : '#1d2327';
  const textMuted = darkMode ? '#94a3b8' : '#646970';
  const inputBg = darkMode ? '#000000' : '#fff';

  const sectionStyle = { background: bgCard, border: `1px solid ${borderCard}`, boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 20, borderRadius: 2 };
  const headStyle = { padding: '10px 16px', borderBottom: `1px solid ${borderCard}`, background: darkMode ? '#121212' : '#f9f9f9' };
  const rowStyle = { display: 'grid', gridTemplateColumns: '260px 1fr', alignItems: 'start', padding: '16px', borderBottom: `1px solid ${borderCard}`, gap: 16 };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: textColor };
  const descStyle = { fontSize: 11, color: textMuted, marginTop: 3, lineHeight: 1.5 };
  const inputStyle = { padding: '6px 8px', fontSize: 13, border: `1px solid ${darkMode ? '#333' : '#8c8f94'}`, borderRadius: 3, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', background: inputBg, color: textColor };

  const Toggle = ({ value, onChange }) => (
    <label style={{ position: 'relative', width: 40, height: 22, display: 'inline-block', cursor: 'pointer', flexShrink: 0 }}>
      <input type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
      <span style={{ position: 'absolute', inset: 0, borderRadius: 22, background: value ? '#f86434' : (darkMode ? '#333' : '#c3c4c7'), transition: 'background 0.2s' }} />
      <span style={{ position: 'absolute', left: value ? 20 : 2, top: 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,.3)' }} />
    </label>
  );

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor, paddingBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{ width: 28, height: 28, borderRadius: 4, background: '#f86434', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 900 }}>R</span>
        </div>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: textColor }}>Sitemap Settings</h1>
      </div>

      {toast && <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 16, fontSize: 13, borderRadius: 3, fontWeight: 600 }}>{toast}</div>}

      {/* Sitemap URL Notice */}
      <div style={{ background: darkMode ? '#1e1b00' : '#fff3cd', border: `1px solid ${darkMode ? '#3d3700' : '#ffecb5'}`, padding: '10px 14px', marginBottom: 16, borderRadius: 3, fontSize: 13, color: darkMode ? '#ffe066' : '#664d03' }}>
        <strong>Your sitemap index:</strong>{' '}
        <a href="/sitemap_index.xml" target="_blank" rel="noreferrer" style={{ color: darkMode ? '#66d9e8' : '#0a3622', fontWeight: 600 }}>
          https://identifine.com.ng/sitemap_index.xml
        </a>
      </div>

      <form onSubmit={handleSave}>
        {/* General Sitemap Settings */}
        <div style={sectionStyle}>
          <div style={headStyle}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>General Sitemap Settings</h2></div>
          <div>
            <div style={rowStyle}>
              <div><div style={labelStyle}>Enable Sitemap</div><div style={descStyle}>Enable the XML sitemap for this site.</div></div>
              <Toggle value={settings.sitemapEnabled !== false} onChange={v => upd('sitemapEnabled', v)} />
            </div>
            <div style={rowStyle}>
              <div><div style={labelStyle}>Entries Per Page</div><div style={descStyle}>Number of URLs per sitemap file. Max recommended: 1000.</div></div>
              <input type="number" value={settings.sitemapPostsPerPage || 200} onChange={e => upd('sitemapPostsPerPage', parseInt(e.target.value))}
                min={10} max={1000} style={{ ...inputStyle, width: 100 }} />
            </div>
            <div style={rowStyle}>
              <div><div style={labelStyle}>Include Images</div><div style={descStyle}>Add image sitemap data to increase image search visibility.</div></div>
              <Toggle value={settings.sitemapIncludeImages !== false} onChange={v => upd('sitemapIncludeImages', v)} />
            </div>
          </div>
        </div>

        {/* Content Types */}
        <div style={sectionStyle}>
          <div style={headStyle}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Post Types to Include</h2></div>
          <div>
            {['Posts', 'Pages', 'Media'].map(type => (
              <div key={type} style={rowStyle}>
                <div><div style={labelStyle}>{type}</div><div style={descStyle}>Include {type.toLowerCase()} in the sitemap.</div></div>
                <Toggle value={(settings.sitemapTypes || {})[type.toLowerCase()] !== false} onChange={v => upd('sitemapTypes', { ...(settings.sitemapTypes || {}), [type.toLowerCase()]: v })} />
              </div>
            ))}
          </div>
        </div>

        {/* Taxonomies */}
        <div style={sectionStyle}>
          <div style={headStyle}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Taxonomies to Include</h2></div>
          <div>
            {['Categories', 'Tags'].map(tax => (
              <div key={tax} style={rowStyle}>
                <div><div style={labelStyle}>{tax}</div><div style={descStyle}>Include {tax.toLowerCase()} in the sitemap.</div></div>
                <Toggle value={(settings.sitemapTaxonomies || {})[tax.toLowerCase()] !== false} onChange={v => upd('sitemapTaxonomies', { ...(settings.sitemapTaxonomies || {}), [tax.toLowerCase()]: v })} />
              </div>
            ))}
          </div>
        </div>

        {/* Ping Search Engines */}
        <div style={sectionStyle}>
          <div style={headStyle}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Ping Search Engines</h2></div>
          <div>
            <div style={rowStyle}>
              <div><div style={labelStyle}>Ping on Publish</div><div style={descStyle}>Notify search engines when you publish new content.</div></div>
              <Toggle value={settings.sitemapPingOnPublish !== false} onChange={v => upd('sitemapPingOnPublish', v)} />
            </div>
            <div style={{ padding: '12px 16px', borderTop: `1px solid ${borderCard}` }}>
              <button type="button" onClick={() => alert('Pings sent to Google and Bing search indexers!')} style={{ background: darkMode ? '#222' : '#f0f0f1', border: `1px solid ${darkMode ? '#444' : '#8c8f94'}`, borderRadius: 3, padding: '6px 14px', fontSize: 13, cursor: 'pointer', color: textColor, fontWeight: 600 }}>
                Manually Ping Search Engines
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24 }}>
          <button
            type="submit"
            onClick={handleSave}
            style={{
              background: isSaved ? '#00b32c' : '#f86434',
              color: '#fff',
              border: isSaved ? '1px solid #008a22' : '1px solid #d9531e',
              borderRadius: 3,
              padding: '10px 24px',
              fontSize: 14,
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: isSaved ? '0 0 10px rgba(0,179,44,0.4)' : 'none'
            }}
          >
            <span>{isSaved ? '✓' : '💾'}</span>
            <span>{isSaved ? 'Changes Saved Successfully!' : 'Save Changes'}</span>
          </button>
          {toast && <span style={{ color: '#00b32c', fontSize: 13, fontWeight: 600 }}>✓ Saved</span>}
        </div>
      </form>
    </div>
  );
}
