import React, { useState } from 'react';

const SAMPLE_IMAGES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', name: 'hero-banner.jpg', type: 'image/jpeg', size: '245 KB', date: 'Aug 28, 2026' },
  { id: 2, url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&q=80', name: 'nfc-card-01.jpg', type: 'image/jpeg', size: '187 KB', date: 'Aug 26, 2026' },
  { id: 3, url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80', name: 'tech-background.jpg', type: 'image/jpeg', size: '312 KB', date: 'Aug 25, 2026' },
  { id: 4, url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=400&q=80', name: 'business-meeting.jpg', type: 'image/jpeg', size: '278 KB', date: 'Aug 24, 2026' },
  { id: 5, url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=400&q=80', name: 'identity-card.jpg', type: 'image/jpeg', size: '203 KB', date: 'Aug 22, 2026' },
  { id: 6, url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=400&q=80', name: 'mobile-nfc.jpg', type: 'image/jpeg', size: '156 KB', date: 'Aug 20, 2026' },
];

export default function MediaLibraryPanel() {
  const [view, setView] = useState('grid'); // 'grid' | 'list'
  const [selected, setSelected] = useState(null);
  const [addUrl, setAddUrl] = useState('');
  const [images, setImages] = useState(SAMPLE_IMAGES);
  const [showAdd, setShowAdd] = useState(false);

  const toggleSelect = (img) => setSelected(selected?.id === img.id ? null : img);

  const handleAddUrl = () => {
    if (!addUrl.trim()) return;
    const name = addUrl.split('/').pop().split('?')[0] || 'uploaded-image.jpg';
    setImages([{ id: Date.now(), url: addUrl, name, type: 'image/jpeg', size: 'Unknown', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...images]);
    setAddUrl(''); setShowAdd(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this file permanently?')) return;
    setImages(images.filter(i => i.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: '#1d2327' }}>Media Library</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer' }}
        >
          Add New Media File
        </button>
      </div>

      {showAdd && (
        <div style={{ background: '#fff', border: '1px solid #c3c4c7', padding: 16, marginBottom: 16, borderRadius: 3 }}>
          <p style={{ fontSize: 13, color: '#3c434a', margin: '0 0 8px' }}>Paste an image URL to add to the library:</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text" value={addUrl} onChange={e => setAddUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              style={{ flex: 1, padding: '6px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none' }}
            />
            <button onClick={handleAddUrl} style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 12px', fontSize: 13, cursor: 'pointer' }}>Add</button>
            <button onClick={() => setShowAdd(false)} style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer', color: '#3c434a' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <select style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none' }}>
          <option>All media items</option>
          <option>Images</option>
        </select>
        <select style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none' }}>
          <option>All dates</option>
          <option>August 2026</option>
        </select>
        <button style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer', color: '#3c434a' }}>Filter</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <button onClick={() => setView('grid')} style={{ background: view === 'grid' ? '#1d2327' : '#f0f0f1', color: view === 'grid' ? '#fff' : '#3c434a', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 8px', cursor: 'pointer', fontSize: 18 }}>⊞</button>
          <button onClick={() => setView('list')} style={{ background: view === 'list' ? '#1d2327' : '#f0f0f1', color: view === 'list' ? '#fff' : '#3c434a', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 8px', cursor: 'pointer', fontSize: 18 }}>☰</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 260px' : '1fr', gap: 16, alignItems: 'start' }}>
        {/* Grid/List view */}
        {view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 4 }}>
            {images.map(img => (
              <div
                key={img.id}
                onClick={() => toggleSelect(img)}
                style={{
                  position: 'relative', paddingBottom: '75%', background: '#f0f0f1', cursor: 'pointer',
                  outline: selected?.id === img.id ? '3px solid #2271b1' : 'none',
                  outlineOffset: -3,
                }}
              >
                <img
                  src={img.url} alt={img.name}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #c3c4c7' }}>
            <thead>
              <tr>
                {['', 'File', 'Type', 'Size', 'Date', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '8px 10px', borderBottom: '1px solid #c3c4c7', fontSize: 13, fontWeight: 600, color: '#1d2327', textAlign: 'left', background: '#f9f9f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {images.map((img, i) => (
                <tr key={img.id} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0f0f1' }}>
                    <img src={img.url} alt={img.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 3 }} />
                  </td>
                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0f0f1', fontSize: 13 }}>{img.name}</td>
                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0f0f1', fontSize: 13 }}>{img.type}</td>
                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0f0f1', fontSize: 13 }}>{img.size}</td>
                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0f0f1', fontSize: 13 }}>{img.date}</td>
                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0f0f1', fontSize: 13 }}>
                    <span onClick={() => setSelected(img)} style={{ color: '#2271b1', cursor: 'pointer', textDecoration: 'underline' }}>View</span>
                    {' | '}
                    <span onClick={() => handleDelete(img.id)} style={{ color: '#d63638', cursor: 'pointer' }}>Delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Detail Panel */}
        {selected && (
          <div style={{ background: '#fff', border: '1px solid #c3c4c7', padding: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <img src={selected.url} alt={selected.name} style={{ width: '100%', borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 13, color: '#1d2327', fontWeight: 600, marginBottom: 8 }}>{selected.name}</div>
            <div style={{ fontSize: 12, color: '#646970', marginBottom: 4 }}>Type: {selected.type}</div>
            <div style={{ fontSize: 12, color: '#646970', marginBottom: 4 }}>Size: {selected.size}</div>
            <div style={{ fontSize: 12, color: '#646970', marginBottom: 12 }}>Uploaded: {selected.date}</div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#3c434a', marginBottom: 4 }}>File URL</label>
              <input type="text" value={selected.url} readOnly
                onClick={e => e.target.select()}
                style={{ width: '100%', padding: '4px 6px', fontSize: 11, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', boxSizing: 'border-box', background: '#f9f9f9' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setSelected(null)} style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#3c434a' }}>Close</button>
              <button onClick={() => handleDelete(selected.id)} style={{ background: 'none', border: 'none', color: '#d63638', fontSize: 12, cursor: 'pointer' }}>Delete permanently</button>
            </div>
          </div>
        )}
      </div>

      <div style={{ fontSize: 12, color: '#646970', marginTop: 8 }}>{images.length} item{images.length !== 1 ? 's' : ''}</div>
    </div>
  );
}
