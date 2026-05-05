import React, { useState } from 'react';

export const SimulationSetup = ({ onClose, onStart }) => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  
  // State object to hold all three custom inputs
  const [details, setDetails] = useState({
    context: '',
    friction: '',
    persona: ''
  });

  const scenarios = [
    { id: 'family', icon: '🛡️', title: 'The Guilt Trip', desc: 'Practice setting boundaries with a demanding relative or parent.' },
    { id: 'authority', icon: '🎤', title: 'Tough Authority', desc: 'Face a harsh professor or strict interviewer to build confidence.' },
    { id: 'peer', icon: '🕊️', title: 'Difficult Peer', desc: 'Navigate a passive-aggressive roommate or project partner.' },
    { id: 'reversal', icon: '🔄', title: 'Role Reversal', desc: 'You play the difficult person. The AI plays you.' }
  ];

  const handleStart = () => {
    if (selectedScenario) {
      // Pass both the category and the detailed object to the parent
      onStart(selectedScenario, details);
    }
  };

  const handleInputChange = (field, value) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm animate-fade-in px-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Behavioral Rehearsal</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Choose a scenario to practice handling difficult conversations in a safe environment.
          </p>
        </div>

        {/* The 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedScenario(s.id)}
              className={`p-4 rounded-xl text-left transition-all border ${
                selectedScenario === s.id 
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                  : 'bg-slate-900/50 border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <h3 className="text-lg font-semibold text-slate-200 mb-1">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </button>
          ))}
        </div>

        {/* Dynamic 3-Part Form: Only shows after a card is clicked */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedScenario ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
            
            {/* Input 1: The Scenario */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                1. What is the specific situation?
              </label>
              <input 
                type="text"
                value={details.context}
                onChange={(e) => handleInputChange('context', e.target.value)}
                placeholder="e.g., Asking my boss for a 15% raise..."
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Input 2: The Friction */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                2. What makes this uncomfortable for you?
              </label>
              <input 
                type="text"
                value={details.friction}
                onChange={(e) => handleInputChange('friction', e.target.value)}
                placeholder="e.g., I freeze when people interrupt me..."
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Input 3: The Persona */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                3. How does the other person usually act?
              </label>
              <input 
                type="text"
                value={details.persona}
                onChange={(e) => handleInputChange('persona', e.target.value)}
                placeholder="e.g., Dismissive, defensive, changes the subject..."
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

          </div>
        </div>

        <div className="flex flex-col items-center border-t border-slate-700 pt-6">
          <p className="text-[11px] text-amber-500/80 mb-4 text-center max-w-sm">
            *This mode simulates stressful interactions. You will have an "Emergency Stop" button available at all times.
          </p>
          <button 
            onClick={handleStart}
            disabled={!selectedScenario}
            className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-full font-medium transition-colors shadow-lg"
          >
            Enter Simulation
          </button>
        </div>

      </div>
    </div>
  );
};