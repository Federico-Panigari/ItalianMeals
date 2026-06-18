import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../src/HomeScreen";
import { DetailsScreen } from "../src/DetailScreen";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [("myapp://")],
  config: {
    screens: {
      Home: "home",
      Details: "details/:id",
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Items" }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}