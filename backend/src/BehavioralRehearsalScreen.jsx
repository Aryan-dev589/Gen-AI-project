import React, { useState } from 'react';
// Correct import path for the components folder
import { SimulationSetup } from './components/SimulationSetup';
import { SimulationChat } from './components/SimulationChat';

export const BehavioralRehearsalScreen = () => {
  const [showSetup, setShowSetup] = useState(false);
  const [activeScenario, setActiveScenario] = useState(null);
  const [customContext, setCustomContext] = useState('');

  const startSimulation = (scenarioId, contextText) => {
    setActiveScenario(scenarioId);
    setCustomContext(contextText);
    setShowSetup(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
      {!activeScenario ? (
        <div className="max-w-xl animate-fade-in">
          <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <span className="text-4xl">🎭</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Behavioral Rehearsal</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Step into a safe, controlled environment to practice difficult conversations. 
            Whether you need to set boundaries with family or handle a tough interview, 
            MannMitra will roleplay the scenario with you.
          </p>
          <button
            onClick={() => setShowSetup(true)}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-colors shadow-lg shadow-indigo-500/20"
          >
            Choose a Scenario
          </button>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col border border-amber-500/30 rounded-xl overflow-hidden bg-slate-900 animate-fade-in">
          <div className="bg-amber-500/10 border-b border-amber-500/30 p-3 text-amber-500 text-sm font-medium flex justify-between items-center px-6">
            <span className="flex items-center gap-3 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> 
              Simulation Active: {activeScenario.toUpperCase()}
            </span>
            <button 
              onClick={() => {
                setActiveScenario(null);
                setCustomContext('');
              }} 
              className="text-xs bg-amber-500/20 hover:bg-amber-500/40 px-4 py-1.5 rounded transition-colors text-amber-300 font-bold tracking-wider uppercase"
            >
              Emergency Exit
            </button>
          </div>
          <div className="flex-1 flex flex-col relative overflow-hidden">
            <SimulationChat 
              scenario={activeScenario} 
              details={customContext} 
              onExit={() => {
                setActiveScenario(null);
                setCustomContext('');
              }}
            />
          </div>
        </div>
      )}
      {showSetup && (
        <SimulationSetup 
          onClose={() => setShowSetup(false)} 
          onStart={startSimulation} 
        />
      )}
    </div>
  );
};