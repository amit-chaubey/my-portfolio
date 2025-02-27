'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  // This is a mock search result - you can replace with real search logic
  const searchResults = [
    {
      title: "Neural Networks Explained",
      description: "Understanding the architecture and training of neural networks",
      link: "/resources/machine-learning/neural-networks"
    },
    {
      title: "Introduction to Machine Learning",
      description: "Learn the basics of machine learning algorithms and concepts",
      link: "/resources/machine-learning/intro"
    },
    {
      title: "NLP Applications",
      description: "Building real-world natural language processing solutions",
      link: "/resources/machine-learning/nlp-applications"
    }
  ].filter(result => 
    result.title.toLowerCase().includes(query?.toLowerCase() || '') ||
    result.description.toLowerCase().includes(query?.toLowerCase() || '')
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Results for: {query}</h1>
      {searchResults.length > 0 ? (
        <div className="space-y-6">
          {searchResults.map((result, index) => (
            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <Link href={result.link} className="block">
                <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{result.description}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No results found for "{query}"</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
} 