import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Plus, Edit3, Trash2, ExternalLink, FileText, CheckCircle, ArrowLeft, 
  Sparkles, Save, Eye, Layers, Image as ImageIcon, Tag, BookOpen, AlertCircle,
  ShieldCheck, Settings, Lock
} from 'lucide-react';
import RankMathPanel from '../components/RankMathPanel';
import AdminSettingsPanel from '../components/AdminSettingsPanel';
import { analyzeSeo } from '../utils/seoAnalyzer';
import { getActiveRole, setActiveRole, ROLES } from '../utils/roleManager';
import { blogPostsData } from './BlogPage';

import { getCustomArticles, saveCustomArticles } from '../utils/customArticles';
export { getCustomArticles, saveCustomArticles };

function slugify(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function BlogAdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'manager' | 'settings'
  const [role, setRoleState] = useState(getActiveRole());

  const handleRoleChange = (newRole) => {
    setActiveRole(newRole);
    setRoleState(newRole);
  };
  
  // Custom Articles State
  const [articles, setArticles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isAutoSlug, setIsAutoSlug] = useState(true);
  const [category, setCategory] = useState('Design Strategy');
  const [readTime, setReadTime] = useState('3 min read');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80');
  const [summary, setSummary] = useState('');
  const [intro, setIntro] = useState('');
  const [takeaway, setTakeaway] = useState('');
  const [sections, setSections] = useState([
    { heading: '1. Clarity and Executive Presence', body: 'Modern identity solutions must prioritize instant credibility and intuitive user interactions across physical and digital touchpoints.' },
    { heading: '2. Frictionless Contact Capture', body: 'By reducing typing friction, professionals capture 3x more meaningful leads during high-value corporate events.' }
  ]);
  const [focusKeyword, setFocusKeyword] = useState('');

  // Notification Toast
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loaded = getCustomArticles();
    setArticles(loaded);

    const handleRoleUpdate = () => setRoleState(getActiveRole());
    window.addEventListener('identifine_role_changed', handleRoleUpdate);
    return () => window.removeEventListener('identifine_role_changed', handleRoleUpdate);
  }, []);

  // Update slug automatically when title changes if auto-slug is enabled
  const handleTitleChange = (val) => {
    setTitle(val);
    if (isAutoSlug) {
      setSlug(slugify(val));
    }
  };

  // Perform Live Rank Math SEO Analysis
  const seoResult = analyzeSeo({
    title,
    slug,
    excerpt: summary || intro,
    focusKeyword,
    sections
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Reset form to blank
  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setIsAutoSlug(true);
    setCategory('Design Strategy');
    setReadTime('3 min read');
    setDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    setFeaturedImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80');
    setSummary('');
    setIntro('');
    setTakeaway('');
    setSections([
      { heading: '1. Executive Credibility', body: 'High-performing organizations invest in cohesive identity touchpoints to stand out.' }
    ]);
    setFocusKeyword('');
  };

  // Load article into editor
  const handleEditArticle = (art) => {
    setEditingId(art.id);
    setTitle(art.title || '');
    setSlug(art.slug || '');
    setIsAutoSlug(false);
    setCategory(art.category || 'Design Strategy');
    setReadTime(art.readTime || '3 min read');
    setDate(art.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    setFeaturedImage(art.image || '');
    setSummary(art.summary || '');
    setIntro(art.intro || '');
    setTakeaway(art.takeaway || '');
    setSections(art.sections || []);
    setFocusKeyword(art.focusKeyword || '');
    setActiveTab('editor');
  };

  // Save / Publish article
  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter an article title');
      return;
    }

    const finalSlug = slug.trim() || slugify(title);

    const newArticle = {
      id: editingId || finalSlug || `art-${Date.now()}`,
      slug: finalSlug,
      title: title.trim(),
      date,
      readTime,
      category,
      featured: true,
      image: featuredImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      summary: summary.trim() || intro.trim().slice(0, 140),
      intro: intro.trim(),
      sections,
      takeaway: takeaway.trim(),
      focusKeyword,
      seoScore: seoResult.score,
      createdAt: new Date().toISOString()
    };

    let updatedArticles = [];
    if (editingId) {
      updatedArticles = articles.map(a => a.id === editingId ? newArticle : a);
    } else {
      updatedArticles = [newArticle, ...articles];
    }

    setArticles(updatedArticles);
    saveCustomArticles(updatedArticles);
    showToast(editingId ? 'Article updated successfully!' : 'New article published successfully!');
    
    // Switch to manager tab or reset
    setActiveTab('manager');
  };

  // Delete article
  const handleDeleteArticle = (id) => {
    if (role !== 'ADMIN' && role !== 'EDITOR') {
      alert('Only Editors and Administrators can delete articles.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this article?')) {
      const filtered = articles.filter(a => a.id !== id);
      setArticles(filtered);
      saveCustomArticles(filtered);
      if (editingId === id) resetForm();
      showToast('Article deleted');
    }
  };

  // Add new section block
  const addSection = () => {
    setSections([...sections, { heading: `${sections.length + 1}. New Heading`, body: '' }]);
  };

  // Update section block
  const updateSection = (index, field, value) => {
    const next = [...sections];
    next[index][field] = value;
    setSections(next);
  };

  // Delete section block
  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const activeRoleInfo = ROLES[role] || ROLES.ADMIN;

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 font-sans pt-28 pb-20 px-4 sm:px-8">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="font-semibold text-sm">{toast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP ROLE SWITCHER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-950 p-4 rounded-2xl border border-zinc-800 gap-4 shadow-lg">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Active Role Mode:</span>
            <span 
              className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
              style={{
                backgroundColor: `${activeRoleInfo.color}20`,
                borderColor: `${activeRoleInfo.color}50`,
                color: activeRoleInfo.color
              }}
            >
              {activeRoleInfo.label} ({activeRoleInfo.badge})
            </span>
          </div>

          {/* Selector Pills */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            {Object.values(ROLES).map((r) => (
              <button
                key={r.id}
                onClick={() => handleRoleChange(r.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  role === r.id
                    ? 'bg-zinc-800 text-white shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/90 p-6 rounded-2xl border border-zinc-800 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <NavLink to="/blog" className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </NavLink>
              <h1 className="text-2xl sm:text-3xl font-galano font-bold tracking-tight text-white flex items-center gap-2.5">
                Identifine Studio
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-sans font-semibold">
                  RBAC Enabled
                </span>
              </h1>
            </div>
            <p className="text-sm text-zinc-400 pl-11">
              Role-based Content Composer, Rank Math SEO Engine, and Permalinks Manager.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => { resetForm(); setActiveTab('editor'); }}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-emerald-950/50"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Post</span>
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center space-x-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'editor'
                ? 'bg-zinc-800 text-white shadow-md border border-zinc-700'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Edit3 className="w-4 h-4 text-emerald-400" />
            <span>{editingId ? 'Edit Article' : 'Article & SEO Studio'}</span>
          </button>

          <button
            onClick={() => setActiveTab('manager')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'manager'
                ? 'bg-zinc-800 text-white shadow-md border border-zinc-700'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Article Manager ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'settings'
                ? 'bg-zinc-800 text-white shadow-md border border-zinc-700'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Settings className="w-4 h-4 text-emerald-400" />
            <span>System & Permalinks Settings</span>
            {role !== 'ADMIN' && (
              <Lock className="w-3 h-3 text-zinc-500 ml-1" />
            )}
          </button>
        </div>

        {/* TAB 1: ARTICLE & RANK MATH EDITOR */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: ARTICLE CONTENT EDITOR (7 Cols) */}
            <form onSubmit={handlePublish} className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800/80 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <h2 className="text-lg font-galano font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  {editingId ? 'Edit Article Details' : 'Article Composer'}
                </h2>
                {editingId && (
                  <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 font-medium">
                    Editing Post #{editingId}
                  </span>
                )}
              </div>

              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. 10 Reasons to Upgrade to Smart Metal Business Cards in Lagos"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-medium text-base transition-all"
                />
              </div>

              {/* Slug Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    URL Slug
                  </label>
                  <label className="flex items-center space-x-1.5 text-xs text-zinc-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAutoSlug}
                      onChange={(e) => setIsAutoSlug(e.target.checked)}
                      className="rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
                    />
                    <span>Auto-generate from title</span>
                  </label>
                </div>
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-400">
                  <span className="text-zinc-500 text-xs hidden sm:inline mr-1">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => { setSlug(e.target.value); setIsAutoSlug(false); }}
                    placeholder="article-slug-url"
                    className="w-full bg-transparent text-emerald-400 font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Category, Date & Read Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Smart Hardware">Smart Hardware</option>
                    <option value="Design Strategy">Design Strategy</option>
                    <option value="Corporate Growth">Corporate Growth</option>
                    <option value="Brand Audit">Brand Audit</option>
                    <option value="Web Experience">Web Experience</option>
                    <option value="Personal Branding">Personal Branding</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="3 min read"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              {/* Meta Description / Excerpt */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Meta Description / Excerpt
                  </label>
                  <span className={`text-xs ${summary.length >= 120 && summary.length <= 160 ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    {summary.length} / 160 chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="A short compelling summary of the article for Google search snippet results..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Introduction Paragraph */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Article Introduction Paragraph
                </label>
                <textarea
                  rows={3}
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="Write the opening hook paragraph for your readers..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-all leading-relaxed"
                />
              </div>

              {/* Section Blocks */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Article Content Sections ({sections.length})
                  </label>
                  <button
                    type="button"
                    onClick={addSection}
                    className="text-xs bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Section Block</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {sections.map((sec, idx) => (
                    <div key={idx} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Section #{idx + 1}
                        </span>
                        {sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSection(idx)}
                            className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                            title="Remove section"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        value={sec.heading}
                        onChange={(e) => updateSection(idx, 'heading', e.target.value)}
                        placeholder="Section Heading (e.g. 1. Executive Credibility)"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
                      />

                      <textarea
                        rows={3}
                        value={sec.body}
                        onChange={(e) => updateSection(idx, 'body', e.target.value)}
                        placeholder="Write paragraph content for this section..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Takeaway / Conclusion */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Key Takeaway / Conclusion
                </label>
                <textarea
                  rows={2}
                  value={takeaway}
                  onChange={(e) => setTakeaway(e.target.value)}
                  placeholder="Final takeaway sentence summarizing the article's value proposition..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zinc-800">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm font-medium transition-colors"
                  >
                    Cancel Editing
                  </button>
                )}

                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-emerald-950/60 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'Update & Save Article' : 'Publish Article Live'}</span>
                </button>
              </div>

            </form>

            {/* RIGHT COLUMN: RANK MATH REAL-TIME SEO PANEL (5 Cols) */}
            <div className="lg:col-span-5 sticky top-28">
              <RankMathPanel
                seoResult={seoResult}
                focusKeyword={focusKeyword}
                setFocusKeyword={setFocusKeyword}
              />
            </div>

          </div>
        )}

        {/* TAB 2: ARTICLE MANAGER LIST */}
        {activeTab === 'manager' && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-galano font-bold text-white">Published Articles & Drafts</h2>
                <p className="text-xs text-zinc-400">Manage and edit your custom articles stored in the application.</p>
              </div>
              <button
                onClick={() => { resetForm(); setActiveTab('editor'); }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Article</span>
              </button>
            </div>

            {articles.length === 0 ? (
              <div className="text-center py-16 bg-zinc-950/60 rounded-xl border border-zinc-800/80 space-y-3">
                <FileText className="w-10 h-10 text-zinc-600 mx-auto" />
                <p className="text-zinc-400 text-sm font-medium">No custom articles published yet.</p>
                <p className="text-zinc-500 text-xs max-w-sm mx-auto">
                  Click "Create New Post" above to write and SEO-optimize your first custom blog post!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-800/90 hover:border-zinc-700 transition-all gap-4"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-14 h-14 rounded-lg object-cover bg-zinc-800 shrink-0"
                      />
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                            {art.category}
                          </span>
                          <span className="text-xs text-zinc-500">{art.date}</span>
                          {art.seoScore !== undefined && (
                            <span 
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                              style={{
                                backgroundColor: art.seoScore >= 80 ? '#10b98120' : art.seoScore >= 50 ? '#f59e0b20' : '#ef444420',
                                borderColor: art.seoScore >= 80 ? '#10b98150' : art.seoScore >= 50 ? '#f59e0b50' : '#ef444450',
                                color: art.seoScore >= 80 ? '#10b981' : art.seoScore >= 50 ? '#f59e0b' : '#ef4444'
                              }}
                            >
                              SEO Score: {art.seoScore}/100
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold text-white truncate hover:text-emerald-400 transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-xs text-zinc-500 font-mono truncate">/blog/{art.slug}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                      <NavLink
                        to={`/blog/${art.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                        title="View Live Article"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </NavLink>

                      <button
                        onClick={() => handleEditArticle(art)}
                        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-emerald-400 transition-colors"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-rose-400 transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SYSTEM & PERMALINKS SETTINGS */}
        {activeTab === 'settings' && (
          role === 'ADMIN' ? (
            <AdminSettingsPanel onSaveSuccess={() => showToast('System Settings updated!')} />
          ) : (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-12 text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-galano font-bold text-white">Administrator Access Required</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  Global System Settings, Permalinks Configuration, and Team Permissions are restricted to Administrator accounts.
                </p>
              </div>
              <button
                onClick={() => handleRoleChange('ADMIN')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg inline-flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Switch to Administrator Role</span>
              </button>
            </div>
          )
        )}

      </div>
    </div>
  );
}
