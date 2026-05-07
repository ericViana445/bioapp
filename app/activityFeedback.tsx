import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  weakHint: string;
  strongHint: string;
  explanation: string;
  params: string[];
};

export default function ActivityScreen() {
  const router = useRouter();

  const [pdfData, setPdfData] = useState<any>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [firstError, setFirstError] = useState(false);
  const [secondError, setSecondError] = useState(false);

  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);

  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);

  const [activityStartedAt, setActivityStartedAt] = useState<number>(0);

  const questionStartedAt = useRef<number>(0);
  const totalQuestionTime = useRef<number>(0);

  const [showFinalWrongModal, setShowFinalWrongModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const storedData = await AsyncStorage.getItem("activityData");

    if (!storedData) return;

    const parsed = JSON.parse(storedData);

    setPdfData(parsed.examData);

    const receivedQuestions = parsed.questions ?? [];

    if (receivedQuestions.length > 0) {
      setQuestions(receivedQuestions);
    } else {
      setQuestions(createQuestions(parsed.examData));
    }

    const now = Date.now();

    setActivityStartedAt(now);
    questionStartedAt.current = now;
  }

  function createQuestions(data: any): Question[] {
    const hb =
      data?.values?.hemoglobina?.value ||
      data?.hemoglobina ||
      "--";

    const ht =
      data?.values?.hematocrito?.value ||
      data?.hematocrito ||
      "--";

    const vcm =
      data?.values?.vcm?.value ||
      data?.vcm ||
      "--";

    const rdw =
      data?.values?.rdw?.value ||
      data?.rdw ||
      "--";

    const rbc =
      data?.values?.rbc?.value ||
      data?.rbc ||
      "--";

    return [
      {
        id: 1,
        question:
          `Um paciente adulto apresentou os seguintes resultados em seu hemograma:\n\n• Hemoglobina: ${hb} g/dL\n• Hematócrito: ${ht}%\n\nCom base nesses dados, qual é a interpretação mais adequada?`,

        options: [
          "Indicam anemia leve",
          "Possível desidratação ou aumento das hemácias",
          "Estão dentro da normalidade sem alterações",
          "Indicam deficiência de ferro",
        ],

        correctOptionIndex: 1,

        weakHint:
          "Hemoglobina e hematócrito elevados podem indicar concentração aumentada do sangue.",

        strongHint:
          "Desidratação e policitemia podem elevar hemoglobina e hematócrito simultaneamente.",

        explanation:
          "Hemoglobina e hematócrito elevados podem indicar hemoconcentração ou aumento da massa eritrocitária.",

        params: ["hemoglobina", "hematocrito"],
      },

      {
        id: 2,
        question:
          `Um paciente apresentou:\n\n• VCM: ${vcm} fL\n\nQual classificação é mais adequada?`,

        options: [
          "Anemia normocítica",
          "Anemia macrocítica",
          "Anemia microcítica",
          "Sem alterações hematológicas",
        ],

        correctOptionIndex: Number(vcm) < 80 ? 2 : Number(vcm) > 100 ? 1 : 0,

        weakHint:
          "O VCM está relacionado ao tamanho das hemácias.",

        strongHint:
          "VCM abaixo de 80 geralmente sugere microcitose.",

        explanation:
          "O VCM classifica o tamanho médio das hemácias.",

        params: ["vcm"],
      },

      {
        id: 3,
        question:
          `O RDW do paciente foi ${rdw}%. O que esse parâmetro representa?`,

        options: [
          "Quantidade de leucócitos",
          "Variação do tamanho das hemácias",
          "Quantidade de plaquetas",
          "Volume plasmático",
        ],

        correctOptionIndex: 1,

        weakHint:
          "Esse índice avalia diferença entre células sanguíneas.",

        strongHint:
          "RDW mede anisocitose.",

        explanation:
          "O RDW mede a variação do tamanho das hemácias.",

        params: ["rdw"],
      },

      {
        id: 4,
        question:
          `O RBC encontrado foi ${rbc}. Qual a função principal desse parâmetro?`,

        options: [
          "Avaliar leucócitos",
          "Avaliar hemácias",
          "Avaliar coagulação",
          "Avaliar plaquetas",
        ],

        correctOptionIndex: 1,

        weakHint:
          "RBC está relacionado aos glóbulos vermelhos.",

        strongHint:
          "RBC significa Red Blood Cells.",

        explanation:
          "RBC representa a quantidade de hemácias no sangue.",

        params: ["rbc"],
      },

      {
        id: 5,
        question:
          "Qual parâmetro é mais utilizado para identificação inicial de anemia?",

        options: [
          "Leucócitos",
          "Plaquetas",
          "Hemoglobina",
          "Sódio",
        ],

        correctOptionIndex: 2,

        weakHint:
          "Esse parâmetro está diretamente ligado ao transporte de oxigênio.",

        strongHint:
          "É a principal proteína das hemácias.",

        explanation:
          "A hemoglobina é o principal marcador inicial para anemia.",

        params: ["hemoglobina"],
      },
    ];
  }

  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  function nextQuestion() {
    setSelectedOption(null);
    setFirstError(false);
    setSecondError(false);

    if (currentQuestionIndex >= questions.length - 1) {
      finishActivity();
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);

    questionStartedAt.current = Date.now();
  }

  
  async function finishActivity() {
    const totalTimeSeconds = Math.floor((Date.now() - activityStartedAt) / 1000);
    
    const correctAnswers = hits;
    const wrongAnswers = errors;
    const totalQuestions = questions.length;
    
    const averageTimeSeconds =
      totalQuestions > 0 ? Math.floor(totalTimeSeconds / totalQuestions) : 0;
    
    const scorePercentage =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;
    
    const result = {
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      totalTimeSeconds,
      averageTimeSeconds,
      scorePercentage,
      examName: "Hemograma",
    };
  
    await AsyncStorage.setItem("activityResult", JSON.stringify(result));
  
    router.push("/feedbackResults");
  }

  function handleAnswer() {
    if (selectedOption === null) return;

    const elapsed =
      Math.floor((Date.now() - questionStartedAt.current) / 1000);

    totalQuestionTime.current += elapsed;

    const isCorrect =
      selectedOption === currentQuestion.correctOptionIndex;

    if (isCorrect) {
      setHits((prev) => prev + 1);
      setShowCorrectModal(true);
      return;
    }

    if (!firstError) {
      setFirstError(true);
      setShowWrongModal(true);
      return;
    }

    if (!secondError) {
      setSecondError(true);
      setShowWrongModal(true);
      return;
    }

    setErrors((prev) => prev + 1);
    setShowFinalWrongModal(true);
  }

  if (!currentQuestion || !pdfData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Carregando atividade...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={28}
            color="#2563EB"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Interpretação</Text>

        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../assets/images/exame.png")}
          style={styles.examImage}
        />

        <View style={styles.questionCard}>
          <Text style={styles.questionNumber}>
            {currentQuestion.id}° Questão
          </Text>

          <Text style={styles.questionText}>
            {currentQuestion.question}
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const selected = selectedOption === index;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selected && styles.selectedOption,
                ]}
                onPress={() => setSelectedOption(index)}
              >
                <View style={styles.radioOuter}>
                  {selected && <View style={styles.radioInner} />}
                </View>

                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {(firstError || secondError) && (
          <View style={styles.hintArea}>
            <View style={styles.divider} />

            <Text style={styles.hintTitle}>Dica</Text>

            <Text style={styles.hintText}>
              {secondError
                ? currentQuestion.strongHint
                : currentQuestion.weakHint}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleAnswer}
        >
          <Text style={styles.confirmButtonText}>
            Confirmar Resposta
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {showCorrectModal && (
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.correctTitle}>
              Resposta Certa!
            </Text>

            <Text style={styles.modalText}>
              Parabéns pelo acerto, continue assim nas próximas.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowCorrectModal(false);
                nextQuestion();
              }}
            >
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showWrongModal && (
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.wrongTitle}>
              Resposta Errada!
            </Text>

            <Text style={styles.modalText}>
              Você errou, mas tente novamente com uma dica.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowWrongModal(false);

                if (secondError) {
                  setErrors((prev) => prev + 1);
                }
              }}
            >
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {showFinalWrongModal && (
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.wrongTitle}>
              Questão Encerrada
            </Text>
            
            <Text style={styles.modalText}>
              Você errou essa questão, mas continue tentando nas próximas.
            </Text>
            
            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>
                Resposta correta
              </Text>

              <Text style={styles.explanationText}>
                {currentQuestion.options[currentQuestion.correctOptionIndex]}
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowFinalWrongModal(false);
                nextQuestion();
              }}
            >
              <Text style={styles.modalButtonText}>
                Próxima Pergunta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#2563EB",
    fontSize: 18,
    fontFamily: "LeagueSpartan-Medium",
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
    color: "#2563EB",
    fontFamily: "LeagueSpartan-SemiBold",
  },

  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  examImage: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 18,
  },

  questionCard: {
    backgroundColor: "#CAD6FF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 22,
  },

  questionNumber: {
    color: "#2563EB",
    fontSize: 20,
    fontFamily: "LeagueSpartan-SemiBold",
    marginBottom: 8,
  },

  questionText: {
    color: "#111827",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "LeagueSpartan-Regular",
  },

  optionsContainer: {
    gap: 12,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 18,
  },

  selectedOption: {
    backgroundColor: "#CAD6FF",
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2563EB",
  },

  optionText: {
    flex: 1,
    color: "#111827",
    fontSize: 16,
    fontFamily: "LeagueSpartan-Regular",
  },

  hintArea: {
    marginTop: 18,
  },

  divider: {
    height: 1,
    backgroundColor: "#93C5FD",
    marginBottom: 10,
  },

  hintTitle: {
    color: "#2563EB",
    fontSize: 16,
    fontFamily: "LeagueSpartan-SemiBold",
    marginBottom: 4,
  },

  hintText: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "LeagueSpartan-Regular",
  },

  confirmButton: {
    marginTop: 34,
    alignSelf: "center",
    width: "88%",
    height: 56,
    borderRadius: 30,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
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
    borderRadius: 22,
    padding: 22,
  },

  correctTitle: {
    color: "#16A34A",
    fontSize: 24,
    fontFamily: "LeagueSpartan-SemiBold",
    marginBottom: 10,
  },

  wrongTitle: {
    color: "#DC2626",
    fontSize: 24,
    fontFamily: "LeagueSpartan-SemiBold",
    marginBottom: 10,
  },

  modalText: {
    color: "#374151",
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "LeagueSpartan-Regular",
    marginBottom: 22,
  },

  modalButton: {
    alignSelf: "flex-end",
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "LeagueSpartan-SemiBold",
  },
  explanationBox: {
    backgroundColor: "#EEF4FF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },

  explanationTitle: {
    color: "#2563EB",
    fontSize: 16,
    fontFamily: "LeagueSpartan-SemiBold",
    marginBottom: 6,
  },

  explanationText: {
    color: "#374151",
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "LeagueSpartan-Regular",
  },
});