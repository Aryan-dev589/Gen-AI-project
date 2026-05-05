import React, { useState, useEffect } from 'react';

export const BreathingExercise = ({ onClose }) => {
  const [phase, setPhase] = useState('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          if (phase === 'Inhale') {
            setPhase('Hold');
            return 4; // Hold for 4s
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return 5; // Exhale for 5s
          } else {
            setPhase('Inhale');
            return 4; // Inhale for 4s
          }
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm animate-fade-in">
      <div className="relative flex flex-col items-center justify-center w-full max-w-md p-8 text-center">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-slate-200 mb-12 tracking-wide">Box Breathing</h2>

        {/* The Breathing Circle */}
        <div className="relative flex items-center justify-center w-64 h-64 mb-12">
          <div 
            className={`absolute w-48 h-48 rounded-full bg-indigo-500/20 border-2 border-indigo-400/50 transition-all duration-1000 ease-in-out ${
              phase === 'Inhale' ? 'scale-150 opacity-100' : 
              phase === 'Hold' ? 'scale-150 opacity-80' : 
              'scale-75 opacity-40'
            }`}
          />
          <div className="absolute z-10 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-indigo-300 tracking-wider mb-2 uppercase">{phase}</span>
            <span className="text-5xl font-light text-white">{timeLeft}</span>
          </div>
        </div>

        <p className="text-slate-400 text-sm max-w-[250px] leading-relaxed">
          Focus on the circle. Match your breath to the expanding and contracting rhythm.
        </p>

      </div>
    </div>
  );
};