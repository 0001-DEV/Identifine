import React, { useState } from 'react';

// Identical structure to CategoriesPanel but for Tags
const DEFAULT_TAGS = [
  { id: 1, name: 'NFC', slug: 'nfc', description: 'Near Field Communication technology', count: 8 },
  { id: 2, name: 'Business Cards', slug: 'business-cards', description: '', count: 6 },
  { id: 3, name: 'Networking', slug: 'networking', description: 'Professional networking', count: 5 },
  { id: 4, name: 'Identity', slug: 'identity', description: 'Brand identity', count: 4 },
  { id: 5, name: 'Digital', slug: 'digital', description: 'Digital solutions', count: 7 },
  { id: 6, name: 'Smart Cards', slug: 'smart-cards', description: '', count: 3 },
];

const STORAGE_KEY = 'identifine_tags';

function getTags() {
  try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : DEFAULT_TAGS; } catch { return DEFAULT_TAGS; }
}
function saveTags(tags) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tags)); } catch {}
}

export default function TagsPanel() {
  const [tags, setTags] = useState(getTags());
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [toast, setToast] = useState('');
  const [editId, setEditId] = useState(null);

  const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const finalSlug = slug.trim() || slugify(name);
    const newTag = { id: Date.now(), name: name.trim(), slug: finalSlug, description, count: 0 };
    const updated = editId
      ? tags.map(t => t.id === editId ? { ...t, name: name.trim(), slug: finalSlug, description } : t)
      : [newTag, ...tags];
    setTags(updated); saveTags(updated);
    setName(''); setSlug(''); setDescription(''); setEditId(null);
    setToast(editId ? 'Tag updated.' : 'Tag added.'); setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this tag?')) return;
    const updated = tags.filter(t => t.id !== id); setTags(updated); saveTags(updated);
  };

  const handleEdit = (tag) => {
    setEditId(tag.id); setName(tag.name); setSlug(tag.slug); setDescription(tag.description || '');
  };

  const thStyle = { padding: '8px 10px', borderBottom: '1px solid #c3c4c7', fontSize: 13, fontWeight: 600, color: '#1d2327', textAlign: 'left', background: '#f9f9f9' };
  const tdStyle = { padding: '8px 10px', borderBottom: '1px solid #f0f0f1', fontSize: 13, verticalAlign: 'top' };
  const inputStyle = { width: '100%', padding: '6px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#3c434a', marginBottom: 4 };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h1 style={{ fontSize: 23, fontWeight: 400, margin: '0 0 20px', color: '#1d2327' }}>Tags</h1>
      {toast && (
        <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 16, fontSize: 13, borderRadius: 3 }}>
          {toast}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#1d2327', margin: '0 0 16px' }}>{editId ? 'Edit Tag' : 'Add New Tag'}</h2>
          <form onSubmit={handleAdd}>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Name <span style={{ color: '#d63638' }}>*</span></label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Tag name" style={inputStyle} />
              <p style={{ fontSize: 11, color: '#646970', marginTop: 4 }}>The name is how it appears on your site.</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Slug</label>
              <input type="text" value={slug} onChange={e => setSlug(e.target.value)} placeholder="tag-slug" style={inputStyle} />
              <p style={{ fontSize: 11, color: '#646970', marginTop: 4 }}>The slug is the URL-friendly version.</p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
              <p style={{ fontSize: 11, color: '#646970', marginTop: 4 }}>The description is not prominent by default.</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}>
                {editId ? 'Update' : 'Add New Tag'}
              </button>
              {editId && <button type="button" onClick={() => { setEditId(null); setName(''); setSlug(''); setDescription(''); }} style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '6px 10px', fontSize: 13, cursor: 'pointer', color: '#3c434a' }}>Cancel</button>}
            </div>
          </form>
        </div>
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: 16 }}><input type="checkbox" /></th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Slug</th>
                <th style={thStyle}>Count</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, i) => (
                <tr key={tag.id} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  <td style={tdStyle}><input type="checkbox" /></td>
                  <td style={tdStyle}>
                    <strong style={{ color: '#2271b1', cursor: 'pointer' }} onClick={() => handleEdit(tag)}>{tag.name}</strong>
                    <div style={{ marginTop: 3, fontSize: 12, color: '#646970' }}>
                      <span onClick={() => handleEdit(tag)} style={{ color: '#2271b1', cursor: 'pointer', textDecoration: 'underline' }}>Edit</span>
                      {' | '}
                      <span onClick={() => handleDelete(tag.id)} style={{ color: '#d63638', cursor: 'pointer' }}>Delete</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{tag.slug}</td>
                  <td style={tdStyle}>{tag.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
