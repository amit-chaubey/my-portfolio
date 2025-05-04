'use client';

import { useState } from 'react';
import { FiExternalLink, FiSearch, FiFilter, FiCode, FiPieChart, FiCpu, FiDatabase, FiActivity, FiLink } from 'react-icons/fi';

interface InteractiveTutorial {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  iconName: 'FiCpu' | 'FiDatabase' | 'FiPieChart' | 'FiCode' | 'FiActivity';
}

const tutorials: InteractiveTutorial[] = [
  {
    id: '1',
    title: 'Interactive Machine Learning Algorithms',
    description: 'Visualize and interact with various ML algorithms to understand their inner workings.',
    url: 'https://distill.pub/',
    category: 'Machine Learning',
    difficulty: 'Intermediate',
    iconName: 'FiCpu'
  },
  {
    id: '2',
    title: 'SQL Learning Lab',
    description: 'Practice SQL queries with interactive challenges and real-time feedback.',
    url: 'https://sqlbolt.com/',
    category: 'Databases',
    difficulty: 'Beginner',
    iconName: 'FiDatabase'
  },
  {
    id: '3',
    title: 'D3.js Interactive Data Visualization',
    description: 'Learn to create interactive data visualizations with step-by-step tutorials.',
    url: 'https://observablehq.com/@d3/learn-d3',
    category: 'Data Visualization',
    difficulty: 'Intermediate',
    iconName: 'FiPieChart'
  },
  {
    id: '4',
    title: 'React Hooks Explorer',
    description: 'Interactive playground for experimenting with React Hooks in real-time.',
    url: 'https://codesandbox.io/s/react-hooks',
    category: 'Web Development',
    difficulty: 'Intermediate',
    iconName: 'FiCode'
  },
  {
    id: '5',
    title: 'Neural Network Visualization',
    description: 'Interactive visualization of neural networks to understand training and predictions.',
    url: 'https://playground.tensorflow.org/',
    category: 'Machine Learning',
    difficulty: 'Beginner',
    iconName: 'FiActivity'
  }
];

const categories = ['All', 'Machine Learning', 'Web Development', 'Data Visualization', 'Databases'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

// Function to get the icon component based on the name
const getIconComponent = (iconName: InteractiveTutorial['iconName']) => {
  switch (iconName) {
    case 'FiCpu':
      return <FiCpu className="w-5 h-5" />;
    case 'FiDatabase':
      return <FiDatabase className="w-5 h-5" />;
    case 'FiPieChart':
      return <FiPieChart className="w-5 h-5" />;
    case 'FiCode':
      return <FiCode className="w-5 h-5" />;
    case 'FiActivity':
      return <FiActivity className="w-5 h-5" />;
    default:
      return <FiLink className="w-5 h-5" />;
  }
};

export default function InteractivePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || tutorial.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Interactive Learning</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">Hands-on tutorials and visualizations for effective learning</p>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="relative">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="pl-4 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTutorials.map(tutorial => (
          <div
            key={tutorial.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 dark:hover:shadow-blue-900/40 transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                  {getIconComponent(tutorial.iconName)}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {tutorial.title}
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {tutorial.description}
              </p>
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {tutorial.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm 
                    ${tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                    ${tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                    ${tutorial.difficulty === 'Advanced' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                  `}>
                    {tutorial.difficulty}
                  </span>
                </div>
                <a
                  href={tutorial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <FiExternalLink />
                  Start Learning
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 