'use client';

import Link from 'next/link';
import UserMenu from '../auth/UserMenu';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <Link href="/" className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
        MoodMate
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}