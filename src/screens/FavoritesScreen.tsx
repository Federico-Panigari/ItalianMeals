import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Image, ActivityIndicator, StyleSheet , useWindowDimensions} from "react-native";
import { fetchItalianMeals } from "../services/mealsApi";
import { MealsListState } from "../types/meal";
import { useFavorites } from "../context/FavoriteContext";
import { PrimaryButton } from "../components/PrimaryButton";
import { FavoriteButton } from "../components/FavoriteButton";
import { createSharedStyles } from "../theme/styles";
import { spacing } from "../theme/colors";
import { useTheme } from "../context/ThemeContext";


export function FavoritesScreen({ navigation }: any) {

  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const isWide = width >= 600; 
  const shared = createSharedStyles(theme);

  const c = theme.colors;

  const localStyles = StyleSheet.create({
    loadingText: { marginTop: spacing.sm, color: c.textMuted },
    emptyText: { color: c.text, textAlign: "center", fontSize: 15 },
    errorText: { color: c.error, marginBottom: spacing.sm, textAlign: "center" },
    retryButton: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderWidth: 1, borderRadius: 8, backgroundColor: c.surface, borderColor: c.border },
    retryText: { fontWeight: "600", color: c.text },
    columnWrapper: { gap: spacing.sm },
  });


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
          <ActivityIndicator size="large" color={c.primary} />
          <Text style={localStyles.loadingText}>Caricamento preferiti...</Text>
        </View>
    );
  }

  if (state.status === "error") {
    return (
      <View style={shared.center}>
        <Text style={localStyles.errorText}>{state.message}</Text>
        <Pressable style={localStyles.retryButton} onPress={loadMeals} accessibilityLabel="Riprova a caricare i piatti" accessibilityRole="button">
          <Text style={localStyles.retryText}>Retry</Text>
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
          <Text style={shared.emptyText}>
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
        columnWrapperStyle={isWide ? localStyles.columnWrapper : undefined}
        contentContainerStyle={shared.flatListContent}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [isWide ? shared.listItemWide : shared.listItem, pressed && shared.listItemPressed]}
            onPress={() => navigation.navigate("MealDetail", { idMeal: item.idMeal })}
            accessibilityLabel={`Apri dettaglio di ${item.strMeal}`}
            accessibilityRole="button"
          >
            <Image source={{ uri: item.strMealThumb }} 
            style={isWide ? shared.thumbWide : shared.thumb} 
            />
            <Text style={isWide ? shared.listTitleWide : shared.listTitle}  numberOfLines={2} allowFontScaling maxFontSizeMultiplier={1.4}>{item.strMeal}</Text>
            <FavoriteButton idMeal={item.idMeal} />
          </Pressable>
        )}
      />
    </View>
  );
}

