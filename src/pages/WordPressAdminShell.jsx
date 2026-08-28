import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveRole, ROLES } from '../utils/roleManager';

// Panel imports
import DashboardHome from '../admin/DashboardHome';
import AllPostsPanel from '../admin/AllPostsPanel';
import NewPostPanel from '../admin/NewPostPanel';
import CategoriesPanel from '../admin/CategoriesPanel';
import TagsPanel from '../admin/TagsPanel';
import MediaLibraryPanel from '../admin/MediaLibraryPanel';
import CommentsPanel from '../admin/CommentsPanel';
import RankMathDashboard from '../admin/RankMathDashboard';
import RankMathGeneralSettings from '../admin/RankMathGeneralSettings';
import RankMathTitlesMeta from '../admin/RankMathTitlesMeta';
import RankMathSitemap from '../admin/RankMathSitemap';
import RankMathRoleManager from '../admin/RankMathRoleManager';
import SettingsPermalinks from '../admin/SettingsPermalinks';
import UsersPanel from '../admin/UsersPanel';

// ─── Color Palette (exact WordPress admin) ────────────────────────────────────
const WP = {
  sidebar: '#1d2327',
  sidebarHover: '#2c3338',
  sidebarActive: '#2c3338',
  sidebarActiveBorder: '#2271b1',
  submenuBg: '#2c3338',
  submenuHover: '#00b9eb',
  topbar: '#1d2327',
  contentBg: '#f0f0f1',
  blue: '#2271b1',
  blueDark: '#135e96',
  text: '#3c434a',
  textMuted: '#646970',
  border: '#c3c4c7',
  rmOrange: '#f86434',
};

// ─── Menu Structure (exact WP sidebar order) ──────────────────────────────────
const MENU = [
  {
    id: 'dashboard', icon: '⌂', label: 'Dashboard', subs: [
      { id: 'dashboard-home', label: 'Home' },
      { id: 'updates', label: 'Updates' },
    ]
  },
  { id: 'posts', icon: '✎', label: 'Posts', subs: [
      { id: 'all-posts', label: 'All Posts' },
      { id: 'add-new', label: 'Add New' },
      { id: 'categories', label: 'Categories' },
      { id: 'tags', label: 'Tags' },
    ]
  },
  { id: 'media', icon: '🖼', label: 'Media', subs: [
      { id: 'media-library', label: 'Library' },
      { id: 'media-add', label: 'Add New Media File' },
    ]
  },
  { id: 'pages', icon: '☰', label: 'Pages', subs: [
      { id: 'pages-all', label: 'All Pages' },
      { id: 'pages-add', label: 'Add New Page' },
    ]
  },
  { id: 'comments', icon: '✉', label: 'Comments', badge: 3 },
  // separator
  { id: 'rank-math', icon: 'R', label: 'Rank Math SEO', isRm: true, subs: [
      { id: 'rm-dashboard', label: 'Dashboard' },
      { id: 'rm-general', label: 'General Settings' },
      { id: 'rm-titles', label: 'Titles & Meta' },
      { id: 'rm-sitemap', label: 'Sitemap Settings' },
      { id: 'rm-roles', label: 'Role Manager' },
      { id: 'rm-tools', label: 'Status & Tools' },
      { id: 'rm-help', label: 'Help & FAQ' },
    ]
  },
  // separator
  { id: 'appearance', icon: '◑', label: 'Appearance' },
  { id: 'plugins', icon: '⚙', label: 'Plugins' },
  { id: 'users', icon: '⚬', label: 'Users', subs: [
      { id: 'all-users', label: 'All Users' },
      { id: 'add-user', label: 'Add New User' },
      { id: 'my-profile', label: 'Your Profile' },
    ]
  },
  { id: 'tools', icon: '⚒', label: 'Tools' },
  { id: 'settings', icon: '⚙', label: 'Settings', subs: [
      { id: 'settings-general', label: 'General' },
      { id: 'settings-writing', label: 'Writing' },
      { id: 'settings-reading', label: 'Reading' },
      { id: 'settings-discussion', label: 'Discussion' },
      { id: 'settings-media', label: 'Media' },
      { id: 'settings-permalinks', label: 'Permalinks' },
      { id: 'settings-privacy', label: 'Privacy' },
    ]
  },
  { id: 'collapse', icon: '«', label: 'Collapse menu' },
];

