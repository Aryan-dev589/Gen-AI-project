import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Clock, Heart, Zap } from 'lucide-react';

  export const MeditationSpace = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathProgress, setBreathProgress] = useState(0);

  const timerRef = useRef(null);
  const breathTimerRef = useRef(null);

  const meditationSessions = [
    {
      id: 'mindfulness',
      title: 'Mindfulness Meditation',
      duration: 10,
      description: 'Focus on present moment awareness',
      steps: [
        { duration: 60, instruction: 'Find a comfortable sitting position' },
        { duration: 120, instruction: 'Focus on your natural breathing' },
        { duration: 180, instruction: 'Notice thoughts without judgment' },
        { duration: 120, instruction: 'Expand awareness to body sensations' },
        { duration: 60, instruction: 'Slowly return to the present' }
      ],
      color: 'bg-blue-500'
    },
    {
      id: 'breathing',
      title: 'Deep Breathing',
      duration: 5,
      description: 'Calm your nervous system with rhythmic breathing',
      steps: [
        { duration: 300, instruction: 'Follow the breathing guide' }
      ],
      color: 'bg-green-500'
    },
    {
      id: 'body-scan',
      title: 'Body Scan',
      duration: 15,
      description: 'Progressive relaxation through body awareness',
      steps: [
        { duration: 120, instruction: 'Start with your toes, notice sensations' },
        { duration: 180, instruction: 'Move to your feet and ankles' },
        { duration: 180, instruction: 'Scan through legs and knees' },
        { duration: 180, instruction: 'Focus on hips and lower back' },
        { duration: 180, instruction: 'Move to abdomen and chest' },
        { duration: 180, instruction: 'Scan through hands and arms' },
        { duration: 180, instruction: 'Focus on shoulders and neck' },
        { duration: 120, instruction: 'Finally, relax your head and face' }
      ],
      color: 'bg-purple-500'
    },
    {
      id: 'loving-kindness',
      title: 'Loving-Kindness',
      duration: 12,
      description: 'Cultivate compassion for yourself and others',
      steps: [
        { duration: 180, instruction: 'Focus on feelings of warmth for yourself' },
        { duration: 180, instruction: 'Extend these feelings to loved ones' },
        { duration: 180, instruction: 'Include neutral people in your wishes' },
        { duration: 180, instruction: 'Extend to all living beings' },
        { duration: 120, instruction: 'Return to yourself with compassion' }
      ],
      color: 'bg-pink-500'
    }
  ];

  const ambientSounds = [
    { id: 'rain', name: 'Rainfall', icon: '🌧️' },
    { id: 'forest', name: 'Forest', icon: '🌲' },
    { id: 'waves', name: 'Ocean Waves', icon: '🌊' },
    { id: 'fire', name: 'Crackling Fire', icon: '🔥' },
    { id: 'white-noise', name: 'White Noise', icon: '🎵' }
  ];

  const [activeSound, setActiveSound] = useState(null);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleNextStep();
            return 0;
          }
          return prev - 1;
        });
        
        if (activeSession && activeSession.steps[currentStep]) {
          const totalStepTime = activeSession.steps[currentStep].duration;
          const elapsed = totalStepTime - timeLeft + 1;
          setProgress((elapsed / totalStepTime) * 100);
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, timeLeft, currentStep, activeSession]);

  useEffect(() => {
    if (showBreathing && activeSession?.id === 'breathing') {
      const breathingCycle = [
        { phase: 'inhale', duration: 4000, instruction: 'Breathe In' },
        { phase: 'hold', duration: 2000, instruction: 'Hold' },
        { phase: 'exhale', duration: 6000, instruction: 'Breathe Out' },
        { phase: 'rest', duration: 2000, instruction: 'Rest' }
      ];

      let currentPhaseIndex = 0;

      const startBreathingCycle = () => {
        const currentPhase = breathingCycle[currentPhaseIndex];
        setBreathPhase(currentPhase.phase);
        setBreathProgress(0);

        const phaseTimer = setInterval(() => {
          setBreathProgress(prev => {
            if (prev >= 100) {
              clearInterval(phaseTimer);
              currentPhaseIndex = (currentPhaseIndex + 1) % breathingCycle.length;
              if (isPlaying) startBreathingCycle();
              return 0;
            }
            return prev + (100 / (currentPhase.duration / 50));
          });
        }, 50);
      };

      if (isPlaying) {
        startBreathingCycle();
      }

      return () => {
        clearInterval(breathTimerRef.current);
      };
    }
  }, [showBreathing, isPlaying, activeSession]);

  const startSession = (session) => {
    setActiveSession(session);
    setCurrentStep(0);
    setTimeLeft(session.steps[0].duration);
    setIsPlaying(true);
    setProgress(0);
    setShowBreathing(session.id === 'breathing');
  };

  const handleNextStep = () => {
    if (activeSession && currentStep < activeSession.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeLeft(activeSession.steps[currentStep + 1].duration);
      setProgress(0);
    } else {
      // Session completed
      setIsPlaying(false);
      setActiveSession(null);
      setShowBreathing(false);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setIsPlaying(false);
    setActiveSession(null);
    setTimeLeft(0);
    setProgress(0);
    setCurrentStep(0);
    setShowBreathing(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingVisual = () => {
    switch (breathPhase) {
      case 'inhale':
        return { size: 100, color: 'bg-blue-400', text: 'Breathe In' };
      case 'hold':
        return { size: 80, color: 'bg-blue-600', text: 'Hold' };
      case 'exhale':
        return { size: 40, color: 'bg-blue-800', text: 'Breathe Out' };
      case 'rest':
        return { size: 60, color: 'bg-blue-300', text: 'Rest' };
      default:
        return { size: 60, color: 'bg-blue-400', text: 'Breathe' };
    }
  };

  const breathingVisual = getBreathingVisual();

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Meditation Space</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Meditation Sessions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-4">Guided Sessions</h3>
          {meditationSessions.map(session => (
            <button
              key={session.id}
              onClick={() => startSession(session)}
              disabled={isPlaying}
              className={`w-full p-4 text-left rounded-lg border transition-all ${
                isPlaying
                  ? 'bg-gray-100 border-gray-200 text-gray-400'
                  : `border-transparent hover:shadow-md ${session.color} bg-opacity-10 hover:bg-opacity-20`
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{session.title}</h4>
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {session.duration}min
                </span>
              </div>
              <p className="text-sm text-gray-600">{session.description}</p>
            </button>
          ))}

          {/* Ambient Sounds */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Ambient Sounds</h3>
            <div className="grid grid-cols-2 gap-3">
              {ambientSounds.map(sound => (
                <button
                  key={sound.id}
                  onClick={() => setActiveSound(activeSound === sound.id ? null : sound.id)}
                  className={`p-3 rounded-lg border transition-all flex flex-col items-center ${
                    activeSound === sound.id
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl mb-1">{sound.icon}</span>
                  <span className="text-xs">{sound.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Meditation Area */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 flex flex-col">
          {activeSession ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Breathing Visual for Breathing Exercise */}
              {showBreathing && (
                <div className="mb-8 text-center">
                  <div className="relative w-64 h-64 mx-auto mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`rounded-full transition-all duration-1000 ${breathingVisual.color}`}
                        style={{
                          width: `${breathingVisual.size}%`,
                          height: `${breathingVisual.size}%`,
                        }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {breathingVisual.text}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress and Instructions */}
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-800 mb-4">
                  {formatTime(timeLeft)}
                </div>
                <div className="w-64 bg-gray-200 rounded-full h-2 mb-4 mx-auto">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-lg text-gray-700 mb-2">
                  {activeSession.steps[currentStep]?.instruction}
                </p>
                <p className="text-sm text-gray-500">
                  Step {currentStep + 1} of {activeSession.steps.length}
                </p>
              </div>

              {/* Controls */}
              <div className="flex space-x-4">
                <button
                  onClick={togglePlayPause}
                  className="p-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button
                  onClick={resetSession}
                  className="p-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            /* Welcome State */
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Meditation Space</h3>
              <p className="text-gray-600 max-w-md mb-8">
                Find peace and clarity through guided meditation sessions. 
                Choose a session to begin your mindfulness practice.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Zap className="w-4 h-4 mr-2" />
                <span>Select a session from the left to begin</span>
              </div>
            </div>
          )}

          {/* Session Info */}
          {activeSession && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold mb-2">{activeSession.title}</h4>
              <p className="text-sm text-gray-600">{activeSession.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



