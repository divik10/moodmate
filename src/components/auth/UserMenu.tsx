'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Link 
        href="/login" 
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 focus:outline-none">
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt="User profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
            {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
          </div>
        )}
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-800 dark:text-white">
            {session.user?.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {session.user?.email}
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}