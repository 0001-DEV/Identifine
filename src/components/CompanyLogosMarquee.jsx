import React, { useState, useEffect, useRef } from 'react';

// Import User's 15 Actual Client Logo Image Assets
import eunisellLogo from '../assets/eunisell_logo.png';
import firstAllyLogo from '../assets/First-Ally-Group-Logos-02.png';
import falconLogo from '../assets/iogc-removebg-preview (1).png';
import guinnessLogo from '../assets/guiness nig.png';
import ikejaLogo from '../assets/ikeja-electricity-prepaid-nigeria-bill.png';
import inveraLogo from '../assets/Invera_Horizontal_FullColor_light_RGB_nopadding.png';
import lotusLogo from '../assets/lotus.webp';
import mateeLogo from '../assets/matee-removebg-preview.png';
import necaLogo from '../assets/neca (1).png';
import rainoilLogo from '../assets/rainoil (1).png';
import renaissanceLogo from '../assets/renaissance-africa-aew (1).png';
import revPlusLogo from '../assets/revolution_plus__1_-removebg-preview.png';
import seplatLogo from '../assets/seplat (1) (2).png';
import tvcLogo from '../assets/tvc.png';
import tolaramLogo from '../assets/Tolaram_Group_logo (1).png';
import animatedCounterImg from '../assets/AnimatedCounter.png';

function AnimatedNumber() {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let startTime = null;
          const duration = 1200; // 1.2 seconds for a fast, snappy animation
          const finalNumber = 86;

          // Smooth deceleration easing function (easeOutQuart)
          const easeOut = (t) => 1 - Math.pow(1 - t, 4);

          const updateCounter = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentCount = Math.floor(easeOut(progress) * finalNumber);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(finalNumber);
            }
          };

          requestAnimationFrame(updateCounter);
        } else {
          // Reset count when scrolled out of view so it counts again next time
          setCount(0);
        }
      });
    }, { threshold: 0.3 });

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={counterRef} className="flex items-start justify-center text-[#888888] italic font-swarsh font-normal text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tighter pt-1">
      {count}<span className="text-4xl sm:text-5xl lg:text-6xl text-[#888888] ml-0.5 leading-none">+</span>
    </div>
  );
}

