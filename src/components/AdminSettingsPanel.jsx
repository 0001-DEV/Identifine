import React, { useState } from 'react';
import { 
  ShieldCheck, Link, Sparkles, Users, Save, CheckCircle, Sliders, Globe,
  FileCode2, Check, UserPlus, Lock
} from 'lucide-react';
import { getGlobalSettings, saveGlobalSettings, ROLES } from '../utils/roleManager';

export default function AdminSettingsPanel({ onSaveSuccess }) {
  const [settings, setSettings] = useState(getGlobalSettings());
  const [savedToast, setSavedToast] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'EDITOR' });
  const [showAddUser, setShowAddUser] = useState(false);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveGlobalSettings(settings);
    setSavedToast(true);
    if (onSaveSuccess) onSaveSuccess();
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    
    const updatedUsers = [
      ...settings.users,
      { id: String(Date.now()), name: newUser.name, email: newUser.email, role: newUser.role }
    ];
    handleChange('users', updatedUsers);
    setNewUser({ name: '', email: '', role: 'EDITOR' });
    setShowAddUser(false);
  };

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = settings.users.map(u => u.id === userId ? { ...u, role: newRole } : u);
    handleChange('users', updatedUsers);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 text-zinc-100 font-sans">
      
      {savedToast && (
        <div className="bg-emerald-600/90 text-white px-5 py-3 rounded-xl border border-emerald-500 shadow-xl flex items-center space-x-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="font-semibold text-sm">System & Permalinks Settings saved successfully!</span>
        </div>
      )}

      {/* 1. PERMALINK STRUCTURE CONFIGURATOR */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center space-x-3 border-b border-zinc-800 pb-4">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Link className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-galano font-bold text-white flex items-center gap-2">
              Permalinks & URL Structure Settings
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                WordPress Equivalent
              </span>
            </h3>
            <p className="text-xs text-zinc-400">Choose how article permalinks are structured across search bars and links.</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              id: '%postname%',
              title: 'Post name (Recommended for SEO)',
              example: 'https://identifine.com.ng/how-nfc-business-cards-work',
              badge: 'SEO Optimal'
            },
            {
              id: '%category%/%postname%',
              title: 'Category and Post Name',
              example: 'https://identifine.com.ng/blog/smart-hardware/how-nfc-business-cards-work',
              badge: 'Structured'
            },
            {
              id: '%id%',
              title: 'Numeric Post ID (Legacy)',
              example: 'https://identifine.com.ng/blog/3988',
              badge: 'Legacy'
            }
          ].map((option) => (
            <label
              key={option.id}
              className={`flex items-start space-x-4 p-4 rounded-xl border cursor-pointer transition-all ${
                settings.permalinkStructure === option.id
                  ? 'bg-zinc-950 border-emerald-500 shadow-md shadow-emerald-950/20'
                  : 'bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <input
                type="radio"
                name="permalinkStructure"
                value={option.id}
                checked={settings.permalinkStructure === option.id}
                onChange={() => handleChange('permalinkStructure', option.id)}
                className="mt-1 text-emerald-500 focus:ring-0"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-white">{option.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    option.badge === 'SEO Optimal' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {option.badge}
                  </span>
                </div>
                <p className="text-xs font-mono text-emerald-400/90">{option.example}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 2. GLOBAL RANK MATH SEO DEFAULTS */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center space-x-3 border-b border-zinc-800 pb-4">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-galano font-bold text-white">Global Rank Math SEO Rules & Defaults</h3>
            <p className="text-xs text-zinc-400">Configure global metadata templates, target thresholds, and sitemaps.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Site Title Suffix / Separator
            </label>
            <input
              type="text"
              value={settings.siteTitleSeparator}
              onChange={(e) => handleChange('siteTitleSeparator', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[11px] text-zinc-400">Appended to article titles in browser title bar (e.g. "Article Title - Identifine")</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Default OpenGraph Social Image URL
            </label>
            <input
              type="url"
              value={settings.defaultOgImage}
              onChange={(e) => handleChange('defaultOgImage', e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[11px] text-zinc-400">Used for WhatsApp, LinkedIn, and Twitter previews when article image is missing</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Target Minimum Word Count
            </label>
            <input
              type="number"
              value={settings.minWordCountTarget}
              onChange={(e) => handleChange('minWordCountTarget', parseInt(e.target.value) || 600)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              XML Sitemap Generator
            </label>
            <label className="flex items-center space-x-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.sitemapEnabled}
                onChange={(e) => handleChange('sitemapEnabled', e.target.checked)}
                className="rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
              />
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">Automatically generate XML Sitemap</span>
                <span className="text-[11px] text-emerald-400 font-mono">https://identifine.com.ng/sitemap.xml</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* 3. USER ROLE & PERMISSIONS MANAGER */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-galano font-bold text-white">Team & Role Permissions Manager</h3>
              <p className="text-xs text-zinc-400">Assign Administrator, Editor, and Author access permissions.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddUser(!showAddUser)}
            className="flex items-center space-x-1.5 bg-zinc-800 hover:bg-zinc-700 text-emerald-400 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Team Member</span>
          </button>
        </div>

        {/* Add User Modal / Inline Form */}
        {showAddUser && (
          <div className="bg-zinc-950 p-4 rounded-xl border border-emerald-500/40 space-y-4 animate-fadeIn">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Add New User</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white"
              >
                <option value="ADMIN">Administrator (Full Control)</option>
                <option value="EDITOR">Editor (Content & Rank Math)</option>
                <option value="AUTHOR">Author (Draft Writer)</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddUser(false)}
                className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddUser}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold"
              >
                Save Member
              </button>
            </div>
          </div>
        )}

        {/* User Roles Table */}
        <div className="space-y-2">
          {settings.users.map((user) => {
            const roleInfo = ROLES[user.role] || ROLES.EDITOR;

            return (
              <div
                key={user.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 gap-3"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">{user.name}</span>
                    <span 
                      className="text-[10px] font-bold px-2 py-0.5 rounded border"
                      style={{ 
                        backgroundColor: `${roleInfo.color}15`, 
                        borderColor: `${roleInfo.color}40`, 
                        color: roleInfo.color 
                      }}
                    >
                      {roleInfo.label}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">{user.email}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                  >
                    <option value="ADMIN">Administrator</option>
                    <option value="EDITOR">Editor</option>
                    <option value="AUTHOR">Author</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SAVE SETTINGS BUTTON */}
      <div className="flex items-center justify-end pt-4">
        <button
          type="submit"
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-emerald-950/60 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save System & Permalinks Settings</span>
        </button>
      </div>

    </form>
  );
}
