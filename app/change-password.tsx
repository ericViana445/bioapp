import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function PasswordManager() {
  const router = useRouter();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Alterar Senha</Text>

        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* CURRENT PASSWORD */}
        <Text style={styles.label}>Senha Atual</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            secureTextEntry={!showCurrent}
            style={styles.input}
            placeholder="************"
          />
          <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
            <Ionicons
              name={showCurrent ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('forgot-password')}>
          <Text style={styles.forgot}>Esqueceu a Senha?</Text>
        </TouchableOpacity>

        {/* NEW PASSWORD */}
        <Text style={styles.label}>Nova Senha</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            secureTextEntry={!showNew}
            style={styles.input}
            placeholder="************"
          />
          <TouchableOpacity onPress={() => setShowNew(!showNew)}>
            <Ionicons
              name={showNew ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        {/* CONFIRM PASSWORD */}
        <Text style={styles.label}>Confirmar Nova Senha</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            secureTextEntry={!showConfirm}
            style={styles.input}
            placeholder="************"
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons
              name={showConfirm ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>
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
    paddingTop: 8,
    paddingBottom: 40,
  },

  label: {
    fontSize: 20,
    fontFamily: "LeagueSpartan-Medium",
    marginBottom: 6,
    marginTop: 12,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
  },

  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: "LeagueSpartan-Regular",
  },

  forgot: {
    marginTop: 8,
    alignSelf: "flex-end",
    fontSize: 16,
    color: "#2563EB",
    fontFamily: "LeagueSpartan-SemiBold",
  },

  button: {
    marginHorizontal: 20,
    marginBottom: 24,
    height: 56,
    borderRadius: 28,
    width: '70%',
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginTop: 13,
  },

  buttonText: {
    fontSize: 22,
    color: "#FFFFFF",
    fontFamily: "LeagueSpartan-SemiBold",
  },
});
