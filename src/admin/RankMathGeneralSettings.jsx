import React, { useState } from 'react';
import { getGlobalSettings, saveGlobalSettings } from '../utils/roleManager';

const OPTIMAL_GENERAL_DEFAULTS = {
  linksNoFollow: false,
  linksNewTab: true,
  linksNoFollowImages: false,
  breadcrumbsEnabled: true,
  breadcrumbSeparator: '»',
  breadcrumbHome: 'Home',
  noindexCategories: false,
  noindexTags: true,
  noindexDateArchives: true,
  noindexSearch: true,
  googleVerify: '',
  bingVerify: '',
};

export default function RankMathGeneralSettings({ darkMode = false }) {
  const [settings, setSettings] = useState(() => {
    const saved = getGlobalSettings();
    return { ...OPTIMAL_GENERAL_DEFAULTS, ...saved };
  });
  const [toast, setToast] = useState('');

  const upd = (k, v) => setSettings(s => ({ ...s, [k]: v }));

  const handleSave = (e) => {
    if (e) e.preventDefault();
    saveGlobalSettings(settings);
    setToast('Rank Math General Settings saved successfully.');
    setTimeout(() => setToast(''), 3500);
  };

  const applyOptimal = () => {
    setSettings(s => ({
      ...s,
      ...OPTIMAL_GENERAL_DEFAULTS,
    }));
    saveGlobalSettings({ ...getGlobalSettings(), ...OPTIMAL_GENERAL_DEFAULTS });
    setToast('Optimal recommended SEO defaults applied & saved!');
    setTimeout(() => setToast(''), 3500);
  };

  // Theme colors
  const bgCard = darkMode ? '#0a0a0a' : '#fff';
  const borderCard = darkMode ? '#1f1f1f' : '#c3c4c7';
  const textColor = darkMode ? '#f1f5f9' : '#1d2327';
  const textMuted = darkMode ? '#94a3b8' : '#646970';
  const inputBg = darkMode ? '#000000' : '#fff';

  const sectionStyle = { background: bgCard, border: `1px solid ${borderCard}`, boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 20, borderRadius: 2 };
  const headStyle = { padding: '10px 16px', borderBottom: `1px solid ${borderCard}`, background: darkMode ? '#121212' : '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
  const bodyStyle = { padding: 0 };
  const rowStyle = { display: 'grid', gridTemplateColumns: '260px 1fr', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${borderCard}`, gap: 16 };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: textColor };
  const descStyle = { fontSize: 11, color: textMuted, marginTop: 3, lineHeight: 1.4 };
  const inputStyle = { padding: '6px 10px', fontSize: 13, border: `1px solid ${darkMode ? '#333' : '#8c8f94'}`, borderRadius: 3, outline: 'none', fontFamily: 'inherit', maxWidth: 360, display: 'block', boxSizing: 'border-box', background: inputBg, color: textColor };

  const Toggle = ({ value, onChange }) => (
    <label style={{ position: 'relative', width: 40, height: 22, display: 'inline-block', cursor: 'pointer', flexShrink: 0 }}>
      <input type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
      <span style={{ position: 'absolute', inset: 0, borderRadius: 22, background: value ? '#f86434' : (darkMode ? '#333' : '#c3c4c7'), transition: 'background 0.2s' }} />
      <span style={{ position: 'absolute', left: value ? 20 : 2, top: 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,.3)' }} />
    </label>
  );

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: '#f86434', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 18, fontWeight: 900 }}>R</span>
          </div>
          <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: textColor }}>Rank Math General Settings</h1>
        </div>

        <button
          type="button"
          onClick={applyOptimal}
          style={{ background: '#00b32c', color: '#fff', border: '1px solid #008a22', borderRadius: 3, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
        >
          ⚡ Apply Recommended SEO Defaults
        </button>
      </div>

      {toast && <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '10px 14px', marginBottom: 16, fontSize: 13, borderRadius: 3, fontWeight: 600 }}>{toast}</div>}

      <form onSubmit={handleSave}>
        {/* Links Section */}
        <div style={sectionStyle}>
          <div style={headStyle}>
            <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Links</h2>
            <span style={{ fontSize: 11, color: textMuted }}>Control link target & nofollow attributes</span>
          </div>
          <div style={bodyStyle}>
            {[
              { key: 'linksNoFollow', label: 'Nofollow External Links', desc: 'Automatically add rel="nofollow" to all external links.' },
              { key: 'linksNewTab', label: 'Open External Links in New Tab', desc: 'Add target="_blank" to external links (Recommended ON).' },
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
          <div style={headStyle}>
            <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Breadcrumbs</h2>
            <span style={{ fontSize: 11, color: textMuted }}>Breadcrumb navigation snippets</span>
          </div>
          <div style={bodyStyle}>
            <div style={rowStyle}>
              <div>
                <div style={labelStyle}>Enable Breadcrumbs</div>
                <div style={descStyle}>Show breadcrumb navigation on posts and pages (Recommended ON).</div>
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
          <div style={headStyle}>
            <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Noindex Settings</h2>
            <span style={{ fontSize: 11, color: textMuted }}>Prevent indexing of duplicate/thin archive pages</span>
          </div>
          <div style={bodyStyle}>
            {[
              { key: 'noindexCategories', label: 'Noindex Category Archives', desc: 'Prevent search engines from indexing category archive pages (Recommended OFF).' },
              { key: 'noindexTags', label: 'Noindex Tag Archives', desc: 'Prevent indexing of tag archive pages to avoid duplicate content (Recommended ON).' },
              { key: 'noindexDateArchives', label: 'Noindex Date-Based Archives', desc: 'Prevent indexing of date archive pages (Recommended ON).' },
              { key: 'noindexSearch', label: 'Noindex Search Results', desc: 'Prevent indexing of internal search result pages (Recommended ON).' },
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
          <div style={headStyle}>
            <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Webmaster Tools</h2>
            <span style={{ fontSize: 11, color: textMuted }}>Search Engine ownership verification</span>
          </div>
          <div style={bodyStyle}>
            {[
              { key: 'googleVerify', label: 'Google Search Console', placeholder: 'google-site-verification=...', desc: 'Paste your Google Search Console meta content verification string.' },
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

        <button type="submit" style={{ background: '#f86434', color: '#fff', border: '1px solid #d9531e', borderRadius: 3, padding: '8px 22px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
