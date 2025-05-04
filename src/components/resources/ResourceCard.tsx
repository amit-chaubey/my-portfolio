import React from 'react';
import Link from 'next/link';

export interface ResourceProps {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  tags: string[];
  link: string;
}

const ResourceCard: React.FC<ResourceProps> = ({
  title,
  description,
  difficulty,
  estimatedTime,
  tags,
  link,
}) => {
  // Map difficulty to color
  const difficultyColor = {
    'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Advanced': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }[difficulty];

  return (
    <Link href={link}>
      <div className="border rounded-lg p-6 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 transition-all duration-200 bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-blue-900/40">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex space-x-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColor}`}>
              {difficulty}
            </span>
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium dark:bg-blue-900 dark:text-blue-200">
              {estimatedTime}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResourceCard; 