import { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  name: string | null;
  login: (name: string, token: string, isAdmin: boolean) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('name');
    const adminFlag = localStorage.getItem('isAdmin') === 'true';

    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(adminFlag);
      setName(storedName);
    }
  }, []);

  const login = (name: string, token: string, isAdmin: boolean) => {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('isAdmin', String(isAdmin));
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
    setName(name);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setName(null);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, isAdmin, name, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser måste användas inom UserProvider');
  }
  return ctx;
};
