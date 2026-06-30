import { useState } from "react";
import { View,Text,TextInput, Pressable, StyleSheet, KeyboardAvoidingView, ScrollView, ImageBackground , Platform } from "react-native";
import { useAuth } from "../context/AuthContext";

type SubmitStatus = "idle" | "loading" | "error" | "success";

export function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isSending = status === "loading";

  function onSubmit() {
    if (isSending) return;
    setStatus("loading");

    const success = login(email, password);

    if (success) {
      setStatus("success");
      navigation.replace("MealsList");
    } else {
      setStatus("error");
      setErrorMessage("Email o password non validi");
    }
  }

  return (
    
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200" }}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formCard}>
            <Text style={styles.title}>Italian Meals</Text>
            <Text style={styles.subtitle}>Tutti i piatti italiani più amati!</Text>
            <Text style={styles.subtitle}>Accedi per continuare</Text>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              accessibilityLabel="Campo email"
            />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              accessibilityLabel="Campo password"
            />

            {status === "error" && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <Pressable
              style={[styles.button, isSending && styles.buttonDisabled]}
              onPress={onSubmit}
              disabled={isSending}
              accessibilityLabel="Accedi"
            >
              <Text style={styles.buttonText}>
                {isSending ? "Accesso in corso..." : "Accedi"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
 );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  formCard: {
    backgroundColor: "rgba(139, 35, 35, 0.88)",
    borderRadius: 16,
    padding: 24,
    gap: 14,
  },
  title: { fontSize: 28, fontWeight: "700", color: "#fff", textAlign: "center" },
  subtitle: { fontSize: 14, color: "#f0d0d0", textAlign: "center", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#fff",
    fontSize: 15,
  },
  errorText: { color: "#ffd1d1", fontWeight: "600", textAlign: "center" },
  button: {
    backgroundColor: "#2f6f4f",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});