// Default expanded menus on load
const DEFAULT_EXPANDED = new Set(['dashboard', 'posts']);

// ─── Coming Soon stub ─────────────────────────────────────────────────────────
function StubPanel({ title }) {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h1 style={{ fontSize: 23, fontWeight: 400, margin: '0 0 20px', color: '#1d2327' }}>{title}</h1>
      <div style={{ background: '#fff', border: '1px solid #c3c4c7', padding: '20px 24px', boxShadow: '0 1px 1px rgba(0,0,0,.04)' }}>
        <p style={{ fontSize: 14, color: '#646970', margin: 0 }}>This section is available in the full version.</p>
      </div>
    </div>
  );
}

// ─── Main WordPress Admin Shell ───────────────────────────────────────────────
export default function WordPressAdminShell() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('dashboard-home');
  const [expanded, setExpanded] = useState(DEFAULT_EXPANDED);
  const [collapsed, setCollapsed] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const role = getActiveRole();
  const roleInfo = ROLES[role] || ROLES.ADMIN;

  // Sync URL hash to panel
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) setActivePage(hash);
  }, []);

  const goTo = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId;
    // Auto-expand parent menu
    for (const item of MENU) {
      if (item.subs?.some(s => s.id === pageId)) {
        setExpanded(prev => new Set([...prev, item.id]));
        break;
      }
    }
  };

  const toggleExpand = (id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleEditPost = (article) => {
    setEditArticle(article);
    goTo('add-new');
  };

  const handlePublished = () => {
    setEditArticle(null);
    goTo('all-posts');
  };

  // ── Active panel renderer ────────────────────────────────────────────────────
  const renderPanel = () => {
    switch (activePage) {
      case 'dashboard-home': return <DashboardHome onNavigate={goTo} />;
      case 'updates': return <StubPanel title="Updates" />;
      case 'all-posts': return <AllPostsPanel onNavigate={goTo} onEditPost={handleEditPost} />;
      case 'add-new': return <NewPostPanel editArticle={editArticle} onPublished={handlePublished} />;
      case 'categories': return <CategoriesPanel />;
      case 'tags': return <TagsPanel />;
      case 'media-library': return <MediaLibraryPanel />;
      case 'media-add': return <MediaLibraryPanel />;
      case 'pages-all': return <StubPanel title="Pages" />;
      case 'pages-add': return <StubPanel title="Add New Page" />;
      case 'comments': return <CommentsPanel />;
      case 'rm-dashboard': return <RankMathDashboard onNavigate={goTo} />;
      case 'rm-general': return <RankMathGeneralSettings />;
      case 'rm-titles': return <RankMathTitlesMeta />;
      case 'rm-sitemap': return <RankMathSitemap />;
      case 'rm-roles': return <RankMathRoleManager />;
      case 'rm-tools': return <StubPanel title="Rank Math — Status & Tools" />;
      case 'rm-help': return <StubPanel title="Rank Math — Help & FAQ" />;
      case 'appearance': return <StubPanel title="Appearance" />;
      case 'plugins': return <StubPanel title="Plugins" />;
      case 'all-users': return <UsersPanel />;
      case 'add-user': return <UsersPanel />;
      case 'my-profile': return <StubPanel title="Your Profile" />;
      case 'tools': return <StubPanel title="Tools" />;
      case 'settings-general': return <StubPanel title="General Settings" />;
      case 'settings-writing': return <StubPanel title="Writing" />;
      case 'settings-reading': return <StubPanel title="Reading" />;
      case 'settings-discussion': return <StubPanel title="Discussion" />;
      case 'settings-media': return <StubPanel title="Media Settings" />;
      case 'settings-permalinks': return <SettingsPermalinks />;
      case 'settings-privacy': return <StubPanel title="Privacy" />;
      default: return <DashboardHome onNavigate={goTo} />;
    }
  };

  // ── Find active top-level menu parent ────────────────────────────────────────
  const activeParent = MENU.find(m => m.id === activePage || m.subs?.some(s => s.id === activePage));

  // ── Sidebar width ─────────────────────────────────────────────────────────────
  const sidebarW = collapsed ? 36 : 160;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: WP.contentBg }}>

      {/* ── TOP ADMIN BAR ───────────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 32, zIndex: 99999,
        background: WP.topbar, display: 'flex', alignItems: 'center',
        boxSizing: 'border-box',
      }}>
        {/* WP Logo */}
        <div style={{ width: sidebarW, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, height: '100%', borderRight: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: WP.topbar }}>W</span>
          </div>
        </div>

        {/* Site name */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12 }}>
          <span style={{ fontSize: 13, color: '#a7aaad', cursor: 'pointer' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#a7aaad'}
          >
            Identifine
          </span>
          <span style={{ color: '#555d66', margin: '0 4px', fontSize: 11 }}>›</span>
          <span
            onClick={() => navigate('/')}
            style={{ fontSize: 13, color: '#a7aaad', cursor: 'pointer' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#a7aaad'}
          >
            Visit Site
          </span>
          <span style={{ color: '#555d66', margin: '0 4px', fontSize: 11 }}>|</span>
          <span
            onClick={() => goTo('comments')}
            style={{ fontSize: 13, color: '#a7aaad', cursor: 'pointer' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#a7aaad'}
          >
            ✉ 3
          </span>
          <span style={{ color: '#555d66', margin: '0 4px', fontSize: 11 }}>|</span>
          {/* + New button */}
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => { setEditArticle(null); goTo('add-new'); }}
              style={{
                fontSize: 13, color: '#a7aaad', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2
              }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#a7aaad'}
            >
              + New
            </span>
          </div>
        </div>

        {/* Right side: role pill + user */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: '100%', gap: 0 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
            background: `${roleInfo.color}25`, color: roleInfo.color,
            border: `1px solid ${roleInfo.color}40`, marginRight: 8,
          }}>
            {roleInfo.label}
          </span>
          <div style={{
            height: '100%', display: 'flex', alignItems: 'center', gap: 6,
            padding: '0 12px', cursor: 'pointer', color: '#a7aaad', fontSize: 13,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = WP.sidebarHover; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a7aaad'; }}
          >
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: roleInfo.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700 }}>
              A
            </div>
            <span>Howdy, Admin</span>
          </div>
        </div>
      </div>

      {/* ── LEFT SIDEBAR ────────────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', top: 32, left: 0, bottom: 0, width: sidebarW,
        background: WP.sidebar, zIndex: 9999, overflowY: 'auto', overflowX: 'hidden',
        transition: 'width 0.15s',
        /* Custom scrollbar */
        scrollbarWidth: 'thin', scrollbarColor: '#3c434a #1d2327',
      }}>
        {MENU.map((item, idx) => {
          if (item.id === 'collapse') {
            return (
              <div
                key="collapse"
                onClick={() => setCollapsed(c => !c)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                  color: '#a7aaad', cursor: 'pointer', fontSize: 13, marginTop: 8,
                  borderTop: '1px solid rgba(255,255,255,.07)',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = WP.sidebarHover; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#a7aaad'; e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: 16 }}>{collapsed ? '»' : '«'}</span>
                {!collapsed && <span style={{ fontSize: 12 }}>Collapse menu</span>}
              </div>
            );
          }

          // Visual separators before Rank Math, Appearance
          const hasSeparator = item.id === 'rank-math' || item.id === 'appearance';

          const isParentActive = activeParent?.id === item.id;
          const isExpanded = expanded.has(item.id);
          const hasSubs = item.subs && item.subs.length > 0;

          return (
            <React.Fragment key={item.id}>
              {hasSeparator && (
                <div style={{ height: 1, background: 'rgba(255,255,255,.07)', margin: '4px 0' }} />
              )}

              {/* Top-level menu item */}
              <div
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'space-between',
                  padding: collapsed ? '8px 0' : '8px 12px',
                  cursor: 'pointer', position: 'relative',
                  background: isParentActive ? WP.sidebarActive : 'transparent',
                  borderLeft: isParentActive ? `3px solid ${WP.sidebarActiveBorder}` : '3px solid transparent',
                }}
                onClick={() => {
                  if (hasSubs) {
                    toggleExpand(item.id);
                    if (!isExpanded && item.subs) goTo(item.subs[0].id);
                  } else {
                    goTo(item.id);
                  }
                }}
                onMouseEnter={e => { if (!isParentActive) { e.currentTarget.style.background = WP.sidebarHover; } e.currentTarget.querySelector('.menu-label') && (e.currentTarget.querySelector('.menu-label').style.color = '#fff'); }}
                onMouseLeave={e => { if (!isParentActive) { e.currentTarget.style.background = 'transparent'; } e.currentTarget.querySelector('.menu-label') && (e.currentTarget.querySelector('.menu-label').style.color = '#a7aaad'); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* Icon */}
                  {item.isRm ? (
                    <div style={{ width: 20, height: 20, borderRadius: 3, background: WP.rmOrange, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: '#fff', fontSize: 12, fontWeight: 900, lineHeight: 1 }}>R</span>
                    </div>
                  ) : (
                    <span style={{ fontSize: collapsed ? 16 : 14, color: isParentActive ? '#fff' : '#a7aaad', width: 20, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                  )}
                  {!collapsed && (
                    <span className="menu-label" style={{ fontSize: 13, color: isParentActive ? '#fff' : '#a7aaad', transition: 'color 0.1s', whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                  )}
                </div>
                {!collapsed && item.badge && (
                  <span style={{ background: '#d63638', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 5px', borderRadius: 10, lineHeight: 1.6 }}>
                    {item.badge}
                  </span>
                )}
                {!collapsed && hasSubs && (
                  <span style={{ color: '#a7aaad', fontSize: 10, marginLeft: 4 }}>{isExpanded ? '▲' : '▼'}</span>
                )}
              </div>

              {/* Submenu */}
              {!collapsed && hasSubs && isExpanded && (
                <div style={{ background: WP.submenuBg }}>
                  {item.subs.map(sub => {
                    const isSubActive = activePage === sub.id;
                    return (
                      <div
                        key={sub.id}
                        onClick={() => goTo(sub.id)}
                        style={{
                          padding: '5px 12px 5px 36px', cursor: 'pointer', fontSize: 13,
                          color: isSubActive ? '#fff' : '#a7aaad',
                          background: isSubActive ? 'rgba(0,0,0,.3)' : 'transparent',
                          fontWeight: isSubActive ? 600 : 400,
                        }}
                        onMouseEnter={e => { if (!isSubActive) { e.currentTarget.style.color = '#fff'; } }}
                        onMouseLeave={e => { if (!isSubActive) { e.currentTarget.style.color = '#a7aaad'; } }}
                      >
                        {sub.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── MAIN CONTENT AREA ───────────────────────────────────────────────── */}
      <div style={{
        marginTop: 32,
        marginLeft: sidebarW,
        flex: 1,
        minHeight: 'calc(100vh - 32px)',
        padding: '20px 20px 40px',
        background: WP.contentBg,
        boxSizing: 'border-box',
        transition: 'margin-left 0.15s',
      }}>
        {renderPanel()}
      </div>
    </div>
  );
}
