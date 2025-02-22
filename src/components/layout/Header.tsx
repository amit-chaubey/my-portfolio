'use client';
import Link from 'next/link';
import ThemeToggle from '../common/ThemeToggle';

export default function Header() {
  return (
    <header className="py-4 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      <nav className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-2xl font-bold hover:underline decoration-green-500 decoration-2 transition-all"
          >
            Amit Chaubey
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/posts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Posts</Link>
            <Link href="/tags" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tags</Link>
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Me</Link>
            <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <span className="sr-only">Search</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}