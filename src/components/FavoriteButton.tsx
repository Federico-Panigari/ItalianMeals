import { Pressable, Text, StyleSheet } from "react-native";

interface FavoriteButtonProps {
  idMeal: string;
  isFavorite: boolean;
  onToggle: (idMeal: string) => void;
}

export function FavoriteButton({ idMeal, isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => onToggle(idMeal)}
      accessibilityLabel={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    >
      <Text style={styles.icon}>{isFavorite ? "♥" : "♡"}</Text>
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