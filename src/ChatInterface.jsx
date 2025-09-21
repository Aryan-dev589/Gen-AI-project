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
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sample coping tools suggestions
  const copingTools = [
    { id: 1, name: "Breathing Exercise", icon: "🌬️", duration: "5 min" },
    { id: 2, name: "Quick Meditation", icon: "🧘", duration: "3 min" },
    { id: 3, name: "Gratitude Journal", icon: "📝", duration: "2 min" },
    { id: 4, name: "Calming Sounds", icon: "🎵", duration: "..." }
  ];

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "I understand how that might make you feel. Would you like to try a quick breathing exercise to help?",
        "Thank you for sharing that with me. It's completely normal to feel this way sometimes.",
        "I'm here to listen. Would it help to talk more about what's causing these feelings?",
        "I appreciate you opening up. Remember, it's okay to not be okay sometimes.",
        "That sounds challenging. Would you like me to suggest a calming activity?"
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const newAiMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
        mood: Math.random() > 0.5 ? 'calm' : 'concerned'
      };

      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    const newUserMessage = {
      id: messages.length + 1,
      text: action,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);
    setIsTyping(true);

    // Simulate AI response to quick action
    setTimeout(() => {
      let response = "";
      
      if (action === "Suggest an exercise") {
        response = "Sure! Let's try a simple breathing exercise. Breathe in slowly for 4 counts, hold for 2 counts, and exhale for 6 counts. Repeat 5 times.";
      } else if (action === "I'm feeling anxious") {
        response = "I'm here for you. Let's try grounding technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.";
      } else {
        response = "I'm glad you asked for help. Let me suggest a quick meditation to help ease your mind.";
      }
      
      const newAiMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'ai',
        timestamp: new Date(),
        mood: 'supportive'
      };

      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1500);
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
                  : 'bg-white text-gray-800 shadow-sm'
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
                      onClick={() => handleQuickAction("Suggest an exercise")}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg hover:bg-indigo-200"
                    >
                      Breathing Exercise
                    </button>
                    <button 
                      onClick={() => handleQuickAction("I'm feeling anxious")}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={inputText.trim() === ''}
            className={`p-3 rounded-full ${
              inputText.trim() === '' 
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

