import React, { useState, useEffect, useRef } from 'react';
import { getAllMedia, addMedia, deleteMedia, updateMedia } from '../utils/mediaStorage';

export default function MediaLibraryPanel() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState('grid');
  const [selected, setSelected] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [search, setSearch] = useState('');
  const [altEdit, setAltEdit] = useState('');
  const [captionEdit, setCaptionEdit] = useState('');
  const [toast, setToast] = useState('');
  const fileRef = useRef(null);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    loadMedia();
  }, []);

  useEffect(() => {
    if (selected) {
      setAltEdit(selected.alt || '');
      setCaptionEdit(selected.caption || '');
    }
  }, [selected]);

  const loadMedia = async () => {
    try {
      const all = await getAllMedia();
      setItems(all);
    } catch (e) {
      console.error('Media load error', e);
    }
  };

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    let count = 0;
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      try {
        await addMedia(file);
        count++;
      } catch (e) {
        console.error('Upload failed:', file.name, e);
      }
    }
    await loadMedia();
    setUploading(false);
    showToast(`${count} file${count !== 1 ? 's' : ''} uploaded successfully.`);
  };

  const handleFileInput = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this file permanently? This cannot be undone.')) return;
    await deleteMedia(id);
    if (selected?.id === id) setSelected(null);
    await loadMedia();
    showToast('File deleted.');
  };

  const handleSaveDetails = async () => {
    if (!selected) return;
    const updated = await updateMedia(selected.id, { alt: altEdit, caption: captionEdit });
    setSelected(updated);
    await loadMedia();
    showToast('Image details saved.');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = items.filter(item =>
    !search || item.name.toLowerCase().includes(search.toLowerCase())
  );

  const thStyle = { padding: '8px 10px', borderBottom: '1px solid #c3c4c7', fontSize: 13, fontWeight: 600, color: '#1d2327', textAlign: 'left', background: '#f9f9f9' };
  const tdStyle = { padding: '8px 10px', borderBottom: '1px solid #f0f0f1', fontSize: 13, verticalAlign: 'middle' };
  const inputStyle = { width: '100%', padding: '5px 7px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: '#3c434a', marginBottom: 3, marginTop: 10 };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: '#1d2327' }}>Media Library</h1>
        <button
          onClick={() => fileRef.current.click()}
          style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer' }}
        >
          Add New Media File
        </button>
        <input ref={fileRef} type="file" multiple accept="image/*,video/*" onChange={handleFileInput} style={{ display: 'none' }} />
      </div>

      {toast && (
        <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 12, fontSize: 13, borderRadius: 3 }}>
          {toast}
        </div>
      )}

      {/* Drop Zone (shown when library is empty or dragging) */}
      <div
        ref={dropZoneRef}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { if (!dropZoneRef.current.contains(e.relatedTarget)) setIsDragging(false); }}
        onDrop={handleDrop}
        onClick={() => items.length === 0 && fileRef.current.click()}
        style={{
          border: `2px dashed ${isDragging ? '#2271b1' : '#c3c4c7'}`,
          background: isDragging ? '#f0f6fc' : '#fafafa',
          borderRadius: 3, padding: items.length === 0 ? '40px 20px' : '10px 20px',
          textAlign: 'center', marginBottom: 12, transition: 'all 0.15s',
          cursor: items.length === 0 ? 'pointer' : 'default',
          display: items.length === 0 || isDragging ? 'block' : 'none',
        }}
      >
        {uploading ? (
          <div style={{ fontSize: 15, color: '#2271b1', fontWeight: 600 }}>Uploading files…</div>
        ) : (
          <>
            <div style={{ fontSize: 36, marginBottom: 8, opacity: 0.4 }}>⬆</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1d2327', marginBottom: 4 }}>
              {isDragging ? 'Drop to upload' : 'Drop files here or click to select'}
            </div>
            <div style={{ fontSize: 12, color: '#646970' }}>Supports JPG, PNG, GIF, WebP, SVG, MP4</div>
          </>
        )}
      </div>

      {/* Toolbar (only when items exist) */}
      {items.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <select style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none' }}>
            <option>All media items</option>
            <option>Images</option>
          </select>
          <input type="search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search media…"
            style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', width: 200 }} />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
            <button onClick={() => setView('grid')}
              title="Grid view"
              style={{ background: view === 'grid' ? '#1d2327' : '#f0f0f1', color: view === 'grid' ? '#fff' : '#3c434a', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 10px', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>
              ⊞
            </button>
            <button onClick={() => setView('list')}
              title="List view"
              style={{ background: view === 'list' ? '#1d2327' : '#f0f0f1', color: view === 'list' ? '#fff' : '#3c434a', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 10px', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>
              ☰
            </button>
          </div>
        </div>
      )}

      {uploading && items.length > 0 && (
        <div style={{ background: '#cfe2ff', color: '#084298', padding: '8px 12px', marginBottom: 12, fontSize: 13, borderRadius: 3 }}>
          Uploading…
        </div>
      )}

      {/* Main content: grid or list + detail panel */}
      {items.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 300px' : '1fr', gap: 16, alignItems: 'start' }}>

          {/* Grid View */}
          {view === 'grid' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 4 }}>
              {/* Upload slot */}
              <div
                onClick={() => fileRef.current.click()}
                style={{
                  paddingBottom: '100%', position: 'relative', background: '#f0f0f1', borderRadius: 2,
                  cursor: 'pointer', border: '2px dashed #c3c4c7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <span style={{ fontSize: 24, color: '#646970', opacity: 0.6 }}>+</span>
                  <span style={{ fontSize: 11, color: '#646970' }}>Upload</span>
                </div>
              </div>

              {filtered.map(item => {
                const isSel = selected?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelected(isSel ? null : item)}
                    style={{
                      position: 'relative', paddingBottom: '100%', background: '#eee', cursor: 'pointer', borderRadius: 2,
                      outline: isSel ? '3px solid #2271b1' : '2px solid transparent',
                      outlineOffset: isSel ? -3 : 0, transition: 'outline 0.1s',
                    }}
                  >
                    <img src={item.dataUrl} alt={item.alt || item.name}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }} />
                    {isSel && (
                      <div style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, background: '#2271b1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* List View */}
          {view === 'list' && (
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #c3c4c7' }}>
              <thead>
                <tr>
                  {['', 'File', 'Author', 'Upload date', 'Actions'].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <tr key={item.id} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9', cursor: 'pointer' }} onClick={() => setSelected(item)}>
                    <td style={tdStyle}>
                      <img src={item.dataUrl} alt={item.alt || item.name} style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 2, display: 'block' }} />
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 600, color: '#2271b1', fontSize: 13 }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: '#646970', marginTop: 2 }}>{item.type} &mdash; {item.size}</div>
                    </td>
                    <td style={tdStyle}>Admin</td>
                    <td style={tdStyle}>{item.date}</td>
                    <td style={tdStyle}>
                      <span onClick={(e) => { e.stopPropagation(); setSelected(item); }}
                        style={{ color: '#2271b1', cursor: 'pointer', textDecoration: 'underline', fontSize: 12 }}>View</span>
                      {' | '}
                      <span onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                        style={{ color: '#d63638', cursor: 'pointer', fontSize: 12 }}>Delete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Detail panel */}
          {selected && (
            <div style={{ background: '#fff', border: '1px solid #c3c4c7', padding: 16, boxShadow: '0 1px 1px rgba(0,0,0,.04)', position: 'sticky', top: 20 }}>
              <div style={{ marginBottom: 12 }}>
                <img src={selected.dataUrl} alt={selected.alt || selected.name}
                  style={{ width: '100%', borderRadius: 3, border: '1px solid #c3c4c7', objectFit: 'contain', maxHeight: 200, background: '#f9f9f9' }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1d2327', marginBottom: 6, wordBreak: 'break-all' }}>
                {selected.name}
              </div>
              <div style={{ fontSize: 11, color: '#646970', lineHeight: 1.8, borderBottom: '1px solid #f0f0f1', paddingBottom: 10, marginBottom: 4 }}>
                <div><strong>Uploaded:</strong> {selected.date}</div>
                <div><strong>Type:</strong> {selected.type}</div>
                <div><strong>Size:</strong> {selected.size}</div>
              </div>

              <label style={labelStyle}>Alt Text</label>
              <input type="text" value={altEdit} onChange={e => setAltEdit(e.target.value)}
                placeholder="Describe the image (for accessibility & SEO)" style={inputStyle} />
              <p style={{ fontSize: 11, color: '#646970', margin: '3px 0 0', lineHeight: 1.4 }}>
                Leave empty if the image is purely decorative.
              </p>

              <label style={labelStyle}>Caption</label>
              <textarea value={captionEdit} onChange={e => setCaptionEdit(e.target.value)}
                rows={2} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Optional caption…" />

              <label style={labelStyle}>Copy URL</label>
              <div style={{ display: 'flex', gap: 4 }}>
                <input type="text" readOnly value={selected.dataUrl ? selected.dataUrl.slice(0, 40) + '…' : ''} 
                  onClick={() => navigator.clipboard?.writeText(selected.dataUrl)}
                  style={{ ...inputStyle, background: '#f9f9f9', fontSize: 11, color: '#646970', cursor: 'copy', flex: 1 }} />
                <button
                  onClick={() => { navigator.clipboard?.writeText(selected.dataUrl); showToast('URL copied!'); }}
                  style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 8px', fontSize: 12, cursor: 'pointer', color: '#3c434a', whiteSpace: 'nowrap' }}>
                  Copy
                </button>
              </div>

              <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={handleSaveDetails}
                  style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}>
                  Save Details
                </button>
                <button onClick={() => handleDelete(selected.id)}
                  style={{ background: 'none', border: 'none', color: '#d63638', cursor: 'pointer', fontSize: 12 }}>
                  Delete permanently
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ fontSize: 12, color: '#646970', marginTop: 8 }}>
        {filtered.length} item{filtered.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
