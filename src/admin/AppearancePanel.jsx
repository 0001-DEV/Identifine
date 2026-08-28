import React, { useState } from 'react';

const THEMES = [
  {
    id: 'identifine-custom',
    name: 'Identifine Executive Theme',
    version: '2026.1',
    author: 'Identifine Studio',
    description: 'Ultra-luxurious dark mode executive layout built with precision for NFC business credentials and high-impact digital identity.',
    active: true,
    previewColor: '#080B11',
  },
  {
    id: 'twenty-twenty-four',
    name: 'Twenty Twenty-Four',
    version: '1.1',
    author: 'WordPress.org',
    description: 'Designed to be flexible, versatile and applicable to any website. It includes a collection of building blocks.',
    active: false,
    previewColor: '#f9f9f9',
  },
  {
    id: 'astra',
    name: 'Astra',
    version: '4.7.0',
    author: 'Brainstorm Force',
    description: 'Fast, fully customizable & beautiful WordPress theme suitable for blog, personal portfolio and business website.',
    active: false,
    previewColor: '#e2e8f0',
  },
];

export default function AppearancePanel({ darkMode = false }) {
  const [themes, setThemes] = useState(THEMES);
  const [toast, setToast] = useState('');

  const activateTheme = (id) => {
    setThemes(themes.map(t => ({ ...t, active: t.id === id })));
    const activeT = themes.find(t => t.id === id);
    setToast(`Theme "${activeT.name}" activated.`);
    setTimeout(() => setToast(''), 3000);
  };

  const bgCard = darkMode ? '#1e242c' : '#fff';
  const borderCard = darkMode ? '#2c3540' : '#c3c4c7';
  const textColor = darkMode ? '#f1f5f9' : '#1d2327';
  const textMuted = darkMode ? '#94a3b8' : '#646970';

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: textColor }}>Themes</h1>
        <button style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer' }}>
          Add New Theme
        </button>
      </div>

      {toast && (
        <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 16, fontSize: 13, borderRadius: 3 }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {themes.map(t => (
          <div
            key={t.id}
            style={{
              background: bgCard, border: `1px solid ${t.active ? '#2271b1' : borderCard}`,
              borderRadius: 4, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,.05)',
              position: 'relative',
            }}
          >
            {/* Theme Header Visual */}
            <div style={{
              height: 140, background: t.previewColor, display: 'flex', alignItems: 'center',
              justify: 'center', flexDirection: 'column', color: t.previewColor === '#080B11' ? '#E2B857' : '#1d2327',
              borderBottom: `1px solid ${borderCard}`, padding: 16, textAlign: 'center',
            }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{t.name}</div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>v{t.version}</div>
            </div>

            {/* Theme Body */}
            <div style={{ padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: textColor }}>{t.name}</div>
                {t.active && (
                  <span style={{ background: '#00b32c', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>
                    ACTIVE
                  </span>
                )}
              </div>
              <div style={{ fontSize: 12, color: textMuted, lineHeight: 1.5, marginBottom: 14 }}>
                {t.description}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {!t.active ? (
                  <button
                    onClick={() => activateTheme(t.id)}
                    style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}
                  >
                    Activate
                  </button>
                ) : (
                  <button
                    style={{ background: darkMode ? '#334155' : '#f0f0f1', color: textColor, border: `1px solid ${borderCard}`, borderRadius: 3, padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}
                  >
                    Customize
                  </button>
                )}
                <button style={{ background: 'none', border: 'none', color: '#2271b1', fontSize: 12, cursor: 'pointer' }}>
                  Live Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
