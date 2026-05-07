import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API_URL } from '../config/api';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleForgotPassword() {
  try {
    setLoading(true);
    setError("");

    const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const text = await response.text();

      console.log("STATUS:", response.status);
      console.log("RESPOSTA BRUTA:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        setError("O backend não retornou JSON. Verifique a rota ou o servidor.");
        return;
      }

      if (!response.ok) {
        setError(data.error || "Erro ao enviar código.");
        return;
      }

      router.push({
        pathname: "/verify-code",
        params: { email },
      });
    } catch (error) {
      console.log(error);
      setError("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Esqueci Senha</Text>

        {/* Espaçador */}
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.subtitle}>
          Por favor, insira seu email cadastrado para receber o código de
          verificação e redefinir sua senha.
        </Text>

        <Text style={styles.label}>Seu Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {error !== "" && (
          <Text style={styles.error}>{error}</Text>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                email && !loading ? "#2563EB" : "#B1C1F5",
            },
          ]}
          disabled={!email || loading}
          onPress={handleForgotPassword}
        >
          <Text style={styles.buttonText}>
            {loading ? "Enviando..." : "Verificar Email"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 26,
    color: "#2563EB",
    fontFamily: "LeagueSpartan-SemiBold",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  subtitle: {
    fontSize: 16,
    color: "#111827",
    fontFamily: "LeagueSpartan-Regular",
    lineHeight: 22,
    marginBottom: 32,
  },

  label: {
    fontSize: 20,
    fontFamily: 'LeagueSpartan-Medium',
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 18,
    fontFamily: "LeagueSpartan-Regular",
    marginBottom: 20,
  },

  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "70%",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "LeagueSpartan-SemiBold",
  },
  error: {
    color: "#DC2626",
    fontSize: 14,
    marginBottom: 12,
    fontFamily: "LeagueSpartan-SemiBold",
  },
});
