import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import starIcon from '../assets/SVG@4x.png';

// Local Blog Images from Framer Site
import blog1Img from '../assets/blog/blog_1.jpg';
import blog2Img from '../assets/blog/blog_2.jpg';
import blog3Img from '../assets/blog/blog_3.jpg';
import blog4Img from '../assets/blog/blog_4.jpg';
import blog5Img from '../assets/blog/blog_5.jpg';

export const blogPostsData = [
  {
    id: 'design-that-converts-what-really-works-in-2025',
    slug: 'design-that-converts-what-really-works-in-2025',
    title: 'Identity design that converts: What really works in 2026',
    date: 'Jul 8, 2026',
    readTime: '2 min read',
    category: 'Design Strategy',
    featured: true,
    image: blog1Img,
    summary: 'Conversion-focused design in 2026 is no longer about flashy CTAs or aggressive funnels. It’s about trust, clarity, and creating seamless experiences that guide users naturally.',
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
  {
    id: 'why-corporate-identity-is-the-future-of-organizations-success',
    slug: 'why-corporate-identity-is-the-future-of-organizations-success',
    title: 'Why corporate identity is the future of organization’s success',
    date: 'Jul 2, 2026',
    readTime: '5 min read',
    category: 'Corporate Growth',
    featured: false,
    image: blog2Img,
    summary: 'Identity is an administrative necessity turned strategic organizational capability. Explore why leading firms are overhauling their credential infrastructure.',
    intro: 'In an increasingly decentralized commercial landscape, physical and digital identity touchpoints define institutional prestige and executive credibility. Organizations that invest in unified prestige identity assets command greater market authority.',
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
  {
    id: 'identity-mistakes-you-didnt-know-you-were-making',
    slug: 'identity-mistakes-you-didnt-know-you-were-making',
    title: 'Identity mistakes you didn’t know you were making',
    date: 'Jun 21, 2026',
    readTime: '2 min read',
    category: 'Brand Audit',
    featured: false,
    image: blog3Img,
    summary: 'From cheap paper cards to fragmented digital links, discover the subtle identity blunders sabotaging executive credibility.',
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
  },
  {
    id: 'building-trust-through-thoughtful-web-design',
    slug: 'building-trust-through-thoughtful-web-design',
    title: 'Building trust through thoughtful web design',
    date: 'Jun 12, 2025',
    readTime: '4 min read',
    category: 'Web Experience',
    featured: false,
    image: blog4Img,
    summary: 'High-converting digital experiences prioritize straightforward messaging, scannable layouts, and intuitive interactions.',
    intro: 'In a noisy digital space, clarity wins. High-converting designs prioritize straightforward messaging, scannable layouts, and intuitive interactions.',
    sections: [
      {
        heading: '1. Scannable Visual Hierarchy',
        body: 'Users evaluate brand credibility within seconds. Clean typography, generous spacing, and crisp imagery immediately command respect.'
      },
      {
        heading: '2. Frictionless Navigation',
        body: 'Eliminating navigation confusion keeps visitors engaged longer, leading to higher conversion rates across all entry points.'
      }
    ],
    takeaway: 'Thoughtful web design builds emotional connection and institutional authority before a conversation even begins.'
  },
  {
    id: 'landing-page-tips-that-drive-more-bookings',
    slug: 'landing-page-tips-that-drive-more-bookings',
    title: 'Landing page tips that drive more bookings',
    date: 'May 23, 2025',
    readTime: '6 min read',
    category: 'Conversion Strategy',
    featured: false,
    image: blog5Img,
    summary: 'Discover the exact visual hierarchy, headline structures, and interactive micro-moments that maximize user bookings.',
    intro: 'Conversion-focused landing pages balance compelling headlines with seamless CTA touchpoints. Learn how to structure pages that convert.',
    sections: [
      {
        heading: '1. Single Clear Primary Action',
        body: 'Remove competing calls-to-action to give visitors a clear, unambiguous path forward.'
      },
      {
        heading: '2. Social Proof Placed Strategically',
        body: 'Position client logos, metrics, and testimonials right where users make key decisions.'
      }
    ],
    takeaway: 'A well-structured landing page turns passive traffic into qualified consultations effortlessly.'
  },
  {
    id: 'how-to-craft-a-bio-that-works-on-every-platform',
    slug: 'how-to-craft-a-bio-that-works-on-every-platform',
    title: 'How to craft a bio that works on every platform',
    date: 'May 14, 2025',
    readTime: '3 min read',
    category: 'Personal Branding',
    featured: false,
    image: blog1Img,
    summary: 'A cohesive bio strategy across web, NFC passes, and executive press kits ensures your leadership narrative is crystal clear.',
    intro: 'Your bio is often your digital elevator pitch. Learn how to craft a succinct executive summary that resonates across all channels.',
    sections: [
      {
        heading: '1. Lead with Impact',
        body: 'Start with your core mission and key achievements rather than a chronological resume.'
      },
      {
        heading: '2. Adapt for Format Widths',
        body: 'Maintain core brand messaging whether in a 140-character bio or a full executive profile page.'
      }
    ],
    takeaway: 'A sharp, unified bio ensures consistent authority wherever your audience encounters you.'
  }
];

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(6);

  const featuredPost = blogPostsData.find(p => p.featured) || blogPostsData[0];
  const gridPosts = blogPostsData.filter(p => p.id !== featuredPost.id);

  return (
    <div className="bg-[#EBEAE6] text-[#111111] min-h-screen pt-36 sm:pt-44 pb-28 px-6 sm:px-12 selection:bg-[#E2B857] selection:text-black overflow-hidden font-sans">
      <div className="max-w-[94rem] mx-auto space-y-16 sm:space-y-20">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="animate-hero-fade-1 inline-flex items-center justify-center gap-2 mx-auto">
            <img
              src={starIcon}
              alt=""
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 object-contain brightness-0"
            />
            <span className="font-galano font-normal text-[#555555] text-xs sm:text-sm uppercase tracking-[2px] sm:tracking-[4px] whitespace-nowrap">
              our blog
            </span>
          </div>

          <h1 className="animate-hero-fade-2 text-5xl sm:text-7xl lg:text-[5.5rem] font-galano font-medium text-[#111111] leading-[1.08] text-center tracking-tight">
            Explore <em className="font-swarsh italic font-normal text-[#111111] px-1.5 sm:px-2">our</em> top stories
          </h1>
        </div>

        {/* Featured Post (Hero Card Container) */}
        <div className="animate-hero-fade-3">
          <NavLink
            to={`/blog/${featuredPost.slug}`}
            className="group block bg-white border border-[#DCDAD4] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 text-left"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Left Image */}
              <div className="lg:col-span-7 h-[260px] sm:h-[380px] lg:h-[480px] overflow-hidden bg-[#F5F4F0] relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                />
              </div>

              {/* Right Content */}
              <div className="lg:col-span-5 p-8 sm:p-12 space-y-5">
                <span className="inline-block bg-[#111111] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                  Featured post
                </span>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-galano font-medium text-[#666666]">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-galano font-medium text-[#111111] group-hover:text-[#E2B857] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm sm:text-base text-[#555555] font-normal leading-relaxed line-clamp-3">
                  {featuredPost.summary}
                </p>
              </div>

            </div>
          </NavLink>
        </div>

        {/* 3-Column Grid of Stories */}
        <div className="animate-hero-fade-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
          {gridPosts.slice(0, visibleCount).map((article) => (
            <NavLink
              key={article.id}
              to={`/blog/${article.slug}`}
              className="scroll-reveal group block bg-white border border-[#DCDAD4] rounded-[28px] p-6 sm:p-8 space-y-5 shadow-sm hover:shadow-xl hover:border-[#111111]/30 transition-all duration-500 text-left flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Article Image */}
                <div className="h-52 sm:h-60 rounded-2xl overflow-hidden bg-[#F5F4F0] relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                  />
                </div>

                {/* Article Meta */}
                <div className="flex items-center gap-3 text-xs sm:text-sm font-galano font-medium text-[#666666]">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Article Title */}
                <h3 className="text-xl sm:text-2xl font-galano font-medium text-[#111111] group-hover:text-[#E2B857] transition-colors leading-snug">
                  {article.title}
                </h3>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < gridPosts.length && (
          <div className="text-center pt-8">
            <button
              onClick={() => setVisibleCount(gridPosts.length)}
              className="inline-flex items-center justify-center text-xs font-semibold px-8 py-3.5 rounded-xl bg-black/[0.03] backdrop-blur-xl text-[#444444] border border-[#111111]/20 hover:bg-black/[0.08] hover:text-black hover:border-black/60 shadow-sm transition-all duration-300 select-none"
            >
              Load More
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
