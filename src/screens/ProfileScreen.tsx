import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Avatar } from "../components/Avatar";
import { createSharedStyles } from "../theme/styles";
import { colors, spacing } from "../theme/colors";

export function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const shared = createSharedStyles();

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

      <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
        accessibilityLabel="Esci dall'account"
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.white,
  },
  logoutText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
});