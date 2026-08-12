import React, { useState } from 'react';
import { X, Cpu, ShieldCheck, Zap, ArrowRight, Sparkles, CheckCircle2, Share2 } from 'lucide-react';

export default function CardShowcaseModal({ card, onClose, onEnquire }) {
  const [tapped, setTapped] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!card) return null;

  const handleTap = () => {
    setTapped(true);
    setTimeout(() => setTapped(false), 2500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl glass-panel rounded-2xl overflow-hidden border border-brand-border shadow-2xl bg-[#0B0F17]/95 text-brand-text max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-brand-muted hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Card Preview Side */}
          <div className="p-8 flex flex-col justify-between items-center bg-gradient-to-b from-[#131B2E] to-[#0A0E17] border-b md:border-b-0 md:border-r border-brand-border relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-full flex items-center justify-between text-xs text-brand-muted mb-6">
              <span className="inline-flex items-center gap-1.5 font-medium text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full border border-brand-gold/20">
                <Sparkles className="w-3.5 h-3.5" /> Luxury Identity Series
              </span>
              <span>NFC Ready</span>
            </div>

            {/* Render Card Graphic */}
            <div 
              onClick={handleTap}
              className={`cursor-pointer group relative w-full aspect-[1.586/1] max-w-[320px] rounded-xl p-6 shadow-2xl transition-all duration-500 transform hover:scale-105 preserve-3d flex flex-col justify-between overflow-hidden border ${
                card.colorScheme || 'bg-gradient-to-br from-gray-900 via-gray-800 to-black border-yellow-500/30'
              }`}
            >
              {/* Metallic Shine Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex justify-between items-start z-10">
                <div className="font-display font-bold text-lg tracking-wider text-white">IDENTIFINE</div>
                <Cpu className="w-8 h-8 text-brand-gold opacity-90" />
              </div>

              <div className="z-10 space-y-1 my-4">
                <div className="text-xs uppercase tracking-widest text-brand-muted font-mono">{card.tag || 'PRESTIGE MEMBER'}</div>
                <div className="text-lg font-semibold tracking-wide text-white">{card.title}</div>
              </div>

              <div className="flex justify-between items-end z-10 text-xs text-brand-muted font-mono">
                <span>•••• 8849</span>
                <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                  <Zap className="w-3 h-3" /> TAP ACTIVE
                </span>
              </div>
            </div>

            <div className="mt-6 text-center w-full">
              <button 
                onClick={handleTap}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  tapped 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-white/5 hover:bg-white/10 text-brand-muted hover:text-white border border-white/10'
                }`}
              >
                {tapped ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> NFC Digital Profile Transmitted!
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-brand-gold animate-pulse" /> Click Card to Simulate NFC Tap
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Details & Specs Side */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                {card.description || 'Engineered with laser precision and integrated encrypted NFC hardware to elevate your digital and physical identity credentials.'}
              </p>

              <div className="space-y-4 mb-8">
                <h4 className="text-xs uppercase font-semibold tracking-wider text-brand-gold">Specifications & Features</h4>
                
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span><strong>Material:</strong> {card.material || 'Aircraft-grade stainless steel / Matte Black finish'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span><strong>Connectivity:</strong> Dual-band NFC + Dynamic QR Profile</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span><strong>Customization:</strong> Precision laser engraving & custom logo emblem</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-brand-border">
              <button 
                onClick={() => onEnquire(card)}
                className="w-full py-3 px-6 rounded-xl bg-gold-gradient text-black font-semibold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/10"
              >
                <span>Make Identity Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={handleShare}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-brand-muted hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied ? 'Link Copied to Clipboard!' : 'Share Card Spec'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
