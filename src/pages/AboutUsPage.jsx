import React from 'react';

export default function AboutUsPage() {
  return (
    <div className="bg-[#EBEAE6] min-h-screen pt-36 pb-28 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <h1 className="text-4xl sm:text-6xl font-sans font-bold text-[#111111] leading-tight">
          We craft <em className="italic-serif text-[#111111] font-normal">identity</em> that change the game
        </h1>

        {/* Story Content Section */}
        <div className="space-y-8 pt-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#666666] flex items-center gap-1.5 font-bold">
            <span>✦</span> The Identifine Story
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#444444] leading-relaxed">
            <p>
              We thought we were building better identity cards, so we obsessed over premium materials, flawless craftsmanship, and technology that could elevate how people represented their organizations. Every card we created was designed to leave a lasting impression. But over time, we noticed something. Our clients rarely talked about cards, they talked about Culture. Leadership. Consistency. Trust. They asked how every employee could reflect the same standard of excellence, how every visitor experience could reinforce their brand, and how every interaction could communicate who they truly are. That was our turning point.
            </p>

            <p>
              We realized organizations don't have an ID card problem. They have an identity challenge, because identity isn't a product. It's an experience. It's felt through people, workplaces, processes, technology, and every moment that shapes perception. The card is simply one expression of that bigger story. That realization transformed Identifine. Today, we help organizations intentionally design how their identity is represented, experienced, and managed. Our premium credentials, smart NFC technology, executive identity solutions, and branded touchpoints work together as one integrated identity ecosystem, helping organizations build clarity, consistency, trust, and distinction at every level.
            </p>

            <p>
              Through our Identity Transformation Journey, <strong>Discover. Design. Deploy. Evolve.</strong>, and our <strong>5P Identity Framework</strong> spanning <strong>Purpose, People, Places, Processes, and Presence</strong>, we help organizations turn identity into a strategic advantage, because every organization tells a story. The question is whether that story is being told by design... or by default.
            </p>
          </div>

          <div className="pt-4">
            <a
              href="https://wa.me/2349030001851"
              target="_blank"
              rel="noopener noreferrer"
              className="framer-pill-button text-xs px-6 py-3.5 inline-block"
            >
              Contribute to the story
            </a>
          </div>
        </div>

        {/* Second section */}
        <div className="text-center pt-16 border-t border-[#DCDAD4]">
          <a
            href="https://wa.me/2349030001851"
            target="_blank"
            rel="noopener noreferrer"
            className="framer-pill-button text-xs px-8 py-3.5 inline-block"
          >
            Know more about us
          </a>
        </div>

      </div>
    </div>
  );
}
