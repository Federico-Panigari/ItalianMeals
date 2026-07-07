import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Avatar } from "../components/Avatar";
import { createSharedStyles } from "../theme/styles";
import { spacing } from "../theme/colors";
import { useTheme } from "../context/ThemeContext";

export function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const shared = createSharedStyles(theme);
  const c = theme.colors;

  const styles = makeStyles(c);

  function handleLogout() {
    logout();
    navigation.replace("Login");
  }

  if (!user) {
    return (
      <View style={shared.centerDark}>
        <Text style={shared.subtitle}>Nessun utente loggato.</Text>
      </View>
    );
  }

  return (
    <View style={shared.screenDark}>
      <View style={shared.profileCard}>
        <Avatar uri={user.avatarUri} size={96} />
        <Text style={shared.profileName}>{user.name}</Text>
        <Text style={shared.profileEmail}>{user.email}</Text>
      </View>

      <View style={{ gap: spacing.sm }}>
        <Pressable
          style={styles.settingsButton}
          onPress={() => navigation.navigate("Settings")}
          accessibilityLabel="Vai alle impostazioni"
          accessibilityRole="button"
        >
          <Text style={styles.settingsText}>Impostazioni</Text>
        </Pressable>

        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityLabel="Esci dall'account"
          accessibilityRole="button"
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

function makeStyles(c: any) {
  return StyleSheet.create({
    settingsButton: {
      backgroundColor: c.surface,
      paddingVertical: spacing.md,
      borderRadius: 8,
      alignItems: "center",
      borderWidth: 1,
      borderColor: c.border,
    },
    settingsText: {
      color: c.text,
      fontWeight: "600",
      fontSize: 16,
    },
    logoutButton: {
      backgroundColor: c.primary,
      paddingVertical: spacing.md,
      borderRadius: 8,
      alignItems: "center",
      borderWidth: 1,
      borderColor: c.white,
      marginTop: spacing.sm,
    },
    logoutText: {
      color: c.white,
      fontWeight: "700",
      fontSize: 16,
    },
  });
}

