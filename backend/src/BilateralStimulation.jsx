import React from 'react';

export const BilateralStimulation = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md animate-fade-in">
      
      {/* CSS keyframe injected directly to avoid tailwind config edits */}
      <style>
        {`
          @keyframes bilateral-bounce {
            0%, 100% { transform: translateX(-35vw); }
            50% { transform: translateX(35vw); }
          }
          .animate-bilateral {
            animation: bilateral-bounce 2s ease-in-out infinite;
          }
        `}
      </style>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Instructions */}
      <div className="absolute top-16 flex flex-col items-center text-center px-4">
        <h2 className="text-2xl font-semibold text-slate-200 tracking-wide mb-3">
          Eye Tracking
        </h2>
        <p className="text-slate-400 text-sm max-w-md leading-relaxed">
          Follow the glowing sphere back and forth with your eyes. <br/>
          <span className="text-teal-400/80 font-medium">Keep your head perfectly still.</span>
        </p>
      </div>

      {/* The Animation Track */}
      <div className="relative w-full max-w-[80vw] h-1 bg-slate-800 rounded-full flex items-center justify-center mt-12">
        {/* The Glowing Ball */}
        <div className="absolute w-12 h-12 bg-teal-400 rounded-full shadow-[0_0_40px_15px_rgba(45,212,191,0.4)] animate-bilateral" />
      </div>

    </div>
  );
};