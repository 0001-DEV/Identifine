import React, { useState } from 'react';
import { getActiveRole, setActiveRole, ROLES } from '../utils/roleManager';

const CAPABILITIES = [
  { id: 'onpage_seo', label: 'Edit Post SEO', desc: 'Edit the focus keyword, title, and meta in the post editor.' },
  { id: 'onpage_general', label: 'Edit General Settings', desc: 'Access and edit Rank Math General Settings.' },
  { id: 'onpage_snippet', label: 'Edit Snippet / Schema', desc: 'Edit the snippet preview and Schema markup.' },
  { id: 'onpage_social', label: 'Edit Social Tabs', desc: 'Edit Open Graph, Twitter Card meta in posts.' },
  { id: 'admin_header', label: 'View Admin Header', desc: 'Display the Rank Math score in the admin toolbar.' },
  { id: 'role_manager', label: 'Manage Role Settings', desc: 'Access and modify the Role Manager settings.' },
  { id: 'sitemap', label: 'Manage Sitemap', desc: 'Access and modify the Sitemap Settings.' },
  { id: 'general', label: 'Manage General Settings', desc: 'Access and modify Rank Math General Settings.' },
  { id: 'titles', label: 'Manage Titles & Meta', desc: 'Access and modify Titles & Meta settings.' },
];

const DEFAULT_PERMISSIONS = {
  ADMIN: { onpage_seo: true, onpage_general: true, onpage_snippet: true, onpage_social: true, admin_header: true, role_manager: true, sitemap: true, general: true, titles: true },
  EDITOR: { onpage_seo: true, onpage_general: false, onpage_snippet: true, onpage_social: true, admin_header: true, role_manager: false, sitemap: false, general: false, titles: false },
  AUTHOR: { onpage_seo: true, onpage_general: false, onpage_snippet: false, onpage_social: false, admin_header: true, role_manager: false, sitemap: false, general: false, titles: false },
};

export default function RankMathRoleManager({ darkMode = false }) {
  const [permissions, setPermissions] = useState(() => {
    try {
      const s = localStorage.getItem('identifine_rm_permissions');
      return s ? JSON.parse(s) : DEFAULT_PERMISSIONS;
    } catch { return DEFAULT_PERMISSIONS; }
  });
  const [activeRole, setActiveRoleState] = useState(getActiveRole());
  const [toast, setToast] = useState('');

  const togglePerm = (role, cap) => {
    setPermissions(prev => ({
      ...prev,
      [role]: { ...prev[role], [cap]: !prev[role][cap] }
    }));
  };

  const handleSave = () => {
    localStorage.setItem('identifine_rm_permissions', JSON.stringify(permissions));
    setToast('Permissions saved.'); setTimeout(() => setToast(''), 3000);
  };

  const handleRoleSwitch = (roleId) => {
    setActiveRole(roleId);
    setActiveRoleState(roleId);
  };

  const roleOrder = ['ADMIN', 'EDITOR', 'AUTHOR'];

  const bgCard = darkMode ? '#0a0a0a' : '#fff';
  const borderCard = darkMode ? '#1f1f1f' : '#c3c4c7';
  const textColor = darkMode ? '#f1f5f9' : '#1d2327';
  const textMuted = darkMode ? '#94a3b8' : '#646970';
  const tableHeaderBg = darkMode ? '#121212' : '#f9f9f9';

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: textColor }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{ width: 28, height: 28, borderRadius: 4, background: '#f86434', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 900 }}>R</span>
        </div>
        <h1 style={{ fontSize: 23, fontWeight: 400, margin: 0, color: textColor }}>Role Manager</h1>
      </div>

      {toast && <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 16, fontSize: 13, borderRadius: 3 }}>{toast}</div>}

      {/* Active Role Switcher */}
      <div style={{ background: bgCard, border: `1px solid ${borderCard}`, padding: 16, marginBottom: 20, boxShadow: '0 1px 1px rgba(0,0,0,.04)', borderRadius: 4 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: textColor, margin: '0 0 12px' }}>Active User Role (Simulate)</h2>
        <p style={{ fontSize: 13, color: textMuted, margin: '0 0 12px' }}>
          Use this to switch between roles and preview what each role can access across the admin.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {roleOrder.map(roleId => {
            const r = ROLES[roleId];
            const isSelected = activeRole === roleId;
            return (
              <button
                key={roleId}
                onClick={() => handleRoleSwitch(roleId)}
                style={{
                  padding: '6px 14px', borderRadius: 3, fontSize: 13, cursor: 'pointer', fontWeight: 600,
                  border: isSelected ? `2px solid ${r.color}` : `1px solid ${borderCard}`,
                  background: isSelected ? (darkMode ? '#1e293b' : `${r.color}15`) : (darkMode ? '#151a21' : '#f9f9f9'),
                  color: isSelected ? (darkMode ? '#ffffff' : r.color) : textMuted,
                  transition: 'all 0.15s ease',
                }}
              >
                {r.label}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: textMuted }}>
          Currently simulating: <strong style={{ color: ROLES[activeRole]?.color }}>{ROLES[activeRole]?.label}</strong> — {ROLES[activeRole]?.badge}
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div style={{ background: bgCard, border: `1px solid ${borderCard}`, boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 20, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${borderCard}`, background: tableHeaderBg }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: textColor }}>Capabilities Matrix</h2>
          <p style={{ fontSize: 12, color: textMuted, margin: '4px 0 0' }}>Check which roles can access each SEO capability.</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ padding: '10px 16px', borderBottom: `1px solid ${borderCard}`, fontSize: 13, fontWeight: 600, color: textColor, textAlign: 'left', background: tableHeaderBg, width: '40%' }}>Capability</th>
                {roleOrder.map(roleId => (
                  <th key={roleId} style={{ padding: '10px 16px', borderBottom: `1px solid ${borderCard}`, fontSize: 13, fontWeight: 600, color: ROLES[roleId]?.color || textColor, textAlign: 'center', background: tableHeaderBg }}>
                    {ROLES[roleId]?.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAPABILITIES.map((cap, i) => (
                <tr key={cap.id} style={{ background: i % 2 === 0 ? bgCard : (darkMode ? '#151a21' : '#f9f9f9') }}>
                  <td style={{ padding: '12px 16px', borderBottom: `1px solid ${darkMode ? '#1f1f1f' : '#f0f0f1'}`, verticalAlign: 'top' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: textColor }}>{cap.label}</div>
                    <div style={{ fontSize: 11, color: textMuted, marginTop: 2, lineHeight: 1.4 }}>{cap.desc}</div>
                  </td>
                  {roleOrder.map(roleId => (
                    <td key={roleId} style={{ padding: '12px 16px', borderBottom: `1px solid ${darkMode ? '#1f1f1f' : '#f0f0f1'}`, textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={!!(permissions[roleId] || {})[cap.id]}
                        onChange={() => togglePerm(roleId, cap.id)}
                        disabled={roleId === 'ADMIN'}
                        style={{ width: 16, height: 16, cursor: roleId === 'ADMIN' ? 'not-allowed' : 'pointer', accentColor: '#f86434' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button onClick={handleSave} style={{ background: '#f86434', color: '#fff', border: '1px solid #d9531e', borderRadius: 3, padding: '8px 20px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>
        Save Changes
      </button>
    </div>
  );
}
