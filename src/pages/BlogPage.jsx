import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import starIcon from '../assets/SVG@4x.png';
import { fetchWpPosts } from '../api/wordpress';

// Local Blog Images from Framer Site
import blog1Img from '../assets/blog/blog_1.jpg';
import blog2Img from '../assets/blog/blog_2.jpg';
import blog3Img from '../assets/blog/blog_3.jpg';
import blog4Img from '../assets/blog/blog_4.jpg';
import blog5Img from '../assets/blog/blog_5.jpg';

export const blogPostsData = [
  {
    id: 'how-nfc-business-cards-are-changing-professional-networking',
    slug: 'how-nfc-business-cards-are-changing-professional-networking',
    title: 'How NFC Business Cards Are Changing Professional Networking',
    date: 'Aug 27, 2026',
    readTime: '3 min read',
    category: 'Smart Hardware',
    featured: true,
    image: blog3Img,
    summary: 'NFC business credentials are revolutionizing executive networking by combining high-end physical materials with instant digital contact exchange.',
    intro: 'In modern executive environments, the exchange of physical contact details is transitioning from traditional paper business cards to digital identity credentials. Precision-crafted NFC cards allow leaders to instantly share contact details, press kits, and digital portfolios with a single tap.',
    sections: [
      {
        heading: '1. Instant Frictionless Contact Exchange',
        body: 'With embedded NFC chips, contacts save directly into smartphone address books without requiring custom apps or manual typing.'
      },
      {
        heading: '2. Dynamic Profile Updates',
        body: 'Unlike printed paper cards that become outdated when information changes, NFC identity profiles can be updated remotely at any time.'
      },
      {
        heading: '3. Executive Prestige & Sustainability',
        body: 'Crafted from matte black stainless steel and gold-plated finishes, modern credentials project authority while reducing paper waste.'
      }
    ],
    takeaway: 'NFC business cards transform networking from a passive interaction into a memorable, high-conversion executive connection.'
  },
  {
    id: 'design-that-converts-what-really-works-in-2026',
    slug: 'design-that-converts-what-really-works-in-2026',
    title: 'Identity design that converts: What really works in 2026',
    date: 'Jul 8, 2026',
    readTime: '2 min read',
    category: 'Design Strategy',
    featured: false,
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
        body: 'Every section of a converting page has a clear role — headlines grab, subtext supports, buttons lead. In 2026, smart use of size, contrast, and whitespace creates flow that nudges users toward conversion without overwhelming them.'
      },
      {
        heading: '4. Interactive micro-moments',
        body: 'Subtle animations, hover states, and scroll-triggered effects create engagement and reduce bounce. These aren’t distractions — they serve a purpose: to reward curiosity, show progress, or build anticipation.'
      },
      {
        heading: '5. Social proof with personality',
        body: 'Testimonies, logos, and reviews still matter — but it’s not about quantity. In 2026, what converts is authenticity. Real faces, honest words, and context-rich case studies create the kind of trust that moves users to act.'
      }
    ],
    takeaway: 'Design that converts in 2026 is human-first, story-driven, and intentional at every step. It’s not about adding more elements — it’s about removing friction and making every interaction feel natural, relevant, and credible.'
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
    date: 'Jun 12, 2026',
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
    date: 'May 23, 2026',
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
    date: 'Feb 1, 2026',
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
  },
  {
    id: 'the-roi-of-premium-nfc-business-credentials',
    slug: 'the-roi-of-premium-nfc-business-credentials',
    title: 'The ROI of premium NFC business credentials for executive teams',
    date: 'Jan 18, 2026',
    readTime: '4 min read',
    category: 'Smart Hardware',
    featured: false,
    image: blog2Img,
    summary: 'Discover how upgrading executive team networking assets to precision metal NFC cards delivers measurable ROI in partnership acquisition.',
    intro: 'Executive credentials are an active conversion tool. Measuring the return on investment of premium metal NFC passes reveals a striking impact on executive deal velocity.',
    sections: [
      {
        heading: '1. Instant Contact Capture',
        body: 'Zero friction contact save means 98% of executive interactions lead to immediate follow-up entries in CRM systems.'
      },
      {
        heading: '2. Unforgettable Brand Differentiation',
        body: 'Handing over a heavy 24k gold or aerospace-grade metal pass instantly elevates brand perception during high-stakes negotiations.'
      }
    ],
    takeaway: 'Investing in luxury credential hardware pays for itself in a single closed high-net-worth contract.'
  },
  {
    id: 'crafting-a-timeless-brand-identity-system',
    slug: 'crafting-a-timeless-brand-identity-system',
    title: 'Crafting a timeless brand identity system in an evolving digital age',
    date: 'Dec 28, 2024',
    readTime: '5 min read',
    category: 'Brand Architecture',
    featured: false,
    image: blog3Img,
    summary: 'How to build enduring visual identity frameworks that remain iconic across physical cards, digital portals, and corporate environments.',
    intro: 'Trends fade, but timeless identity systems endure. Building a brand framework that scales seamlessly requires balance between heritage and innovation.',
    sections: [
      {
        heading: '1. Foundational Design Tokens',
        body: 'Establish rigid typography scales and harmonious color systems that translate perfectly from metal engravings to high-res OLED screens.'
      },
      {
        heading: '2. Modular Brand Guidelines',
        body: 'Equip your internal design teams with reusable components that maintain absolute consistency across global offices.'
      }
    ],
    takeaway: 'Timeless brand architecture protects your organization against design fatigue and frequent costly rebrands.'
  },
  {
    id: 'why-paper-business-cards-are-costing-you-deals',
    slug: 'why-paper-business-cards-are-costing-you-deals',
    title: 'Why paper business cards are costing you high-ticket deals',
    date: 'Dec 14, 2024',
    readTime: '3 min read',
    category: 'Executive Strategy',
    featured: false,
    image: blog4Img,
    summary: 'The hidden cost of outdated paper credentials and why modern enterprise leaders are eliminating paper cards entirely.',
    intro: 'Over 88% of paper business cards are thrown away within 7 days. In high-value B2B sales, paper credentials communicate an outdated approach.',
    sections: [
      {
        heading: '1. The Environmental & Brand Friction',
        body: 'Repetitive paper ordering creates unnecessary environmental waste while offering zero analytics or digital connectivity.'
      },
      {
        heading: '2. Seamless NFC Intelligence',
        body: 'One smart metal pass replaces thousands of paper cards while automatically syncing real-time executive profile updates.'
      }
    ],
    takeaway: 'Retiring paper cards is the simplest high-impact upgrade an executive team can make.'
  },
  {
    id: 'nfc-security-protocols-for-enterprise-leadership',
    slug: 'nfc-security-protocols-for-enterprise-leadership',
    title: 'NFC security protocols & encryption for enterprise leadership',
    date: 'Nov 30, 2024',
    readTime: '6 min read',
    category: 'Security & Hardware',
    featured: false,
    image: blog5Img,
    summary: 'An technical deep dive into bank-grade NFC chip security, dynamic profile encryption, and cloud access control for corporate passes.',
    intro: 'As executive passes incorporate smart hardware, data security becomes paramount. Learn how Identifine protects executive contact data with enterprise encryption.',
    sections: [
      {
        heading: '1. Bank-Grade Encryption',
        body: 'AES-128 hardware encryption guarantees that contactless data transfer is protected against eavesdropping and spoofing.'
      },
      {
        heading: '2. Remote Credential Revocation',
        body: 'Enterprise IT administrators can remotely lock or update stolen or lost cards instantly via the cloud dashboard.'
      }
    ],
    takeaway: 'Security and luxury can coexist without sacrificing speed or user convenience.'
  },
  {
    id: 'the-psychology-of-tactile-luxury-in-b2b-networking',
    slug: 'the-psychology-of-tactile-luxury-in-b2b-networking',
    title: 'The psychology of tactile luxury in high-stakes B2B networking',
    date: 'Nov 12, 2024',
    readTime: '4 min read',
    category: 'Neuromarketing',
    featured: false,
    image: blog1Img,
    summary: 'How weight, texture, and metallic feel trigger psychological trust and subconscious authority during face-to-face introductions.',
    intro: 'Human psychology places immense sub-conscious value on weight and tactile warmth. The moment a client holds a solid metal card, their brain registers prestige.',
    sections: [
      {
        heading: '1. Haptic Perception',
        body: 'Tactile weight triggers neurological associations of stability, durability, and institutional wealth.'
      },
      {
        heading: '2. Sensory Memory Anchoring',
        body: 'Prospects remember physical interactions involving distinct tactile feedback 4x longer than standard digital exchanges.'
      }
    ],
    takeaway: 'Designing for touch creates unforgettable memory anchors that differentiate your leadership.'
  },
  {
    id: 'centralized-credential-management-for-global-firms',
    slug: 'centralized-credential-management-for-global-firms',
    title: 'Centralized credential management for global corporate firms',
    date: 'Oct 25, 2024',
    readTime: '5 min read',
    category: 'Enterprise Tech',
    featured: false,
    image: blog2Img,
    summary: 'Streamlining executive onboarding, profile management, and brand compliance across international team deployments.',
    intro: 'Managing corporate credentials for hundreds of executives across multiple continents requires a centralized cloud platform.',
    sections: [
      {
        heading: '1. Single-Sign-On (SSO) Integration',
        body: 'Connect executive digital passes directly to Okta, Azure AD, or Google Workspace for automated user provisioning.'
      },
      {
        heading: '2. Real-Time Marketing Banners',
        body: 'Push new product campaign announcements to all executive digital profiles simultaneously with one click.'
      }
    ],
    takeaway: 'Centralized identity administration saves hundreds of hours while enforcing global brand alignment.'
  }
];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    let isMounted = true;
    async function loadPosts() {
      const wpPosts = await fetchWpPosts(1, 20);
      if (isMounted) {
        if (wpPosts && wpPosts.length > 0) {
          // Format & attach fallback images if post lacks featured media
          const formatted = wpPosts.map((p, idx) => ({
            ...p,
            summary: p.excerpt || p.title,
            image: p.image || [blog1Img, blog2Img, blog3Img, blog4Img, blog5Img][idx % 5]
          }));

          // Ensure latest updated/modified posts are sorted first
          formatted.sort((a, b) => new Date(b.modifiedDate || b.rawDate || 0) - new Date(a.modifiedDate || a.rawDate || 0));

          setPosts(formatted);
        } else {
          setPosts(blogPostsData);
        }
        setLoading(false);
      }
    }
    loadPosts();
    return () => { isMounted = false; };
  }, []);

  const featuredPost = posts[0] || blogPostsData[0];
  const gridPosts = posts.slice(1);

  const isExpanded = visibleCount >= gridPosts.length;

  const toggleLoadMore = () => {
    if (isExpanded) {
      setVisibleCount(3);
    } else {
      setVisibleCount(prev => Math.min(prev + 3, gridPosts.length));
    }
  };

  return (
    <div className="bg-[#EBEAE6] text-[#111111] min-h-screen pt-36 sm:pt-44 pb-20 px-6 sm:px-12 selection:bg-[#E2B857] selection:text-black overflow-hidden font-sans">
      <div className="max-w-[94rem] mx-auto space-y-10 sm:space-y-14">
        
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

        {/* Skeleton Loader during Initial Fetch */}
        {loading ? (
          <div className="space-y-10 animate-pulse">
            {/* Featured Skeleton */}
            <div className="bg-white border border-[#DCDAD4] h-[480px] sm:h-[580px] w-full rounded-none overflow-hidden" />
            {/* Grid Skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-[#DCDAD4] h-96 rounded-none" />
              <div className="bg-white border border-[#DCDAD4] h-96 rounded-none" />
              <div className="bg-white border border-[#DCDAD4] h-96 rounded-none" />
            </div>
          </div>
        ) : (
          <>
            {/* Featured Post (Hero Card Container) */}
            <div className="animate-hero-fade-3">
          <NavLink
            to={`/blog/${featuredPost.slug}`}
            className="group block bg-white border border-[#DCDAD4] rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 text-left"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Left Image - Full Bleed Image */}
              <div className="lg:col-span-7 h-[480px] sm:h-[640px] lg:h-[800px] overflow-hidden relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                />
              </div>

              {/* Right Content */}
              <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
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

                <p className="text-sm sm:text-base text-[#555555] font-normal leading-relaxed line-clamp-4">
                  {featuredPost.summary}
                </p>
              </div>

            </div>
          </NavLink>
        </div>

        {/* 3-Column Grid of Stories */}
        <div>
          <div className="animate-hero-fade-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {gridPosts.slice(0, visibleCount).map((article) => (
              <NavLink
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group block bg-white border border-[#DCDAD4] rounded-none p-6 sm:p-8 space-y-5 shadow-sm hover:shadow-xl hover:border-[#111111]/30 transition-all duration-500 text-left flex flex-col justify-between animate-hero-fade-4"
              >
                <div className="space-y-5">
                  {/* Article Image */}
                  <div className="h-72 sm:h-84 lg:h-96 rounded-none overflow-hidden relative">
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

          {/* Load More Button - Integrated Tightly */}
          <div className="text-center mt-10 sm:mt-14">
            <button
              onClick={toggleLoadMore}
              className="group relative inline-flex items-center justify-center overflow-hidden bg-white border border-[#CCCCCC] hover:border-[#111111] shadow-sm rounded-2xl px-8 sm:px-10 py-3.5 sm:py-4 text-xs font-bold tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-0.5 select-none cursor-pointer"
            >
              <div className="h-4 relative overflow-hidden flex items-center justify-center min-w-[95px]">
                {/* Default Gray Text */}
                <span className="text-[#777777] transition-transform duration-300 ease-out group-hover:-translate-y-full block whitespace-nowrap">
                  {isExpanded ? 'Show Less' : 'Load More'}
                </span>

                {/* Hover Black Text */}
                <span className="text-[#111111] absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 font-extrabold whitespace-nowrap">
                  {isExpanded ? 'Show Less' : 'Load More'}
                </span>
              </div>
            </button>
          </div>
        </div>
        </>
        )}

      </div>
    </div>
  );
}
