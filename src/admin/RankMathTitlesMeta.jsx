import React, { useState } from 'react';
import { getGlobalSettings, saveGlobalSettings } from '../utils/roleManager';

const SEPARATORS = [
  { value: ' - ', label: '–  Dash', preview: 'Title - Identifine' },
  { value: ' | ', label: '|  Pipe', preview: 'Title | Identifine' },
  { value: ' » ', label: '»  Angle', preview: 'Title » Identifine' },
  { value: ' :: ', label: '::  Double Colon', preview: 'Title :: Identifine' },
  { value: ' ~ ', label: '~  Tilde', preview: 'Title ~ Identifine' },
];

export default function RankMathTitlesMeta({ darkMode = false }) {
  const [settings, setSettings] = useState(getGlobalSettings());
  const [activeTab, setActiveTab] = useState('global');
  const [toast, setToast] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const upd = (k, v) => setSettings(s => ({ ...s, [k]: v }));

  const handleSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    saveGlobalSettings(settings);
    setIsSaved(true);
    setToast('Titles & Meta settings saved successfully.');
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
  const rowStyle = { display: 'grid', gridTemplateColumns: '220px 1fr', alignItems: 'start', padding: '16px', borderBottom: `1px solid ${borderCard}`, gap: 16 };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: textColor };
  const descStyle = { fontSize: 11, color: textMuted, marginTop: 3, lineHeight: 1.5 };
  const inputStyle = { padding: '6px 8px', fontSize: 13, border: `1px solid ${darkMode ? '#333' : '#8c8f94'}`, borderRadius: 3, outline: 'none', fontFamily: 'inherit', display: 'block', boxSizing: 'border-box', background: inputBg, color: textColor };

  const tabStyle = (t) => ({
    padding: '8px 16px', cursor: 'pointer', border: 'none', background: 'none', fontFamily: 'inherit',
    borderBottom: activeTab === t ? '2px solid #f86434' : '2px solid transparent',
    color: activeTab === t ? '#f86434' : textMuted, fontWeight: activeTab === t ? 700 : 400, fontSize: 13,
  });

  const SITENAME = 'Identifine';

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor, paddingBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{ width: 28, height: 28, borderRadius: 4, background: '#f86434', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 900 }}>R</span>
        </div>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: textColor }}>Titles & Meta</h1>
      </div>

      {toast && <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 16, fontSize: 13, borderRadius: 3, fontWeight: 600 }}>{toast}</div>}

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${borderCard}`, marginBottom: 20, background: bgCard, border: `1px solid ${borderCard}` }}>
        {[['global', 'Global Meta'], ['home', 'Homepage'], ['single', 'Posts'], ['category', 'Categories'], ['tags', 'Tags'], ['author', 'Author'], ['search', 'Search Results'], ['404', '404 Page']].map(([t, l]) => (
          <button key={t} style={tabStyle(t)} onClick={() => setActiveTab(t)}>{l}</button>
        ))}
      </div>

      <form onSubmit={handleSave}>

        {/* Global Tab */}
        {activeTab === 'global' && (
          <>
            <div style={sectionStyle}>
              <div style={headStyle}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Global Title Settings</h2></div>
              <div>
                {/* Separator */}
                <div style={rowStyle}>
                  <div>
                    <div style={labelStyle}>Title Separator</div>
                    <div style={descStyle}>The character between the post title and site name in browser titles.</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                      {SEPARATORS.map(s => (
                        <label key={s.value} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 13, color: textColor }}>
                          <input
                            type="radio" name="separator"
                            checked={(settings.siteTitleSeparator || ' - ') === s.value}
                            onChange={() => upd('siteTitleSeparator', s.value)}
                          />
                          <span style={{ fontFamily: 'monospace', fontSize: 16, color: textColor }}>{s.label.split(' ')[0]}</span>
                          <span style={{ fontSize: 12, color: textMuted }}>{s.label.split(' ').slice(1).join(' ')}</span>
                        </label>
                      ))}
                    </div>
                    <div style={{ fontSize: 12, color: textMuted, background: darkMode ? '#121212' : '#f9f9f9', padding: '6px 10px', borderRadius: 3, border: `1px solid ${borderCard}`, display: 'inline-block' }}>
                      Preview: <strong>Post Title{settings.siteTitleSeparator || ' - '}{SITENAME}</strong>
                    </div>
                  </div>
                </div>

                <div style={rowStyle}>
                  <div>
                    <div style={labelStyle}>Site Title</div>
                    <div style={descStyle}>This is your site title used in meta tags. Usually your brand name.</div>
                  </div>
                  <input type="text" value={settings.siteTitle || SITENAME} onChange={e => upd('siteTitle', e.target.value)} style={{ ...inputStyle, width: 300 }} />
                </div>

                <div style={rowStyle}>
                  <div>
                    <div style={labelStyle}>Default OG Image</div>
                    <div style={descStyle}>Image used in social sharing when no featured image is set.</div>
                  </div>
                  <div>
                    <input type="text" value={settings.defaultOgImage || ''} onChange={e => upd('defaultOgImage', e.target.value)} placeholder="https://..." style={{ ...inputStyle, width: '100%', maxWidth: 400, marginBottom: 8 }} />
                    {settings.defaultOgImage && <img src={settings.defaultOgImage} alt="OG" style={{ height: 60, borderRadius: 3, border: `1px solid ${borderCard}`, objectFit: 'cover' }} onError={e => e.target.style.display='none'} />}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Homepage Tab */}
        {activeTab === 'home' && (
          <div style={sectionStyle}>
            <div style={headStyle}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Homepage Settings</h2></div>
            <div>
              <div style={rowStyle}>
                <div><div style={labelStyle}>Homepage Title</div><div style={descStyle}>Title tag for the homepage.</div></div>
                <div>
                  <input type="text" value={settings.homepageTitle || `${SITENAME} - Smarter Business Identity`} onChange={e => upd('homepageTitle', e.target.value)} style={{ ...inputStyle, width: '100%', maxWidth: 400 }} />
                  <div style={{ fontSize: 11, color: (settings.homepageTitle || '').length > 60 ? '#d63638' : textMuted, marginTop: 4 }}>{(settings.homepageTitle || '').length} / 60 chars</div>
                </div>
              </div>
              <div style={rowStyle}>
                <div><div style={labelStyle}>Homepage Meta Description</div><div style={descStyle}>Meta description for the homepage.</div></div>
                <div>
                  <textarea value={settings.homepageDesc || ''} onChange={e => upd('homepageDesc', e.target.value)} rows={3} placeholder="Homepage meta description..." style={{ ...inputStyle, width: '100%', maxWidth: 500, resize: 'vertical' }} />
                  <div style={{ fontSize: 11, color: (settings.homepageDesc || '').length > 155 ? '#d63638' : textMuted, marginTop: 4 }}>{(settings.homepageDesc || '').length} / 155 chars</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts / Single Tab */}
        {activeTab === 'single' && (
          <div style={sectionStyle}>
            <div style={headStyle}><h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Post (Single) Settings</h2></div>
            <div>
              <div style={rowStyle}>
                <div><div style={labelStyle}>Post Title Format</div><div style={descStyle}>Variables: %title%, %sep%, %sitename%, %category%</div></div>
                <input type="text" value={settings.postTitleFormat || `%title%%sep%%sitename%`} onChange={e => upd('postTitleFormat', e.target.value)} style={{ ...inputStyle, width: '100%', maxWidth: 400 }} />
              </div>
              <div style={rowStyle}>
                <div><div style={labelStyle}>Show Schema</div><div style={descStyle}>Add Article schema markup to posts.</div></div>
                <label style={{ position: 'relative', width: 40, height: 22, display: 'inline-block', cursor: 'pointer' }}>
                  <input type="checkbox" checked={settings.postSchema !== false} onChange={e => upd('postSchema', e.target.checked)} style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
                  <span style={{ position: 'absolute', inset: 0, borderRadius: 22, background: settings.postSchema !== false ? '#f86434' : (darkMode ? '#333' : '#c3c4c7') }} />
                  <span style={{ position: 'absolute', left: settings.postSchema !== false ? 20 : 2, top: 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.3)' }} />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs */}
        {!['global', 'home', 'single'].includes(activeTab) && (
          <div style={{ ...sectionStyle, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: textMuted, marginBottom: 8 }}>Settings for <strong>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</strong> will appear here.</div>
            <div style={{ fontSize: 12, color: textMuted }}>Configure title formats, meta defaults, and schema options for {activeTab}.</div>
          </div>
        )}

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
