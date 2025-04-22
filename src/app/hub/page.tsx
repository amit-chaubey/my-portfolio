'use client';

import { useState } from 'react';
import { FiBook, FiLink, FiZap } from 'react-icons/fi';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const categories: Category[] = [
  {
    id: 'papers',
    title: 'Research Papers',
    description: 'Curated collection of ML/AI research papers with summaries and insights',
    icon: <FiBook className="w-6 h-6" />,
    color: 'from-purple-500 to-blue-500'
  },
  {
    id: 'quicklinks',
    title: 'Quick Links',
    description: 'Essential resources, tools, and references for developers',
    icon: <FiLink className="w-6 h-6" />,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'interactive',
    title: 'Interactive Learning',
    description: 'Hands-on tutorials, visualizations, and learning tools',
    icon: <FiZap className="w-6 h-6" />,
    color: 'from-orange-500 to-pink-500'
  }
];

export default function HubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Learning Hub
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Discover, learn, and grow with our curated collection of resources
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative group hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
          >
            <a
              href={`/hub/${category.id}`}
              className="block h-full"
            >
              <div className="h-full rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`h-32 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <div className="text-white group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 