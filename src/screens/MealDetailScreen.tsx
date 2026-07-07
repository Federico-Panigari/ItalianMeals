import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { fetchMealById } from "../services/mealsApi";
import { MealDetailState } from "../types/meal";
import { FavoriteButton } from "../components/FavoriteButton";
import { createSharedStyles } from "../theme/styles";
import { useTheme } from "../context/ThemeContext";


export function MealDetailScreen({ route ,navigation}: any) {
  const idMeal = route.params?.idMeal;
  const { theme } = useTheme();
  const shared = createSharedStyles(theme);

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

  if (state.status === "idle") {
    return (
      <View style={shared.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (state.status === "loading") {
    return (
      <View style={shared.center}>
        <ActivityIndicator size="large" />
        <Text style={shared.loadingText}>Caricamento ricetta...</Text>
      </View>
    );
  }

  if (state.status === "error") {
    return (
      <View style={shared.center}>
        <Text style={shared.errorText}>{state.message}</Text>
        <Pressable
          style={shared.retryButton}
          onPress={loadMeal}
          accessibilityLabel="Riprova a caricare la ricetta"
        >
          <Text style={shared.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (state.status === "empty") {
    return (
      <View style={shared.center}>
        <Text>Piatto non trovato</Text>
      </View>
    );
  }

  const meal = state.data!;

  return (
    <ScrollView style={shared.container}>
      <Image source={{ uri: meal.strMealThumb }} style={shared.image} />
      <View style={shared.titleRow}>
        <Text style={shared.title}>{meal.strMeal}</Text>
        <FavoriteButton
          idMeal={meal.idMeal}
        />
      </View>
      <Text style={shared.category}>
        {meal.strCategory} · {meal.strArea}
      </Text>
      <Text style={shared.sectionTitle}>Istruzioni</Text>
      <Text style={shared.instructions}>{meal.strInstructions}</Text>
      <Pressable
        style={shared.backButton}
        onPress={() => navigation.goBack()}
        accessibilityLabel="Torna alla lista dei piatti"
      >
        <Text style={shared.backButtonText}>← Torna indietro</Text>
      </Pressable>
    </ScrollView>
  );
}

