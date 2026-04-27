import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Plus, X, Smile, Frown, Meh } from 'lucide-react';

export const MoodJournal = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodEntries, setMoodEntries] = useState([]);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    mood: '',
    energy: 5,
    stress: 5,
    sleep: 7,
    notes: '',
    tags: []
  });

  // Sample mood data for the current month
  const [moodCalendar, setMoodCalendar] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendar = [];
    for (let i = 1; i <= daysInMonth; i++) {
      // Random mood data for demonstration
      const moods = ['happy', 'neutral', 'sad', 'anxious', 'energetic'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      const hasEntry = Math.random() > 0.6; // 40% chance of having an entry
      
      calendar.push({
        date: new Date(year, month, i),
        mood: hasEntry ? randomMood : null,
        energy: hasEntry ? Math.floor(Math.random() * 10) + 1 : null,
        hasEntry
      });
    }
    return calendar;
  });

  const moodOptions = [
    { value: 'excited', label: 'Excited', emoji: '😆', color: 'bg-yellow-400' },
    { value: 'happy', label: 'Happy', emoji: '😊', color: 'bg-green-400' },
    { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'bg-blue-400' },
    { value: 'sad', label: 'Sad', emoji: '😔', color: 'bg-indigo-400' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-purple-400' },
    { value: 'angry', label: 'Angry', emoji: '😠', color: 'bg-red-400' },
    { value: 'tired', label: 'Tired', emoji: '😴', color: 'bg-gray-400' }
  ];

  const tagOptions = ['Work', 'Family', 'Friends', 'Health', 'Exercise', 'Nature', 'Creative', 'Chores'];

  useEffect(() => {
    // Check if we already have an entry for the selected date
    const existingEntry = moodEntries.find(entry => 
      new Date(entry.date).toDateString() === selectedDate.toDateString()
    );
    
    if (existingEntry) {
      setCurrentEntry(existingEntry);
    } else {
      setCurrentEntry({
        mood: '',
        energy: 5,
        stress: 5,
        sleep: 7,
        notes: '',
        tags: [],
        date: selectedDate
      });
    }
  }, [selectedDate, moodEntries]);

  const handleMoodSelect = (moodValue) => {
    setCurrentEntry({ ...currentEntry, mood: moodValue });
  };

  const handleTagSelect = (tag) => {
    if (currentEntry.tags.includes(tag)) {
      setCurrentEntry({ 
        ...currentEntry, 
        tags: currentEntry.tags.filter(t => t !== tag) 
      });
    } else {
      setCurrentEntry({ 
        ...currentEntry, 
        tags: [...currentEntry.tags, tag] 
      });
    }
  };

  const handleSaveEntry = () => {
    const newEntry = { ...currentEntry, date: selectedDate };
    
    // Check if entry already exists for this date
    const existingIndex = moodEntries.findIndex(entry => 
      new Date(entry.date).toDateString() === selectedDate.toDateString()
    );
    
    if (existingIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...moodEntries];
      updatedEntries[existingIndex] = newEntry;
      setMoodEntries(updatedEntries);
    } else {
      // Add new entry
      setMoodEntries([...moodEntries, newEntry]);
    }
    
    setShowEntryForm(false);
    // For demo purposes, show a success message
    alert('Mood entry saved successfully!');
  };

  const getMoodColor = (mood) => {
    const moodConfig = moodOptions.find(option => option.value === mood);
    return moodConfig ? moodConfig.color : 'bg-gray-200';
  };

  const getMoodEmoji = (mood) => {
    const moodConfig = moodOptions.find(option => option.value === mood);
    return moodConfig ? moodConfig.emoji : '';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Check if selected date has an entry
  const hasEntryForSelectedDate = moodEntries.some(entry => 
    new Date(entry.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="h-full flex flex-col bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mood Journal</h2>
        <button
          onClick={() => setShowEntryForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Calendar View */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Mood Calendar
          </h3>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
            {moodCalendar.map(day => (
              <button
                key={day.date.getDate()}
                onClick={() => setSelectedDate(day.date)}
                className={`p-2 rounded-lg text-center text-sm transition-all ${
                  day.date.getDate() === selectedDate.getDate() &&
                  day.date.getMonth() === selectedDate.getMonth()
                    ? 'ring-2 ring-indigo-500 ring-offset-2'
                    : 'hover:bg-gray-200'
                } ${
                  day.hasEntry ? getMoodColor(day.mood) : 'bg-white'
                }`}
              >
                <div className="h-6 w-6 flex items-center justify-center mx-auto">
                  {day.hasEntry ? getMoodEmoji(day.mood) : day.date.getDate()}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Entry Form */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
          {showEntryForm ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {hasEntryForSelectedDate ? 'Edit Entry' : 'New Entry'} for {formatDate(selectedDate)}
                </h3>
                <button
                  onClick={() => setShowEntryForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Mood Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How are you feeling?
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {moodOptions.map(mood => (
                      <button
                        key={mood.value}
                        onClick={() => handleMoodSelect(mood.value)}
                        className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                          currentEntry.mood === mood.value
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-2xl mb-1">{mood.emoji}</span>
                        <span className="text-xs text-gray-600">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Energy Level: {currentEntry.energy}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={currentEntry.energy}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, energy: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stress Level: {currentEntry.stress}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={currentEntry.stress}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, stress: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sleep Hours: {currentEntry.sleep} hours
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      value={currentEntry.sleep}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, sleep: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (what affected your mood?)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          currentEntry.tags.includes(tag)
                            ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={currentEntry.notes}
                    onChange={(e) => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
                    placeholder="What's affecting your mood? Any specific thoughts or events?"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveEntry}
                  disabled={!currentEntry.mood}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    !currentEntry.mood
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Save Entry
                </button>
              </div>
            </div>
          ) : (
            /* Journal Overview */
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Mood Journal</h3>
              <p className="text-gray-600 mb-6">
                Track your moods, identify patterns, and understand your emotional well-being over time.
              </p>
              <button
                onClick={() => setShowEntryForm(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                {hasEntryForSelectedDate ? 'Edit Today\'s Entry' : 'Add Today\'s Entry'}
              </button>
              
              {moodEntries.length > 0 && (
                <div className="mt-8 text-left">
                  <h4 className="font-semibold mb-3">Recent Entries</h4>
                  <div className="space-y-2">
                    {moodEntries.slice(-3).reverse().map((entry, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg flex items-center">
                        <span className="text-2xl mr-3">{getMoodEmoji(entry.mood)}</span>
                        <div>
                          <div className="font-medium">{formatDate(new Date(entry.date))}</div>
                          <div className="text-sm text-gray-600">
                            Energy: {entry.energy}/10 • Stress: {entry.stress}/10
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

