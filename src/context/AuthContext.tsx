'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';

type AuthContextType = {
  user: User | null;
  status: 'authenticated' | 'unauthenticated' | 'loading';
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const userData: User = {
        id: session.user.id, // Make sure 'id' is present
        email: session.user.email ?? '', // Default to empty string if email is null/undefined
        name: session.user.name ?? '',  // Default to empty string if name is null/undefined
        image: session.user.image ?? '', // Default to empty string if image is null/undefined
      };
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ user, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
