import { API_URL } from "@/config/api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ManualDataScreen() {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [hemoglobina, setHemoglobina] = useState("");
  const [hematocrito, setHematocrito] = useState("");
  const [vcm, setVcm] = useState("");
  const [hcm, setHcm] = useState("");
  const [chcm, setChcm] = useState("");
  const [rdw, setRdw] = useState("");
  const [showMissingDataModal, setShowMissingDataModal] = useState(false);
  const [rbc, setRbc] = useState("");
  const [showAiErrorModal, setShowAiErrorModal] = useState(false);
  const [dateError, setDateError] = useState("");

  async function handleSubmit() {
    if (
      !birthDate ||
      
      !hemoglobina ||
      !hematocrito ||
      !rbc ||
      !vcm ||
      !hcm ||
      !chcm ||
      !rdw
    ) {
      setShowMissingDataModal(true);
      return;
    }
    if (!isValidDate(birthDate)) {
      setDateError("Data inválida.");
      return;
    }

    setDateError("");
    try {
      setIsAnalyzing(true);

      const response = await fetch(`${API_URL}/ai/analyze-manual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          birthDate,
          hemoglobina,
          hematocrito,
          rbc,
          vcm,
          hcm,
          chcm,
          rdw,
        }),
      });

      const data = await response.json();

      if (!response.ok || data?.error) {
        console.log("Erro IA manual:", data);
        setShowAiErrorModal(true);
        return;
      }

      await AsyncStorage.setItem("pdfData", JSON.stringify(data));

      await AsyncStorage.setItem(
        "activityData",
        JSON.stringify({
          examData: data,
          questions: data.questions ?? [],
        })
      );

      router.push("/returnData");
    } catch (error) {
      console.log("Erro ao enviar dados manuais:", error);
      setShowAiErrorModal(true);
    } finally {
      setIsAnalyzing(false);
    }
  }
  function isValidDate(date: string) {
    if (date.length !== 10) return false;

    const [day, month, year] = date.split("/").map(Number);

    if (!day || !month || !year) return false;

    if (month < 1 || month > 12) return false;

    const daysInMonth = new Date(year, month, 0).getDate();

    if (day < 1 || day > daysInMonth) return false;

    if (year < 1900 || year > new Date().getFullYear()) return false;

    return true;
  }
  function formatDate(value: string) {
      // remove tudo que não é número
      let cleaned = value.replace(/\D/g, "");
    
      // limita a 8 dígitos (DDMMYYYY)
      cleaned = cleaned.slice(0, 8);
    
      // aplica máscara
      if (cleaned.length <= 2) {
        return cleaned;
      }
      if (cleaned.length <= 4) {
        return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      }
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    }
    
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Formulário Manual De Exame</Text>

        <View style={{ width: 28 }} />
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Data De Nascimento</Text>
            <TextInput
              style={styles.input}
              value={birthDate}
              onChangeText={(text) => setBirthDate(formatDate(text))}
              placeholder="04/28/2000"
              placeholderTextColor="#7EA2FF"
              keyboardType="numbers-and-punctuation"
            />


          </View>

          <View style={styles.halfField}>
            <Text style={styles.label}>Hemoglobina</Text>
            <TextInput
              style={styles.input}
              value={hemoglobina}
              onChangeText={setHemoglobina}
              placeholder="0000"
              placeholderTextColor="#7EA2FF"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <Field
          label="Hematócrito"
          value={hematocrito}
          onChangeText={setHematocrito}
        />

        <Field
          label="RBC (Hemácias)"
          value={rbc}
          onChangeText={setRbc}
        />

        <Field
          label="VCM (Volume Corpuscular Médio)"
          value={vcm}
          onChangeText={setVcm}
        />

        <Field
          label="HCM (Hemoglobina Corpuscular Média)"
          value={hcm}
          onChangeText={setHcm}
        />

        <Field
          label="CHCM (Concentração De Hemoglobina Corpuscular Média)"
          value={chcm}
          onChangeText={setChcm}
        />

        <Field label="RDW:" value={rdw} onChangeText={setRdw} />
        
        {dateError !== "" && (
              <Text style={styles.errorText}>{dateError}</Text>
            )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          
          <Text style={styles.buttonText}>Seguir</Text>
        </TouchableOpacity>
      </View>
      
      {showMissingDataModal && (
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowMissingDataModal(false)}
              >
                <Ionicons name="close" size={22} color="#2563EB" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Não há dados suficientes</Text>

              <Text style={styles.modalText}>
                Complete os dados que estão faltando para continuar.
              </Text>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setShowMissingDataModal(false)}
              >
                <Text style={styles.confirmText}>Entendi</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {isAnalyzing && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.loadingText}>Analisando exame...</Text>
            </View>
          </View>
        )}
        {showAiErrorModal && (
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowAiErrorModal(false)}
              >
                <Ionicons name="close" size={22} color="#2563EB" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Erro na análise</Text>

              <Text style={styles.modalText}>
                Não conseguimos analisar os dados agora.{"\n\n"}
                Verifique sua conexão ou tente novamente em alguns instantes.
              </Text>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setShowAiErrorModal(false)}
              >
                <Text style={styles.confirmText}>Entendi</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.fullInput}
        value={value}
        onChangeText={onChangeText}
        placeholder="000"
        placeholderTextColor="#7EA2FF"
        keyboardType="decimal-pad"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    marginTop: 2,
    marginLeft: 120,
    fontFamily: "LeagueSpartan-SemiBold",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(34, 96, 255, 0.54)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  loadingBox: {
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#FFFFFF",
    fontSize: 18,
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
    paddingBottom: 12,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 26,
    lineHeight: 26,
    color: "#2563EB",
    fontFamily: "LeagueSpartan-SemiBold",
  },

  form: {
    paddingHorizontal: 28,
    paddingTop: 26,
  },

  row: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 12,
    alignItems: "flex-end",
  },

  halfField: {
    flex: 1,
  },

  field: {
    marginBottom: 13,
  },

  label: {
    fontSize: 16,
    fontFamily: "LeagueSpartan-Medium",
    color: "#000000",
    marginBottom: 6,
    marginLeft: 5,
  },

  input: {
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 18,
    color: "#2563EB",
    fontSize: 16,
    fontFamily: "LeagueSpartan-Regular",
  },

  fullInput: {
    width: "100%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 18,
    color: "#2563EB",
    fontSize: 16,
    fontFamily: "LeagueSpartan-Regular",
  },

  button: {
    alignSelf: "center",
    marginTop: 26,
    width: "74%",
    height: 46,
    borderRadius: 30,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "LeagueSpartan-SemiBold",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(37, 99, 235, 0.35)",
      justifyContent: "center",
      alignItems: "center",
    },

    modal: {
      width: "82%",
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      padding: 20,
    },

    closeButton: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 10,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "#E6EEFF",
      justifyContent: "center",
      alignItems: "center",
    },

    modalTitle: {
      fontSize: 22,
      fontFamily: "LeagueSpartan-SemiBold",
      color: "#111827",
      marginBottom: 8,
      paddingRight: 30,
    },

    modalText: {
      fontSize: 14,
      fontFamily: "LeagueSpartan-ExtraLight",
      color: "#374151",
      lineHeight: 20,
      marginBottom: 20,
    },

    confirmButton: {
      alignSelf: "flex-end",
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 20,
      backgroundColor: "#2563EB",
    },

    confirmText: {
      fontFamily: "LeagueSpartan-SemiBold",
      fontSize: 14,
      color: "#FFFFFF",
    },
});