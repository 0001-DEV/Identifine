import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import starIcon from '../assets/SVG@4x.png';

// Images
import blogHeroConverts from '../assets/blog_hero_converts.jpg';
import cardOneImg from '../assets/Card 1.png';
import postProcessImg from '../assets/Post process 6.jpg';
import blackMatteRender from '../assets/Black matte render 2.png';

const blogArticles = {
  'design-that-converts-what-really-works-in-2025': {
    title: 'Identity design that converts: What really works in 2025',
    date: 'Jul 8, 2026',
    readTime: '2 min read',
    category: 'Design Strategy',
    heroImage: blogHeroConverts,
    intro: 'Conversion-focused design in 2026 is no longer about flashy CTAs or aggressive funnels. It’s about trust, clarity, and creating seamless experiences that guide users naturally. The best-converting websites today don’t just look good — they communicate value instantly and intuitively. Let’s break down what’s working now.',
    sections: [
      {
        heading: '1. Clarity over cleverness',
        body: 'In a noisy digital space, clarity wins. High-converting designs prioritize straightforward messaging, scannable layouts, and intuitive interactions. Users should know what you do, who it’s for, and what to do next — in under five seconds.'
      },
      {
        heading: '2. Story-led UX',
        body: 'Rather than pushing users toward an action, leading websites use narrative structure. They guide visitors through a journey: establishing a problem, showing empathy, presenting the solution, and ending with a compelling offer. This builds emotional investment before the ask.'
      },
      {
        heading: '3. Visual hierarchy that drives action',
        body: 'Every section of a converting page has a clear role — headlines grab, subtext supports, buttons lead. In 2025, smart use of size, contrast, and whitespace creates flow that nudges users toward conversion without overwhelming them.'
      },
      {
        heading: '4. Interactive micro-moments',
        body: 'Subtle animations, hover states, and scroll-triggered effects create engagement and reduce bounce. These aren’t distractions — they serve a purpose: to reward curiosity, show progress, or build anticipation.'
      },
      {
        heading: '5. Social proof with personality',
        body: 'Testimonies, logos, and reviews still matter — but it’s not about quantity. In 2025, what converts is authenticity. Real faces, honest words, and context-rich case studies create the kind of trust that moves users to act.'
      }
    ],
    takeaway: 'Design that converts in 2025 is human-first, story-driven, and intentional at every step. It’s not about adding more elements — it’s about removing friction and making every interaction feel natural, relevant, and credible.'
  },
  'future-of-corporate-identity-2026': {
    title: 'Why corporate identity is the future of organization’s success',
    date: 'Jul 2, 2026',
    readTime: '5 min read',
    category: 'Brand Strategy',
    heroImage: postProcessImg,
    intro: 'In an increasingly decentralized commercial landscape, physical and digital identity touchpoints define institutional prestige and executive credibility.',
    sections: [
      {
        heading: '1. Physical presence in a digital world',
        body: 'Tangible leadership credentials like precision metal smart cards create lasting first impressions that digital apps alone cannot match.'
      },
      {
        heading: '2. Security meets luxury',
        body: 'Modern enterprises require encrypted access protocols packaged inside bespoke architectural craftsmanship.'
      }
    ],
    takeaway: 'Organizations that invest in unified prestige identity assets command greater market authority and partnership trust.'
  },
  'identity-mistakes-you-are-making': {
    title: 'Identity mistakes you didn’t know you were making',
    date: 'Jun 21, 2026',
    readTime: '2 min read',
    category: 'Leadership',
    heroImage: blackMatteRender,
    intro: 'Many high-growth firms treat identity credentials as an administrative afterthought rather than a strategic branding weapon.',
    sections: [
      {
        heading: '1. Inconsistent executive touchpoints',
        body: 'When leadership exchanges disparate or flimsy paper cards, it dilutes brand valuation during critical investor and client meetings.'
      },
      {
        heading: '2. Ignoring contactless intelligence',
        body: 'Failing to leverage embedded NFC and digital profile ecosystems causes missed connection opportunities.'
      }
    ],
    takeaway: 'Auditing your identity touchpoints is the fastest way to upgrade your executive market presence.'
  }
};

