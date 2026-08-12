import React, { useState, useEffect } from 'react';

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

export default function CompanyLogosMarquee() {
  // LINE 1 (Row 1): 5 Dynamic Popping Slots (ALL slots pop and swap)
  const row1Logos = [
    { dynamicId: 0, name1: 'Rainoil', src1: rainoilLogo, name2: 'Renaissance', src2: renaissanceLogo },
    { dynamicId: 1, name1: 'Seplat', src1: seplatLogo, name2: 'Eunisell', src2: eunisellLogo },
    { dynamicId: 2, name1: 'Revolution Plus', src1: revPlusLogo, name2: 'Tolaram Group', src2: tolaramLogo },
    { dynamicId: 3, name1: 'First Ally Group', src1: firstAllyLogo, name2: 'Guinness Nigeria', src2: guinnessLogo },
    { dynamicId: 4, name1: 'Invera', src1: inveraLogo, name2: 'Lotus Bank', src2: lotusLogo },
  ];

  // LINE 2 (Row 2): 5 Dynamic Popping Slots (ALL slots pop and swap)
  const row2Logos = [
    { dynamicId: 5, name1: 'TVC News', src1: tvcLogo, name2: 'NECA', src2: necaLogo },
    { dynamicId: 6, name1: 'Ikeja Electric', src1: ikejaLogo, name2: 'Falcon / IOGC', src2: falconLogo },
    { dynamicId: 7, name1: 'Matee / SAPETRO', src1: mateeLogo, name2: 'Seplat', src2: seplatLogo, isMatee: true },
    { dynamicId: 8, name1: 'Renaissance Africa', src1: renaissanceLogo, name2: 'Rainoil', src2: rainoilLogo },
    { dynamicId: 9, name1: 'Eunisell', src1: eunisellLogo, name2: 'First Ally Group', src2: firstAllyLogo },
  ];

  // All 10 slots are dynamic & popping
  const [dynamicStates, setDynamicStates] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    // Fast periodic pop/swap across all 10 slots
    const interval = setInterval(() => {
      setDynamicStates(prev => {
        const next = [...prev];
        // Select 2 or 3 random slots to pop/swap rapidly
        const count = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
          const targetIdx = Math.floor(Math.random() * next.length);
          next[targetIdx] = next[targetIdx] === 0 ? 1 : 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderLogoItem = (item, idx) => {
    const isHovered = hoveredId === item.dynamicId;
    const currentState = dynamicStates[item.dynamicId];
    const activeState = isHovered ? (currentState === 0 ? 1 : 0) : currentState;

    // Custom width constraint helper for Matee logo
    const getLogoClass = (src) => {
      const isMateeImg = src === mateeLogo;
      return isMateeImg
        ? "h-7 sm:h-8 max-h-8 max-w-[85px] sm:max-w-[105px] w-auto object-contain brightness-95 hover:brightness-110 transition-all duration-200 filter drop-shadow-sm"
        : "h-8 sm:h-11 max-h-11 max-w-[135px] sm:max-w-[165px] w-auto object-contain brightness-90 hover:brightness-110 transition-all duration-200 filter drop-shadow-sm";
    };

    return (
      <div
        key={idx}
        onMouseEnter={() => setHoveredId(item.dynamicId)}
        onMouseLeave={() => setHoveredId(null)}
        className="relative h-10 sm:h-13 overflow-hidden flex items-center justify-center cursor-pointer select-none shrink-0 px-3 sm:px-6 min-w-[115px] sm:min-w-[155px] [perspective:600px]"
      >
        {/* Logo Image 1 (Rolls OUT upward when activeState=1) */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
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
          className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
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
    <div className="py-6 bg-transparent">
      {/* 2 LINES LAYOUT (All 10 Slots Pop & Swap, Extra Large Vertical Gap) */}
      <div className="flex flex-col items-center gap-16 sm:gap-24 lg:gap-28 w-full max-w-7xl mx-auto px-4">
        {/* LINE 1 (5 Popping Slots) */}
        <div className="flex items-center justify-center gap-4 sm:gap-12 md:gap-16 w-full">
          {row1Logos.map((item, idx) => renderLogoItem(item, idx))}
        </div>

        {/* LINE 2 (5 Popping Slots) */}
        <div className="flex items-center justify-center gap-4 sm:gap-12 md:gap-16 w-full">
          {row2Logos.map((item, idx) => renderLogoItem(item, idx))}
        </div>
      </div>
    </div>
  );
}
