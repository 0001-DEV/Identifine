import React from 'react';

const PAGES = [
  { id: 1, title: 'Home', slug: '/', status: 'Published', date: 'Aug 27, 2026', author: 'Admin' },
  { id: 2, title: 'Blog', slug: '/blog', status: 'Published', date: 'Aug 27, 2026', author: 'Admin' },
  { id: 3, title: 'Product Catalogue', slug: '/catalogue', status: 'Published', date: 'Aug 20, 2026', author: 'Admin' },
  { id: 4, title: 'Terms & Conditions', slug: '/terms', status: 'Published', date: 'Aug 15, 2026', author: 'Admin' },
  { id: 5, title: 'Privacy Policy', slug: '/privacy-policy', status: 'Draft', date: 'Aug 10, 2026', author: 'Admin' },
];

export default function PagesPanel({ darkMode = false }) {
  const bgCard = darkMode ? '#1e242c' : '#fff';
  const borderCard = darkMode ? '#2c3540' : '#c3c4c7';
  const textColor = darkMode ? '#f1f5f9' : '#1d2327';
  const textMuted = darkMode ? '#94a3b8' : '#646970';
  const tableHeaderBg = darkMode ? '#151a21' : '#f9f9f9';

  const thStyle = { padding: '8px 10px', borderBottom: `1px solid ${borderCard}`, fontSize: 13, fontWeight: 600, color: textColor, textAlign: 'left', background: tableHeaderBg };
  const tdStyle = { padding: '10px 10px', borderBottom: `1px solid ${darkMode ? '#232c37' : '#f0f0f1'}`, fontSize: 13, verticalAlign: 'top' };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: textColor }}>Pages</h1>
        <button style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer' }}>
          Add New Page
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: bgCard, border: `1px solid ${borderCard}`, boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: 20 }}><input type="checkbox" /></th>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Author</th>
            <th style={thStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {PAGES.map((p, i) => (
            <tr key={p.id} style={{ background: i % 2 === 0 ? bgCard : (darkMode ? '#151a21' : '#f9f9f9') }}>
              <td style={tdStyle}><input type="checkbox" /></td>
              <td style={tdStyle}>
                <strong style={{ color: '#2271b1', cursor: 'pointer' }}>{p.title}</strong>
                {p.status === 'Draft' && <span style={{ color: textMuted, marginLeft: 6, fontSize: 12 }}>— Draft</span>}
                <div style={{ marginTop: 4, fontSize: 12, color: textMuted }}>
                  <span style={{ color: '#2271b1', cursor: 'pointer' }}>Edit</span>
                  {' | '}
                  <span style={{ color: '#d63638', cursor: 'pointer' }}>Trash</span>
                  {' | '}
                  <a href={p.slug} target="_blank" rel="noreferrer" style={{ color: '#2271b1', textDecoration: 'none' }}>View</a>
                </div>
              </td>
              <td style={tdStyle}>{p.author}</td>
              <td style={tdStyle}>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