const moreStories = [
  {
    slug: 'design-that-converts-what-really-works-in-2025',
    title: 'Identity design that converts: What really works in 2026',
    date: 'Jul 8, 2026',
    readTime: '2 min read',
    image: cardOneImg
  },
  {
    slug: 'future-of-corporate-identity-2026',
    title: 'Why corporate identity is the future of organization’s success',
    date: 'Jul 2, 2026',
    readTime: '5 min read',
    image: postProcessImg
  },
  {
    slug: 'identity-mistakes-you-are-making',
    title: 'Identity mistakes you didn’t know you were making',
    date: 'Jun 21, 2026',
    readTime: '2 min read',
    image: blackMatteRender
  }
];

export default function BlogDetailPage() {
  const { slug } = useParams();
  const article = blogArticles[slug] || blogArticles['design-that-converts-what-really-works-in-2025'];

  return (
    <div className="bg-[#ffffff] text-[#111111] min-h-screen pt-36 sm:pt-48 pb-28 px-6 sm:px-12 selection:bg-[#E2B857] selection:text-black font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Back Link */}
        <div>
          <NavLink
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#737378] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </NavLink>
        </div>

        {/* Article Header with Page-Open Entry Animation */}
        <div className="space-y-6">
          <div className="animate-hero-fade-1 inline-flex items-center gap-2.5">
            <img src={starIcon} alt="" className="w-4 h-4 object-contain brightness-0" />
            <span className="font-galano font-medium text-[#737378] text-xs uppercase tracking-widest">
              {article.category}
            </span>
          </div>

          <h1 className="animate-hero-fade-2 text-3xl sm:text-5xl lg:text-6xl font-galano font-semibold text-[#111111] tracking-tight leading-[1.12]">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="animate-hero-fade-3 flex items-center gap-6 text-sm font-mono text-[#737378] pt-2 border-b border-[#E5E5E5] pb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#111111]" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#111111]" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="animate-hero-fade-4 w-full rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-lg bg-[#F5F5F3]">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-auto object-cover select-none"
          />
        </div>

        {/* Article Body */}
        <div className="space-y-10 text-[#333333] font-galano text-base sm:text-lg leading-relaxed pt-6">
          
          {/* Introduction */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-galano font-semibold text-[#111111] tracking-tight">
              Introduction
            </h2>
            <p className="leading-relaxed text-[#444444]">
              {article.intro}
            </p>
          </div>

          {/* Core Sections */}
          {article.sections && article.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3 pt-2">
              <h3 className="text-xl sm:text-2xl font-galano font-semibold text-[#111111] tracking-tight">
                {sec.heading}
              </h3>
              <p className="leading-relaxed text-[#444444]">
                {sec.body}
              </p>
            </div>
          ))}

          {/* Takeaway Block */}
          {article.takeaway && (
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#F9F9F8] border-l-4 border-l-[#111111] border-y border-r border-[#E5E5E5] space-y-3">
              <h4 className="text-xl font-galano font-semibold text-[#111111] tracking-tight">
                Takeaway
              </h4>
              <p className="leading-relaxed text-[#333333]">
                {article.takeaway}
              </p>
            </div>
          )}

        </div>

        {/* More Stories Section */}
        <div className="pt-20 border-t border-[#E5E5E5] space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl sm:text-3xl font-galano font-medium text-[#111111]">
              More <span className="font-swarsh italic text-[#111111]">Stories</span>
            </h3>
            <NavLink
              to="/blog"
              className="text-xs font-mono uppercase text-[#111111] hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {moreStories
              .filter(s => s.slug !== slug)
              .slice(0, 2)
              .map((story, i) => (
                <NavLink
                  key={i}
                  to={`/blog/${story.slug}`}
                  className="group rounded-2xl bg-[#F9F9F8] border border-[#E5E5E5] hover:border-black/30 p-4 space-y-4 transition-all duration-300 hover:-translate-y-1 block shadow-sm"
                >
                  <div className="w-full h-36 rounded-xl overflow-hidden bg-[#EBEAE6] border border-[#E5E5E5]">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-[#737378]">{story.date} • {story.readTime}</span>
                    <h4 className="text-sm font-galano font-medium text-[#111111] group-hover:text-black transition-colors leading-snug line-clamp-2">
                      {story.title}
                    </h4>
                  </div>
                </NavLink>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
