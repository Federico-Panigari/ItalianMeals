import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";

interface FavoritesContextValue {
  favoriteIds: string[];
  isLoading: boolean;
  isFavorite: (idMeal: string) => boolean;
  toggleFavorite: (idMeal: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavoriteIds().then(setFavoriteIds).finally(() => setIsLoading(false));
  }, []);

  function isFavorite(idMeal: string) {
    return favoriteIds.includes(idMeal);
  }

  async function toggleFavorite(idMeal: string) {
    const updated = favoriteIds.includes(idMeal)
      ? favoriteIds.filter((id) => id !== idMeal)
      : [...favoriteIds, idMeal];
    setFavoriteIds(updated);
    await saveFavoriteIds(updated);
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isLoading, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve essere usato dentro un FavoritesProvider");
  }
  return context;
}