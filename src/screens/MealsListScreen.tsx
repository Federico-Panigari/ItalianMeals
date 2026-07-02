import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Image, ActivityIndicator, StyleSheet , useWindowDimensions} from "react-native";
import { fetchItalianMeals } from "../services/mealsApi";
import { MealsListState } from "../types/meal";
import {FavoriteButton} from "../components/FavoriteButton";
import { useFavorites } from "../context/FavoriteContext";
import { PrimaryButton } from "../components/PrimaryButton";
import { createSharedStyles } from "../theme/styles";
import { spacing, colors } from "../theme/colors";
import { Avatar } from "../components/Avatar";
import { useAuth } from "../context/AuthContext";


export function MealsListScreen({ navigation }: any) {

  const { width } = useWindowDimensions();
  const isWide = width >= 600; 
  const shared = createSharedStyles();
  const { user } = useAuth();

  const [state, setState] = useState<MealsListState>({
    status: "idle",
    items: [],
  });

  const { favoriteIds } = useFavorites();

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


  useEffect(() => {
    loadMeals();
  }, []);

  if (state.status === "loading") {
    return (
      <View style={shared.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Caricamento piatti italiani...</Text>
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

  if (state.status === "empty") {
    return (
      <View style={shared.center}>
        <Text style={styles.emptyText}>Nessun piatto italiano disponibile</Text>
      </View>
    );
  }

  return (
    <View style={shared.screen}>
      <View style={styles.headerRow}>
        <Text style={shared.title}>Piatti italiani</Text>
        {user && (
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            accessibilityLabel="Vai al profilo"
          >
            <Avatar uri={user.avatarUri} size={36} />
          </Pressable>
        )}
      </View>
      <View style={shared.tabsRow}>
        <PrimaryButton label="Lista" onPress={() => {}} />
        <PrimaryButton
          label={`Preferiti (${favoriteIds.length})`}
          onPress={() => navigation.navigate("Favorites")}
        />
      </View>
      <FlatList
        key={isWide ? "wide" : "narrow"}
        data={state.items}
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
            <Image source={{ uri: item.strMealThumb }} style={isWide ? shared.thumbWide : shared.thumb} />
            <Text style={isWide ? shared.listTitleWide : shared.listTitle} numberOfLines={2}>
              {item.strMeal}
            </Text>
            <FavoriteButton
              idMeal={item.idMeal}
            />
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
   headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
});