import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import starIcon from '../assets/SVG@4x.png';
import { blogPostsData } from './BlogPage';
import { fetchWpPostBySlug, fetchWpPosts } from '../api/wordpress';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [moreStories, setMoreStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadArticle() {
      setLoading(true);
      // 1. Try to fetch from WordPress API by slug
      const wpArticle = await fetchWpPostBySlug(slug);

      // 2. Fetch list of stories for "More stories" section
      const wpMore = await fetchWpPosts(1, 4);

      if (isMounted) {
        if (wpArticle) {
          setArticle(wpArticle);
        } else {
          // Fallback to static local data
          const localArticle = blogPostsData.find(
            (p) => p.slug === slug || p.id === slug
          ) || blogPostsData[0];
          setArticle(localArticle);
        }

        if (wpMore && wpMore.length > 0) {
          setMoreStories(wpMore.filter(p => p.slug !== slug).slice(0, 3));
        } else {
          setMoreStories(blogPostsData.filter((p) => p.slug !== slug).slice(0, 3));
        }
        setLoading(false);
      }
    }

    loadArticle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { isMounted = false; };
  }, [slug]);

  if (loading || !article) {
    return (
      <div className="bg-[#EBEAE6] text-[#111111] min-h-screen pt-44 pb-28 px-6 text-center font-sans flex items-center justify-center">
        <div className="space-y-4">
          <div className="w-10 h-10 border-4 border-[#111111] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-galano text-sm text-[#555555]">Loading story...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EBEAE6] text-[#111111] min-h-screen pt-36 sm:pt-44 pb-28 px-6 sm:px-12 selection:bg-[#E2B857] selection:text-black overflow-hidden font-sans">
      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">

        {/* Back Link */}
        <NavLink
          to="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-galano font-semibold text-[#555555] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all stories</span>
        </NavLink>

        {/* Header Title & Meta */}
        <div className="space-y-4 text-left">
          <div className="inline-flex items-center justify-start gap-2">
            <img
              src={starIcon}
              alt=""
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 object-contain brightness-0"
            />
            <span className="font-galano font-normal text-[#555555] text-xs sm:text-sm uppercase tracking-[2px] sm:tracking-[4px] whitespace-nowrap">
              {article.category || 'Article'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[4rem] font-galano font-medium text-[#111111] leading-[1.12] tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-xs sm:text-sm font-galano font-medium text-[#666666] pt-2">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Featured Hero Image if available */}
        {article.image && (
          <div className="w-full aspect-[16/9] sm:aspect-[21/9] max-h-[550px] rounded-xl overflow-hidden bg-[#F5F4F0] border border-[#DCDAD4] shadow-sm relative">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover object-center select-none"
            />
          </div>
        )}

        {/* Article Content - Render HTML from WordPress REST API */}
        <div className="space-y-8 text-left text-base sm:text-lg text-[#333333] font-normal leading-relaxed">
          {article.contentHtml ? (
            <div
              className="wp-rendered-content space-y-6 text-base sm:text-lg text-[#333333] leading-relaxed font-sans [&_p]:mb-4 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-galano [&_h2]:font-medium [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-galano [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-[#111111] [&_a]:underline [&_a]:font-medium [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:my-6 [&_img]:mx-auto [&_img]:block [&_figure]:max-w-full [&_figure]:h-auto [&_figure]:my-6 [&_figure]:mx-auto [&_iframe]:max-w-full [&_iframe]:w-full [&_iframe]:rounded-xl [&_iframe]:my-6 [&_video]:max-w-full [&_video]:h-auto [&_video]:rounded-xl [&_figcaption]:text-xs [&_figcaption]:text-center [&_figcaption]:text-[#666666] [&_figcaption]:mt-2"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          ) : (
            <>
              {article.intro && (
                <p className="text-lg sm:text-xl font-medium text-[#111111] leading-relaxed border-l-2 border-[#E2B857] pl-4 sm:pl-6">
                  {article.intro}
                </p>
              )}

              {article.sections && article.sections.map((section, idx) => (
                <div key={idx} className="space-y-3 pt-4">
                  <h3 className="text-xl sm:text-2xl font-galano font-medium text-[#111111]">
                    {section.heading}
                  </h3>
                  <p className="text-base sm:text-lg text-[#444444] leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}

              {article.takeaway && (
                <div className="bg-white border border-[#DCDAD4] rounded-none p-6 sm:p-8 space-y-2 mt-8 shadow-sm">
                  <h4 className="text-sm font-galano font-bold text-[#111111] uppercase tracking-wider">
                    Key Takeaway
                  </h4>
                  <p className="text-base sm:text-lg text-[#222222] font-medium leading-relaxed">
                    {article.takeaway}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Section: More Stories */}
        <div className="pt-16 sm:pt-24 border-t border-[#DCDAD4] space-y-10">
          <div className="text-left space-y-2">
            <h2 className="text-3xl sm:text-4xl font-galano font-medium text-[#111111]">
              More <em className="font-swarsh italic font-normal text-[#111111] px-1">stories</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {moreStories.map((story) => (
              <NavLink
                key={story.id}
                to={`/blog/${story.slug}`}
                className="group block bg-white border border-[#DCDAD4] rounded-none p-5 space-y-4 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div className="h-44 sm:h-48 rounded-none overflow-hidden bg-[#F5F4F0]">
                  <img
                    src={story.image || starIcon}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs font-galano text-[#666666]">
                  <span>{story.date}</span>
                  <span>•</span>
                  <span>{story.readTime}</span>
                </div>
                <h4 className="text-base font-galano font-medium text-[#111111] group-hover:text-[#E2B857] transition-colors leading-snug line-clamp-2">
                  {story.title}
                </h4>
              </NavLink>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

