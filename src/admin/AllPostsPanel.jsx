import React, { useState } from 'react';
import { getCustomArticles, saveCustomArticles } from '../utils/customArticles';

const STATUS_COLORS = {
  published: { color: '#00b32c', label: 'Published' },
  draft: { color: '#dba617', label: 'Draft' },
  pending: { color: '#d63638', label: 'Pending Review' },
};

export default function AllPostsPanel({ onNavigate, onEditPost }) {
  const [articles, setArticles] = useState(getCustomArticles());
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [quickEditId, setQuickEditId] = useState(null);

  // Quick edit state
  const [qeTitle, setQeTitle] = useState('');
  const [qeSlug, setQeSlug] = useState('');
  const [qeCategory, setQeCategory] = useState('');
  const [qeStatus, setQeStatus] = useState('published');
  const [qeDate, setQeDate] = useState('');

  const handleStartQuickEdit = (art) => {
    setQuickEditId(art.id);
    setQeTitle(art.title);
    setQeSlug(art.slug);
    setQeCategory(art.category || 'Uncategorized');
    setQeStatus(art.status || 'published');
    setQeDate(art.date);
  };

  const handleSaveQuickEdit = (id) => {
    const updated = articles.map(a => a.id === id ? {
      ...a,
      title: qeTitle,
      slug: qeSlug,
      category: qeCategory,
      status: qeStatus,
      date: qeDate,
    } : a);
    setArticles(updated);
    saveCustomArticles(updated);
    setQuickEditId(null);
  };

  const handleDelete = (id) => {
    const updated = articles.filter(a => a.id !== id);
    setArticles(updated);
    saveCustomArticles(updated);
    setConfirmDelete(null);
  };

  const filtered = articles.filter(art => {
    const status = art.status || 'published';
    const matchStatus = filterStatus === 'all' || status === filterStatus;
    const matchSearch = !search || art.title.toLowerCase().includes(search.toLowerCase()) || (art.category && art.category.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const counts = {
    all: articles.length,
    published: articles.filter(a => (a.status || 'published') === 'published').length,
    draft: articles.filter(a => a.status === 'draft').length,
    pending: articles.filter(a => a.status === 'pending').length,
  };

  const thStyle = { padding: '8px 10px', borderBottom: '1px solid #c3c4c7', fontSize: 13, fontWeight: 600, color: '#1d2327', textAlign: 'left', background: '#f9f9f9' };
  const tdStyle = { padding: '8px 10px', borderBottom: '1px solid #f0f0f1', fontSize: 13, verticalAlign: 'top' };
  const inputStyle = { padding: '4px 6px', fontSize: 12, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Title & Add New button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: '#1d2327' }}>Posts</h1>
        <button
          onClick={() => onNavigate('add-new')}
          style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer' }}
        >
          Add New Post
        </button>
      </div>

      {/* Filter status tabs */}
      <div style={{ marginBottom: 8, fontSize: 13 }}>
        {['all', 'published', 'draft', 'pending'].map(s => (
          <span key={s}>
            <button
              onClick={() => setFilterStatus(s)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
                color: filterStatus === s ? '#1d2327' : '#2271b1',
                fontWeight: filterStatus === s ? 700 : 400, fontSize: 13,
                textDecoration: filterStatus === s ? 'none' : 'underline',
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s] || 0})
            </button>
            {s !== 'pending' && <span style={{ color: '#c3c4c7', margin: '0 4px' }}>|</span>}
          </span>
        ))}
      </div>

      {/* Bulk actions & search toolbar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        <select style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none' }}>
          <option>Bulk actions</option>
          <option>Edit</option>
          <option>Move to Trash</option>
        </select>
        <button style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer', color: '#3c434a' }}>
          Apply
        </button>

        <select style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none' }}>
          <option>All dates</option>
          <option>August 2026</option>
          <option>July 2026</option>
        </select>
        <select style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none' }}>
          <option>All Categories</option>
          <option>Smart Hardware</option>
          <option>Design Strategy</option>
        </select>
        <button style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer', color: '#3c434a' }}>
          Filter
        </button>

        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search posts..."
          style={{ marginLeft: 'auto', padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, width: 200, outline: 'none' }}
        />
        <button style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer', color: '#3c434a' }}>
          Search Posts
        </button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #c3c4c7', padding: 24, textAlign: 'center', color: '#646970', fontSize: 14 }}>
          No posts found.
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: 16 }}><input type="checkbox" /></th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Author</th>
              <th style={thStyle}>Categories</th>
              <th style={thStyle}>SEO Score</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((art, i) => {
              const status = art.status || 'published';
              const statusInfo = STATUS_COLORS[status] || STATUS_COLORS.published;
              const score = art.seoScore || 0;
              const scoreColor = score >= 80 ? '#00b32c' : score >= 50 ? '#dba617' : '#d63638';
              const isQuickEditing = quickEditId === art.id;

              if (isQuickEditing) {
                return (
                  <tr key={art.id} style={{ background: '#f0f6fc', borderLeft: '4px solid #2271b1' }}>
                    <td colSpan={6} style={{ padding: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1d2327', marginBottom: 8 }}>QUICK EDIT</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 180px 140px', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#3c434a', marginBottom: 2 }}>Title</label>
                          <input type="text" value={qeTitle} onChange={e => setQeTitle(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#3c434a', marginBottom: 2 }}>Slug</label>
                          <input type="text" value={qeSlug} onChange={e => setQeSlug(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#3c434a', marginBottom: 2 }}>Category</label>
                          <select value={qeCategory} onChange={e => setQeCategory(e.target.value)} style={inputStyle}>
                            <option value="Smart Hardware">Smart Hardware</option>
                            <option value="Design Strategy">Design Strategy</option>
                            <option value="Executive Strategy">Executive Strategy</option>
                            <option value="Personal Branding">Personal Branding</option>
                            <option value="Uncategorized">Uncategorized</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#3c434a', marginBottom: 2 }}>Status</label>
                          <select value={qeStatus} onChange={e => setQeStatus(e.target.value)} style={inputStyle}>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="pending">Pending Review</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button onClick={() => setQuickEditId(null)} style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#3c434a' }}>Cancel</button>
                        <button onClick={() => handleSaveQuickEdit(art.id)} style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 12px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Update Post</button>
                      </div>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={art.id} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  <td style={tdStyle}><input type="checkbox" /></td>
                  <td style={tdStyle}>
                    <div>
                      <strong
                        style={{ color: '#2271b1', cursor: 'pointer', fontSize: 13 }}
                        onClick={() => onEditPost(art)}
                      >
                        {art.title}
                      </strong>
                      {' '}
                      <span style={{ ...statusInfo, padding: '1px 6px', borderRadius: 2, fontSize: 11, fontWeight: 500 }}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="row-actions" style={{ marginTop: 3, fontSize: 12, color: '#646970' }}>
                      <span>
                        <span
                          onClick={() => onEditPost(art)}
                          style={{ color: '#2271b1', cursor: 'pointer', textDecoration: 'underline' }}
                        >Edit</span>
                        {' | '}
                        <span
                          onClick={() => handleStartQuickEdit(art)}
                          style={{ color: '#2271b1', cursor: 'pointer' }}
                        >Quick Edit</span>
                        {' | '}
                        <span
                          onClick={() => setConfirmDelete(art.id)}
                          style={{ color: '#d63638', cursor: 'pointer' }}
                        >Trash</span>
                        {' | '}
                        <a href={`/blog/${art.slug}`} target="_blank" rel="noreferrer" style={{ color: '#2271b1' }}>View</a>
                      </span>
                    </div>
                    {confirmDelete === art.id && (
                      <div style={{ marginTop: 4, background: '#fcf0f1', border: '1px solid #d63638', padding: '4px 8px', borderRadius: 3, fontSize: 12 }}>
                        Are you sure?{' '}
                        <span onClick={() => handleDelete(art.id)} style={{ color: '#d63638', cursor: 'pointer', fontWeight: 600 }}>Delete</span>
                        {' | '}
                        <span onClick={() => setConfirmDelete(null)} style={{ color: '#2271b1', cursor: 'pointer' }}>Cancel</span>
                      </div>
                    )}
                  </td>
                  <td style={tdStyle}>
                    <span style={{ color: '#2271b1', cursor: 'pointer' }}>Admin</span>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ color: '#2271b1', cursor: 'pointer', fontSize: 13 }}>{art.category || 'Uncategorized'}</span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: '50%', background: scoreColor, flexShrink: 0,
                      }} />
                      <span style={{ fontSize: 12, color: scoreColor, fontWeight: 600 }}>{score}/100</span>
                    </div>
                  </td>
                  <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: 13, color: '#3c434a' }}>{art.date}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div style={{ fontSize: 12, color: '#646970', marginTop: 8 }}>
        {filtered.length} item{filtered.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
