import React from "react";
import { View, Text, Switch, Pressable } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoriteContext";
import { useAuth } from "../context/AuthContext";
import { createSharedStyles } from "../theme/styles";

export function SettingScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const shared = createSharedStyles(theme);
  const { favoriteIds } = useFavorites();
  const { logout } = useAuth();

  return (
    <View style={shared.screen}>
      <Text style={shared.title}>Impostazioni</Text>

      <View style={shared.settingsRow}>
        <Text style={shared.settingsLabel}>Tema scuro</Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          accessibilityLabel="Attiva tema scuro"
        />
      </View>

      <View style={shared.settingsRow}>
        <Text style={shared.settingsLabel}>Preferiti</Text>
        <Text style={shared.settingsValue} accessibilityRole="text">{favoriteIds.length}</Text>
      </View>

      <View style={shared.settingsRow}>
        <Text style={shared.settingsLabel}>Account</Text>
        <Pressable onPress={logout} accessibilityRole="button" accessibilityLabel="Esci dall'account">
          <Text style={shared.settingsValue}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default SettingScreen;
