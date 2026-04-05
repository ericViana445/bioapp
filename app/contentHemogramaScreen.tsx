import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HemogramaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#3B6EF6" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Conteúdo</Text>

        {/* Espaçador */}
        <View style={{ width: 28 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.card}>
          <Image
            source={require('../assets/images/exame.png')}
            style={styles.image}
          />

          <View style={styles.tag}>
            <Text style={styles.tagText}>Hemograma</Text>
            <Text style={styles.tagSub}>Avaliação sanguínea geral</Text>
          </View>

          <Text style={styles.sectionTitle}>O que é o exame?</Text>
          <Text style={styles.text}>
            O hemograma completo é um exame de sangue que avalia as principais células do sangue. Ele ajuda a entender como o organismo está funcionando e pode auxiliar na identificação de condições como infecções, inflamações, anemias, alterações da imunidade e distúrbios de coagulação.
É um dos exames laboratoriais mais solicitados na prática clínica, tanto em consultas de rotina quanto para investigação de sintomas ou acompanhamento de tratamentos.
          </Text>

          <Text style={styles.sectionTitle}>Como o exame funciona?</Text>

          <Text style={styles.text}>
             <Text style={{ fontWeight: 'bold' }}>
              1. Coleta de sangue{'\n'}
            </Text>
            Uma pequena amostra de sangue é coletada, geralmente de uma veia do braço.{'\n'}{'\n'}
            <Text style={{ fontWeight: 'bold' }}>
              2. Análise laboratorial{'\n'}
            </Text>
            A amostra é analisada em equipamentos automatizados que medem e avaliam as células do sangue.{'\n'}{'\n'}
            <Text style={{ fontWeight: 'bold' }}>
              3. Avaliação profissional{'\n'}
            </Text>

            Os resultados mostram quantidades e características das células sanguíneas, que são interpretadas por profissionais de saúde de acordo com o contexto clínico do paciente.
          </Text>

          <Text style={styles.sectionTitle}>Parâmetros analisados:</Text>

          <Text style={styles.text}>

              <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>
                Hemoglobina (Hb):{' '}
              </Text>
              medida em g/dL (gramas por decilitro).{'\n\n'}

              <Text style={{ fontWeight: 'bold' }}>
                Hematócrito (Ht):{' '}
              </Text>
              expresso em % (porcentagem do volume de sangue ocupado pelas hemácias).{'\n\n'}

              <Text style={{ fontWeight: 'bold' }}>
                Eritrócitos (RBC):{' '}
              </Text>
              medido em milhões/µL (milhões por microlitro de sangue).{'\n\n'}

              <Text style={{ fontWeight: 'bold' }}>
                Volume Corpuscular Médio (VCM):{' '}
              </Text>
              medido em fL (femtolitros), indica o tamanho médio das hemácias.{'\n\n'}

              <Text style={{ fontWeight: 'bold' }}>
                Hemoglobina Corpuscular Média (HCM):{' '}
              </Text>
              medida em pg (picogramas), mostra a quantidade média de hemoglobina por hemácia.{'\n\n'}

              <Text style={{ fontWeight: 'bold' }}>
                Concentração de Hemoglobina Corpuscular Média (CHCM):{' '}
              </Text>
              medida em g/dL, indica a concentração de hemoglobina dentro das hemácias.{'\n\n'}

              <Text style={{ fontWeight: 'bold' }}>
                RDW (Red Cell Distribution Width):{' '}
              </Text>
              expresso em %, indica a variação do tamanho das hemácias.
            </Text>
          </Text>

          

        </View>
        <TouchableOpacity
  style={styles.button}
  onPress={() => Linking.openURL('https://drive.google.com/drive/folders/1wsejyFGlnT054u-eSOEZLierX1Kxq6Mk')}
>
  <Text style={styles.buttonText}>Saber mais</Text>
</TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 56, // 🔥 ISSO resolve o problema
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B6EF6",
  },

  scroll: {
    padding: 20,
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },


  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B6EF6',
    textAlign: 'center',
  },


  card: {
    backgroundColor: '#CAD6FF',
    borderRadius: 20,
    padding: 20,
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 15,
  },

  tag: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    height: 70,
    justifyContent: 'center'
  },

  tagText: {
    fontWeight: 'bold',
    color: '#2260FF',
    fontSize: 20,
  },

  tagSub: {
    fontSize: 13,
    color: '#555',
  },

  sectionTitle: {
    color: '#2260FF',
    fontWeight: 'bold',
    marginTop: 10,
  },

  text: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'justify',
  },

  bottomBox: {
    backgroundColor: '#B7C5F7',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },

  button: {
    marginTop: 20,
    backgroundColor: '#CAD6FF',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    color: '#2260FF',
    fontSize: 17,
  },
});