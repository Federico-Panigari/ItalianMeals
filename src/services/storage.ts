import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "app:v1:favs";

export async function loadFavoriteIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (raw == null) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item === "string");
  } catch {
    return [];
  }
}

export async function saveFavoriteIds(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    // salvataggio fallito silenziosamente: l'app continua a funzionare
  }
}

export async function resetFavorites(): Promise<void> {
  await AsyncStorage.removeItem(FAVORITES_KEY);
}