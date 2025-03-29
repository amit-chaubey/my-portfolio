'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  // Protect against hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (!mounted) {
    // Return a placeholder during server rendering
    return (
      <div className="relative w-64">
        <div className="w-full px-4 py-2 text-sm border rounded-md">
          Search...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSearch} className="relative w-64">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
        suppressHydrationWarning
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        aria-label="Search"
      >
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
} 