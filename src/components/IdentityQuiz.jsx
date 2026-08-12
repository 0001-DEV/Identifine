import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, RotateCcw, ArrowRight, UserCheck } from 'lucide-react';

export default function IdentityQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

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
    }
  ];

  const handleSelectOption = (opt) => {
    const updated = { ...answers, [quizQuestions[currentStep].id]: opt };
    setAnswers(updated);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setCompleted(false);
  };

  return (
    <div className="bg-[#0D0D0D] text-white rounded-[32px] p-8 sm:p-12 shadow-2xl border border-[#222222] relative overflow-hidden">
      {!completed ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Question Side */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <span className="text-xl font-bold font-sans text-[#E2B857] block mb-1">
                {quizQuestions[currentStep].queNum}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                {quizQuestions[currentStep].title}
              </h3>
            </div>

            <div className="space-y-3 pt-2">
              {quizQuestions[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full text-left py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 bg-[#1A1A1A] hover:bg-white hover:text-black border border-[#2A2A2A] text-white flex items-center justify-between"
                >
                  <span>{opt}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              ))}
            </div>

            {/* Steps Indicator: 1 2 3 4 5 6 7 */}
            <div className="flex items-center gap-3 pt-4 text-xs font-mono">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <span
                  key={num}
                  className={`transition-colors ${
                    num === currentStep + 1
                      ? 'text-white font-bold underline decoration-[#E2B857] decoration-2'
                      : 'text-[#555555]'
                  }`}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          {/* Right Illustration / Badge Side */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center p-6 bg-[#161616] rounded-2xl border border-[#222222] text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E2B857]/10 flex items-center justify-center text-[#E2B857]">
              <UserCheck className="w-8 h-8" />
            </div>
            <span className="text-xs text-[#888888]">Organizational Assessment Diagnostic</span>
          </div>

        </div>
      ) : (
        <div className="space-y-6 text-center py-4">
          <div className="inline-flex p-3 rounded-full bg-[#E2B857]/10 text-[#E2B857]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Diagnostic Blueprint Complete</h3>
          <p className="text-xs sm:text-sm text-[#999999] max-w-md mx-auto">
            Based on your answers, your organization qualifies for a direct <strong>Identity Transformation Strategy Call</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20completed%20the%20Identity%20Diagnostic.%20My%20challenge:%20${encodeURIComponent(answers.challenge || 'Identity')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="framer-pill-gold text-xs px-8 py-4 inline-flex items-center gap-2"
            >
              <span>Schedule Strategy Call via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleReset}
              className="framer-pill-white text-xs px-6 py-4 inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Diagnostic
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
