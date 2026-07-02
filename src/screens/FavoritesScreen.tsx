import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Image, ActivityIndicator, StyleSheet , useWindowDimensions} from "react-native";
import { fetchItalianMeals } from "../services/mealsApi";
import { MealsListState } from "../types/meal";
import { FavoriteButton } from "../components/FavoriteButton";
import { useFavorites } from "../context/FavoriteContext";
import { PrimaryButton } from "../components/PrimaryButton";
import { createSharedStyles } from "../theme/styles";
import { spacing, colors } from "../theme/colors";


export function FavoritesScreen({ navigation }: any) {

  const { width } = useWindowDimensions();
  const isWide = width >= 600; 
  const shared = createSharedStyles();


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
      <View style={shared.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Caricamento preferiti...</Text>
      </View>
    );
  }

  if (state.status === "error") {
    return (
      <View style={shared.center}>
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
      <View style={shared.screen}>
        <Text style={shared.title}>I tuoi preferiti</Text>
        <View style={shared.tabsRow}>
          <PrimaryButton label="Lista" onPress={() => navigation.navigate("MealsList")} />
          <PrimaryButton label={`Preferiti (${favoriteIds.length})`} onPress={() => {}} />
        </View>
        <View style={shared.center}>
          <Text style={styles.emptyText}>
            Nessun preferito ancora. Tocca ♡ su un piatto dalla lista.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={shared.screen}>
      <Text style={shared.title}>I tuoi preferiti</Text>
       <View style={shared.tabsRow}>
        <PrimaryButton label="Lista" onPress={() => navigation.navigate("MealsList")} />
        <PrimaryButton label={`Preferiti (${favoriteIds.length})`} onPress={() => {}} />
      </View>
      <FlatList
        key={isWide ? "wide" : "narrow"}
        data={favoriteMeals}
        keyExtractor={(item) => item.idMeal}
        numColumns={isWide ? 2 : 1}
        columnWrapperStyle={isWide ? styles.columnWrapper : undefined}
        contentContainerStyle={shared.flatListContent}
        renderItem={({ item }) => (
          <Pressable
            style={isWide ? shared.listItemWide : shared.listItem}
            onPress={() => navigation.navigate("MealDetail", { idMeal: item.idMeal })}
            accessibilityLabel={`Apri dettaglio di ${item.strMeal}`}
          >
            <Image source={{ uri: item.strMealThumb }} 
            style={isWide ? shared.thumbWide : shared.thumb} 
            />
            <Text style={isWide ? shared.listTitleWide : shared.listTitle}  numberOfLines={2}>{item.strMeal}</Text>
            <FavoriteButton idMeal={item.idMeal} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: { marginTop: spacing.sm, color: "#666" },
  emptyText: { color: colors.white, textAlign: "center", fontSize: 15 },
  errorText: {
    color: colors.error,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  retryButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  retryText: { fontWeight: "600" },
  columnWrapper: {
    gap: spacing.sm,
  },
});