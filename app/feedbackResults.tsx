import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type ActivityResult = {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  totalTimeSeconds: number;
  averageTimeSeconds: number;
  scorePercentage: number;
  examName: string;
};

export default function FeedbackResultsScreen() {
  const router = useRouter();
  const [result, setResult] = useState<ActivityResult | null>(null);

  useEffect(() => {
    async function loadResult() {
      const stored = await AsyncStorage.getItem("activityResult");

      if (stored) {
        setResult(JSON.parse(stored));
      }
    }

    loadResult();
  }, []);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  }
  function getCongratsMessage(score: number) {
      if (score >= 90) return "Parabéns";
      if (score >= 75) return "Muito Bem";
      if (score >= 50) return "Bom Trabalho";
      if (score >= 30) return "Continue tentando";
    
      return "Não Desista";
    }

  function getPerformance(score: number) {
    if (score >= 90) return "Excelente";
    if (score >= 75) return "Bom";
    if (score >= 50) return "Médio";
    if (score >= 30) return "Baixo";
    return "Ruim";
  }

  if (!result) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando resultado...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.blueHeader}>

        <Text style={styles.congrats}>
          {getCongratsMessage(result.scorePercentage)}
        </Text>

        <Text style={styles.score}>
          {result.scorePercentage}% De{"\n"}Precisão
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.imageBox}>
          <Image
            source={require("../assets/images/feebackResult.jpg")}
            style={styles.resultImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.examTitle}>Interpretação do exame</Text>
        <Text style={styles.examSubtitle}>{result.examName}</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tempo total</Text>
          <Text style={styles.infoValue}>
            {formatTime(result.totalTimeSeconds)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tempo médio por pergunta</Text>
          <Text style={styles.infoValue}>
            {formatTime(result.averageTimeSeconds)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Desempenho</Text>
          <Text style={styles.infoValue}>
            {getPerformance(result.scorePercentage)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total de acertos</Text>
          <Text style={styles.infoValue}>
            {result.correctAnswers} Questões
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => router.replace("/home")}
      >
        <Text style={styles.menuButtonText}>Voltar Para O Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#2563EB",
    fontSize: 18,
    fontFamily: "LeagueSpartan-Medium",
  },

  blueHeader: {
    height: 194,
    backgroundColor: "#2563EB",
    paddingTop: 54,
    alignItems: "center",
  },

  backButton: {
    position: "absolute",
    left: 20,
    top: 56,
  },

  congrats: {
    color: "#FFFFFF",
    fontSize: 35,
    fontFamily: "LeagueSpartan-SemiBold",
    marginBottom: 10,
  },

  score: {
    color: "#FFFFFF",
    fontSize: 27,
    lineHeight: 36,
    textAlign: "center",
    fontFamily: "LeagueSpartan-SemiBold",
  },

  content: {
    paddingHorizontal: 28,
    alignItems: "center",
    paddingTop: 34,
  },

  imageBox: {
    width: 120,
    height: 120,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  resultImage: {
    width: 176,
    height: 176,
    marginBottom: 20,
  },

  examTitle: {
    color: "#2563EB",
    fontSize: 18,
    fontFamily: "LeagueSpartan-SemiBold",
  },

  examSubtitle: {
    color: "#111827",
    fontSize: 15,
    fontFamily: "LeagueSpartan-Light",
    marginTop: 2,
    marginBottom: 24,
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#7EA2FF",
    marginBottom: 18,
  },

  infoRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  infoLabel: {
    color: "#2563EB",
    fontSize: 14,
    fontFamily: "LeagueSpartan-Regular",
  },

  infoValue: {
    color: "#000000",
    fontSize: 13,
    fontFamily: "LeagueSpartan-SemiBold",
  },

  menuButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: "82%",
    height: 52,
    borderRadius: 30,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  menuButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "LeagueSpartan-SemiBold",
  },
});
