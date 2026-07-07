import { Pressable, Text, StyleSheet } from "react-native";
import { useFavorites } from "../context/FavoriteContext";
import { useTheme } from "../context/ThemeContext";

interface FavoriteButtonProps {
  idMeal: string;
}

export function FavoriteButton({ idMeal }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(idMeal);
  const { theme } = useTheme();
  const c = theme.colors;

  const styles = makeStyles(c);

  return (
    <Pressable
      onPress={() => toggleFavorite(idMeal)}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityLabel={favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
      accessibilityRole="button"
    >
      <Text style={[styles.icon, { color: favorite ? c.primaryLight : c.text }]}>{favorite ? "♥" : "♡"}</Text>
    </Pressable>
  );
}

function makeStyles(c: any) {
  return StyleSheet.create({
    button: {
      width: 36,
      height: 36,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: c.border,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: c.card,
    },
    icon: {
      fontSize: 18,
    },
    pressed: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }],
    },
  });
}
