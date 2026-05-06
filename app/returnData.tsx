import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ParameterKey =
  | "hemoglobina"
  | "hematocrito"
  | "rbc"
  | "vcm"
  | "hcm"
  | "chcm"
  | "rdw";

const parameterDescriptions: Record<ParameterKey, string> = {
  hemoglobina:
    "A hemoglobina é uma proteína presente nos glóbulos vermelhos responsável por transportar oxigênio dos pulmões para os tecidos do corpo.",
  hematocrito:
    "O hematócrito representa a porcentagem do sangue ocupada pelas hemácias. Ele costuma acompanhar alterações da hemoglobina.",
  rbc:
    "O RBC representa a quantidade de hemácias no sangue. Ele ajuda a entender se há redução ou aumento na produção de glóbulos vermelhos.",
  vcm:
    "O VCM mostra o tamanho médio das hemácias. Ele ajuda a classificar anemias como microcíticas, normocíticas ou macrocíticas.",
  hcm:
    "O HCM indica a quantidade média de hemoglobina dentro de cada hemácia, ajudando a avaliar a coloração das células.",
  chcm:
    "O CHCM mede a concentração de hemoglobina dentro das hemácias. Alterações podem ajudar na investigação de hemólise ou esferocitose.",
  rdw:
    "O RDW mede a variação do tamanho das hemácias. Ele ajuda a diferenciar tipos de anemia, como ferropriva, talassemia e anemia mista.",
};

