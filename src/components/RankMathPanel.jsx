import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Globe, Smartphone, Monitor, Search, Sparkles } from 'lucide-react';
import { analyzeSeo } from '../utils/seoAnalyzer';

export default function RankMathPanel({
  seoResult,
  title = '',
  slug = '',
  content = '',
  summary = '',
  focusKeyword = '',
  setFocusKeyword,
  seoTitle = '',
  setSeoTitle,
  metaDesc = '',
  setMetaDesc,
  activeTab = 'general',
  setActiveTab,
  darkMode = false,
}) {
  const [serpDevice, setSerpDevice] = useState('desktop'); // 'desktop' | 'mobile'
  
  // Compute SEO analysis if not passed directly
  const data = seoResult || analyzeSeo({
    title,
    slug,
    content,
    summary,
    focusKeyword,
    seoTitle,
    metaDesc,
  });

  const { score, color, grade, checks = [], serp = {}, wordCount = 0, keywordDensity = 0 } = data;

  // Group checks by category (including Content Readability)
  const categories = ['Basic SEO', 'Additional SEO', 'Title Readability', 'Content Readability'];

  return (
    <div className="bg-[#18181B] text-white rounded-2xl border border-zinc-800 p-6 space-y-6 shadow-2xl font-sans">
      
      {/* 1. RANK MATH HEADER & SCORE BADGE */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/50">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-galano font-bold text-lg text-white tracking-tight flex items-center gap-2">
              Rank Math SEO
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PRO Studio
              </span>
            </h3>
            <p className="text-xs text-zinc-400">Real-Time Search Optimization Assistant</p>
          </div>
        </div>

        {/* Score Ring / Pill */}
        <div className="flex flex-col items-end">
          <div 
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full font-bold text-sm tracking-wide shadow-md border"
            style={{ 
              backgroundColor: `${color}18`, 
              borderColor: `${color}50`, 
              color: color 
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
            <span>{score} / 100</span>
          </div>
          <span className="text-[11px] font-medium text-zinc-400 mt-1">{grade}</span>
        </div>
      </div>

      {/* 2. FOCUS KEYWORD INPUT */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
          Focus Keyword
        </label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
          <input
            type="text"
            value={focusKeyword}
            onChange={(e) => setFocusKeyword(e.target.value)}
            placeholder="e.g. nfc business cards"
            className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
          />
        </div>
        <p className="text-[11px] text-zinc-400">
          Main keyword phrase you want this article to rank for on Google.
        </p>
      </div>

      {/* 3. GOOGLE SERP PREVIEW */}
      <div className="space-y-3 pt-2 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            Google SERP Snippet Preview
          </span>

          <div className="flex items-center bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            <button
              onClick={() => setSerpDevice('desktop')}
              className={`p-1.5 rounded-md transition-all ${
                serpDevice === 'desktop' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Desktop Google Preview"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSerpDevice('mobile')}
              className={`p-1.5 rounded-md transition-all ${
                serpDevice === 'mobile' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Mobile Google Preview"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Google Card Container */}
        <div className="bg-white rounded-xl p-4 text-zinc-900 shadow-md font-sans text-left transition-all">
          <div className="flex items-center space-x-2 text-xs text-zinc-600 mb-1 truncate">
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px]">
              I
            </span>
            <span className="font-medium text-zinc-800 truncate">identifine.com.ng</span>
            <span className="text-zinc-400">› blog ›</span>
            <span className="text-zinc-500 truncate">{serp.url.split('/blog/')[1] || ''}</span>
          </div>

          <h4 className={`font-medium text-blue-800 hover:underline cursor-pointer truncate ${serpDevice === 'desktop' ? 'text-base' : 'text-sm'}`}>
            {serp.title}
          </h4>

          <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
            {serp.description}
          </p>
        </div>
      </div>

      {/* 4. CONTENT STATS METRICS */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
        <div className="bg-zinc-900/80 rounded-xl p-3 border border-zinc-800">
          <span className="text-[11px] text-zinc-400 block font-medium">Word Count</span>
          <span className="text-lg font-bold text-white">{wordCount} <span className="text-xs text-zinc-400 font-normal">words</span></span>
        </div>
        <div className="bg-zinc-900/80 rounded-xl p-3 border border-zinc-800">
          <span className="text-[11px] text-zinc-400 block font-medium">Keyword Density</span>
          <span className="text-lg font-bold text-white">{keywordDensity}%</span>
        </div>
      </div>

      {/* 5. RANK MATH LIVE CHECKLIST */}
      <div className="space-y-4 pt-2 border-t border-zinc-800">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
          SEO Checklist & Tests
        </h4>

        <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
          {categories.map((category) => {
            const catChecks = checks.filter((c) => c.category === category);
            if (catChecks.length === 0) return null;

            return (
              <div key={category} className="space-y-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  {category}
                </span>

                <div className="space-y-1.5">
                  {catChecks.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-2.5 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80 text-xs transition-colors"
                    >
                      {item.status === 'pass' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {item.status === 'warning' && (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      {item.status === 'fail' && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <span className={`leading-tight ${item.status === 'pass' ? 'text-zinc-200 font-medium' : 'text-zinc-300'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
