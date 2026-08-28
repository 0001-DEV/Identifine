import React, { useState } from 'react';

const SAMPLE_COMMENTS = [
  { id: 1, author: 'Michael Okafor', email: 'michael@company.ng', content: 'This is really insightful! The NFC business card concept is something our team has been exploring.', post: 'How NFC Business Cards Are Changing Professional Networking', date: 'Aug 27, 2026', status: 'approved' },
  { id: 2, author: 'Adaeze Ibe', email: 'adaeze@firm.com', content: 'Great article! Do you have any recommendations for NFC card providers in Nigeria?', post: 'Design That Converts: What Really Works in 2026', date: 'Aug 26, 2026', status: 'pending' },
  { id: 3, author: 'Femi Akindele', email: 'femi@startup.io', content: 'Identifine\'s Elite Pass is exactly what I was looking for. The seamless contact sharing is a game changer.', post: 'How NFC Business Cards Are Changing Professional Networking', date: 'Aug 25, 2026', status: 'approved' },
];

const STATUS_COLOR = { approved: '#00b32c', pending: '#dba617', spam: '#d63638', trash: '#646970' };
const STATUS_BG = { approved: '#d1e7dd', pending: '#fff3cd', spam: '#fcf0f1', trash: '#f0f0f1' };

export default function CommentsPanel() {
  const [comments, setComments] = useState(SAMPLE_COMMENTS);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [reply, setReply] = useState({});
  const [replyText, setReplyText] = useState({});

  const updateStatus = (id, status) => setComments(comments.map(c => c.id === id ? { ...c, status } : c));
  const handleDelete = (id) => { if (window.confirm('Move to Trash?')) setComments(comments.filter(c => c.id !== id)); };
  const toggleReply = (id) => setReply(prev => ({ ...prev, [id]: !prev[id] }));

  const filtered = comments.filter(c => {
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchSearch = !search || c.content.toLowerCase().includes(search.toLowerCase()) || c.author.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    all: comments.length,
    pending: comments.filter(c => c.status === 'pending').length,
    approved: comments.filter(c => c.status === 'approved').length,
    spam: comments.filter(c => c.status === 'spam').length,
  };

  const thStyle = { padding: '8px 10px', borderBottom: '1px solid #c3c4c7', fontSize: 13, fontWeight: 600, color: '#1d2327', textAlign: 'left', background: '#f9f9f9' };
  const tdStyle = { padding: '10px', borderBottom: '1px solid #f0f0f1', fontSize: 13, verticalAlign: 'top' };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h1 style={{ fontSize: 23, fontWeight: 400, margin: '0 0 12px', color: '#1d2327' }}>Comments</h1>

      {/* Filter tabs */}
      <div style={{ marginBottom: 8, fontSize: 13 }}>
        {['all', 'pending', 'approved', 'spam'].map(s => (
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
            {s !== 'spam' && <span style={{ color: '#c3c4c7', margin: '0 4px' }}>|</span>}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input type="search" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search comments…"
          style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, width: 200, outline: 'none' }} />
        <button style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer', color: '#3c434a' }}>
          Search Comments
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: 16 }}><input type="checkbox" /></th>
            <th style={thStyle}>Author</th>
            <th style={thStyle}>Comment</th>
            <th style={thStyle}>In response to</th>
            <th style={thStyle}>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan={5} style={{ padding: 20, textAlign: 'center', fontSize: 13, color: '#646970' }}>No comments found.</td></tr>
          )}
          {filtered.map((c, i) => (
            <tr key={c.id}
              style={{ background: c.status === 'pending' ? '#fef9ec' : i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              <td style={tdStyle}><input type="checkbox" /></td>
              <td style={{ ...tdStyle, minWidth: 140 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2271b1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                    {c.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#3c434a' }}>{c.author}</div>
                    <div style={{ fontSize: 11, color: '#2271b1' }}>{c.email}</div>
                  </div>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '1px 6px', borderRadius: 2,
                  background: STATUS_BG[c.status] || '#f0f0f1',
                  color: STATUS_COLOR[c.status] || '#646970',
                }}>
                  {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </span>
              </td>
              <td style={tdStyle}>
                <div style={{ marginBottom: 4 }}>{c.content}</div>
                <div style={{ fontSize: 12, color: '#646970', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {c.status !== 'approved' && (
                    <span onClick={() => updateStatus(c.id, 'approved')} style={{ color: '#00b32c', cursor: 'pointer' }}>Approve</span>
                  )}
                  {c.status === 'approved' && (
                    <span onClick={() => updateStatus(c.id, 'pending')} style={{ color: '#dba617', cursor: 'pointer' }}>Unapprove</span>
                  )}
                  <span onClick={() => toggleReply(c.id)} style={{ color: '#2271b1', cursor: 'pointer' }}>Reply</span>
                  {c.status !== 'spam' && (
                    <span onClick={() => updateStatus(c.id, 'spam')} style={{ color: '#646970', cursor: 'pointer' }}>Spam</span>
                  )}
                  <span onClick={() => handleDelete(c.id)} style={{ color: '#d63638', cursor: 'pointer' }}>Trash</span>
                </div>
                {reply[c.id] && (
                  <div style={{ marginTop: 8 }}>
                    <textarea
                      value={replyText[c.id] || ''}
                      onChange={e => setReplyText(prev => ({ ...prev, [c.id]: e.target.value }))}
                      rows={3} placeholder="Write a reply..."
                      style={{ width: '100%', padding: '6px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                    />
                    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                      <button style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '3px 8px', fontSize: 12, cursor: 'pointer' }}>Submit Reply</button>
                      <button onClick={() => toggleReply(c.id)} style={{ background: '#f0f0f1', border: '1px solid #8c8f94', borderRadius: 3, padding: '3px 8px', fontSize: 12, cursor: 'pointer', color: '#3c434a' }}>Cancel</button>
                    </div>
                  </div>
                )}
              </td>
              <td style={tdStyle}>
                <span style={{ fontSize: 13, color: '#2271b1', cursor: 'pointer' }}>{c.post}</span>
              </td>
              <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                <div style={{ fontSize: 13, color: '#3c434a' }}>{c.date}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
