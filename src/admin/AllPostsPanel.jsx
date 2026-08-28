import React, { useState } from 'react';
import { getCustomArticles, saveCustomArticles } from '../pages/BlogAdminPage';

const STATUS_COLORS = {
  published: { bg: '#d1e7dd', color: '#0a3622', label: 'Published' },
  draft: { bg: '#fff3cd', color: '#664d03', label: 'Draft' },
  pending: { bg: '#cfe2ff', color: '#084298', label: 'Pending Review' },
};

export default function AllPostsPanel({ onNavigate, onEditPost }) {
  const [articles, setArticles] = useState(getCustomArticles());
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = (id) => {
    const updated = articles.filter(a => a.id !== id);
    setArticles(updated);
    saveCustomArticles(updated);
    setConfirmDelete(null);
  };

  const filtered = articles.filter(a => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || (a.status || 'published') === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: articles.length,
    published: articles.filter(a => !a.status || a.status === 'published').length,
    draft: articles.filter(a => a.status === 'draft').length,
  };

  const tdStyle = { padding: '8px 10px', borderBottom: '1px solid #f0f0f1', fontSize: 13, verticalAlign: 'top' };
  const thStyle = { padding: '8px 10px', borderBottom: '1px solid #c3c4c7', fontSize: 13, fontWeight: 600, color: '#1d2327', textAlign: 'left', background: '#f9f9f9' };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: '#1d2327' }}>Posts</h1>
        <button
          onClick={() => onNavigate('add-new')}
          style={{
            background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3,
            padding: '4px 10px', fontSize: 13, cursor: 'pointer',
          }}
        >
          Add New Post
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div style={{ marginBottom: 8, fontSize: 13 }}>
        {['all', 'published', 'draft'].map(s => (
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
            {s !== 'draft' && <span style={{ color: '#c3c4c7', margin: '0 4px' }}>|</span>}
          </span>
        ))}
      </div>

      {/* Search + Filter Bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search posts…"
          style={{
            padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3,
            width: 200, outline: 'none',
          }}
        />
        <button
          style={{
            background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3,
            padding: '4px 10px', fontSize: 13, cursor: 'pointer', color: '#3c434a',
          }}
        >
          Search Posts
        </button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #c3c4c7', padding: 20, textAlign: 'center', fontSize: 13, color: '#646970' }}>
          No posts found. <button onClick={() => onNavigate('add-new')} style={{ background: 'none', border: 'none', color: '#2271b1', cursor: 'pointer', textDecoration: 'underline', fontSize: 13 }}>Create your first post</button>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: 16 }}><input type="checkbox" /></th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Author</th>
              <th style={thStyle}>Categories</th>
              <th style={thStyle}>SEO</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((art, i) => {
              const status = art.status || 'published';
              const statusInfo = STATUS_COLORS[status] || STATUS_COLORS.published;
              const score = art.seoScore || 0;
              const scoreColor = score >= 80 ? '#00b32c' : score >= 50 ? '#dba617' : '#d63638';
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
                  <td style={tdStyle}>
                    <div style={{ fontSize: 13, color: '#3c434a' }}>
                      {status === 'draft' ? (
                        <span>Last Modified<br /><span style={{ color: '#646970' }}>{art.date}</span></span>
                      ) : (
                        <span>Published<br /><span style={{ color: '#646970' }}>{art.date}</span></span>
                      )}
                    </div>
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
