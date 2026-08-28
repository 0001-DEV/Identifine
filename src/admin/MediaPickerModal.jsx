import React, { useState, useEffect, useRef } from 'react';
import { getAllMedia, addMedia, deleteMedia } from '../utils/mediaStorage';

/**
 * WordPress-style Media Picker Modal.
 * Props:
 *   onSelect(item)  — called when user clicks "Set featured image" / "Use this media"
 *   onClose()       — called when modal is dismissed
 *   title           — optional modal title (default: "Select or Upload Media")
 */
export default function MediaPickerModal({ onSelect, onClose, title = 'Select or Upload Media' }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'upload'
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'image' | 'video'
  const [isDragging, setIsDragging] = useState(false);
  const [altEdit, setAltEdit] = useState('');
  const [captionEdit, setCaptionEdit] = useState('');
  const dropRef = useRef(null);
  const fileRef = useRef(null);

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
      console.error('Media load error:', e);
    }
  };

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setActiveTab('library');
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      try {
        await addMedia(file);
      } catch (e) {
        console.error('Upload error:', e);
      }
    }
    await loadMedia();
    setUploading(false);
  };

  const handleFileInput = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this file permanently?')) return;
    await deleteMedia(id);
    setSelected(null);
    await loadMedia();
  };

  const handleSelect = () => {
    if (!selected) return;
    onSelect({ ...selected, url: selected.dataUrl });
  };

  const filtered = items.filter(item => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || item.type.startsWith(filter);
    return matchSearch && matchFilter;
  });

  // Styles
  const s = {
    overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
    modal: { background: '#fff', width: '90vw', maxWidth: 1000, height: '85vh', display: 'flex', flexDirection: 'column', borderRadius: 4, overflow: 'hidden', boxShadow: '0 5px 40px rgba(0,0,0,.5)' },
    header: { background: '#1d2327', color: '#fff', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 },
    tabs: { display: 'flex', borderBottom: '1px solid #c3c4c7', background: '#f9f9f9', flexShrink: 0 },
    tab: (active) => ({ padding: '10px 20px', cursor: 'pointer', fontSize: 14, border: 'none', background: 'none', fontFamily: 'inherit', borderBottom: active ? '2px solid #2271b1' : '2px solid transparent', color: active ? '#2271b1' : '#3c434a', fontWeight: active ? 600 : 400 }),
    toolbar: { padding: '8px 16px', borderBottom: '1px solid #f0f0f1', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 },
    body: { display: 'flex', flex: 1, overflow: 'hidden' },
    grid: { flex: 1, overflowY: 'auto', padding: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8, alignContent: 'start' },
    detail: { width: 280, borderLeft: '1px solid #c3c4c7', padding: 16, overflowY: 'auto', flexShrink: 0, background: '#fff' },
    footer: { background: '#f9f9f9', borderTop: '1px solid #c3c4c7', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, flexShrink: 0 },
    input: { width: '100%', padding: '5px 7px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' },
    label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#3c434a', marginBottom: 3, marginTop: 12 },
  };

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>

        {/* Header */}
        <div style={s.header}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 400 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', lineHeight: 1, opacity: 0.8 }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          <button style={s.tab(activeTab === 'library')} onClick={() => setActiveTab('library')}>Media Library</button>
          <button style={s.tab(activeTab === 'upload')} onClick={() => setActiveTab('upload')}>Upload Files</button>
        </div>

        {/* Upload tab */}
        {activeTab === 'upload' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
            <div
              ref={dropRef}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
              style={{
                border: `2px dashed ${isDragging ? '#2271b1' : '#c3c4c7'}`,
                borderRadius: 4, padding: '60px 40px', textAlign: 'center', cursor: 'pointer',
                background: isDragging ? '#f0f6fc' : '#fafafa', width: '100%', maxWidth: 500, boxSizing: 'border-box',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.5 }}>⬆</div>
              {uploading ? (
                <div style={{ fontSize: 15, color: '#2271b1', fontWeight: 600 }}>Uploading…</div>
              ) : (
                <>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1d2327', marginBottom: 8 }}>Drop files to upload</div>
                  <div style={{ fontSize: 13, color: '#646970', marginBottom: 16 }}>or</div>
                  <div style={{ display: 'inline-block', background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '6px 14px', fontSize: 13, fontWeight: 400 }}>
                    Select Files
                  </div>
                  <div style={{ fontSize: 11, color: '#646970', marginTop: 12 }}>Maximum upload file size: 10 MB. Supported: JPG, PNG, GIF, WebP, SVG</div>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleFileInput} style={{ display: 'none' }} />
          </div>
        )}

        {/* Library tab */}
        {activeTab === 'library' && (
          <>
            {/* Toolbar */}
            <div style={s.toolbar}>
              <select value={filter} onChange={e => setFilter(e.target.value)}
                style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none' }}>
                <option value="all">All media items</option>
                <option value="image">Images</option>
              </select>
              <input type="search" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search media…"
                style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', width: 180 }} />
              <button onClick={() => fileRef.current.click()}
                style={{ marginLeft: 'auto', background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 12px', fontSize: 13, cursor: 'pointer' }}>
                + Upload New
              </button>
              <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleFileInput} style={{ display: 'none' }} />
            </div>

            <div style={s.body}>
              {/* Image Grid */}
              <div style={s.grid}>
                {filtered.length === 0 && (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#646970', fontSize: 14, padding: 40 }}>
                    {uploading ? 'Uploading…' : 'No media files found. Upload some images!'}
                  </div>
                )}
                {filtered.map(item => {
                  const isSelected = selected?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelected(item)}
                      style={{
                        position: 'relative', paddingBottom: '100%', background: '#f0f0f1',
                        cursor: 'pointer', borderRadius: 2,
                        outline: isSelected ? '3px solid #2271b1' : '2px solid transparent',
                        outlineOffset: isSelected ? -3 : 0,
                        transition: 'outline 0.1s',
                      }}
                    >
                      <img
                        src={item.dataUrl}
                        alt={item.alt || item.name}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
                      />
                      {isSelected && (
                        <div style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, background: '#2271b1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Detail panel — only shown when item selected */}
              {selected && (
                <div style={s.detail}>
                  <div style={{ marginBottom: 12 }}>
                    <img src={selected.dataUrl} alt={selected.alt || selected.name}
                      style={{ width: '100%', borderRadius: 3, border: '1px solid #c3c4c7', objectFit: 'cover', maxHeight: 180 }} />
                  </div>
                  <div style={{ borderTop: '1px solid #f0f0f1', paddingTop: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1d2327', marginBottom: 6, wordBreak: 'break-all' }}>{selected.name}</div>
                    <div style={{ fontSize: 11, color: '#646970', lineHeight: 1.7 }}>
                      <div>{selected.date}</div>
                      <div>{selected.size}</div>
                      <div>{selected.type}</div>
                    </div>
                    <label style={s.label}>Alt Text</label>
                    <input type="text" value={altEdit} onChange={e => setAltEdit(e.target.value)} style={s.input} placeholder="Describe the image…" />
                    <p style={{ fontSize: 11, color: '#646970', margin: '4px 0 0', lineHeight: 1.4 }}>Helpful for accessibility and SEO.</p>
                    <label style={s.label}>Caption</label>
                    <textarea value={captionEdit} onChange={e => setCaptionEdit(e.target.value)} rows={2} style={{ ...s.input, resize: 'vertical' }} placeholder="Optional caption…" />
                    <label style={s.label}>File URL</label>
                    <input type="text" value="(Stored locally)" readOnly style={{ ...s.input, background: '#f9f9f9', color: '#646970', fontSize: 11 }} />
                    <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                      <button onClick={async () => { await deleteMedia(selected.id); setSelected(null); loadMedia(); }}
                        style={{ background: 'none', border: 'none', color: '#d63638', cursor: 'pointer', fontSize: 12, padding: 0 }}>
                        Delete permanently
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div style={s.footer}>
          <div style={{ flex: 1, fontSize: 12, color: '#646970' }}>
            {selected ? `Selected: ${selected.name}` : `${filtered.length} item${filtered.length !== 1 ? 's' : ''}`}
          </div>
          <button onClick={onClose}
            style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '6px 14px', fontSize: 13, cursor: 'pointer', color: '#3c434a' }}>
            Cancel
          </button>
          <button
            onClick={handleSelect}
            disabled={!selected}
            style={{
              background: selected ? '#2271b1' : '#c3c4c7',
              color: '#fff', border: selected ? '1px solid #135e96' : '1px solid #b3b4b6',
              borderRadius: 3, padding: '6px 14px', fontSize: 13,
              cursor: selected ? 'pointer' : 'not-allowed', fontWeight: 600,
            }}
          >
            Set featured image
          </button>
        </div>
      </div>
    </div>
  );
}
