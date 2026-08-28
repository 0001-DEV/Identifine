import React, { useState } from 'react';
import { getGlobalSettings, saveGlobalSettings } from '../utils/roleManager';

export default function RankMathGeneralSettings() {
  const [settings, setSettings] = useState(getGlobalSettings());
  const [toast, setToast] = useState('');

  const upd = (k, v) => setSettings(s => ({ ...s, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    saveGlobalSettings(settings);
    setToast('Settings saved.'); setTimeout(() => setToast(''), 3000);
  };

  const sectionStyle = { background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 20 };
  const headStyle = { padding: '10px 16px', borderBottom: '1px solid #c3c4c7', background: '#f9f9f9' };
  const bodyStyle = { padding: 0 };
  const rowStyle = { display: 'grid', gridTemplateColumns: '220px 1fr', alignItems: 'start', padding: '16px', borderBottom: '1px solid #f0f0f1', gap: 16 };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: '#3c434a' };
  const descStyle = { fontSize: 11, color: '#646970', marginTop: 3, lineHeight: 1.5 };
  const inputStyle = { padding: '6px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', fontFamily: 'inherit', maxWidth: 320, display: 'block', boxSizing: 'border-box' };

  const toggleStyle = (val) => ({
    position: 'relative', width: 40, height: 22, display: 'inline-block', cursor: 'pointer',
  });

  const Toggle = ({ value, onChange }) => (
    <label style={{ position: 'relative', width: 40, height: 22, display: 'inline-block', cursor: 'pointer', flexShrink: 0 }}>
      <input type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
      <span style={{ position: 'absolute', inset: 0, borderRadius: 22, background: value ? '#f86434' : '#c3c4c7', transition: 'background 0.2s' }} />
      <span style={{ position: 'absolute', left: value ? 20 : 2, top: 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,.3)' }} />
    </label>
  );

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{ width: 28, height: 28, borderRadius: 4, background: '#f86434', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 900 }}>R</span>
        </div>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: '#1d2327' }}>General Settings</h1>
      </div>

      {toast && <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 16, fontSize: 13, borderRadius: 3 }}>{toast}</div>}

      <form onSubmit={handleSave}>
        {/* Links Section */}
        <div style={sectionStyle}>
          <div style={headStyle}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Links</h2></div>
          <div style={bodyStyle}>
            {[
              { key: 'linksNoFollow', label: 'Nofollow External Links', desc: 'Automatically add rel="nofollow" to all external links.' },
              { key: 'linksNewTab', label: 'Open External Links in New Tab', desc: 'Add target="_blank" to external links.' },
              { key: 'linksNoFollowImages', label: 'Nofollow Image Links', desc: 'Add nofollow to links containing only images.' },
            ].map(item => (
              <div key={item.key} style={rowStyle}>
                <div>
                  <div style={labelStyle}>{item.label}</div>
                  <div style={descStyle}>{item.desc}</div>
                </div>
                <Toggle value={settings[item.key] || false} onChange={v => upd(item.key, v)} />
              </div>
            ))}
          </div>
        </div>

        {/* Breadcrumbs */}
        <div style={sectionStyle}>
          <div style={headStyle}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Breadcrumbs</h2></div>
          <div style={bodyStyle}>
            <div style={rowStyle}>
              <div>
                <div style={labelStyle}>Enable Breadcrumbs</div>
                <div style={descStyle}>Show breadcrumb navigation on posts and pages.</div>
              </div>
              <Toggle value={settings.breadcrumbsEnabled !== false} onChange={v => upd('breadcrumbsEnabled', v)} />
            </div>
            <div style={rowStyle}>
              <div>
                <div style={labelStyle}>Breadcrumb Separator</div>
                <div style={descStyle}>The character between breadcrumb items. Default: »</div>
              </div>
              <input type="text" value={settings.breadcrumbSeparator || '»'} onChange={e => upd('breadcrumbSeparator', e.target.value)} style={{ ...inputStyle, width: 60 }} />
            </div>
            <div style={rowStyle}>
              <div>
                <div style={labelStyle}>Home Label</div>
                <div style={descStyle}>Label for the first breadcrumb item.</div>
              </div>
              <input type="text" value={settings.breadcrumbHome || 'Home'} onChange={e => upd('breadcrumbHome', e.target.value)} style={{ ...inputStyle, width: 200 }} />
            </div>
          </div>
        </div>

        {/* Noindex */}
        <div style={sectionStyle}>
          <div style={headStyle}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Noindex Settings</h2></div>
          <div style={bodyStyle}>
            {[
              { key: 'noindexCategories', label: 'Noindex Category Archives', desc: 'Prevent search engines from indexing category archive pages.' },
              { key: 'noindexTags', label: 'Noindex Tag Archives', desc: 'Prevent indexing of tag archive pages.' },
              { key: 'noindexDateArchives', label: 'Noindex Date-Based Archives', desc: 'Prevent indexing of date archive pages.' },
              { key: 'noindexSearch', label: 'Noindex Search Results', desc: 'Prevent indexing of search result pages.' },
            ].map(item => (
              <div key={item.key} style={rowStyle}>
                <div>
                  <div style={labelStyle}>{item.label}</div>
                  <div style={descStyle}>{item.desc}</div>
                </div>
                <Toggle value={settings[item.key] || false} onChange={v => upd(item.key, v)} />
              </div>
            ))}
          </div>
        </div>

        {/* Webmaster Tools */}
        <div style={sectionStyle}>
          <div style={headStyle}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Webmaster Tools</h2></div>
          <div style={bodyStyle}>
            {[
              { key: 'googleVerify', label: 'Google Search Console', placeholder: 'Google verification code', desc: 'Paste your Google Search Console meta content value.' },
              { key: 'bingVerify', label: 'Bing Webmaster Tools', placeholder: 'Bing verification code', desc: 'Paste your Bing Webmaster Tools verification code.' },
            ].map(item => (
              <div key={item.key} style={rowStyle}>
                <div>
                  <div style={labelStyle}>{item.label}</div>
                  <div style={descStyle}>{item.desc}</div>
                </div>
                <input type="text" value={settings[item.key] || ''} onChange={e => upd(item.key, e.target.value)} placeholder={item.placeholder} style={{ ...inputStyle, width: '100%', maxWidth: 400 }} />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" style={{ background: '#f86434', color: '#fff', border: '1px solid #d9531e', borderRadius: 3, padding: '8px 20px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
