import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";

interface FavoritesContextValue {
  favoriteIds: string[];
  toggleFavorite: (idMeal: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    loadFavoriteIds().then(setFavoriteIds);
  }, []);

  async function toggleFavorite(idMeal: string) {
    const updated = favoriteIds.includes(idMeal)
      ? favoriteIds.filter((id) => id !== idMeal)
      : [...favoriteIds, idMeal];
    setFavoriteIds(updated);
    await saveFavoriteIds(updated);
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
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