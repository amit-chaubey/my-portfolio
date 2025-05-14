'use client';
import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';
import Search from '@/components/Search';
import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileNavOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setMobileNavOpen(false);
      }
    }
    if (mobileNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileNavOpen]);

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Amit Choubey</span>
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
          ref={menuButtonRef}
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open mobile menu"
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          {mobileNavOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>

        <div className="flex items-center space-x-4">
          <Search />
          <ModeToggle />
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      {mobileNavOpen && (
        <div
          ref={menuRef}
          className="absolute left-1/2 -translate-x-1/2 top-16 w-11/12 max-w-xs bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 py-3 z-50 animate-slideDown max-h-[70vh] overflow-y-auto px-2"
        >
          <nav className="flex flex-col gap-1 text-base font-semibold text-black dark:text-white">
            {[
              { href: '/posts', label: 'Posts' },
              { href: '/tags', label: 'Tags' },
              { href: '/about', label: 'About Me' },
              { href: '/resources', label: 'Resources' },
              { href: '/hub', label: 'Research Hub' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className={`py-3 rounded-lg text-center transition-colors duration-150 ${pathname === link.href ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// Add animation to globals.css or tailwind config:
// .animate-slideDown { animation: slideDown 0.3s cubic-bezier(0.4,0,0.2,1); }
// @keyframes slideDown { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }