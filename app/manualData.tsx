import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ManualDataScreen() {
  const router = useRouter();

  const [birthDate, setBirthDate] = useState("");
  const [hemoglobina, setHemoglobina] = useState("");
  const [hematocrito, setHematocrito] = useState("");
  const [vcm, setVcm] = useState("");
  const [hcm, setHcm] = useState("");
  const [chcm, setChcm] = useState("");
  const [rdw, setRdw] = useState("");
    const [showMissingDataModal, setShowMissingDataModal] = useState(false);
    const [rbc, setRbc] = useState("");

  async function handleSubmit() {

    if (
      !birthDate ||
      !hemoglobina ||
      !hematocrito ||
      !vcm ||
      !hcm ||
      !chcm ||
      !rbc ||
      !rdw
    ) {
      setShowMissingDataModal(true);
      return;
    }
    const manualData = {
      patient: {
        name: null,
        birthDate,
        age: null,
      },
      exam: {
        type: "hemograma",
        title: "Exame de Sangue - Resultado Educativo",
      },
      values: {
        hemoglobina: {
          value: hemoglobina || null,
          unit: "g/dL",
          status: "indefinido",
        },
        hematocrito: {
          value: hematocrito || null,
          unit: "%",
          status: "indefinido",
        },
        vcm: {
          value: vcm || null,
          unit: "fL",
          status: "indefinido",
        },
        rbc: {
          value: rbc || null,
          unit: "milhões/µL",
          status: "indefinido",
        },
        hcm: {
          value: hcm || null,
          unit: "pg",
          status: "indefinido",
        },
        chcm: {
          value: chcm || null,
          unit: "g/dL",
          status: "indefinido",
        },
        rdw: {
          value: rdw || null,
          unit: "%",
          status: "indefinido",
        },
      },
      summary: {
        mainFinding: "Dados inseridos manualmente.",
        educationalInterpretation:
          "Os valores foram informados manualmente pelo usuário e devem ser interpretados de forma educativa.",
      },
    };

    await AsyncStorage.setItem("pdfData", JSON.stringify(manualData));
    router.push("/returnData");
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
        placeholder="0000"
        placeholderTextColor="#7EA2FF"
        keyboardType="decimal-pad"
      />
    </View>
  );
}

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