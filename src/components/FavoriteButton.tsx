import { Pressable, Text, StyleSheet } from "react-native";
import {  useFavorites } from "../context/FavoriteContext";

interface FavoriteButtonProps {
  idMeal: string;
}

export function FavoriteButton({ idMeal }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(idMeal);

  
  return (
    <Pressable
      style={styles.button}
      onPress={() => toggleFavorite(idMeal)}
      accessibilityLabel={favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    >
      <Text style={styles.icon}>{favorite ? "♥" : "♡"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  icon: {
    fontSize: 18,
    color: "red",
  },
});