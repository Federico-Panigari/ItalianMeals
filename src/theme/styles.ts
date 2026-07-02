import { StyleSheet } from "react-native";
import { colors, spacing } from "./colors";

export function createSharedStyles() {
  return StyleSheet.create({
    // Layout base
    screen: {
      flex: 1,
      backgroundColor: colors.primaryLight,
      padding: spacing.md,
    },
    screenDark: {
      flex: 1,
      backgroundColor: colors.primary,
      padding: spacing.md,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.md,
      backgroundColor: colors.primaryLight,
    },
    centerDark: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.md,
      backgroundColor: colors.primary,
    },

    // Liste
    flatListContent: {
      paddingBottom: spacing.lg,
      gap: spacing.sm,
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      gap: spacing.sm,
    },
    listItemWide: {
      flex: 1,
      flexDirection: "column",
      alignItems: "flex-start",
      padding: spacing.sm,
      margin: spacing.xs,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      gap: spacing.xs,
      backgroundColor: colors.card,
    },

    // Testi
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.textPrimary,
      marginBottom: spacing.sm,
    },
    listTitle: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.black,
      flex: 1,
    },
    listTitleWide: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.black,
      flexShrink: 1,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: spacing.sm,
    },

    // Riga orizzontale
    rowCenter: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    rowSpaceBetween: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.sm,
    },

    // Immagini
    thumb: {
      width: 48,
      height: 48,
      borderRadius: 8,
    },
    thumbWide: {
      width: "100%",
      height: 120,
      borderRadius: 8,
    },

    // Tab buttons row
    tabsRow: {
      flexDirection: "row",
      gap: spacing.sm,
      marginBottom: spacing.md,
    },

    // Contatore preferiti
    favCount: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: spacing.sm,
    },
    // Avatar
    avatarContainer: {
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.avatarBorder,
      backgroundColor: colors.avatarBackground,
    },

    // Profile
    profileCard: {
      backgroundColor: colors.profileCard,
      borderRadius: 16,
      padding: spacing.lg,
      alignItems: "center",
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    profileName: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.primary,
      textAlign: "center",
    },
    profileEmail: {
      fontSize: 14,
      color: colors.primary,
      textAlign: "center",
    },

    // Header icona profilo
    headerRight: {
      paddingRight: spacing.sm,
    },
  });
}