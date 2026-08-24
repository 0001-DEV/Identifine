import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

// Import Asset Images for Quiz Right Column Showcase (que4, que8, que1, que7, que5, work desktop 1 webp, que2, que6)
import que4Img from '../assets/QUE4.png';
import que8Img from '../assets/QUE8.png';
import que1Img from '../assets/QUE1.png';
import que7Img from '../assets/QUE7.png';
import que5Img from '../assets/QUE5.png';
import workDesktop1Img from '../assets/work-desktop-1.webp.png';
import que2Img from '../assets/QUE2.png';
import que6Img from '../assets/QUE6.png';

export default function IdentityQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [activeHoverIdx, setActiveHoverIdx] = useState(null);
  const [selectedOptIdx, setSelectedOptIdx] = useState(null);

  // Form Details state for final step
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Images assigned per question step respectively: que4, que8, que1, que7, que5, work desktop 1 webp, que2, que6
  const quizStepImages = [
    que4Img,
    que8Img,
    que1Img,
    que7Img,
    que5Img,
    workDesktop1Img,
    que2Img,
    que6Img,
  ];

  const quizQuestions = [
    {
      id: 'challenge',
      queNum: 'Que 1',
      title: "What's your comapny's biggest identity challenge?",
      options: [
        'Building trust',
        'Managing people',
        'Modernizing systems'
      ]
    },
    {
      id: 'identify_today',
      queNum: 'Que 2',
      title: 'How does your organization identify people today?',
      options: [
        'Basic ID cards',
        'Digital credentials',
        'Multiple methods'
      ]
    },
    {
      id: 'improvement_area',
      queNum: 'Que 3',
      title: 'Which area needs the most improvement?',
      options: [
        'Employee identity',
        'Customer identity',
        'Visitor management'
      ]
    },
    {
      id: 'security_level',
      queNum: 'Que 4',
      title: 'How secure is your identity system?',
      options: [
        'Very secure',
        'Needs improvement',
        'Not sure'
      ]
    },
    {
      id: 'matters_most',
      queNum: 'Que 5',
      title: 'What matters most to your organization?',
      options: [
        'Security',
        "Brand's image",
        'Efficiency'
      ]
    },
    {
      id: 'current_experience',
      queNum: 'Que 6',
      title: 'How would you describe your current identity experience?',
      options: [
        'Professional',
        'Inconsistent',
        'Outdated'
      ]
    },
    {
      id: 'looking_for',
      queNum: 'Que 7',
      title: 'What are you looking for today?',
      options: [
        'Identity strategy',
        'Smart credentials',
        'Complete identity solution'
      ]
    }
  ];

  const changeStep = (nextIdx) => {
    if (nextIdx === currentStep || isSliding) return;
    setActiveHoverIdx(null);
    setSelectedOptIdx(null);
    setIsSliding(true);
    setTimeout(() => {
      setCurrentStep(nextIdx);
      setIsSliding(false);
    }, 220);
  };

  const handleSelectOption = (opt, idx) => {
    if (isSliding || selectedOptIdx !== null) return;
    
    // Highlight selected option immediately so user sees visual feedback
    setSelectedOptIdx(idx);
    const updated = { ...answers, [quizQuestions[currentStep].id]: opt };
    setAnswers(updated);

    // Pause for 450ms so user reads and sees their selected answer with checkmark feedback
    setTimeout(() => {
      setIsSliding(true);
      setTimeout(() => {
        if (currentStep < quizQuestions.length - 1) {
          setCurrentStep(currentStep + 1);
          setSelectedOptIdx(null);
          setActiveHoverIdx(null);
          setIsSliding(false);
        } else {
          setCompleted(true);
          setSelectedOptIdx(null);
          setActiveHoverIdx(null);
          setIsSliding(false);
        }
      }, 220);
    }, 450);
  };

  const handleGoBack = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCompleted(false);
      setSelectedOptIdx(null);
      setCurrentStep(quizQuestions.length - 1);
      setIsSliding(false);
    }, 200);
  };

  const handleReset = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentStep(0);
      setAnswers({});
      setSelectedOptIdx(null);
      setCompleted(false);
      setSubmitted(false);
      setFullName('');
      setEmailAddress('');
      setIsSliding(false);
    }, 200);
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    if (!fullName || !emailAddress) return;

    const formattedAnswers = quizQuestions.map((q) => {
      const userAns = answers[q.id] || 'Not answered';
      return `*${q.queNum}: ${q.title}*\n_${userAns}_`;
    }).join('\n\n');

    const message = `IDENTIFINE ORGANIZATIONAL DIAGNOSTIC\n\n` +
      `CLIENT DETAILS\n` +
      `- Full Name: ${fullName}\n` +
      `- Email: ${emailAddress}\n\n` +
      `DIAGNOSTIC RESPONSES\n` +
      `-----------------------------------\n\n` +
      `${formattedAnswers}\n\n` +
      `-----------------------------------\n` +
      `Status: Ready for Strategy Consultation Call`;

    window.open(`https://wa.me/2347046367754?text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0D0D0D] text-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-12 lg:p-14 shadow-2xl border border-[#222222] relative overflow-hidden w-full max-w-[1200px] min-h-[580px] h-auto lg:h-[600px] mx-auto flex flex-col justify-center transition-all duration-300">
      {!completed ? (
        /* Entire Grid (Left Question + Right Asset Image Showcase) */
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSliding ? 'opacity-0 -translate-x-14 scale-[0.98]' : 'opacity-100 translate-x-0 scale-100'
            }`}
        >

          {/* Question Side */}
          <div className="col-span-1 md:col-span-7 lg:col-span-8 space-y-4 sm:space-y-5 -mt-2 sm:-mt-10 lg:-mt-14">
            <div className="space-y-3 sm:space-y-4">
              <span className="text-2xl sm:text-4xl lg:text-5xl font-normal font-mono text-[#E2B857] block tracking-wider mb-3 sm:mb-8">
                {quizQuestions[currentStep].queNum}
              </span>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-normal text-white font-galano leading-tight tracking-tight">
                {quizQuestions[currentStep].title}
              </h3>
            </div>

            {/* Option Buttons */}
            <div className="space-y-2.5 sm:space-y-3 pt-1">
              {quizQuestions[currentStep].options.map((opt, idx) => {
                const currentSavedAnswer = answers[quizQuestions[currentStep].id];
                const isSelected = selectedOptIdx === idx || (selectedOptIdx === null && currentSavedAnswer === opt);
                const isHovered = activeHoverIdx === idx && !isSelected;

                return (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveHoverIdx(idx)}
                    onMouseLeave={() => setActiveHoverIdx(null)}
                    onClick={() => handleSelectOption(opt, idx)}
                    className={`w-full text-left py-2.5 sm:py-4 px-4 sm:px-8 rounded-full text-xs sm:text-lg font-normal transition-all duration-200 flex items-center justify-between group select-none ${
                      isSelected || isHovered
                        ? 'bg-white text-black font-semibold shadow-2xl scale-[1.01]'
                        : 'bg-transparent text-white/90 border border-transparent shadow-none hover:text-white'
                    }`}
                  >
                    <span className="leading-tight pr-2 font-galano">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Steps Indicator: 1 2 3 4 5 6 7 */}
            <div className="flex items-center gap-4 sm:gap-6 pt-3 sm:pt-4 text-lg sm:text-[22px] font-mono">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                const stepIdx = num - 1;
                const isActive = stepIdx === currentStep;
                const isFilled = Boolean(answers[quizQuestions[stepIdx]?.id]);

                return (
                  <button
                    key={num}
                    onClick={() => changeStep(stepIdx)}
                    className={`transition-all duration-200 font-normal relative ${
                      isActive
                        ? 'text-[#E2B857] font-bold scale-110'
                        : isFilled
                        ? 'text-white font-semibold hover:text-[#E2B857]'
                        : 'text-[#555555] hover:text-white'
                    }`}
                  >
                    {num}
                    {isFilled && !isActive && (
                      <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#E2B857]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Image Side (Responsive, No border, No glassmorphism overlay) */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4 flex items-center justify-center relative w-full h-[220px] sm:h-[340px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden bg-transparent mt-0">
            <img
              src={quizStepImages[currentStep % quizStepImages.length]}
              alt="Identifine Diagnostic"
              className="w-full h-full object-contain sm:object-cover object-center transition-all duration-500 select-none"
            />
          </div>

        </div>
      ) : (
        /* Final Completion Screen - Keeps Same 2-Column Grid */
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSliding ? 'opacity-0 -translate-x-14 scale-[0.98]' : 'opacity-100 translate-x-0 scale-100'
            }`}
        >
          {/* Left Column: Go back, Heading, Inputs, Reduced Width Submit Button */}
          <div className="lg:col-span-8 space-y-5 -mt-10 sm:-mt-14">
            {/* Gold "Go back" Button on Top */}
            <div>
              <button
                onClick={handleGoBack}
                className="inline-flex items-center gap-2.5 text-[#E2B857] hover:text-[#f0c868] transition-colors text-[28px] font-normal font-mono tracking-wider mb-6 sm:mb-8"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Go back</span>
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmitDetails} className="space-y-5">
                <h3 className="text-[25px] font-normal text-white font-galano leading-snug">
                  To get this survey to us, please supply <br /> your details
                </h3>

                <div className="space-y-3 pt-1 w-[502px] max-w-full">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe*"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-3.5 text-white text-base placeholder-white/50 focus:outline-none focus:border-[#E2B857] transition-colors font-normal"
                  />

                  <input
                    type="email"
                    required
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="e.g. john@company.com*"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-3.5 text-white text-base placeholder-white/50 focus:outline-none focus:border-[#E2B857] transition-colors font-normal"
                  />
                </div>

                {/* Reduced Width White Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-white text-black font-normal hover:bg-white/90 transition-all text-base shadow-xl inline-flex items-center justify-center gap-2"
                  >
                    <span>Submit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-normal text-white font-galano">Survey Transmitted</h3>
                  <p className="text-sm text-[#AAA9AD] font-normal leading-relaxed">
                    Thank you, <strong>{fullName}</strong>. Your diagnostic responses have been received.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] hover:bg-[#E2B857] hover:text-black transition-all text-base sm:text-lg font-normal shadow-lg"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Start new diagnostic</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Image Side on Completion (Responsive, No border, No glassmorphism overlay) */}
          <div className="lg:col-span-4 hidden lg:flex items-center justify-center relative w-full h-[380px] rounded-3xl overflow-hidden bg-transparent">
            <img
              src={que6Img}
              alt="Identifine Completion"
              className="w-full h-full object-contain sm:object-cover object-center select-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
