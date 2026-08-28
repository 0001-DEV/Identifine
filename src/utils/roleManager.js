/**
 * Role-Based Access Control (RBAC) & Global Settings Engine
 */

const ROLE_STORAGE_KEY = 'identifine_active_role';
const SETTINGS_STORAGE_KEY = 'identifine_global_settings';

export const ROLES = {
  ADMIN: { id: 'ADMIN', label: '👑 Administrator', color: '#10b981', badge: 'Full System Control' },
  EDITOR: { id: 'EDITOR', label: '✍️ Editor', color: '#3b82f6', badge: 'Content & SEO Publisher' },
  AUTHOR: { id: 'AUTHOR', label: '📝 Author', color: '#8b5cf6', badge: 'Draft Writer' }
};

export const DEFAULT_SETTINGS = {
  permalinkStructure: '%postname%', // '%postname%' | '%category%/%postname%' | '%id%'
  siteTitleSeparator: ' - Identifine',
  defaultOgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  targetKeywordDensityMin: 0.8,
  targetKeywordDensityMax: 2.5,
  minWordCountTarget: 600,
  sitemapEnabled: true,
  users: [
    { id: '1', name: 'Alex Johnson (Lead)', email: 'alex@identifine.com.ng', role: 'ADMIN' },
    { id: '2', name: 'Sarah Chen (Editor)', email: 'sarah@identifine.com.ng', role: 'EDITOR' },
    { id: '3', name: 'Marcus Vance (Author)', email: 'marcus@identifine.com.ng', role: 'AUTHOR' }
  ]
};

export function getActiveRole() {
  try {
    const saved = localStorage.getItem(ROLE_STORAGE_KEY);
    return saved && ROLES[saved] ? saved : 'ADMIN';
  } catch (e) {
    return 'ADMIN';
  }
}

export function setActiveRole(roleId) {
  try {
    localStorage.setItem(ROLE_STORAGE_KEY, roleId);
    window.dispatchEvent(new Event('identifine_role_changed'));
  } catch (e) {}
}

export function getGlobalSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveGlobalSettings(newSettings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    window.dispatchEvent(new Event('identifine_settings_updated'));
  } catch (e) {}
}

export function formatArticleUrl(slug, category = 'blog', id = '1') {
  const settings = getGlobalSettings();
  const structure = settings.permalinkStructure || '%postname%';
  
  const cleanSlug = slug || 'article';
  const cleanCat = (category || 'blog').toLowerCase().replace(/\s+/g, '-');

  if (structure === '%category%/%postname%') {
    return `/blog/${cleanCat}/${cleanSlug}`;
  } else if (structure === '%id%') {
    return `/blog/${id}`;
  }
  
  // Default %postname%
  return `/blog/${cleanSlug}`;
}
