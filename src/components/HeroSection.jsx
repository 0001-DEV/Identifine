import React, { useEffect, useRef, useState } from 'react';
import heroVideoFile from '../assets/Header_Hero Section.mp4';

export default function HeroSection() {
  const containerRef  = useRef(null);
  const stickyRef     = useRef(null);
  const heroAnchorRef = useRef(null);
  const contentRef    = useRef(null);
  const slotRef       = useRef(null);
  const flowWrapRef   = useRef(null);
  const movingWrapRef = useRef(null);
  const videoRef      = useRef(null);

  const [slotSize, setSlotSize] = useState({ width: 110, height: 52 });
  const [slotProgress, setSlotProgress] = useState(0);
  const [shortScreen, setShortScreen] = useState(false);

  useEffect(() => {
    const upd = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setShortScreen(vh < 600);
      if (vw < 480)       setSlotSize({ width: 50,  height: 26 });
      else if (vw < 640)  setSlotSize({ width: 64,  height: 33 });
      else if (vw < 1024) setSlotSize({ width: 88,  height: 44 });
      else                setSlotSize({ width: 110, height: 52 });
    };
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.muted = true; v.play().catch(() => {}); }
  }, []);

  useEffect(() => {
    let currentP = 0, targetP = 0, animId = null, isIntersecting = true;

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const render = (progress) => {
      if (!stickyRef.current || !heroAnchorRef.current ||
          !contentRef.current || !slotRef.current || !movingWrapRef.current || !flowWrapRef.current) return;

      const p  = Math.max(0, Math.min(1, progress));
      const ep = easeInOutQuad(p);

      const vw = window.innerWidth;
      // Section moves upward with the scroll as the video moves into the text
      const sectionShift = vw < 640 ? 100 : vw < 1024 ? 180 : 280;
      flowWrapRef.current.style.transform = `translate3d(0,${-sectionShift * ep}px,0)`;

      const stickyRect = stickyRef.current.getBoundingClientRect();
      const heroRect   = heroAnchorRef.current.getBoundingClientRect();
      const slotRect   = slotRef.current.getBoundingClientRect();

      const startX = heroRect.left - stickyRect.left;
      const startY = heroRect.top  - stickyRect.top;
      const startW = heroRect.width;
      const startH = heroRect.height;
      const startR = vw < 640 ? 12 : 18;

      const endX = slotRect.left - stickyRect.left;
      const endY = slotRect.top  - stickyRect.top;
      const endW = slotRect.width;
      const endH = slotRect.height;
      const endR = endH / 2;

      const wrap = movingWrapRef.current;
      wrap.style.transform    = `translate3d(${startX+(endX-startX)*ep}px,${startY+(endY-startY)*ep}px,0)`;
      wrap.style.width        = `${startW+(endW-startW)*ep}px`;
      wrap.style.height       = `${startH+(endH-startH)*ep}px`;
      wrap.style.borderRadius = `${startR+(endR-startR)*ep}px`;
      wrap.style.boxShadow    = p > 0.85
        ? '0 2px 10px rgba(0,0,0,0.12)'
        : '0 20px 48px -16px rgba(0,0,0,0.18)';
    };

    const loop = () => {
      if (!isIntersecting) return;
      const d = targetP - currentP;
      if (Math.abs(d) < 0.0003) { currentP = targetP; render(currentP); animId = null; return; }
      currentP += d * 0.18;
      render(currentP);
      animId = requestAnimationFrame(loop);
    };

    const kick = () => { if (!animId && isIntersecting) animId = requestAnimationFrame(loop); };

    const onScroll = () => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      const s = r.height - window.innerHeight;
      if (s <= 0) return;
      targetP = Math.max(0, Math.min(1, -r.top / s));
      // Slot opens from 0→1 as scroll progress goes from 0.35→0.82
      const sp = Math.max(0, Math.min(1, (targetP - 0.35) / (0.82 - 0.35)));
      setSlotProgress(sp);
      kick();
    };

    const onResize = () => { onScroll(); render(currentP); };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        isIntersecting = e.isIntersecting;
        if (e.isIntersecting) { videoRef.current?.play().catch(() => {}); onScroll(); }
        else { videoRef.current?.pause(); if (animId) { cancelAnimationFrame(animId); animId = null; } }
      });
    }, { threshold: 0 });

    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('scroll',            onScroll, { passive: true });
    window.addEventListener('resize',            onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });

    onScroll(); currentP = targetP; render(currentP);
    const t1 = requestAnimationFrame(() => { onScroll(); render(currentP); });
    const t2 = setTimeout(() => { onScroll(); render(currentP); }, 150);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      cancelAnimationFrame(t1); clearTimeout(t2);
      window.removeEventListener('scroll',            onScroll);
      window.removeEventListener('resize',            onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#EBEAE6]"
      style={{ height: '165vh' }}
    >
      {/* Sticky frame */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full z-30"
        style={{ minHeight: '100dvh' }}
      >
        <div
          ref={flowWrapRef}
          className="flex flex-col items-center w-full h-full"
          style={{
            paddingTop:    shortScreen ? 'clamp(70px, 8vh, 88px)' : 'clamp(92px, 11vh, 112px)',
            paddingBottom: shortScreen ? '4px' : 'clamp(8px, 1vh, 14px)',
            paddingLeft:   'clamp(20px, 4vw, 60px)',
            paddingRight:  'clamp(20px, 4vw, 60px)',
            willChange:    'transform',
          }}
        >
          {/* Video anchor */}
          <div
            ref={heroAnchorRef}
            aria-hidden="true"
            className={`w-full shrink-0 pointer-events-none select-none ${shortScreen ? 'h-[200px] sm:h-[300px] lg:h-[560px]' : 'h-[320px] sm:h-[480px] lg:h-[762px]'}`}
            style={{
              opacity:   0,
              maxWidth:  '78%',
              minHeight: 180,
            }}
          />

          {/* Text: LEFT headline | RIGHT subheading */}
          <div
            ref={contentRef}
            className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-10 z-10 mt-10 sm:mt-14 lg:mt-16 gap-3 sm:gap-4 shrink-0"
            style={{ willChange: 'transform' }}
          >
            {/* LEFT */}
            <h1 className="text-[1.25rem] xs:text-[1.4rem] sm:text-[1.7rem] lg:text-[2.5rem] xl:text-[3rem] font-galano font-medium tracking-tight text-[#111111] leading-[1.18] sm:leading-[1.2] text-center lg:text-left shrink-0 lg:max-w-[58%]">
              <span className="inline-flex items-center align-middle whitespace-nowrap">
                <span>We help</span>
                <span
                  ref={slotRef}
                  aria-hidden="true"
                  className="inline-block align-middle mx-1.5 sm:mx-2 shrink-0"
                  style={{
                    width:  `${slotSize.width  * slotProgress}px`,
                    height: `${slotSize.height}px`,
                    verticalAlign: 'middle',
                    background: 'transparent',
                    borderRadius: `${slotSize.height / 2}px`,
                    overflow: 'hidden',
                    transition: 'width 0.05s linear',
                  }}
                />
                <span>organizations</span>
              </span>{' '}
              transform{' '}
              <em className="font-swarsh italic font-normal text-[#111111] px-0.5 sm:px-1">
                identity
              </em>{' '}
              from an administrative necessity into a strategic organizational capability.
            </h1>

            {/* RIGHT — supporting tagline aligned to bottom of h1 */}
            <div className="flex flex-col items-center lg:items-end lg:w-[40%] lg:ml-auto lg:pl-20 pb-[0.18em]">
              <p className="text-sm sm:text-base lg:text-[1.1rem] xl:text-[1.18rem] text-[#555555] leading-relaxed font-medium text-left">
                We help organizations transform identity from an administrative necessity into a strategic organizational capability.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="w-full max-w-[78%] flex justify-center mt-7 sm:mt-8 shrink-0 relative z-30 translate-y-[7px]">
            <a
              href="https://wa.me/2349030001851"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold text-xs sm:text-sm lg:text-base px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-black text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Make an Enquiry
            </a>
          </div>
        </div>

        {/* Moving video */}
        <div
          ref={movingWrapRef}
          className="absolute top-0 left-0 overflow-hidden z-20 pointer-events-none"
          style={{
            border:     '1px solid rgba(0,0,0,0.07)',
            willChange: 'transform, width, height, border-radius',
          }}
        >
          <video
            ref={videoRef}
            autoPlay muted loop playsInline preload="metadata"
            className="w-full h-full object-cover block"
          >
            <source src={heroVideoFile} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
