import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
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
