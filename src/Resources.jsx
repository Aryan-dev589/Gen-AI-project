import React, { useState } from 'react';
import { Phone, ExternalLink, Book, Video, Users, Heart, Search, Filter } from 'lucide-react';

export const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const resourceCategories = [
    { id: 'all', label: 'All Resources', icon: '📚' },
    { id: 'crisis', label: 'Crisis Support', icon: '🆘' },
    { id: 'self-help', label: 'Self-Help', icon: '💪' },
    { id: 'educational', label: 'Educational', icon: '🎓' },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'apps', label: 'Apps & Tools', icon: '📱' }
  ];

  const crisisHelplines = [
    {
      name: 'Vandrevala Foundation',
      number: '1860 2662 345 / 1800 2333 330',
      hours: '24/7',
      services: 'Mental Health Support',
      languages: 'English, Hindi',
      website: 'https://www.vandrevalafoundation.com'
    },
    {
      name: 'iCall Psychosocial Helpline',
      number: '9152987821',
      hours: 'Mon-Sat, 10AM-8PM',
      services: 'Counselling & Support',
      languages: 'English, Hindi',
      website: 'https://icallhelpline.org'
    },
    {
      name: 'Snehi',
      number: '011-65978181 / 011-65978282',
      hours: '10AM-6PM',
      services: 'Mental Health Support',
      languages: 'English, Hindi',
      website: 'http://snehi.org'
    },
    {
      name: 'Fortis Stress Helpline',
      number: '8376804102',
      hours: '24/7',
      services: 'Crisis Intervention',
      languages: 'English, Hindi',
      website: 'https://www.fortishealthcare.com'
    },
    {
      name: 'AASRA',
      number: '9820466726',
      hours: '24/7',
      services: 'Suicide Prevention',
      languages: 'English, Hindi',
      website: 'http://aasra.info'
    }
  ];

  const selfHelpResources = [
    {
      title: 'Coping with Anxiety',
      type: 'Guide',
      duration: '15 min read',
      description: 'Practical techniques to manage anxiety and panic attacks',
      tags: ['Anxiety', 'Coping', 'Breathing'],
      link: '#'
    },
    {
      title: 'Mindfulness for Beginners',
      type: 'Video Series',
      duration: '5 videos',
      description: 'Step-by-step mindfulness meditation practices',
      tags: ['Mindfulness', 'Meditation', 'Beginners'],
      link: '#'
    },
    {
      title: 'Building Resilience',
      type: 'Workbook',
      duration: '30 min exercise',
      description: 'Exercises to build emotional strength and adaptability',
      tags: ['Resilience', 'Emotional Health', 'Exercises'],
      link: '#'
    },
    {
      title: 'Sleep Hygiene Guide',
      type: 'Article',
      duration: '10 min read',
      description: 'Improve your sleep quality with evidence-based practices',
      tags: ['Sleep', 'Health', 'Wellness'],
      link: '#'
    }
  ];

  const educationalContent = [
    {
      title: 'Understanding Depression',
      author: 'Dr. Anjali Sharma',
      type: 'Article',
      level: 'Beginner',
      description: 'Comprehensive guide to recognizing and understanding depression symptoms',
      tags: ['Depression', 'Education', 'Symptoms']
    },
    {
      title: 'Mental Health in Indian Context',
      author: 'Mental Health Foundation',
      type: 'Research Paper',
      level: 'Advanced',
      description: 'Cultural perspectives on mental health in Indian society',
      tags: ['Culture', 'Research', 'India']
    },
    {
      title: 'Digital Wellbeing',
      author: 'Tech for Good Initiative',
      type: 'Webinar',
      level: 'Intermediate',
      description: 'Managing mental health in the digital age',
      tags: ['Digital', 'Technology', 'Wellbeing']
    }
  ];

  const mentalHealthApps = [
    {
      name: 'Wysa',
      description: 'AI-powered mental health support with therapeutic exercises',
      features: ['Chat Support', 'Exercises', 'Mood Tracking'],
      platform: 'iOS & Android',
      cost: 'Freemium'
    },
    {
      name: 'YourDOST',
      description: 'Online counseling and emotional wellness platform',
      features: ['Counselling', 'Community', 'Resources'],
      platform: 'Web & Mobile',
      cost: 'Freemium'
    },
    {
      name: 'InnerHour',
      description: 'Self-care app with therapy programs and daily exercises',
      features: ['Therapy Programs', 'Self-Care', 'Tracking'],
      platform: 'iOS & Android',
      cost: 'Subscription'
    }
  ];

  const communityResources = [
    {
      name: 'Mental Health Support Groups',
      description: 'Local and online support groups for various mental health concerns',
      type: 'Community',
      access: 'Free',
      contact: 'Various locations across India'
    },
    {
      name: 'Campus Counseling Services',
      description: 'University-based mental health support for students',
      type: 'Educational',
      access: 'Free for students',
      contact: 'Check your university website'
    },
    {
      name: 'Online Forums',
      description: 'Safe spaces to share experiences and get peer support',
      type: 'Digital',
      access: 'Free',
      contact: 'Various online platforms'
    }
  ];

  const filteredResources = {
    crisis: crisisHelplines,
    'self-help': selfHelpResources,
    educational: educationalContent,
    apps: mentalHealthApps,
    community: communityResources
  };

  const getCurrentResources = () => {
    if (activeCategory === 'all') {
      return {
        crisis: crisisHelplines.slice(0, 2),
        'self-help': selfHelpResources.slice(0, 2),
        educational: educationalContent.slice(0, 2),
        apps: mentalHealthApps.slice(0, 2),
        community: communityResources.slice(0, 2)
      };
    }
    return { [activeCategory]: filteredResources[activeCategory] };
  };

  const handleCall = (number) => {
    // In a real app, this would initiate a phone call
    alert(`Calling ${number}`);
  };

  const resources = getCurrentResources();

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-green-50 to-blue-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mental Health Resources</h2>
          <p className="text-gray-600">Support, information, and tools for your well-being</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {resourceCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === category.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Resources Content */}
      <div className="flex-1 overflow-auto space-y-8">
        {/* Crisis Helplines */}
        {resources.crisis && (
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <Heart className="w-4 h-4 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Crisis Support Helplines</h3>
            </div>
            <p className="text-gray-600 mb-6">Immediate support available 24/7. You're not alone.</p>
            
            <div className="space-y-4">
              {resources.crisis.map((helpline, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{helpline.name}</h4>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      {helpline.hours}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{helpline.services}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <button
                        onClick={() => handleCall(helpline.number)}
                        className="flex items-center text-red-600 hover:text-red-700 font-semibold"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        {helpline.number}
                      </button>
                      <p className="text-xs text-gray-500 mt-1">{helpline.languages}</p>
                    </div>
                    <a
                      href={helpline.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm"
                    >
                      Website
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Self-Help Resources */}
        {resources['self-help'] && (
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Book className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Self-Help Resources</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources['self-help'].map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{resource.title}</h4>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{resource.duration}</span>
                    <a href={resource.link} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      Explore →
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {resource.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educational Content */}
        {resources.educational && (
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Video className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Educational Content</h3>
            </div>
            
            <div className="space-y-4">
              {resources.educational.map((content, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{content.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      content.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      content.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {content.level}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">By {content.author}</p>
                  <p className="text-gray-700 mb-3">{content.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      {content.type}
                    </span>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mental Health Apps */}
        {resources.apps && (
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-lg">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Mental Health Apps</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.apps.map((app, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-800 mb-2">{app.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{app.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {app.features.map((feature, idx) => (
                      <span key={idx} className="block text-xs text-gray-500">• {feature}</span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{app.platform}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      app.cost === 'Free' ? 'bg-green-100 text-green-800' :
                      app.cost === 'Freemium' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.cost}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Community Resources */}
        {resources.community && (
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <Users className="w-4 h-4 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Community Support</h3>
            </div>
            
            <div className="space-y-4">
              {resources.community.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{resource.name}</h4>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                      {resource.access}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{resource.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{resource.contact}</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {resource.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Emergency Banner */}
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-red-600">⚠️</span>
          </div>
          <div>
            <p className="font-semibold text-red-800">Emergency Support</p>
            <p className="text-red-700 text-sm">
              If you're in immediate danger or crisis, please call emergency services at <strong>112</strong> or go to your nearest hospital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

