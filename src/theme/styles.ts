import { StyleSheet } from "react-native";
import { AppTheme, spacing, typography, radius } from "./colors";
import {useTheme} from "../context/ThemeContext";

export function createSharedStyles(theme: AppTheme) {
  const c = theme.colors;

  return StyleSheet.create({
    // Layout base
    screen: {
      flex: 1,
      backgroundColor: c.background,
      padding: spacing.md,
    },
    screenDark: {
      flex: 1,
      backgroundColor: c.primary,
      padding: spacing.md,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.md,
      backgroundColor: c.background,
    },
    centerDark: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.md,
      backgroundColor: c.primary,
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
      borderBottomColor: c.border,
      gap: spacing.sm,
    },
    listItemWide: {
      flex: 1,
      flexDirection: "column",
      alignItems: "flex-start",
      padding: spacing.sm,
      margin: spacing.xs,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: radius.sm,
      gap: spacing.xs,
      backgroundColor: c.card,
    },
    listItemPressed: {
      opacity: 0.7,
    },

    // Testi
    title: {
      fontSize: typography.xl,
      fontWeight: "700",
      color: c.white,
      marginBottom: spacing.sm,
    },
    listTitle: {
      fontSize: typography.md,
      fontWeight: "600",
      color: c.text,
      flex: 1,
    },
    listTitleWide: {
      fontSize: typography.sm,
      fontWeight: "600",
      color: c.text,
      flexShrink: 1,
    },
    subtitle: {
      fontSize: typography.sm,
      color: c.textSecondary,
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
      borderRadius: radius.sm,
    },
    thumbWide: {
      width: "100%",
      height: 120,
      borderRadius: radius.sm,
    },

    // Tab buttons row
    tabsRow: {
      flexDirection: "row",
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    container: {
  flex: 1,
  backgroundColor: c.background,
  padding: spacing.md,
},

text: {
  fontSize: typography.sm,
  color: c.text,
  lineHeight: 22,
},

sectionTitle: {
  fontSize: typography.md,
  fontWeight: "700",
  color: c.text,
  marginTop: spacing.md,
  marginBottom: spacing.sm,
},

mealImage: {
  width: "100%",
  height: 220,
  borderRadius: radius.md,
  marginBottom: spacing.md,
},
  image: { width: "100%", height: 220, borderRadius: 12, marginBottom: 16 },
  category: { color: "#ffe600", marginTop: 4, marginBottom: 16 },

  instructions: { fontSize: 14, lineHeight: 20 },
 loadingText: { marginTop: 12, color: "#5c5c5c" },
  errorText: { color: "red", marginBottom: 12, textAlign: "center" },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  retryText: { fontWeight: "600" },
titleRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},


backButton: {
  marginTop: spacing.lg,
  marginBottom: spacing.lg,
  alignSelf: "flex-start",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
  borderRadius: radius.sm,
  borderWidth: 1,
  borderColor: c.border,
  backgroundColor: c.card,
},
logoutButton: {
    backgroundColor: c.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: c.white,
  },
  logoutText: {
    color: c.white,
    fontWeight: "700",
    fontSize: 16,
  },
backButtonText: {
  color: c.text,
  fontWeight: "600",
},
emptyText: {
  color: c.text,
  textAlign: "center",
  fontSize: 15,
},
    // Contatore preferiti
    favCount: {
      fontSize: typography.sm,
      color: c.textMuted,
      marginBottom: spacing.sm,
    },

    // Avatar
    avatarContainer: {
      overflow: "hidden",
      borderWidth: 1,
      borderColor: c.avatarBorder,
      backgroundColor: c.avatarBackground,
    },

    // Profile
    profileCard: {
      backgroundColor: c.profileCard,
      borderRadius: radius.lg,
      padding: spacing.lg,
      alignItems: "center",
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    profileName: {
      fontSize: typography.lg,
      fontWeight: "700",
      color: c.primary,
      textAlign: "center",
    },
    profileEmail: {
      fontSize: typography.sm,
      color: c.primary,
      textAlign: "center",
    },

    // Header icona profilo
    headerRight: {
      paddingRight: spacing.sm,
    },

    // Settings
    settingsRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    settingsLabel: {
      fontSize: typography.md,
      color: c.text,
    },
    settingsValue: {
      fontSize: typography.sm,
      color: c.textMuted,
    },
  });
}