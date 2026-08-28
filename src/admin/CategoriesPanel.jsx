import React, { useState } from 'react';

const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Design Strategy', slug: 'design-strategy', description: 'Posts about design thinking and strategy.', count: 4 },
  { id: 2, name: 'Smart Hardware', slug: 'smart-hardware', description: 'NFC and smart hardware solutions.', count: 7 },
  { id: 3, name: 'NFC Technology', slug: 'nfc-technology', description: 'All things NFC.', count: 5 },
  { id: 4, name: 'Brand Identity', slug: 'brand-identity', description: 'Brand design and identity systems.', count: 3 },
  { id: 5, name: 'Networking', slug: 'networking', description: 'Professional networking strategies.', count: 6 },
  { id: 6, name: 'Digital Innovation', slug: 'digital-innovation', description: 'Digital transformation insights.', count: 2 },
  { id: 7, name: 'Uncategorized', slug: 'uncategorized', description: 'Default category.', count: 1 },
];

const STORAGE_KEY = 'identifine_categories';

function getCategories() {
  try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : DEFAULT_CATEGORIES; } catch { return DEFAULT_CATEGORIES; }
}
function saveCategories(cats) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cats)); } catch {}
}

export default function CategoriesPanel() {
  const [categories, setCategories] = useState(getCategories());
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [parent, setParent] = useState('none');
  const [toast, setToast] = useState('');
  const [editId, setEditId] = useState(null);

  const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const finalSlug = slug.trim() || slugify(name);
    const newCat = { id: Date.now(), name: name.trim(), slug: finalSlug, description, count: 0 };
    const updated = editId
      ? categories.map(c => c.id === editId ? { ...c, name: name.trim(), slug: finalSlug, description } : c)
      : [newCat, ...categories];
    setCategories(updated);
    saveCategories(updated);
    setName(''); setSlug(''); setDescription(''); setEditId(null);
    setToast(editId ? 'Category updated.' : 'Category added.');
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this category?')) return;
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    saveCategories(updated);
  };

  const handleEdit = (cat) => {
    setEditId(cat.id); setName(cat.name); setSlug(cat.slug); setDescription(cat.description || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const thStyle = { padding: '8px 10px', borderBottom: '1px solid #c3c4c7', fontSize: 13, fontWeight: 600, color: '#1d2327', textAlign: 'left', background: '#f9f9f9' };
  const tdStyle = { padding: '8px 10px', borderBottom: '1px solid #f0f0f1', fontSize: 13, verticalAlign: 'top' };
  const inputStyle = { width: '100%', padding: '6px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#3c434a', marginBottom: 4 };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h1 style={{ fontSize: 23, fontWeight: 400, margin: '0 0 20px', color: '#1d2327' }}>Categories</h1>

      {toast && (
        <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 16, fontSize: 13, borderRadius: 3 }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Add/Edit Form */}
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#1d2327', margin: '0 0 16px' }}>
            {editId ? 'Edit Category' : 'Add New Category'}
          </h2>
          <form onSubmit={handleAdd}>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Name <span style={{ color: '#d63638' }}>*</span></label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Category name" style={inputStyle} />
              <p style={{ fontSize: 11, color: '#646970', marginTop: 4 }}>The name is how it appears on your site.</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Slug</label>
              <input type="text" value={slug} onChange={e => setSlug(e.target.value)} placeholder="category-slug" style={inputStyle} />
              <p style={{ fontSize: 11, color: '#646970', marginTop: 4 }}>The slug is the URL-friendly version of the name.</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Parent Category</label>
              <select value={parent} onChange={e => setParent(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="none">None</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <p style={{ fontSize: 11, color: '#646970', marginTop: 4 }}>Categories can have a hierarchy (like tags, but organized).</p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Optional description..." />
              <p style={{ fontSize: 11, color: '#646970', marginTop: 4 }}>The description is not prominent by default.</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}>
                {editId ? 'Update' : 'Add New Category'}
              </button>
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setName(''); setSlug(''); setDescription(''); }}
                  style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '6px 10px', fontSize: 13, cursor: 'pointer', color: '#3c434a' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Categories Table */}
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: 16 }}><input type="checkbox" /></th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Slug</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Count</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={cat.id} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  <td style={tdStyle}><input type="checkbox" /></td>
                  <td style={tdStyle}>
                    <div>
                      <strong style={{ color: '#2271b1', cursor: 'pointer' }} onClick={() => handleEdit(cat)}>{cat.name}</strong>
                    </div>
                    <div style={{ marginTop: 3, fontSize: 12, color: '#646970' }}>
                      <span onClick={() => handleEdit(cat)} style={{ color: '#2271b1', cursor: 'pointer', textDecoration: 'underline' }}>Edit</span>
                      {' | '}
                      <span onClick={() => handleDelete(cat.id)} style={{ color: '#d63638', cursor: 'pointer' }}>Delete</span>
                      {' | '}
                      <span style={{ color: '#2271b1', cursor: 'pointer' }}>View</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{cat.slug}</td>
                  <td style={tdStyle}>{cat.description || '—'}</td>
                  <td style={tdStyle}>{cat.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 12, color: '#646970', marginTop: 8 }}>{categories.length} item{categories.length !== 1 ? 's' : ''}</div>
        </div>
      </div>
    </div>
  );
}
