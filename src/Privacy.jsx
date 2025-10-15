import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Lock, 
  Palette, 
  Languages, 
  Moon, 
  Sun,
  Eye,
  EyeOff,
  Download,
  Trash2,
  User,
  Shield,
  HelpCircle,
  Mail
} from 'lucide-react';

 export const Settings = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('general');
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    moodCheckins: true,
    weeklyInsights: false,
    promotional: false
  });
  const [privacy, setPrivacy] = useState({
    dataCollection: true,
    analytics: false,
    personalizedContent: true
  });
  const [appearance, setAppearance] = useState({
    theme: 'light',
    fontSize: 'medium',
    reduceAnimations: false
  });
  const [language, setLanguage] = useState('english');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const settingsSections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Languages },
    { id: 'account', label: 'Account', icon: User }
  ];

  const languageOptions = [
    { value: 'english', label: 'English', native: 'English' },
    { value: 'hindi', label: 'Hindi', native: 'हिन्दी' },
    { value: 'tamil', label: 'Tamil', native: 'தமிழ்' },
    { value: 'telugu', label: 'Telugu', native: 'తెలుగు' },
    { value: 'bengali', label: 'Bengali', native: 'বাংলা' },
    { value: 'marathi', label: 'Marathi', native: 'मराठी' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'Auto', icon: SettingsIcon }
  ];

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyToggle = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAppearanceChange = (key, value) => {
    setAppearance(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const exportData = () => {
    // In a real app, this would generate and download a data file
    alert('Your data export has been prepared. You will receive it via email.');
  };

  const deleteAccount = () => {
    // In a real app, this would trigger account deletion process
    alert('Account deletion process initiated. Please check your email for confirmation.');
    setShowDeleteConfirm(false);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">App Preferences</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Daily Wellness Check-in</p>
                    <p className="text-sm text-gray-600">Remind me to log my mood daily</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.dailyReminders}
                      onChange={() => handleNotificationToggle('dailyReminders')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Weekly Insights</p>
                    <p className="text-sm text-gray-600">Receive weekly mental health insights</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.weeklyInsights}
                      onChange={() => handleNotificationToggle('weeklyInsights')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p className="text-sm text-gray-600">
                        {key === 'dailyReminders' && 'Daily reminders to check in with your mood'}
                        {key === 'moodCheckins' && 'Notifications for regular mood tracking'}
                        {key === 'weeklyInsights' && 'Weekly summaries and insights'}
                        {key === 'promotional' && 'Updates about new features and content'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={value}
                        onChange={() => handleNotificationToggle(key)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Data Collection</p>
                    <p className="text-sm text-gray-600">Allow anonymous data collection to improve services</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={privacy.dataCollection}
                      onChange={() => handlePrivacyToggle('dataCollection')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Analytics</p>
                    <p className="text-sm text-gray-600">Share usage analytics for research purposes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={privacy.analytics}
                      onChange={() => handlePrivacyToggle('analytics')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Data Management</h3>
              <div className="space-y-3">
                <button 
                  onClick={exportData}
                  className="w-full flex items-center justify-between p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Download className="w-5 h-5 mr-3" />
                    <span>Export My Data</span>
                  </div>
                  <span className="text-sm">Download your information</span>
                </button>

                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full flex items-center justify-between p-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Trash2 className="w-5 h-5 mr-3" />
                    <span>Delete Account</span>
                  </div>
                  <span className="text-sm">Permanently remove your data</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Theme</h3>
              <div className="grid grid-cols-3 gap-3">
                {themeOptions.map(theme => {
                  const Icon = theme.icon;
                  return (
                    <button
                      key={theme.value}
                      onClick={() => handleAppearanceChange('theme', theme.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        appearance.theme === theme.value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm">{theme.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Text Size</h3>
              <div className="flex space-x-3">
                {['small', 'medium', 'large'].map(size => (
                  <button
                    key={size}
                    onClick={() => handleAppearanceChange('fontSize', size)}
                    className={`px-4 py-2 rounded-lg border transition-all capitalize ${
                      appearance.fontSize === size
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Reduce Animations</p>
                <p className="text-sm text-gray-600">Minimize motion and animations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={appearance.reduceAnimations}
                  onChange={() => handleAppearanceChange('reduceAnimations', !appearance.reduceAnimations)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">App Language</h3>
              <div className="space-y-2">
                {languageOptions.map(lang => (
                  <button
                    key={lang.value}
                    onClick={() => setLanguage(lang.value)}
                    className={`w-full flex justify-between items-center p-4 rounded-lg border transition-all ${
                      language === lang.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-medium">{lang.label}</p>
                      <p className="text-sm text-gray-600">{lang.native}</p>
                    </div>
                    {language === lang.value && (
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Account Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Username:</span>
                  <span className="font-medium">{user.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Type:</span>
                  <span className="font-medium capitalize">{user.username === 'Guest' ? 'Guest' : 'Registered'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center justify-center p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <SettingsIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">Settings</h3>
            <p className="text-gray-500">Select a category to manage your preferences</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-600">Manage your app preferences and privacy settings</p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Settings Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
          <nav className="space-y-1">
            {settingsSections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-white text-indigo-600 shadow-sm border border-gray-200'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-auto p-6">
          {renderSectionContent()}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Delete Account</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete your account? All your data will be permanently removed, 
              including your chat history, mood entries, and personal settings.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
  
