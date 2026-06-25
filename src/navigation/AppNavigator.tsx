import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MealsListScreen } from "../screens/MealsListScreen";
import { MealDetailScreen } from "../screens/MealDetailScreen";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      MealsList: "home",
      MealDetail: "meal/:idMeal",
    },
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}