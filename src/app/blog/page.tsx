"use client";
import { useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { getAllPosts } from '@/lib/posts';

// Fetch posts at build time (for demo; in real app, use API or props)
let initialPosts: any[] = [];
(async () => { initialPosts = await getAllPosts(); })();

export default function BlogPage() {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest' | 'alpha'>('latest');
  const [posts, setPosts] = useState(initialPosts);

  // Sort posts based on sortOrder
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOrder === 'alpha') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      {/* Sort Dropdown */}
      <div className="mb-6 flex items-center gap-2">
        <label htmlFor="sort" className="text-sm font-medium">Sort by:</label>
        <select
          id="sort"
          name="sort"
          className="border rounded px-2 py-1 text-sm"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value as any)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="alpha">Alphabetical</option>
        </select>
      </div>
      <div className="space-y-8">
        {sortedPosts.map((post) => (
          <article key={post.slug} className="space-y-2">
            <h2 className="text-2xl font-bold">
              <Link 
                href={`/posts/${post.slug}`}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {post.title}
              </Link>
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {formatDate(typeof post.date === 'string' ? post.date : post.date.toISOString())}
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {post.excerpt}
            </p>
            <div className="flex gap-2">
              {(post.tags || []).map((tag: string) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 