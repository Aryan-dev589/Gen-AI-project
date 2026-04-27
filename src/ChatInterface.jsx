import React, { useState, useRef, useEffect } from 'react';

export const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm MannMitra, your mental wellness companion. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(Date.now() - 100000),
      mood: 'calm'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [scriptPreference, setScriptPreference] = useState("Auto-Mirror");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const copingTools = [
    { id: 1, name: "Breathing Exercise", icon: "🌬️", duration: "5 min" },
    { id: 2, name: "Quick Meditation", icon: "🧘", duration: "3 min" },
    { id: 3, name: "Gratitude Journal", icon: "📝", duration: "2 min" },
    { id: 4, name: "Calming Sounds", icon: "🎵", duration: "..." }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- UPDATED: Now talks to your FastAPI Backend ---
  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const currentText = inputText; // Save text before clearing input
    
    // 1. Show User Message Immediately
    const newUserMessage = {
      id: Date.now(), // Using Date.now() for unique IDs to prevent rendering bugs
      text: currentText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // 2. Send to FastAPI
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: "demo_user_1", // Hardcoded for this sprint
          message: currentText,
          script_preference: scriptPreference
        })
      });

      if (!response.ok) {
        throw new Error("Backend connection failed");
      }

      const data = await response.json();

      // 3. Show AI Response
      const newAiMessage = {
        id: Date.now() + 1,
        text: data.reply, // The text Gemini generated
        sender: 'ai',
        timestamp: new Date(),
        mood: data.mood   // The mood Gemini analyzed ('calm' or 'concerned')
      };

      setMessages(prev => [...prev, newAiMessage]);

    } catch (error) {
      console.error("Error calling backend:", error);
      // Fallback if the server is offline
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "I'm having a little trouble connecting to my servers right now. Please make sure the Python backend is running!",
        sender: 'ai',
        timestamp: new Date(),
        mood: 'calm'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // --- UPDATED: Quick Actions also talk to the Backend ---
  const handleQuickAction = async (action) => {
    const newUserMessage = {
      id: Date.now(),
      text: action,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: "demo_user_1", message: action ,script_preference: scriptPreference})
      });

      if (!response.ok) throw new Error("Backend connection failed");
      
      const data = await response.json();

      const newAiMessage = {
        id: Date.now() + 1,
        text: data.reply,
        sender: 'ai',
        timestamp: new Date(),
        mood: data.mood,
        isCrisis: data.crisis_mode
      };

      setMessages(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error("Error calling backend:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-indigo-50 to-purple-50">
      {/* Header Bar */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">MannMitra</h3>
            <p className="text-sm text-gray-500">
              {isTyping ? 'Thinking...' : 'Online'}
            </p>
          </div>
        </div>
        <button className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors">
          <span className="text-sm">Coping Tools</span>
        </button>
      </div>
      {/* Script Preference Toggle */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200 py-2 px-4 flex justify-center">
        <div className="flex bg-gray-100 rounded-lg p-1 shadow-inner">
          <button
            onClick={() => setScriptPreference("Auto-Mirror")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              scriptPreference === "Auto-Mirror"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
            }`}
          >
            Casual (Mixed)
          </button>
          <button
            onClick={() => setScriptPreference("Native Script")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              scriptPreference === "Native Script"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
            }`}
          >
            Native Script
          </button>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md rounded-2xl p-4 ${
                message.sender === 'user'
                  ? 'bg-indigo-500 text-white'
                  : message.isCrisis 
                    ? 'bg-red-50 border-2 border-red-200 text-red-900 shadow-sm' // Emergency style
                    : 'bg-white text-gray-800 shadow-sm' // Normal AI style
              }`}
            >
              <p>{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
              
              {message.sender === 'ai' && message.mood === 'concerned' && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs font-medium text-indigo-600 mb-1">Quick help:</p>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleQuickAction("Can you suggest a quick breathing exercise?")}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg hover:bg-indigo-200"
                    >
                      Breathing Exercise
                    </button>
                    <button 
                      onClick={() => handleQuickAction("I am feeling really anxious right now, help me calm down.")}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg hover:bg-indigo-200"
                    >
                      Calming Technique
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
            <span className="text-xl">🎤</span>
          </button>
          
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={inputText.trim() === '' || isTyping}
            className={`p-3 rounded-full ${
              inputText.trim() === '' || isTyping
                ? 'bg-gray-200 text-gray-400' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <span className="text-xl">➤</span>
          </button>
        </div>
        
        {/* Quick Suggestions */}
        <div className="mt-3 flex overflow-x-auto space-x-2 pb-1">
          {copingTools.map(tool => (
            <button
              key={tool.id}
              className="flex-shrink-0 flex items-center space-x-1 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-sm hover:bg-indigo-200"
            >
              <span>{tool.icon}</span>
              <span>{tool.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};