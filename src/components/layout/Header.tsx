'use client';
import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';
import Search from '@/components/Search';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Amit Chaubey</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/posts" className="text-base font-medium hover:text-foreground/80">
            Posts
          </Link>
          <Link href="/tags" className="text-base font-medium hover:text-foreground/80">
            Tags
          </Link>
          <Link href="/about" className="text-base font-medium hover:text-foreground/80">
            About Me
          </Link>
          <Link href="/resources" className="text-base font-medium hover:text-foreground/80">
            Resources
          </Link>
          <Link href="/hub" className="text-base font-medium hover:text-foreground/80">
            Research Hub
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open mobile menu"
          onClick={() => setMobileNavOpen(true)}
        >
          <FiMenu className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-4">
          <Search />
          <ModeToggle />
        </div>
      </div>
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 dark:bg-gray-900/95 flex flex-col items-center justify-center transition-all">
          <button
            className="absolute top-6 right-6 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close mobile menu"
            onClick={() => setMobileNavOpen(false)}
          >
            <FiX className="w-8 h-8" />
          </button>
          <nav className="flex flex-col gap-8 text-2xl font-semibold">
            <Link href="/posts" onClick={() => setMobileNavOpen(false)} className="hover:text-blue-600">Posts</Link>
            <Link href="/tags" onClick={() => setMobileNavOpen(false)} className="hover:text-blue-600">Tags</Link>
            <Link href="/about" onClick={() => setMobileNavOpen(false)} className="hover:text-blue-600">About Me</Link>
            <Link href="/resources" onClick={() => setMobileNavOpen(false)} className="hover:text-blue-600">Resources</Link>
            <Link href="/hub" onClick={() => setMobileNavOpen(false)} className="hover:text-blue-600">Research Hub</Link>
          </nav>
        </div>
      )}
    </header>
  );
}