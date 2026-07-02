import { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

interface AvatarProps {
  uri: string;
  size?: number;
}

export function Avatar({ uri, size = 48 }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const radius = size / 2;

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: radius },
      ]}
    >
      {failed ? (
        <Text style={[styles.fallback, { lineHeight: size }]}>?</Text>
      ) : (
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          onError={() => setFailed(true)}
          accessibilityLabel="Avatar utente"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  fallback: {
    textAlign: "center",
    fontWeight: "700",
    color: colors.black,
  },
});