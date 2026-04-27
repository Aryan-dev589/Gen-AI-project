import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  HeartPulse,
  ClipboardList,
  BrainCircuit,
  BookOpen,
  Settings,
  LogOut,
} from 'lucide-react';
 import { ChatInterface } from './ChatInterface';
 import { WellnessToolkit } from './Wellness';
 import { MoodJournal } from './MoodJournal';
 import { MeditationSpace }   from './Meditation';
 import { Resources } from './Resources';
 
 // Add this import

const navItems = [
  { id: 'chat', label: 'Chat Companion', icon: MessageSquare },
  { id: 'wellness', label: 'Wellness Toolkit', icon: HeartPulse },
  { id: 'mood', label: 'Mood Journal', icon: ClipboardList },
  { id: 'meditation', label: 'Meditation Space', icon: BrainCircuit },
  { id: 'resources', label: 'Resources', icon: BookOpen },
];

const contentMap = {
  wellness: { title: 'Wellness Toolkit', description: 'Wellness tools and exercises will appear here' },
  mood: { title: 'Mood Journal', description: 'Mood tracking interface will appear here' },
  meditation: { title: 'Meditation Space', description: 'Meditation player will appear here' },
  resources: { title: 'Mental Health Resources', description: 'Helpful resources will appear here' },
  settings: { title: 'Settings & Privacy', description: 'Settings options will appear here' },
};

  export const MainLayout = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 to-black text-gray-300 font-sans">
      {/* Header */}
      <header className="bg-slate-900/70 backdrop-blur-sm border-b border-slate-700 z-10 flex-shrink-0">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <MessageSquare className="text-indigo-400" size={24} />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wider">MannMitra</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Hi, <span className="font-medium text-white">{user.username}</span>
              {user.username === 'Guest' && (
                <span className="ml-2 text-xs bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full">
                  Guest Mode
                </span>
              )}
            </div>
            <button 
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar/Navigation */}
        <aside className="w-64 bg-slate-800/30 flex flex-col p-4">
          <motion.nav 
            className="flex-1 space-y-2 relative"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {navItems.map((item) => (
              <NavItem 
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              />
            ))}
          </motion.nav>
          
          <div className="pt-4 border-t border-slate-700">
            <NavItem 
              item={{ id: 'settings', label: 'Settings', icon: Settings }}
              isActive={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            />
          </div>
        </aside>
        
        {/* Content area */}
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'chat' ? (
              <ChatInterface /> // Use the full ChatInterface component
            ) : activeTab === 'wellness' ? (
              <WellnessToolkit />
            ) : activeTab === 'mood' ? ( 
              <MoodJournal />
            ) : activeTab === 'meditation' ? (
              <MeditationSpace />
            ) : activeTab === 'resources' ? (
              <Resources />
            ) :  (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 h-full flex flex-col m-6"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  {contentMap[activeTab].title}
                </h2>
                
                <div className="flex-1 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">{contentMap[activeTab].description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.button
      variants={itemVariants}
      onClick={onClick}
      className="flex items-center w-full px-4 py-2.5 rounded-lg text-left relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 bg-indigo-500/20 rounded-lg"
          style={{ borderRadius: 8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      <Icon className={`mr-3 z-10 ${isActive ? 'text-indigo-300' : 'text-gray-400'}`} size={20} />
      <span className={`z-10 transition-colors ${isActive ? 'text-white font-semibold' : 'text-gray-300'}`}>
        {item.label}
      </span>
    </motion.button>
  );
};
  

