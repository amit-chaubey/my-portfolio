'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-1 rounded-lg bg-gray-200 dark:bg-gray-800"
    >
      <span className="text-sm">{theme === 'dark' ? '🌞' : '🌙'}</span>
    </button>
  );
} 