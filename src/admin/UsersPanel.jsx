import React, { useState } from 'react';
import { getGlobalSettings, saveGlobalSettings, ROLES } from '../utils/roleManager';

export default function UsersPanel({ darkMode = false }) {
  const [settings, setSettings] = useState(getGlobalSettings());
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'EDITOR', username: '' });
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');

  const users = settings.users || [];

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const updated = {
      ...settings,
      users: [...users, {
        id: String(Date.now()),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        username: newUser.username || newUser.name.toLowerCase().replace(/\s+/g, '.')
      }]
    };
    setSettings(updated);
    saveGlobalSettings(updated);
    setNewUser({ name: '', email: '', role: 'EDITOR', username: '' });
    setShowAdd(false);
    setToast('New user added.'); setTimeout(() => setToast(''), 3000);
  };

  const handleRoleChange = (userId, newRole) => {
    const updated = { ...settings, users: users.map(u => u.id === userId ? { ...u, role: newRole } : u) };
    setSettings(updated);
    saveGlobalSettings(updated);
    setToast('User role updated.'); setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (userId) => {
    if (!window.confirm('Delete this user?')) return;
    const updated = { ...settings, users: users.filter(u => u.id !== userId) };
    setSettings(updated);
    saveGlobalSettings(updated);
  };

  const filtered = users.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  // Dark Mode colors
  const bgCard = darkMode ? '#0a0a0a' : '#fff';
  const borderCard = darkMode ? '#1f1f1f' : '#c3c4c7';
  const textColor = darkMode ? '#f1f5f9' : '#1d2327';
  const textMuted = darkMode ? '#94a3b8' : '#646970';
  const tableHeaderBg = darkMode ? '#121212' : '#f9f9f9';
  const inputBg = darkMode ? '#000000' : '#fff';

  const thStyle = { padding: '8px 10px', borderBottom: `1px solid ${borderCard}`, fontSize: 13, fontWeight: 600, color: textColor, textAlign: 'left', background: tableHeaderBg };
  const tdStyle = { padding: '8px 10px', borderBottom: `1px solid ${darkMode ? '#1f1f1f' : '#f0f0f1'}`, fontSize: 13, verticalAlign: 'middle' };
  const inputStyle = { width: '100%', padding: '6px 8px', fontSize: 13, border: `1px solid ${darkMode ? '#333' : '#8c8f94'}`, borderRadius: 3, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', background: inputBg, color: textColor };
  const selectStyle = { padding: '4px 8px', fontSize: 13, border: `1px solid ${darkMode ? '#333' : '#8c8f94'}`, borderRadius: 3, outline: 'none', background: inputBg, color: textColor };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: textColor }}>Users</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer' }}
        >
          Add New User
        </button>
      </div>

      {toast && <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 16, fontSize: 13, borderRadius: 3 }}>{toast}</div>}

      {showAdd && (
        <div style={{ background: bgCard, border: `1px solid ${borderCard}`, padding: 20, marginBottom: 20, boxShadow: '0 1px 1px rgba(0,0,0,.04)', borderRadius: 4 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px', color: textColor }}>Add New User</h2>
          <form onSubmit={handleAddUser}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: textColor, marginBottom: 4 }}>Username <span style={{ color: '#d63638' }}>*</span></label>
                <input type="text" value={newUser.username} onChange={e => setNewUser(n => ({ ...n, username: e.target.value }))} placeholder="john.doe" required style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: textColor, marginBottom: 4 }}>Full Name <span style={{ color: '#d63638' }}>*</span></label>
                <input type="text" value={newUser.name} onChange={e => setNewUser(n => ({ ...n, name: e.target.value }))} placeholder="John Doe" required style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: textColor, marginBottom: 4 }}>Email <span style={{ color: '#d63638' }}>*</span></label>
                <input type="email" value={newUser.email} onChange={e => setNewUser(n => ({ ...n, email: e.target.value }))} placeholder="john@identifine.com.ng" required style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: textColor, marginBottom: 4 }}>Role</label>
                <select value={newUser.role} onChange={e => setNewUser(n => ({ ...n, role: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {Object.values(ROLES).map(r => (
                    <option key={r.id} value={r.id} style={{ background: bgCard, color: textColor }}>
                      {r.label.replace(/^\S+\s/, '')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}>Add New User</button>
              <button type="button" onClick={() => setShowAdd(false)} style={{ background: darkMode ? '#334155' : '#f0f0f1', border: `1px solid ${darkMode ? '#475569' : '#8c8f94'}`, borderRadius: 3, padding: '6px 10px', fontSize: 13, cursor: 'pointer', color: textColor }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Role filter tabs */}
      <div style={{ marginBottom: 8, fontSize: 13 }}>
        <span style={{ fontWeight: 700, color: textColor, fontSize: 13 }}>All ({users.length})</span>
        {Object.values(ROLES).map(r => (
          <span key={r.id}>
            <span style={{ color: textMuted, margin: '0 4px' }}>|</span>
            <span style={{ color: '#2271b1', cursor: 'pointer', fontSize: 13 }}>
              {r.label.replace(/^\S+\s/, '')} ({users.filter(u => u.role === r.id).length})
            </span>
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <select style={selectStyle}>
          <option style={{ background: bgCard, color: textColor }}>Change role to…</option>
          {Object.values(ROLES).map(r => <option key={r.id} value={r.id} style={{ background: bgCard, color: textColor }}>{r.label.replace(/^\S+\s/, '')}</option>)}
        </select>
        <button style={{ background: darkMode ? '#334155' : '#f0f0f1', border: `1px solid ${darkMode ? '#475569' : '#8c8f94'}`, borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer', color: textColor }}>Change</button>
        <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users…"
          style={{ marginLeft: 'auto', padding: '4px 8px', fontSize: 13, border: `1px solid ${darkMode ? '#333' : '#8c8f94'}`, borderRadius: 3, width: 200, outline: 'none', background: inputBg, color: textColor }} />
        <button style={{ background: darkMode ? '#334155' : '#f0f0f1', border: `1px solid ${darkMode ? '#475569' : '#8c8f94'}`, borderRadius: 3, padding: '4px 10px', fontSize: 13, cursor: 'pointer', color: textColor }}>Search Users</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: bgCard, border: `1px solid ${borderCard}`, boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: 16 }}><input type="checkbox" /></th>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Posts</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan={6} style={{ padding: 20, textAlign: 'center', fontSize: 13, color: textMuted }}>No users found.</td></tr>
          )}
          {filtered.map((user, i) => {
            const roleInfo = ROLES[user.role] || ROLES.AUTHOR;
            return (
              <tr key={user.id} style={{ background: i % 2 === 0 ? bgCard : (darkMode ? '#151a21' : '#f9f9f9') }}>
                <td style={tdStyle}><input type="checkbox" /></td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', background: roleInfo.color, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0,
                    }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#2271b1', cursor: 'pointer' }}>{user.username || user.name.toLowerCase().replace(/\s+/g, '.')}</div>
                      <div style={{ fontSize: 11, color: textMuted, marginTop: 2 }}>
                        <span style={{ color: '#2271b1', cursor: 'pointer', textDecoration: 'underline' }}>Edit</span>
                        {' | '}
                        <span onClick={() => handleDelete(user.id)} style={{ color: '#d63638', cursor: 'pointer' }}>Delete</span>
                        {' | '}
                        <span style={{ color: '#2271b1', cursor: 'pointer' }}>View</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}><a href={`mailto:${user.email}`} style={{ color: '#2271b1' }}>{user.email}</a></td>
                <td style={tdStyle}>
                  {/* Explicit Role Selection Dropdown with Dark Mode Compatibility */}
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                    style={{
                      padding: '4px 8px', fontSize: 12, border: `1px solid ${darkMode ? '#333' : '#8c8f94'}`,
                      borderRadius: 3, outline: 'none',
                      background: darkMode ? '#18181b' : '#f4f4f5',
                      color: roleInfo.color, fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    {Object.values(ROLES).map(r => (
                      <option
                        key={r.id}
                        value={r.id}
                        style={{
                          background: darkMode ? '#18181b' : '#ffffff',
                          color: darkMode ? '#f4f4f5' : '#18181b',
                          fontWeight: 500,
                        }}
                      >
                        {r.label.replace(/^\S+\s/, '')}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={tdStyle}>
                  <span style={{ color: '#2271b1', cursor: 'pointer', fontSize: 13 }}>0</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ fontSize: 12, color: textMuted, marginTop: 8 }}>{filtered.length} user{filtered.length !== 1 ? 's' : ''}</div>
    </div>
  );
}
