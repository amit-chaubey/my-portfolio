'use client';
import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';
import Search from '@/components/Search';

export default function Header() {
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
        </nav>

        <div className="flex items-center space-x-4">
          <Search />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}