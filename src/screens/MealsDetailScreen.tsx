import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { fetchMealById } from "../services/mealsApi";
import { MealDetailState } from "../types/meal";

export function MealDetailScreen({ route }: any) {
  const idMeal = route.params?.idMeal;

  const [state, setState] = useState<MealDetailState>({
    status: "idle",
    data: null,
  });

  async function loadMeal() {
    if (!idMeal) {
      setState({ status: "error", data: null, message: "ID piatto non valido." });
      return;
    }
    setState({ status: "loading", data: null });
    try {
      const meal = await fetchMealById(idMeal);
      if (!meal) {
        setState({ status: "empty", data: null });
      } else {
        setState({ status: "success", data: meal });
      }
    } catch (err) {
      setState({
        status: "error",
        data: null,
        message: "Caricamento fallito. Controlla la connessione.",
      });
    }
  }

  useEffect(() => {
    loadMeal();
  }, [idMeal]);

  if (state.status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Caricamento ricetta...</Text>
      </View>
    );
  }

  if (state.status === "error") {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{state.message}</Text>
        <Pressable
          style={styles.retryButton}
          onPress={loadMeal}
          accessibilityLabel="Riprova a caricare la ricetta"
        >
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (state.status === "empty") {
    return (
      <View style={styles.center}>
        <Text>Piatto non trovato</Text>
      </View>
    );
  }

  const meal = state.data!;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.category}>
        {meal.strCategory} · {meal.strArea}
      </Text>
      <Text style={styles.sectionTitle}>Istruzioni</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  image: { width: "100%", height: 220, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "700" },
  category: { color: "#666", marginTop: 4, marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 8 },
  instructions: { fontSize: 14, lineHeight: 20 },
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