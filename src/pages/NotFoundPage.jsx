import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Home } from 'lucide-react';
import { fetchWpPostBySlug, fetchWpPosts } from '../api/wordpress';
import { blogPostsData } from './BlogPage';

export default function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function checkPost() {
      // Clean path to extract slug
      const rawPath = location.pathname.replace(/^\/+|\/+$/g, '');
      
      // If it's a known non-slug or empty, skip
      if (!rawPath || rawPath.includes('/')) {
        if (isMounted) setChecking(false);
        return;
      }

      // Check if it matches a WordPress post slug or id
      try {
        const post = await fetchWpPostBySlug(rawPath);
        if (post && isMounted) {
          navigate(`/blog/${post.slug || rawPath}`, { replace: true });
          return;
        }

        // Check local blog data
        const local = blogPostsData.find(
          p => p.slug === rawPath || String(p.id) === String(rawPath)
        );
        if (local && isMounted) {
          navigate(`/blog/${local.slug}`, { replace: true });
          return;
        }

        // Search recent posts list
        const wpPosts = await fetchWpPosts(1, 20);
        const match = wpPosts?.find(
          p => p.slug === rawPath || String(p.id) === String(rawPath) || (p.link && p.link.includes(rawPath))
        );
        if (match && isMounted) {
          navigate(`/blog/${match.slug}`, { replace: true });
          return;
        }
      } catch (err) {
        // Ignore fetch errors and proceed to 404
      }

      if (isMounted) {
        setChecking(false);
      }
    }

    checkPost();
    return () => { isMounted = false; };
  }, [location.pathname, navigate]);

  if (checking) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 bg-[#0B0F17]">
        <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-brand-muted text-xs font-mono uppercase tracking-widest">
          Resolving credential request...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-gold-gradient p-[1px] shadow-xl mb-6">
        <div className="w-full h-full bg-[#0B0F17] rounded-[15px] flex items-center justify-center">
          <Shield className="w-8 h-8 text-brand-gold" />
        </div>
      </div>

      <div className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold mb-2">
        Error 404 — Page Not Found
      </div>

      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
        Identity Credentials Out of Bounds
      </h1>

      <p className="text-sm text-brand-muted max-w-md mb-8 leading-relaxed">
        The requested URL or credential page does not exist or has been relocated within the Identifine studio network.
      </p>

      <NavLink
        to="/"
        className="px-8 py-3.5 bg-gold-gradient text-black font-extrabold rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:brightness-110 transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Return to Identifine Home</span>
      </NavLink>
    </div>
  );
}
