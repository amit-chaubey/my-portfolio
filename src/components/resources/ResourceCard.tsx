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

export function ResourceCard({ title, description, difficulty, estimatedTime, tags, link }: ResourceProps) {
  // Map difficulty to color
  const difficultyColor = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  }[difficulty];

  return (
    <Link href={link}>
      <div className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 bg-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex space-x-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColor}`}>
              {difficulty}
            </span>
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium">
              {estimatedTime}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
} 