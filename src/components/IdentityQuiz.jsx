import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, RotateCcw, ArrowRight, UserCheck, ArrowLeft } from 'lucide-react';

export default function IdentityQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  // Form Details state for final step
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 'challenge',
      queNum: 'Que 1',
      title: "What's your company's biggest identity challenge?",
      options: [
        'Building trust',
        'Managing people',
        'Modernizing systems'
      ]
    },
    {
      id: 'scale',
      queNum: 'Que 2',
      title: "What scale is your organization currently operating at?",
      options: [
        'High-growth venture startup',
        'Established mid-market enterprise',
        'Luxury prestige brand & VIP club'
      ]
    },
    {
      id: 'touchpoint',
      queNum: 'Que 3',
      title: "Which identity touchpoint requires immediate elevation?",
      options: [
        'Physical smart card hardware',
        'Corporate brand strategy',
        'Digital identity ecosystem'
      ]
    },
    {
      id: 'outcome',
      queNum: 'Que 4',
      title: "What primary victory outcome do you expect?",
      options: [
        'Instant 10x first impression & credibility',
        'Encrypted NFC security & seamless networking',
        'Unified employee pride & organizational habit'
      ]
    },
    {
      id: 'timeline',
      queNum: 'Que 5',
      title: "What is your expected timeline for implementation?",
      options: [
        'Immediate (Within 2 weeks)',
        '1 - 3 Months',
        'Q3 / Q4 Strategic Planning'
      ]
    },
    {
      id: 'teamsize',
      queNum: 'Que 6',
      title: "What team size will be equipped with identity credentials?",
      options: [
        'Executive Leadership (1-10)',
        'Mid to Large Teams (10-100)',
        'Enterprise-Wide (100+)'
      ]
    },
    {
      id: 'demo',
      queNum: 'Que 7',
      title: "Would you like a custom physical prototype demo?",
      options: [
        'Yes, send physical card sample',
        'Yes, schedule digital demo',
        'No, send product brochure'
      ]
    }
  ];

  const changeStep = (nextIdx) => {
    if (nextIdx === currentStep || isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setCurrentStep(nextIdx);
      setIsSliding(false);
    }, 220);
  };

  const handleSelectOption = (opt) => {
    if (isSliding) return;
    const updated = { ...answers, [quizQuestions[currentStep].id]: opt };
    setAnswers(updated);

    setIsSliding(true);
    setTimeout(() => {
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
        setIsSliding(false);
      } else {
        setCompleted(true);
        setIsSliding(false);
      }
    }, 220);
  };

  const handleGoBack = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCompleted(false);
      setCurrentStep(quizQuestions.length - 1);
      setIsSliding(false);
    }, 200);
  };

  const handleReset = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentStep(0);
      setAnswers({});
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
    <div className="bg-[#0D0D0D] text-white rounded-[40px] p-8 sm:p-12 lg:p-14 shadow-2xl border border-[#222222] relative overflow-hidden w-full max-w-[1200px] h-[600px] mx-auto flex flex-col justify-center transition-all duration-300">
      {!completed ? (
        /* Entire Grid (Left Question + Right Image/Badge) Slides Together */
        <div 
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSliding ? 'opacity-0 -translate-x-14 scale-[0.98]' : 'opacity-100 translate-x-0 scale-100'
          }`}
        >
          
          {/* Question Side */}
          <div className="lg:col-span-8 space-y-5 -mt-10 sm:-mt-14">
            <div className="space-y-4">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-normal font-mono text-[#E2B857] block tracking-wider mb-6 sm:mb-8">
                {quizQuestions[currentStep].queNum}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white font-galano leading-tight tracking-tight">
                {quizQuestions[currentStep].title}
              </h3>
            </div>

            {/* Option Buttons */}
            <div className="space-y-3 pt-1">
              {quizQuestions[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full text-left py-3.5 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg font-normal transition-all duration-300 bg-transparent hover:bg-white hover:text-black border-0 text-white flex items-center justify-between group shadow-none hover:shadow-xl hover:scale-[1.01]"
                >
                  <span>{opt}</span>
                </button>
              ))}
            </div>

            {/* Steps Indicator: 1 2 3 4 5 6 7 */}
            <div className="flex items-center gap-5 sm:gap-6 pt-4 text-[22px] font-mono">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                const stepIdx = num - 1;
                const isActive = stepIdx === currentStep;
                const isFilled = stepIdx < currentStep;

                return (
                  <button
                    key={num}
                    onClick={() => changeStep(stepIdx)}
                    className={`transition-colors duration-200 font-normal ${
                      isActive
                        ? 'text-white font-normal'
                        : isFilled
                        ? 'text-white/80 hover:text-white'
                        : 'text-[#555555] hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Image / Badge Side */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center p-8 sm:p-10 text-center space-y-4 min-h-[300px]">
            <div className="w-20 h-20 rounded-full bg-[#E2B857]/10 flex items-center justify-center text-[#E2B857] border border-[#E2B857]/20 shadow-lg">
              <UserCheck className="w-10 h-10" />
            </div>
            <span className="text-sm text-[#AAAAAA] font-normal leading-relaxed max-w-[200px]">
              Organizational Assessment Diagnostic
            </span>
          </div>

        </div>
      ) : (
        /* Final Completion Screen - Keeps Same 2-Column Grid (Left Inputs + Right Image/Badge) */
        <div 
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSliding ? 'opacity-0 -translate-x-14 scale-[0.98]' : 'opacity-100 translate-x-0 scale-100'
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

          {/* Right Image / Badge Side - Matching Question Slides */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center p-8 sm:p-10 text-center space-y-4 min-h-[300px]">
            <div className="w-20 h-20 rounded-full bg-[#E2B857]/10 flex items-center justify-center text-[#E2B857] border border-[#E2B857]/20 shadow-lg">
              <UserCheck className="w-10 h-10" />
            </div>
            <span className="text-sm text-[#AAAAAA] font-normal leading-relaxed max-w-[200px]">
              Organizational Assessment Diagnostic
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
