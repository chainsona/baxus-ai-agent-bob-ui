'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface UserContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);

  // Try to load user from localStorage on initial load
  useEffect(() => {
    const storedUsername = localStorage.getItem('baxus-username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem('baxus-username', username);
    } else {
      localStorage.removeItem('baxus-username');
    }
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
