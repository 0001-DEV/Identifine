import React, { useState } from 'react';
import { getGlobalSettings, saveGlobalSettings } from '../utils/roleManager';

const STRUCTURES = [
  { value: 'plain', label: 'Plain', example: 'https://identifine.com.ng/?p=123' },
  { value: 'day_name', label: 'Day and name', example: 'https://identifine.com.ng/2026/08/28/sample-post/' },
  { value: 'month_name', label: 'Month and name', example: 'https://identifine.com.ng/2026/08/sample-post/' },
  { value: 'numeric', label: 'Numeric', example: 'https://identifine.com.ng/archives/123' },
  { value: '%postname%', label: 'Post name', example: 'https://identifine.com.ng/sample-post/' },
  { value: '%category%/%postname%', label: 'Post with category', example: 'https://identifine.com.ng/nfc-technology/sample-post/' },
  { value: 'custom', label: 'Custom Structure', example: '' },
];

export default function SettingsPermalinks() {
  const [settings, setSettings] = useState(getGlobalSettings());
  const [selected, setSelected] = useState(settings.permalinkStructure || '%postname%');
  const [customVal, setCustomVal] = useState('');
  const [toast, setToast] = useState('');
  const [categoryBase, setCategoryBase] = useState('');
  const [tagBase, setTagBase] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    const finalStructure = selected === 'custom' ? customVal : selected;
    const updated = { ...settings, permalinkStructure: finalStructure };
    setSettings(updated);
    saveGlobalSettings(updated);
    setToast('Permalink structure updated.'); setTimeout(() => setToast(''), 3000);
  };

  const selectedInfo = STRUCTURES.find(s => s.value === selected);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h1 style={{ fontSize: 23, fontWeight: 400, margin: '0 0 4px', color: '#1d2327' }}>Permalink Settings</h1>

      {toast && (
        <div style={{ background: '#d1e7dd', color: '#0a3622', border: '1px solid #a3cfbb', padding: '8px 12px', marginBottom: 16, fontSize: 13, borderRadius: 3 }}>
          {toast}
        </div>
      )}

      <p style={{ fontSize: 13, color: '#3c434a', maxWidth: 720, margin: '0 0 20px', lineHeight: 1.6 }}>
        Identifine allows you to create a custom URL structure for your permalinks and archives. Custom URL structures can improve the aesthetics, usability, and forward-compatibility of your links.
        <br /><br />
        If you would like to include the category name in your post URLs, use the <strong>Post with category</strong> option below. To include a tag, use <code>%post_tag%</code> in the custom structure below.
      </p>

      <form onSubmit={handleSave}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 20 }}>
          <thead>
            <tr>
              <th style={{ padding: '8px 10px', borderBottom: '1px solid #c3c4c7', fontSize: 13, fontWeight: 600, color: '#1d2327', textAlign: 'left', background: '#f9f9f9', width: 180 }}></th>
              <th style={{ padding: '8px 10px', borderBottom: '1px solid #c3c4c7', fontSize: 13, fontWeight: 600, color: '#1d2327', textAlign: 'left', background: '#f9f9f9' }}>Common Settings</th>
            </tr>
          </thead>
          <tbody>
            {STRUCTURES.map((s, i) => (
              <tr key={s.value} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid #f0f0f1', textAlign: 'right', verticalAlign: 'top', paddingRight: 16 }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="permalink"
                      value={s.value}
                      checked={selected === s.value}
                      onChange={() => setSelected(s.value)}
                      style={{ marginTop: 1 }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#3c434a' }}>{s.label}</span>
                  </label>
                </th>
                <td style={{ padding: '12px 10px', borderBottom: '1px solid #f0f0f1', fontSize: 13, color: '#646970', verticalAlign: 'top' }}>
                  {s.value === 'custom' ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: '#646970', fontSize: 13 }}>https://identifine.com.ng</span>
                        <input
                          type="text"
                          value={customVal}
                          onChange={e => { setCustomVal(e.target.value); setSelected('custom'); }}
                          onFocus={() => setSelected('custom')}
                          placeholder="/%postname%/"
                          style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', width: 220 }}
                        />
                      </div>
                      <p style={{ fontSize: 11, color: '#646970', margin: '4px 0 0' }}>
                        Available tags: <code>%year%</code>, <code>%monthnum%</code>, <code>%day%</code>, <code>%hour%</code>, <code>%minute%</code>, <code>%second%</code>, <code>%post_id%</code>, <code>%postname%</code>, <code>%category%</code>, <code>%author%</code>
                      </p>
                    </div>
                  ) : (
                    <code style={{ background: '#f0f0f1', padding: '2px 6px', borderRadius: 3, fontSize: 12 }}>{s.example}</code>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Optional: Category & Tag base */}
        <div style={{ background: '#fff', border: '1px solid #c3c4c7', boxShadow: '0 1px 1px rgba(0,0,0,.04)', marginBottom: 20 }}>
          <div style={{ padding: '10px 16px', borderBottom: '1px solid #c3c4c7', background: '#f9f9f9' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#1d2327' }}>Optional</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <th style={{ padding: '12px 16px', textAlign: 'right', width: 200, fontSize: 13, fontWeight: 600, color: '#3c434a', verticalAlign: 'middle' }}>Category base</th>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, color: '#646970' }}>https://identifine.com.ng/</span>
                    <input type="text" value={categoryBase} onChange={e => setCategoryBase(e.target.value)}
                      placeholder="category"
                      style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', width: 200 }} />
                  </div>
                  <p style={{ fontSize: 11, color: '#646970', margin: '4px 0 0' }}>Default: category</p>
                </td>
              </tr>
              <tr style={{ background: '#f9f9f9' }}>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13, fontWeight: 600, color: '#3c434a', verticalAlign: 'middle' }}>Tag base</th>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, color: '#646970' }}>https://identifine.com.ng/</span>
                    <input type="text" value={tagBase} onChange={e => setTagBase(e.target.value)}
                      placeholder="tag"
                      style={{ padding: '4px 8px', fontSize: 13, border: '1px solid #8c8f94', borderRadius: 3, outline: 'none', width: 200 }} />
                  </div>
                  <p style={{ fontSize: 11, color: '#646970', margin: '4px 0 0' }}>Default: tag</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button type="submit" style={{ background: '#2271b1', color: '#fff', border: '1px solid #135e96', borderRadius: 3, padding: '8px 20px', fontSize: 14, cursor: 'pointer', fontWeight: 400 }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
