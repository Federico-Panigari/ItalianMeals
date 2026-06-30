import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Image, ActivityIndicator, StyleSheet } from "react-native";
import { fetchItalianMeals } from "../services/mealsApi";
import { MealsListState } from "../types/meal";
import { FavoriteButton } from "../components/FavoriteButton";
import { useFavorites } from "../context/FavoriteContext";
import { PrimaryButton } from "../components/PrimaryButton";

export function FavoritesScreen({ navigation }: any) {
  const [state, setState] = useState<MealsListState>({
    status: "idle",
    items: [],
  });
  const { favoriteIds, isLoading } = useFavorites();

  async function loadMeals() {
    setState({ status: "loading", items: [] });
    try {
      const data = await fetchItalianMeals();
      setState({ status: "success", items: data });
    } catch (err) {
      setState({
        status: "error",
        items: [],
        message: "Caricamento fallito. Controlla la connessione.",
      });
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  if (state.status === "loading" || isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Caricamento preferiti...</Text>
      </View>
    );
  }

  if (state.status === "error") {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{state.message}</Text>
        <Pressable
          style={styles.retryButton}
          onPress={loadMeals}
          accessibilityLabel="Riprova a caricare i piatti"
        >
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const favoriteMeals = state.items.filter((meal) => favoriteIds.includes(meal.idMeal));

 if (favoriteMeals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>I tuoi preferiti</Text>
        <View style={styles.tabsRow}>
          <PrimaryButton label="Lista" onPress={() => navigation.navigate("MealsList")} />
          <PrimaryButton label={`Preferiti (${favoriteIds.length})`} onPress={() => {}} />
        </View>
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            Nessun preferito ancora. Tocca ♡ su un piatto dalla lista.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I tuoi preferiti</Text>
       <View style={styles.tabsRow}>
        <PrimaryButton label="Lista" onPress={() => navigation.navigate("MealsList")} />
        <PrimaryButton label={`Preferiti (${favoriteIds.length})`} onPress={() => {}} />
      </View>
      <FlatList
        data={favoriteMeals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => navigation.navigate("MealDetail", { idMeal: item.idMeal })}
            accessibilityLabel={`Apri dettaglio di ${item.strMeal}`}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.thumb} />
            <Text style={styles.mealName}>{item.strMeal}</Text>
            <FavoriteButton idMeal={item.idMeal} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#d13c3c" },
  tabsRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12, color: "#ffffff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16, backgroundColor: "#d13c3c" },
  emptyText: { color: "#fff", textAlign: "center", fontSize: 15 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    gap: 12,
  },
  thumb: { width: 48, height: 48, borderRadius: 8 },
  mealName: { fontSize: 15, fontWeight: "600", flex: 1 },
  loadingText: { marginTop: 12, color: "#fff" },
  errorText: { color: "red", marginBottom: 12, textAlign: "center" },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  retryText: { fontWeight: "600" },
});