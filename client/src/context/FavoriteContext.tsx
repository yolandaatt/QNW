import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '@/api/axios';
import { useUser } from '@/context/UserContext';

interface FavoriteProduct {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string;
}

interface Favorite {
  _id: string;
  productId: FavoriteProduct;
}

interface FavoriteContextType {
  favorites: Favorite[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => Promise<void>;
  loading: boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useUser();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setFavorites([]);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const res = await api.get('/favorites');
        setFavorites(res.data);
      } catch {
        console.error('Kunde inte hämta favoriter');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isLoggedIn]);

  const isFavorite = (productId: string) => {
    return favorites.some((f) => f.productId._id === productId);
  };

  const toggleFavorite = async (productId: string) => {
    if (isFavorite(productId)) {
      await api.delete(`/favorites/${productId}`);
      setFavorites((prev) => prev.filter((f) => f.productId._id !== productId));
    } else {
      const res = await api.post('/favorites', { productId });
      setFavorites((prev) => [...prev, res.data]);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, isFavorite, toggleFavorite, loading }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error('useFavorites måste användas inom FavoriteProvider');
  return ctx;
};
