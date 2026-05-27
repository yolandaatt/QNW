import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/api/axios';

interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface UserContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: Address | null;
  login: (name: string, token: string, isAdmin: boolean) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUser: (data: Partial<{ name: string; phone: string; address: Address }>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [address, setAddress] = useState<Address | null>(null);

  const refreshUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await api.get('/auth/me');

      const user = res.data;
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone ?? null);
      setAddress(user.address ?? null);
      setIsLoggedIn(true);
      setIsAdmin(user.role === 'admin');
    } catch {
      logout();
    }
  };

  const updateUser = async (data: Partial<{ name: string; phone: string; address: Address }>) => {
    const res = await api.put('/auth/me', data);

    const user = res.data;
    setName(user.name);
    setPhone(user.phone ?? null);
    setAddress(user.address ?? null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = (name: string, token: string, isAdmin: boolean) => {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('isAdmin', String(isAdmin));
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
    setName(name);
    refreshUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setName(null);
    setEmail(null);
    setPhone(null);
    setAddress(null);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        name,
        email,
        phone,
        address,
        login,
        logout,
        refreshUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser måste användas inom UserProvider');
  return ctx;
};
