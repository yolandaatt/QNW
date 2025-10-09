import { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  isLoggedIn: boolean;
  name: string | null;
  login: (name: string, token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if (token) {
      setIsLoggedIn(true);
      setName(name);
    }
  }, []);

  const login = (name: string, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    setIsLoggedIn(true);
    setName(name);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    setName(null);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, name, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser måste användas inom UserProvider');
  return context;
};
