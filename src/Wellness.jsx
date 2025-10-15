import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Timer, Heart, BookOpen, Activity, Wind } from 'lucide-react';

 export const WellnessToolkit = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [gratitudeList, setGratitudeList] = useState(['', '', '']);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingProgress, setBreathingProgress] = useState(0);

  const tools = [
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      icon: <Wind className="w-6 h-6" />,
      color: 'bg-blue-500',
      description: 'Calm your mind with guided breathing'
    },
    {
      id: 'meditation',
      title: 'Quick Meditation',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-purple-500',
      description: '5-minute mindfulness meditation'
    },
    {
      id: 'gratitude',
      title: 'Gratitude Journal',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-pink-500',
      description: 'Focus on the positive things'
    },
    {
      id: 'reflection',
      title: 'Daily Reflection',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-green-500',
      description: 'Reflect on your day'
    }
  ];

  const breathingPhases = [
    { name: 'inhale', duration: 4000, text: 'Breathe In', instruction: 'Slowly inhale through your nose' },
    { name: 'hold', duration: 2000, text: 'Hold', instruction: 'Hold your breath' },
    { name: 'exhale', duration: 6000, text: 'Breathe Out', instruction: 'Slowly exhale through your mouth' },
    { name: 'rest', duration: 2000, text: 'Rest', instruction: 'Relax before next cycle' }
  ];

  const meditations = [
    {
      title: 'Body Scan',
      duration: '5 min',
      description: 'Progressive relaxation from head to toe'
    },
    {
      title: 'Mindfulness',
      duration: '3 min',
      description: 'Present moment awareness practice'
    },
    {
      title: 'Loving-Kindness',
      duration: '7 min',
      description: 'Cultivate compassion for yourself and others'
    }
  ];

  const startBreathingExercise = () => {
    setBreathingActive(true);
    setBreathingPhase('inhale');
    setBreathingProgress(0);
  };

  const handleGratitudeChange = (index, value) => {
    const newList = [...gratitudeList];
    newList[index] = value;
    setGratitudeList(newList);
  };

  const renderToolContent = () => {
    switch (activeTool) {
      case 'breathing':
        return (
          <div className="text-center p-6">
            <h3 className="text-2xl font-bold mb-4">Breathing Exercise</h3>
            <p className="text-gray-600 mb-6">Follow the rhythm to calm your nervous system</p>
            
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className={`rounded-full transition-all duration-1000 ${
                    breathingPhase === 'inhale' ? 'bg-blue-200' : 
                    breathingPhase === 'exhale' ? 'bg-blue-800' : 'bg-blue-400'
                  }`}
                  style={{
                    width: `${breathingPhase === 'inhale' ? 100 : breathingPhase === 'exhale' ? 20 : 60}%`,
                    height: `${breathingPhase === 'inhale' ? 100 : breathingPhase === 'exhale' ? 20 : 60}%`,
                  }}
                ></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {breathingPhases.find(phase => phase.name === breathingPhase)?.text}
                </span>
              </div>
            </div>
            
            <p className="text-lg mb-4">
              {breathingPhases.find(phase => phase.name === breathingPhase)?.instruction}
            </p>
            
            {!breathingActive ? (
              <button
                onClick={startBreathingExercise}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Breathing Exercise
              </button>
            ) : (
              <button
                onClick={() => setBreathingActive(false)}
                className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                Stop Exercise
              </button>
            )}
          </div>
        );
      
      case 'meditation':
        return (
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-6">Guided Meditations</h3>
            <div className="grid gap-4">
              {meditations.map((meditation, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg">{meditation.title}</h4>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                      {meditation.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{meditation.description}</p>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
                    Start Meditation
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'gratitude':
        return (
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Gratitude Journal</h3>
            <p className="text-gray-600 mb-6">List three things you're grateful for today</p>
            
            <div className="space-y-4">
              {gratitudeList.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-3 text-2xl">✨</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleGratitudeChange(index, e.target.value)}
                    placeholder={`Gratitude #${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              ))}
            </div>
            
            <button className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors">
              Save Gratitude List
            </button>
          </div>
        );
      
      case 'reflection':
        return (
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Daily Reflection</h3>
            <p className="text-gray-600 mb-6">Take a moment to reflect on your day</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How are you feeling today?
              </label>
              <div className="flex space-x-2">
                {['😢', '😐', '😊', '😁'].map((emoji, index) => (
                  <button
                    key={index}
                    className="text-2xl p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Today's reflection
              </label>
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="What's on your mind today?"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Save Reflection
            </button>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Wellness Toolkit</h3>
            <p className="text-gray-600">Select a tool to support your mental well-being</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Wellness Toolkit</h2>
          {activeTool && (
            <button
              onClick={() => setActiveTool(null)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back to Tools
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {!activeTool ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`p-6 rounded-xl text-left transition-all hover:shadow-md ${tool.color} bg-opacity-10 hover:bg-opacity-20`}
                >
                  <div className={`w-12 h-12 ${tool.color} rounded-full flex items-center justify-center mb-4`}>
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                  <p className="text-gray-600">{tool.description}</p>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Quick Relaxation Techniques</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">5-4-3-2-1 Grounding</h4>
                  <p className="text-sm text-gray-600">Notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Progressive Muscle Relaxation</h4>
                  <p className="text-sm text-gray-600">Tense and then relax each muscle group in your body, starting from your toes and working up to your head.</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Mindful Breathing</h4>
                  <p className="text-sm text-gray-600">Focus your attention on your breath. When your mind wanders, gently bring it back to your breathing.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>{renderToolContent()}</div>
        )}
      </div>
    </div>
  );
};

