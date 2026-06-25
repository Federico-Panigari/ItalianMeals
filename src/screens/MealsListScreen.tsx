import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Image, ActivityIndicator, StyleSheet } from "react-native";
import { fetchItalianMeals } from "../services/mealsApi";
import { MealsListState } from "../types/meal";
import {loadFavoriteIds, saveFavoriteIds} from "../services/storage";
import {FavoriteButton} from "../components/FavoriteButton";



export function MealsListScreen({ navigation }: any) {
  const [state, setState] = useState<MealsListState>({
    status: "idle",
    items: [],
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  async function loadMeals() {
    setState({ status: "loading", items: [] });
    try {
      const data = await fetchItalianMeals();
      if (data.length === 0) {
        setState({ status: "empty", items: [] });
      } else {
        setState({ status: "success", items: data });
      }
    } catch (err) {
      setState({
        status: "error",
        items: [],
        message: "Caricamento fallito. Controlla la connessione.",
      });
    }
  }

  async function toggleFavorite(idMeal: string) {
    const updated = favoriteIds.includes(idMeal)? favoriteIds.filter((id) => id !== idMeal) : [...favoriteIds, idMeal];
    setFavoriteIds(updated);
    await saveFavoriteIds(updated);
  }

  useEffect(() => {
    loadMeals();
    loadFavoriteIds().then(setFavoriteIds);
  }, []);

  if (state.status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Caricamento piatti italiani...</Text>
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

  if (state.status === "empty") {
    return (
      <View style={styles.center}>
        <Text>Nessun piatto italiano disponibile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Piatti italiani</Text>
       <Text style={styles.favCount}>Piatti preferiti: {favoriteIds.length}</Text>
      <FlatList
        data={state.items}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => navigation.navigate("MealDetail", { idMeal: item.idMeal })}
            accessibilityLabel={`Apri dettaglio di ${item.strMeal}`}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.thumb} />
            <Text style={styles.mealName}>{item.strMeal}</Text>
            <FavoriteButton
              idMeal={item.idMeal}
              isFavorite={favoriteIds.includes(item.idMeal)}
              onToggle={toggleFavorite}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 ,backgroundColor: "#d13c3c"},
  
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 , color: "#09ff00"},
  
  favCount: { fontSize: 14, color: "#ffffff", marginBottom: 12 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 , backgroundColor: "#d13c3c"},
  
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    gap: 12,
  },
  thumb: { width: 48, height: 48, borderRadius: 8 },
  mealName: { fontSize: 15, fontWeight: "600" , flex: 1 },
  loadingText: { marginTop: 12, color: "#666" },
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