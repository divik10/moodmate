'use client';

import { useTheme } from '@/context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { JSX } from 'react';

const SunIcon = FiSun as (props: JSX.IntrinsicElements['svg']) => JSX.Element;
const MoonIcon = FiMoon as (props: JSX.IntrinsicElements['svg']) => JSX.Element;

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <SunIcon className="w-5 h-5 text-yellow-300" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
}