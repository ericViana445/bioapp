import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ExamDetails() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* HEADER — padrão da Login */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        {/* CENTRO DO HEADER */}
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Hemograma</Text>
          <Text style={styles.headerSubtitle}>
            Avaliação sanguínea geral
          </Text>
        </View>

        {/* Espaçador para manter centralização */}
        <View style={{ width: 28 }} />
      </View>

      {/* CONTEÚDO COM SCROLL */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CARD ÚNICO */}
        <View style={styles.card}>
          <Image
            source={require("../assets/images/exame.png")}
            style={styles.image}
          />

          <View style={styles.examInfoBox}>
              <Text style={styles.examName}>Exame de Sangue</Text>
              <Text style={styles.examType}>Análise laboratorial</Text>
            </View>


          <Text style={styles.sectionTitle}>O que é o exame?</Text>
          <Text style={styles.text}>
            O hemograma completo é um exame de sangue que avalia as principais
            células do sangue. Ele ajuda a entender como o organismo está
            funcionando e pode auxiliar na identificação de condições como
            infecções, inflamações, anemias, alterações da imunidade e distúrbios
            de coagulação.
            {"\n\n"}
            É um dos exames laboratoriais mais solicitados na prática clínica,
            tanto em consultas de rotina quanto para investigação de sintomas ou
            acompanhamento de tratamentos.
          </Text>

          <Text style={styles.sectionTitle}>Como o exame funciona?</Text>

          <Text style={styles.text}>
            <Text style={styles.bold}>1. Coleta de sangue:</Text> uma pequena
            amostra é coletada geralmente do braço.
          </Text>

          <Text style={styles.text}>
            <Text style={styles.bold}>2. Análise laboratorial:</Text> a amostra é
            analisada por equipamentos automatizados.
          </Text>

          <Text style={styles.text}>
            <Text style={styles.bold}>3. Avaliação profissional:</Text> os
            resultados são interpretados por profissionais de saúde.
          </Text>

          <Text style={styles.sectionTitle}>Parâmetros analisados</Text>

          <Text style={styles.text}>
            • <Text style={styles.bold}>Glóbulos vermelhos (Hemácias):</Text>{" "}
            Células responsáveis pelo transporte de oxigênio dos pulmões para os
            tecidos do corpo.
          </Text>

          <Text style={styles.text}>
            • <Text style={styles.bold}>Hemoglobina:</Text> Proteína presente nas
            hemácias que se liga ao oxigênio e permite sua distribuição pelo
            organismo.
          </Text>

          <Text style={styles.text}>
            • <Text style={styles.bold}>Hematócrito:</Text> Representa a proporção
            do volume de glóbulos vermelhos em relação ao volume total do sangue.
          </Text>

          <Text style={styles.text}>
            • <Text style={styles.bold}>
              VCM (Volume Corpuscular Médio):
            </Text>{" "}
            Indica o tamanho médio das hemácias.
          </Text>

          <Text style={styles.text}>
            • <Text style={styles.bold}>HCM:</Text> quantidade média de
            hemoglobina por hemácia.
          </Text>

          <Text style={styles.text}>
            • <Text style={styles.bold}>CHCM:</Text> concentração de hemoglobina
            nas hemácias.
          </Text>

          <Text style={styles.text}>
            • <Text style={styles.bold}>RDW:</Text> variação do tamanho das
            hemácias.
          </Text>
        </View>
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

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 26,
    color: "#2563EB",
    fontFamily: "LeagueSpartan-SemiBold",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#000000",
    marginTop: -2,
    fontFamily: "LeagueSpartan-Light",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  examInfoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 1,
    paddingHorizontal: 92,
    alignSelf: "center",
    marginBottom: 1,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,  
    },

    
  card: {
    backgroundColor: "#DBEAFE",
    borderRadius: 20,
    padding: 16,
  },

  image: {
    width: 180,
    height: 180,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 12,
    marginTop: 12,
  },

  examName: {
    fontSize: 16,
    fontFamily: "LeagueSpartan-Medium",
    textAlign: "center",
    color: "#2260FF",
    marginTop: 8,
  },

  examType: {
    fontSize: 13,
    textAlign: "center",
    color: "#000000",
    marginBottom: 8,
    fontFamily: "LeagueSpartan-light",
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: "LeagueSpartan-SemiBold",
    marginTop: 14,
    marginBottom: 6,
    color: "#2260FF",
  },

  text: {
    fontSize: 14,
    color: "#000000",
    lineHeight: 20,
    marginBottom: 6,
    fontFamily: "LeagueSpartan-Light",
  },

  bold: {
    fontFamily: "LeagueSpartan-SemiBold",
  },
});
