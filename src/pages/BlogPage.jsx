import React, { useState } from 'react';
import { Sparkles, Search, Clock, ArrowUpRight, BookOpen, X, Share2, Tag } from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Identity Strategy', 'Design & Aesthetics', 'Leadership', 'Smart Hardware'];

  const articles = [
    {
      id: 'design-that-converts-2026',
      date: 'Jul 8, 2026',
      readTime: '2 min read',
      category: 'Design & Aesthetics',
      title: 'Identity design that converts: What really works in 2026',
      summary: 'In 2026, identity is no longer static. Learn how tactile metal credentials paired with dynamic NFC profiles increase high-value deal conversions by over 140%.',
      content: `
### The Evolution of Executive Introductions

For decades, the standard paper business card served as the de facto tool for corporate networking. However, in modern high-stakes environments, standard paper credentials are often discarded or forgotten within hours.

#### Key Principles of High-Converting Identity Design:

1. **Tactile Gravitas:** Heavy aircraft-grade metal or gold finishes immediately signal substance before a single word is spoken.
2. **Instant Digital Frictionlessness:** Tapping a metal card to transfer encrypted dynamic portfolios eliminates manual typing and ensures instant contact save.
3. **Centralized Brand Authority:** Organizations maintain real-time cloud control over executive digital profiles, ensuring pitch decks and credentials are always up to date.

Choosing an identity partner with real hardware engineering capabilities transforms your team's outward confidence.
      `
    },
    {
      id: 'future-corporate-identity',
      date: 'Jul 2, 2026',
      readTime: '5 min read',
      category: 'Identity Strategy',
      title: 'Why corporate identity is the future of organization’s success',
      summary: 'Identity is an administrative necessity turned strategic organizational capability. Explore why leading firms are overhauling their credential infrastructure.',
      content: `
### Strategic Organizational Capability

When organizations think about identity, they frequently mistake it for a visual emblem or brand logo. In reality, identity encompasses the total experience of how an organization presents its authority, values, and security to the world.

#### The 3 Pillars of Organizational Identity:
- **Internal Alignment:** Inspiring employees with unified pride and clear culture.
- **External Authority:** Command instant trust with high-net-worth clients and institutional partners.
- **Hardware Integration:** Security passes and access credentials that embody luxury rather than plastic friction.
      `
    },
    {
      id: 'branding-mistakes-2026',
      date: 'Jun 21, 2026',
      readTime: '2 min read',
      category: 'Leadership',
      title: 'Identity mistakes you didn’t know you were making',
      summary: 'From cheap paper cards to fragmented digital links, discover the subtle identity blunders sabotaging executive credibility.',
      content: `
### Common Identity Pitfalls to Avoid

Even the most sophisticated organizations fall into hidden traps when presenting their brand identity.

#### Top 3 Mistakes:
1. **Using Low-Grade Plastic/Paper Credentials:** Cheap cards diminish high-ticket service pricing.
2. **Outdated Contact Links:** Broken website URLs or old PDF pitch decks linked in email signatures.
3. **Inconsistent Team Credentials:** Each executive using a different style or format, diluting brand coherence.
      `
    }
  ];

  const filteredArticles = articles.filter(a => {
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="animate-hero-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-semibold uppercase tracking-widest border border-brand-gold/20">
          <Sparkles className="w-3.5 h-3.5" /> Insights & Inspiration
        </div>
        <h1 className="animate-hero-fade-2 font-display text-4xl sm:text-5xl font-extrabold text-white">
          Identifine <span className="gold-gradient-text">Journal</span>
        </h1>
        <p className="animate-hero-fade-3 text-sm sm:text-base text-brand-muted">
          Perspectives on corporate identity design, executive presence, and modern credential engineering.
        </p>
      </div>

      {/* Search & Categories Bar */}
      <div className="animate-hero-fade-4 flex flex-col md:flex-row items-center justify-between gap-4 glass-panel rounded-2xl p-4 border border-brand-border">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-brand-darkMuted focus:outline-none focus:border-brand-gold transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-gradient text-black font-bold'
                  : 'bg-white/5 text-brand-muted hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setActiveArticle(article)}
            className="group cursor-pointer glass-panel glass-panel-hover rounded-3xl p-8 flex flex-col justify-between space-y-6 border border-white/10"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-brand-muted font-mono">
                <span>{article.date}</span>
                <span className="flex items-center gap-1 text-brand-gold">
                  <Clock className="w-3.5 h-3.5" /> {article.readTime}
                </span>
              </div>

              <span className="inline-block text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-brand-gold border border-white/10">
                {article.category}
              </span>

              <h2 className="font-display text-xl font-bold text-white group-hover:text-brand-gold transition-colors leading-snug">
                {article.title}
              </h2>

              <p className="text-xs text-brand-muted leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-brand-gold">
              <span>Read Article</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Drawer / Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-3xl glass-panel rounded-3xl p-8 md:p-12 border border-brand-border bg-[#0B0F17] text-white max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 text-brand-muted hover:text-white rounded-full bg-white/5 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4 text-xs font-mono text-brand-gold">
                <span>{activeArticle.category}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-extrabold">{activeArticle.title}</h1>
            </div>

            <div className="prose prose-invert prose-xs sm:prose-sm max-w-none text-brand-muted leading-relaxed whitespace-pre-line border-t border-brand-border pt-6">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-brand-border flex items-center justify-between">
              <a
                href="https://wa.me/2349030001851"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gold-gradient text-black font-extrabold rounded-xl text-xs flex items-center gap-2"
              >
                <span>Discuss Article Topic</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2.5 bg-white/5 text-brand-muted hover:text-white rounded-xl text-xs font-medium"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
