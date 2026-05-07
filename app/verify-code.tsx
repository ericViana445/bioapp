import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API_URL } from "../config/api";

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);
  const { email } = useLocalSearchParams<{ email: string }>();
  function handleChange(text: string, index: number) {
    if (!/^\d?$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 4) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handleKeyPress(e: any, index: number) {
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  const isComplete = code.every((digit) => digit !== "");

  async function handleVerifyCode() {
    try {
      setLoading(true);
      setError("");

      const fullCode = code.join("");

      const response = await fetch(`${API_URL}/auth/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: fullCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Código inválido.");
        return;
      }

      router.replace({
        pathname: "/reset-password",
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

        <Text style={styles.headerTitle}>Verificação</Text>

        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.subtitle}>
          Enviamos um código de verificação para o seu e-mail.
          {"\n"}Insira o código de 5 dígitos abaixo.
        </Text>

        {/* CÓDIGO */}
        <View style={styles.codeRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
  inputs.current[index] = ref;
}}

              style={[
                styles.codeInput,
                digit ? styles.codeFilled : styles.codeEmpty,
              ]}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="number-pad"
              onKeyPress={(e) => handleKeyPress(e, index)}
              maxLength={1}
            />
          ))}
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                isComplete && !loading ? "#2563EB" : "#B1C1F5",
            },
          ]}
          disabled={!isComplete || loading}
          onPress={handleVerifyCode}
        >
          <Text style={styles.buttonText}>
            {loading ? "Verificando..." : "Verificar Código"}
          </Text>
        </TouchableOpacity>

        {error !== "" && <Text style={styles.error}>{error}</Text>}

        {/* REENVIAR */}
        <Text style={styles.resendText}>
          Ainda não recebeu o e-mail?{" "}
          <Text style={styles.resendLink}>Reenviar email</Text>
        </Text>
      </ScrollView>
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  error: {
    color: "#DC2626",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "LeagueSpartan-SemiBold",
  },
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

  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  codeInput: {
    width: 52,
    height: 56,
    borderRadius: 14,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "LeagueSpartan-SemiBold",
  },

  codeFilled: {
    borderWidth: 1.5,
    borderColor: "#2563EB",
    backgroundColor: "#EEF2FF",
  },

  codeEmpty: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
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

  resendText: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 14,
    color: "#111827",
  },

  resendLink: {
    color: "#2563EB",
    fontFamily: "LeagueSpartan-SemiBold",
  },
});
