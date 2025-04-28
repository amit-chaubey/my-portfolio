'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

interface SearchResult {
  title: string;
  description: string;
  link: string;
  type: 'post' | 'resource' | 'about' | 'project';
  tags?: string[];
}

// Define all searchable content
const staticContent: SearchResult[] = [
  // About section
  {
    title: "About Me",
    description: "Software Engineer specializing in AI/ML integration, full-stack development, and cloud architecture. MSc in Advanced Computer Science from the University of Leicester.",
    link: "/about",
    type: "about"
  },
  // Resources
  {
    title: "Neural Networks Explained",
    description: "Understanding the architecture and training of neural networks",
    link: "/resources/machine-learning/neural-networks",
    type: "resource",
    tags: ["ML", "Neural Networks", "AI"]
  },
  {
    title: "Introduction to Machine Learning",
    description: "Learn the basics of machine learning algorithms and concepts",
    link: "/resources/machine-learning/intro",
    type: "resource",
    tags: ["ML", "AI", "Fundamentals"]
  },
  {
    title: "NLP Applications",
    description: "Building real-world natural language processing solutions",
    link: "/resources/machine-learning/nlp-applications",
    type: "resource",
    tags: ["NLP", "ML", "AI"]
  },
  // Projects
  {
    title: "Modern Todo App",
    description: "A modern, responsive Todo application showcasing React best practices, state management, and clean UI design.",
    link: "/projects/todo-app",
    type: "project",
    tags: ["React", "TypeScript", "Frontend"]
  },
  {
    title: "Movie Recommendation System",
    description: "AI-powered movie recommendation system using collaborative filtering and content-based approaches.",
    link: "/projects/movie-recommender",
    type: "project",
    tags: ["AI", "ML", "Python"]
  }
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      setLoading(true);
      try {
        // Get all blog posts
        const posts = await getAllPosts();
        const blogResults: SearchResult[] = posts
          .filter(post => post.excerpt) // Only include posts with excerpts
          .map(post => ({
            title: post.title,
            description: post.excerpt || 'No description available', // Provide fallback
            link: `/posts/${post.slug}`,
            type: 'post' as const,
            tags: post.tags
          }));

        // Combine all searchable content
        const allContent = [...staticContent, ...blogResults];

        // Perform search
        const searchQuery = query?.toLowerCase() || '';
        const searchTerms = searchQuery.split(' ').filter(Boolean);
        
        const filtered = searchTerms.length === 0 ? [] : allContent.filter(item => {
          const searchableText = `${item.title} ${item.description} ${item.tags?.join(' ') || ''}`.toLowerCase();
          return searchTerms.every(term => searchableText.includes(term));
        });

        setResults(filtered);
      } catch (error) {
        console.error('Error performing search:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [query]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Results for: {query}</h1>
      {results.length > 0 ? (
        <div className="space-y-6">
          {results.map((result, index) => (
            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <Link href={result.link} className="block">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold">{result.title}</h2>
                  <span className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {result.type}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{result.description}</p>
                {result.tags && result.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">No results found for "{query}"</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try searching with different keywords or check your spelling
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
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