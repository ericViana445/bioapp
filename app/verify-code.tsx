import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

export default function VerifyCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);

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
            { backgroundColor: isComplete ? "#2563EB" : "#B1C1F5" },
          ]}
          disabled={!isComplete}
          onPress={() => router.push("/reset-password")}
        >
          <Text style={styles.buttonText}>Verificar Código</Text>
        </TouchableOpacity>

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