export default function ReturnDataScreen() {
  const [pdfData, setPdfData] = useState<any>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const storedData = await AsyncStorage.getItem("pdfData");

      if (storedData) {
        setPdfData(JSON.parse(storedData));
      }
    };

    loadData();
  }, []);

  if (!pdfData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando dados do PDF...</Text>
      </View>
    );
  }

  function toggleItem(key: string) {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

 function getAgeText() {
    const age = pdfData.patient?.age;

    if (age !== null && age !== undefined) {
      return `${age} anos`;
    }

    return "Idade não identificada";
  }

  const parameters: {
    key: ParameterKey;
    label: string;
    value: any;
    unit: string;
    interpretation?: string;
  }[] = [
    {
      key: "hemoglobina",
      label: "Hemoglobina",
      value: pdfData.values?.hemoglobina?.value,
      unit: pdfData.values?.hemoglobina?.unit ?? "g/dL",
      interpretation: pdfData.values?.hemoglobina?.interpretation,
    },
    {
      key: "hematocrito",
      label: "Hematócrito",
      value: pdfData.values?.hematocrito?.value,
      unit: pdfData.values?.hematocrito?.unit ?? "%",
      interpretation: pdfData.values?.hematocrito?.interpretation,
    },
    {
      key: "rbc",
      label: "RBC",
      value: pdfData.values?.rbc?.value,
      unit: pdfData.values?.rbc?.unit ?? "milhões/µL",
      interpretation: pdfData.values?.rbc?.interpretation,
    },
    {
      key: "vcm",
      label: "VCM",
      value: pdfData.values?.vcm?.value,
      unit: pdfData.values?.vcm?.unit ?? "fL",
      interpretation: pdfData.values?.vcm?.interpretation,
    },
    {
      key: "hcm",
      label: "HCM",
      value: pdfData.values?.hcm?.value,
      unit: pdfData.values?.hcm?.unit ?? "pg",
      interpretation: pdfData.values?.hcm?.interpretation,
    },
    {
      key: "chcm",
      label: "CHCM",
      value: pdfData.values?.chcm?.value,
      unit: pdfData.values?.chcm?.unit ?? "g/dL",
      interpretation: pdfData.values?.chcm?.interpretation,
    },
    {
      key: "rdw",
      label: "RDW",
      value: pdfData.values?.rdw?.value,
      unit: pdfData.values?.rdw?.unit ?? "%",
      interpretation: pdfData.values?.rdw?.interpretation,
    },
  ];

  const ResultItem = ({
  keyName,
  label,
  value,
  unit,
  interpretation,
}: {
  keyName: ParameterKey;
  label: string;
  value: any;
  unit: string;
  interpretation?: string;
}) => {
    const isOpen = openItems[keyName];

    return (
      <View style={styles.resultItem}>
        <TouchableOpacity
          style={styles.resultHeader}
          onPress={() => toggleItem(keyName)}
        >
          <Text style={styles.resultLabel}>{label}</Text>

          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={16}
            color="#2563EB"
          />
        </TouchableOpacity>

        <Text style={styles.valueTitle}>Valor encontrado:</Text>

        <Text style={styles.resultValue}>
          {value ?? "--"} {unit}
        </Text>

        {isOpen && (
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>O que é?</Text>
            <Text style={styles.descriptionText}>
               {interpretation || parameterDescriptions[keyName]}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        <View style={styles.headerTitleArea}>
          <Text style={styles.headerTitle}>Hemograma</Text>
          <Text style={styles.headerSubtitle}>Avaliação Sanguínea Geral</Text>
        </View>

        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Image
            source={require("../assets/images/exame.png")}
            style={styles.examImage}
          />

          <View style={styles.infoTag}>
            <Text style={styles.infoTagTitle}>
              Análise dos Resultados
            </Text>
            <Text style={styles.infoTagSubtitle}>
              Paciente Adulto, {getAgeText()}
            </Text>
          </View>

          <View style={styles.resultsList}>
            {parameters.map((item) => (
              <ResultItem
                key={item.key}
                keyName={item.key}
                label={item.label}
                value={item.value}
                unit={item.unit}
                interpretation={item.interpretation}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Interpretar</Text>
        </TouchableOpacity>
      </ScrollView>
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

  headerTitleArea: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 26,
    color: "#2563EB",
    fontFamily: "LeagueSpartan-SemiBold",
  },

  headerSubtitle: {
    fontSize: 10,
    color: "#111827",
    marginTop: -4,
    fontFamily: "LeagueSpartan-Light",
  },

  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 28,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  loadingText: {
    fontSize: 16,
    color: "#2563EB",
    fontFamily: "LeagueSpartan-Medium",
  },

  card: {
    backgroundColor: "#CAD6FF",
    borderRadius: 16,
    paddingHorizontal: 28,
    paddingTop: 22,
    paddingBottom: 28,
    minHeight: 550,
  },

  examImage: {
    width: 145,
    height: 145,
    borderRadius: 72.5,
    alignSelf: "center",
    marginBottom: 16,
  },

  infoTag: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 30,
  },

  infoTagTitle: {
    color: "#2563EB",
    fontSize: 18,
    fontFamily: "LeagueSpartan-SemiBold",
    textAlign: "center",
  },

  infoTagSubtitle: {
    color: "#111827",
    fontSize: 12,
    fontFamily: "LeagueSpartan-Light",
    marginTop: -2,
  },

  resultsList: {
    gap: 10,
  },

  resultItem: {
    marginBottom: 2,
  },

  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  resultLabel: {
    color: "#2563EB",
    fontSize: 16,
    fontFamily: "LeagueSpartan-regular",
  },

  valueTitle: {
    color: "#000000",
    fontSize: 14,
    fontFamily: "LeagueSpartan-SemiBold",
    marginTop: -1,
  },

  resultValue: {
    color: "#000000",
    fontSize: 14,
    fontFamily: "LeagueSpartan-Regular",
    marginTop: -2,
  },

  descriptionBox: {
    marginTop: 8,
    marginBottom: 8,
  },

  descriptionTitle: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "LeagueSpartan-SemiBold",
    marginBottom: 4,
  },

  descriptionText: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "LeagueSpartan-Regular",
  },

  button: {
    alignSelf: "center",
    marginTop: 20,
    width: "78%",
    backgroundColor: "#2563EB",
    paddingVertical: 13,
    borderRadius: 28,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "LeagueSpartan-SemiBold",
  },
})
