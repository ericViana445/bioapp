import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const exams = [
  {
    unit: 'E?',
    title: 'Hemograma',
    image: require('../assets/images/exame.png'),
    pages: [
      {
        subtitle: 'O que é?',
        text: 'O hemograma é um exame laboratorial que avalia as células do sangue: hemácias (glóbulos vermelhos), leucócitos (glóbulos brancos) e plaquetas. Ele fornece uma visão geral do estado de saúde do organismo e é um dos exames mais solicitados na prática clínica.',
      },
      {
        subtitle: 'O que analisa?',
        text: 'O hemograma é dividido em três partes principais: a série vermelha, que avalia transporte de oxigênio; a série branca, relacionada ao sistema imunológico; e as plaquetas, que participam da coagulação. Cada uma dessas partes traz informações importantes sobre o funcionamento do corpo.',
      },
      {
        subtitle: 'Para que serve?',
        text: 'Esse exame é utilizado para investigar diversas condições, como anemias, infecções, inflamações e alterações da medula óssea. Ele também é usado para acompanhamento de doenças e avaliação da resposta a tratamentos.',
      },
      {
        subtitle: 'Interpretação',
        text: 'A interpretação do hemograma deve ser feita de forma integrada, considerando os valores em conjunto e o contexto clínico do paciente. Alterações isoladas nem sempre indicam doença, sendo necessária a análise médica para um diagnóstico correto.',
      },
    ],
  },
  {
    label: 'Cm',
    unit: 'FAZ?',
    title: 'Como faz?',
    image: require('../assets/images/exame.png'),
    pages: [
      {
        subtitle: 'Coleta',
        text: 'O hemograma é feito a partir de uma pequena amostra de sangue, geralmente coletada de uma veia do braço. O sangue é colocado em um tubo com anticoagulante, para evitar a coagulação e permitir a análise correta das células sanguíneas.',
      },
      {
        subtitle: 'Análise',
        text: 'Após a coleta, a amostra é analisada em equipamentos laboratoriais que contam e medem as células do sangue. Esses aparelhos avaliam hemácias, leucócitos e plaquetas, além de calcular índices importantes como hemoglobina, hematócrito, VCM, HCM e CHCM.',
      },
      {
        subtitle: 'Lâmina',
        text: 'Em alguns casos, o laboratório também faz a análise microscópica do sangue. Uma gota da amostra é espalhada em uma lâmina, corada e observada no microscópio, permitindo avaliar o formato das células e identificar alterações que o aparelho pode não detalhar totalmente.',
      },
      {
        subtitle: 'Resultado',
        text: 'O resultado do hemograma reúne valores numéricos e observações sobre as células sanguíneas. A interpretação deve considerar o conjunto dos dados, os valores de referência do laboratório e o estado clínico do paciente.',
      },
    ],
  },
  {
    label: 'HB',
    unit: 'G/DL',
    title: 'Hemoglobina',
    image: require('../assets/images/exame.png'),
    pages: [
      {
        subtitle: 'O que é?',
        text: 'A hemoglobina é a principal proteína das hemácias responsável pelo transporte de oxigênio. Na prática clínica, ela é o principal indicador inicial para identificar anemia ou excesso de células vermelhas.',
      },
      {
        subtitle: 'Baixa',
        text: 'Quando a hemoglobina está baixa, o principal diagnóstico é anemia. A partir disso, o próximo passo é avaliar outros parâmetros do hemograma, principalmente RBC, VCM, HCM, CHCM e RDW para identificar a causa.',
      },
      {
        subtitle: 'Alta',
        text: 'Quando está elevada, pode indicar policitemia ou hemoconcentração. As causas incluem policitemia vera, hipoxemia crônica ou desidratação.',
      },
      {
        subtitle: 'Normal',
        text: 'Se estiver dentro dos valores normais, geralmente não há anemia significativa. Mesmo assim, outros parâmetros podem revelar alterações iniciais.',
      },
    ],
  },
  {
    label: 'Ht',
    unit: '%',
    title: 'Hematócrito',
    image: require('../assets/images/exame.png'),
    pages: [
      {
        subtitle: 'O que é?',
        text: 'O hematócrito representa a proporção de hemácias no sangue.',
      },
      {
        subtitle: 'Baixo',
        text: 'Geralmente acompanha a queda da hemoglobina nas anemias.',
      },
      {
        subtitle: 'Alto',
        text: 'Pode indicar desidratação ou aumento da massa de hemácias.',
      },
    ],
  },
  {
    label: 'RBC',
    unit: 'M/ML',
    title: 'Hemácias',
    image: require('../assets/images/exame.png'),
    pages: [
      {
        subtitle: 'O que é?',
        text: 'O RBC representa a quantidade de hemácias no sangue. Ele ajuda a entender se a anemia é causada por produção inadequada ou por alterações genéticas.',
      },
      {
        subtitle: 'RBC alto',
        text: 'Se a hemoglobina estiver baixa e o RBC estiver alto, o quadro sugere talassemia, onde há muitas hemácias, porém com baixa eficiência.',
      },
      {
        subtitle: 'RBC baixo',
        text: 'Se a hemoglobina estiver baixa e o RBC baixo, indica produção reduzida de hemácias, comum em anemias por deficiência nutricional ou doenças da medula.',
      },
    ],
  },
  {
    label: 'VCM',
    unit: 'FL',
    title: 'VCM',
    image: require('../assets/images/exame.png'),
    pages: [
      {
        subtitle: 'O que é?',
        text: 'O VCM indica o tamanho médio das hemácias. Ele é fundamental para classificar a anemia em microcítica, normocítica ou macrocítica.',
      },
      {
        subtitle: 'Microcítica',
        text: 'Quando o VCM é menor que 80, indica anemia microcítica. O próximo passo é avaliar o RDW para diferenciar ferropriva de talassemia.',
      },
      {
        subtitle: 'Normocítica',
        text: 'Entre 80 e 100, indica anemia normocítica. O RDW ajuda a diferenciar anemia de doença crônica de anemia mista.',
      },
      {
        subtitle: 'Macrocítica',
        text: 'Acima de 100, indica anemia macrocítica. A análise do RDW ajuda a identificar deficiência de B12/folato ou causas hepáticas e alcoolismo.',
      },
    ],
  },
  {
    label: 'RDW',
    unit: '%',
    title: 'RDW',
    image: require('../assets/images/exame.png'),
    pages: [
      {
        subtitle: 'O que é?',
        text: 'O RDW mede a variação do tamanho das hemácias. Ele é essencial para diferenciar tipos de anemia após a classificação pelo VCM.',
      },
      {
        subtitle: 'Microcítica',
        text: 'Na anemia microcítica: RDW alto sugere anemia ferropriva. RDW normal sugere talassemia.',
      },
      {
        subtitle: 'Normocítica',
        text: 'Na normocítica: RDW normal sugere anemia de doença crônica. RDW alto sugere anemia mista.',
      },
      {
        subtitle: 'Macrocítica',
        text: 'Na macrocítica: RDW alto indica deficiência de B12 ou folato. RDW normal sugere alcoolismo ou doença hepática.',
      },
    ],
  },
  {
    label: 'HCM',
    unit: 'PG',
    title: 'HCM',
    image: require('../assets/images/exame.png'),
    pages: [
      {
        subtitle: 'O que é?',
        text: 'O HCM indica a quantidade de hemoglobina dentro de cada hemácia, refletindo sua coloração.',
      },
      {
        subtitle: 'Baixo',
        text: 'Quando está baixo, indica hipocromia, comum na anemia ferropriva, onde há deficiência de ferro.',
      },
      {
        subtitle: 'Uso clínico',
        text: 'É usado junto com VCM e CHCM para avaliar o tipo de anemia e sua causa.',
      },
    ],
  },
];