export default function CompanyLogosMarquee() {
  // LINE 1 (Row 1): 6 Items (5 Dynamic Popping Slots + 1 Special Counter at index 3)
  const row1Logos = [
    { dynamicId: 0, name1: 'Rainoil', src1: rainoilLogo, name2: 'Renaissance', src2: renaissanceLogo },
    { dynamicId: 1, name1: 'Seplat', src1: seplatLogo, name2: 'Eunisell', src2: eunisellLogo },
    { dynamicId: 2, name1: 'Revolution Plus', src1: revPlusLogo, name2: 'Tolaram Group', src2: tolaramLogo },
    { type: 'counter', src: animatedCounterImg }, // 4th item
    { dynamicId: 3, name1: 'First Ally Group', src1: firstAllyLogo, name2: 'Guinness Nigeria', src2: guinnessLogo },
    { dynamicId: 4, name1: 'Invera Energy', src1: inveraLogo, name2: 'Lotus Bank', src2: lotusLogo },
  ];

  // LINE 2 (Row 2): 6 Dynamic Popping Slots
  const row2Logos = [
    { dynamicId: 5, name1: 'TVC News', src1: tvcLogo, name2: 'NECA', src2: necaLogo },
    { dynamicId: 6, name1: 'Ikeja Electric', src1: ikejaLogo, name2: 'Falcon / IOGC', src2: falconLogo },
    { dynamicId: 7, name1: 'Matee / SAPETRO', src1: mateeLogo, name2: 'Seplat', src2: seplatLogo },
    { dynamicId: 8, name1: 'Renaissance Africa', src1: renaissanceLogo, name2: 'Rainoil', src2: rainoilLogo },
    { dynamicId: 9, name1: 'Eunisell', src1: eunisellLogo, name2: 'First Ally Group', src2: firstAllyLogo },
    { dynamicId: 10, name1: 'Tolaram Group', src1: tolaramLogo, name2: 'Guinness Nigeria', src2: guinnessLogo },
  ];

  // Dynamic state for each popping slot (0 to 10)
  const [dynamicStates, setDynamicStates] = useState(Array(11).fill(0));
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    // Pop speed interval 850ms
    const interval = setInterval(() => {
      setDynamicStates(prev => {
        const next = [...prev];
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
          const targetIdx = Math.floor(Math.random() * next.length);
          next[targetIdx] = next[targetIdx] === 0 ? 1 : 0;
        }
        return next;
      });
    }, 850);

    return () => clearInterval(interval);
  }, []);

  const renderLogoItem = (item, idx) => {
    if (item.type === 'counter') {
      return (
        <div key={`counter-${idx}`} className="flex flex-col items-center justify-center shrink-0 px-2 sm:px-4 min-w-[130px] sm:min-w-[175px] pt-4 sm:pt-6">
          <AnimatedNumber />
          <span className="text-[10px] sm:text-xs text-[#888888] font-medium tracking-widest uppercase">Trusted Clients</span>
        </div>
      );
    }

    const isHovered = hoveredId === item.dynamicId;
    const currentState = dynamicStates[item.dynamicId];
    const activeState = isHovered ? (currentState === 0 ? 1 : 0) : currentState;

    const getLogoClass = (src) => {
      if (src === mateeLogo) {
        return "h-8 sm:h-10 max-h-10 max-w-[130px] sm:max-w-[155px] w-auto object-contain brightness-95 hover:brightness-110 transition-all duration-200 filter drop-shadow-sm";
      }
      if (src === inveraLogo) {
        return "h-7 sm:h-10 max-h-10 max-w-[140px] sm:max-w-[175px] w-auto object-contain brightness-95 hover:brightness-110 transition-all duration-200 filter drop-shadow-sm";
      }
      if (src === eunisellLogo || src === tolaramLogo || src === firstAllyLogo || src === lotusLogo) {
        return "h-6 sm:h-9 max-h-9 max-w-[110px] sm:max-w-[135px] w-auto object-contain brightness-95 hover:brightness-110 transition-all duration-200 filter drop-shadow-sm";
      }
      return "h-8 sm:h-12 max-h-12 max-w-[145px] sm:max-w-[185px] w-auto object-contain brightness-90 hover:brightness-110 transition-all duration-200 filter drop-shadow-sm";
    };

    return (
      <div
        key={idx}
        onMouseEnter={() => setHoveredId(item.dynamicId)}
        onMouseLeave={() => setHoveredId(null)}
        className="relative h-12 sm:h-16 overflow-hidden flex items-center justify-center cursor-pointer select-none shrink-0 px-2 sm:px-4 min-w-[130px] sm:min-w-[175px] [perspective:600px]"
      >
        {/* Logo Image 1 (Rolls OUT upward when activeState=1) */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: activeState === 0 ? 'translateY(0%) rotateX(0deg)' : 'translateY(-100%) rotateX(75deg)',
            opacity: activeState === 0 ? 1 : 0,
            transformOrigin: '50% 0%',
            pointerEvents: activeState === 0 ? 'auto' : 'none'
          }}
        >
          <img
            src={item.src1}
            alt={item.name1}
            className={getLogoClass(item.src1)}
          />
        </div>

        {/* Logo Image 2 (Rolls IN from below when activeState=1) */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: activeState === 1 ? 'translateY(0%) rotateX(0deg)' : 'translateY(100%) rotateX(-75deg)',
            opacity: activeState === 1 ? 1 : 0,
            transformOrigin: '50% 100%',
            pointerEvents: activeState === 1 ? 'auto' : 'none'
          }}
        >
          <img
            src={item.src2}
            alt={item.name2}
            className={getLogoClass(item.src2)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="py-20 sm:py-28 bg-transparent w-full overflow-hidden">
      <div className="flex flex-col items-center gap-10 sm:gap-16 lg:gap-20 w-full max-w-[94rem] mx-auto px-4 sm:px-8 lg:px-12">
        {/* LINE 1 (6 Items) */}
        <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-10 lg:gap-12 w-full flex-wrap sm:flex-nowrap">
          {row1Logos.map((item, idx) => renderLogoItem(item, idx))}
        </div>

        {/* LINE 2 (6 Items) */}
        <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-10 lg:gap-12 w-full flex-wrap sm:flex-nowrap">
          {row2Logos.map((item, idx) => renderLogoItem(item, idx))}
        </div>
      </div>
    </div>
  );
}
