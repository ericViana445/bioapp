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

export default function CompleteProfileScreen() {
  const router = useRouter();
  const [dob, setDob] = useState("");

  // Função para aplicar máscara automática DD/MM/YYYY
  const handleDobChange = (text: string) => {
    // Remove tudo que não for número
    const cleaned = text.replace(/\D/g, "");

    let formatted = cleaned;

    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }

    if (cleaned.length > 4) {
      formatted =
        cleaned.slice(0, 2) +
        "/" +
        cleaned.slice(2, 4) +
        "/" +
        cleaned.slice(4, 8);
    }

    setDob(formatted);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Complete seu Cadastro</Text>

        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.subtitle}>
          Para finalizar seu cadastro e liberar o acesso ao aplicativo,
          informe sua data de nascimento.
        </Text>

        <Text style={styles.label}>Data de Nascimento</Text>

        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={dob}
          onChangeText={handleDobChange}
          maxLength={10}
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: dob.length === 10 ? "#2563EB" : "#B1C1F5" },
          ]}
          disabled={dob.length !== 10}
          onPress={() => {
            // Aqui depois você chama o PATCH pro backend
            router.replace("/home");
          }}
        >
          <Text style={styles.buttonText}>Finalizar Cadastro</Text>
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
    fontFamily: "LeagueSpartan-Medium",
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
});