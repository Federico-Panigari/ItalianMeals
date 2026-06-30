import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MealsListScreen } from "../screens/MealsListScreen";
import { MealDetailScreen } from "../screens/MealDetailScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { LoginScreen } from "../screens/LoginScreen";
import * as Linking from "expo-linking";


const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [Linking.createURL("/"), "italianmeals://"],
  config: {
    screens: {
      MealsList: "home",
      MealDetail: "meal/:idMeal",
      Favorites: "favorites",
    },
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MealsList"
          component={MealsListScreen}
          options={{ title: "Piatti italiani" }}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetailScreen}
          options={{ title: "Dettaglio piatto" }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: "Piatti preferiti" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}