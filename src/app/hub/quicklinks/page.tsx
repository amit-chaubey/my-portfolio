'use client';

import { useState, useEffect, useMemo } from 'react';
import { FiExternalLink, FiSearch, FiFilter, FiGithub, FiBookOpen, FiCode, FiDatabase, FiPenTool, FiLink } from 'react-icons/fi';

interface QuickLink {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  iconName: 'FiPenTool' | 'FiDatabase' | 'FiCode' | 'FiGithub' | 'FiBookOpen';
}

const quickLinks: QuickLink[] = [
  {
    id: '1',
    title: 'Hugging Face',
    description: 'The AI community building the future. Discover, build and deploy ML models.',
    url: 'https://huggingface.co/',
    category: 'AI/ML',
    iconName: 'FiPenTool'
  },
  {
    id: '2',
    title: 'Kubernetes Documentation',
    description: 'Production-Grade Container Orchestration',
    url: 'https://kubernetes.io/docs/home/',
    category: 'DevOps',
    iconName: 'FiDatabase'
  },
  {
    id: '3',
    title: 'React Documentation',
    description: 'The library for web and native user interfaces',
    url: 'https://react.dev/',
    category: 'Frontend',
    iconName: 'FiCode'
  },
  {
    id: '4',
    title: 'Next.js Documentation',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org/docs',
    category: 'Frontend',
    iconName: 'FiCode'
  },
  {
    id: '5',
    title: 'LangChain',
    description: 'Framework for developing applications powered by language models',
    url: 'https://www.langchain.com/',
    category: 'AI/ML',
    iconName: 'FiPenTool'
  },
  {
    id: '6',
    title: 'GitHub',
    description: 'Where the world builds software',
    url: 'https://github.com/',
    category: 'Development',
    iconName: 'FiGithub'
  },
  {
    id: '7',
    title: 'Vellum LLM Leaderboard',
    description: 'Latest public benchmark performance for SOTA LLMs. Compare top models and benchmarks.',
    url: 'https://www.vellum.ai/llm-leaderboard',
    category: 'AI/ML',
    iconName: 'FiBookOpen'
  },
  {
    id: '8',
    title: 'RunPod',
    description: 'Train, fine-tune, and deploy AI models in the cloud. Affordable GPU compute for ML workloads.',
    url: 'https://www.runpod.io/',
    category: 'AI/ML',
    iconName: 'FiDatabase'
  },
  {
    id: '9',
    title: 'CSRankings',
    description: 'Metrics-based ranking of top computer science institutions worldwide. Use this to research and compare universities for CS research and grad school.',
    url: 'https://csrankings.org/#/index?all&uk',
    category: 'AI/ML',
    iconName: 'FiBookOpen'
  },
  {
    id: '10',
    title: 'Git Flow Like a Pro',
    description: 'A comprehensive guide to mastering Git flow and professional GitHub collaboration. Learn best practices for branching, merging, and team workflows.',
    url: 'https://pointed-name-caa.notion.site/Git-flow-like-a-pro-1a50e3a0a902803aacf4dba6225b33d5',
    category: 'Development',
    iconName: 'FiGithub'
  },
];

const categories = ['All', 'AI/ML', 'DevOps', 'Frontend', 'Development'];

// Function to get the icon component based on the name
const getIconComponent = (iconName: QuickLink['iconName']) => {
  switch (iconName) {
    case 'FiPenTool':
      return <FiPenTool className="w-5 h-5" />;
    case 'FiDatabase':
      return <FiDatabase className="w-5 h-5" />;
    case 'FiCode':
      return <FiCode className="w-5 h-5" />;
    case 'FiGithub':
      return <FiGithub className="w-5 h-5" />;
    case 'FiBookOpen':
      return <FiBookOpen className="w-5 h-5" />;
    default:
      return <FiLink className="w-5 h-5" />;
  }
};

export default function QuickLinksPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearching, setIsSearching] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounce search query
  useEffect(() => {
    if (!mounted) return;
    
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setIsSearching(false);
    }, 300);

    return () => {
      clearTimeout(timer);
      setIsSearching(false);
    };
  }, [searchQuery, mounted]);

  // Memoize filtered results
  const filteredLinks = useMemo(() => {
    if (!mounted) return quickLinks;

    const searchTerms = debouncedSearch.toLowerCase().split(' ').filter(Boolean);
    
    return quickLinks.filter(link => {
      // If no search terms and no category filter, show all
      if (searchTerms.length === 0 && selectedCategory === 'All') {
        return true;
      }

      // Check if all search terms match any field
      const matchesSearch = searchTerms.length === 0 || searchTerms.every(term =>
        link.title.toLowerCase().includes(term) ||
        link.description.toLowerCase().includes(term) ||
        link.category.toLowerCase().includes(term)
      );
      
      // Check category filter
      const matchesCategory = selectedCategory === 'All' || link.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, selectedCategory, mounted]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  // Handle hydration mismatch
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">Essential resources, tools, and references for developers</p>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isSearching ? 'text-blue-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search by title, description, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
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
      </div>

      {/* Search Status */}
      {(searchQuery || selectedCategory !== 'All') && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredLinks.length} result{filteredLinks.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
          {searchQuery ? ` for "${searchQuery}"` : ''}
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={handleClearSearch}
              className="ml-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Links Grid */}
      {filteredLinks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLinks.map(link => (
            <div
              key={link.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 dark:hover:shadow-blue-900/40 transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                    {getIconComponent(link.iconName)}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {link.title}
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 min-h-[60px]">
                  {link.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {link.category}
                  </span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    <FiExternalLink />
                    Visit
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No links found matching your search criteria.
            {(searchQuery || selectedCategory !== 'All') && (
              <span className="block mt-2">
                Try adjusting your search terms or filters.
                <button
                  onClick={handleClearSearch}
                  className="ml-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Clear all filters
                </button>
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
} 