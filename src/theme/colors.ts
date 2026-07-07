export interface AppTheme {
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    accent: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    error: string;
    white: string;
    black: string;
    cardBackground: string;
    avatarBorder: string;
    avatarBackground: string;
    profileCard: string;
  };
  isDark: boolean;
}

export const lightTheme: AppTheme = {
  isDark: false,
  colors: {
    primary: "#8b2323",
    primaryDark: "#5c1a1a",
    primaryLight: "#d13c3c",
    accent: "#2f6f4f",
    background: "#d13c3c",
    surface: "#fff8f8",
    card: "#fcc9c9",
    text: "#1a1a1a",
    textSecondary: "#f0d0d0",
    textMuted: "#ddd",
    border: "#eee",
    error: "#ffd1d1",
    white: "#ffffff",
    black: "#000000",
    cardBackground: "rgba(139, 35, 35, 0.88)",
    avatarBorder: "#cccccc",
    avatarBackground: "#eeeeee",
    profileCard: "#fff8f8",
  },
};

export const darkTheme: AppTheme = {
  isDark: true,
  colors: {
    primary: "#ff6b6b",
    primaryDark: "#c0392b",
    primaryLight: "#ff8e8e",
    accent: "#2ecc71",
    background: "#1a1a1a",
    surface: "#2c2c2c",
    card: "#3a2020",
    text: "#f0f0f0",
    textSecondary: "#cccccc",
    textMuted: "#888888",
    border: "#444444",
    error: "#ff6b6b",
    white: "#ffffff",
    black: "#000000",
    cardBackground: "rgba(30, 10, 10, 0.92)",
    avatarBorder: "#555555",
    avatarBackground: "#333333",
    profileCard: "#2c2c2c",
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
};

export const typography = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 22,
  xxl: 28,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
};

// Alias per retrocompatibilità — usalo solo nei file non ancora migrati al tema
export const colors = lightTheme.colors;