export default function ContentHemogramaScreen() {
  const router = useRouter();
  const MAX_VISIBLE_EXAMS = 6;

  const [selectedExamIndex, setSelectedExamIndex] = useState(2);
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);
  

  const selectedExam = exams[selectedExamIndex];

  const pages =
    selectedExam.pages ??
    [
      {
        subtitle: 'O que é?',
        text: 'Conteúdo educativo em desenvolvimento para este tópico do hemograma.',
      },
    ];

  const currentPage = pages[selectedPageIndex];
    const visibleExams = exams.slice(
    carouselStartIndex,
    carouselStartIndex + MAX_VISIBLE_EXAMS
  );

  function nextExamGroup() {
    setCarouselStartIndex(prev => {
      const next = prev + 1;
      const maxStart = exams.length - MAX_VISIBLE_EXAMS;

      if (next > maxStart) return prev;

      return next;
    });
  }

  function previousExamGroup() {
    setCarouselStartIndex(prev => {
      const previous = prev - 1;

      if (previous < 0) return prev;

      return previous;
    });
  }

  function selectExam(index: number) {
    setSelectedExamIndex(index);
    setSelectedPageIndex(0);
  }    
  function nextPage() {
    setSelectedPageIndex(prev => {
      if (prev >= pages.length - 1) return 0;
      return prev + 1;
    });
  }

  function previousPage() {
    setSelectedPageIndex(prev => {
      if (prev <= 0) return pages.length - 1;
      return prev - 1;
    });
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

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
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageCircle}>
          <Image
            source={selectedExam.image ?? require('../assets/images/exame.png')}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleNavigation}>
          <TouchableOpacity onPress={previousPage} style={styles.sideArrow}>
            <Ionicons name="chevron-back" size={26} color="#7EA2FF" />
          </TouchableOpacity>

          <View style={styles.examTitleArea}>
            <Text style={styles.examTitle}>{selectedExam.title}</Text>
            <Text style={styles.examSubtitle}>{currentPage.subtitle}</Text>
          </View>

          <TouchableOpacity onPress={nextPage} style={styles.sideArrow}>
            <Ionicons name="chevron-forward" size={26} color="#7EA2FF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{currentPage.text}</Text>

        <View style={styles.dotsContainer}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                selectedPageIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomCarousel}>
        <TouchableOpacity
          style={styles.carouselArrow}
          onPress={previousExamGroup}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={carouselStartIndex === 0 ? '#B9C9FF' : '#2563EB'}
          />
        </TouchableOpacity>
              
        <View style={styles.examOptions}>
          {visibleExams.map((exam, visibleIndex) => {
            const realIndex = carouselStartIndex + visibleIndex;
          
            const isSelected = selectedExamIndex === realIndex;
            const isNear = Math.abs(selectedExamIndex - realIndex) === 1;
          
            return (
              <TouchableOpacity
                key={realIndex}
                onPress={() => selectExam(realIndex)}
                style={[
                  styles.examOption,
                  isSelected && styles.selectedExamOption,
                ]}
              >
                <Text
                  style={[
                    styles.examOptionLabel,
                    isSelected && styles.selectedExamOptionLabel,
                    isNear && !isSelected && styles.nearExamOptionLabel,
                  ]}
                >
                  {exam.label}
                </Text>
                
                <Text
                  style={[
                    styles.examOptionUnit,
                    isSelected && styles.selectedExamOptionUnit,
                    isNear && !isSelected && styles.nearExamOptionUnit,
                  ]}
                >
                  {exam.unit}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
        <TouchableOpacity
          style={styles.carouselArrow}
          onPress={nextExamGroup}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={
              carouselStartIndex >= exams.length - MAX_VISIBLE_EXAMS
                ? '#B9C9FF'
                : '#2563EB'
            }
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
  },


  headerTitleArea: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 26,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  headerSubtitle: {
    color: '#1D4ED8',
    fontSize: 10,
    marginTop: -4,
    
    fontFamily: 'LeagueSpartan-Medium',
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  imageCircle: {
    width: 155,
    height: 155,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 28,
  },

  mainImage: {
    width: 155,
    height: 155,
    borderRadius: 100,
    backgroundColor: '#87A8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 28,
  },

  titleNavigation: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sideArrow: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  examTitleArea: {
    alignItems: 'center',
  },

  examTitle: {
    color: '#2563EB',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  examSubtitle: {
    color: '#111827',
    fontSize: 17,
    marginTop: -4,
    fontFamily: 'LeagueSpartan-Regular',
  },

  description: {
    marginTop: 28,
    color: '#000000',
    fontSize: 19,
    lineHeight: 21,
    textAlign: 'justify',
    fontFamily: 'LeagueSpartan-Regular',
    paddingHorizontal: 20,
  },

  dotsContainer: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 34,
    marginBottom: 10,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: '#D1D5DB',
  },

  activeDot: {
    backgroundColor: '#111827',
  },

  bottomCarousel: {
    height: 92,
    backgroundColor: '#CAD6FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  carouselArrow: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  examOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  examOption: {
    width: 40,
    height: 58,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedExamOption: {
    backgroundColor: '#2563EB',
    width: 44,
    height: 60,
  },

  examOptionLabel: {
    color: '#B9C9FF',
    fontSize: 19,
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  nearExamOptionLabel: {
    color: '#111827',
  },

  selectedExamOptionLabel: {
    color: '#FFFFFF',
  },

  examOptionUnit: {
    color: '#B9C9FF',
    fontSize: 9,
    marginTop: -2,
    fontFamily: 'LeagueSpartan-Regular',
  },

  nearExamOptionUnit: {
    color: '#111827',
  },

  selectedExamOptionUnit: {
    color: '#FFFFFF',
  },
});