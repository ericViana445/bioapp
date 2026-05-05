import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ReturnDataScreen() {
  const [pdfData, setPdfData] = useState<any>(null);
  const router = useRouter();

  // 📅 DATA DE HOJE
  const today = new Date().toLocaleDateString('pt-BR');

  useEffect(() => {
    const loadData = async () => {
      const storedData = await AsyncStorage.getItem('pdfData');
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

  const ResultItem = ({ label, value, unit }: any) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>
        {value ?? '--'} {unit}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#3B6EF6" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Resultado</Text>

        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.card}>

          <View style={styles.topSection}>
            <Image
              source={require('../assets/images/exame.png')}
              style={styles.image}
            />

            
          <View style={styles.teste}>
            <View style={styles.sideBox}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>2 parâmetros</Text>
              <Text style={{ color: '#E0E7FF' }}>analisados</Text>
            </View>

            <View style={styles.sideBox2}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Hemograma</Text>
              <Text style={{ color: '#E0E7FF' }}>Resultado do exame</Text>
            </View>
          </View>

          </View>

          {/* TAG */}
          <View style={styles.tag}>
            <Text style={styles.tagText}>Hemograma</Text>
            <Text style={styles.tagSub}>Avaliação sanguínea</Text>
          </View>

          {/* DATA */}
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Data do exame</Text>
            <Text style={styles.dateValue}>{today}</Text>
          </View>

          {/* RESULTADOS */}
          <View style={styles.resultsBox}>
            <Text style={styles.sectionTitle}>Resultados</Text>

            <ResultItem label="Hemoglobina" value={pdfData.hemoglobina} unit="g/dL" />
            <ResultItem label="Hematócrito" value={pdfData.hematocrito} unit="%" />
            <ResultItem label="RBC" value={pdfData.rbc} unit="milhões/µL" />
            <ResultItem label="VCM" value={pdfData.vcm} unit="fL" />
            <ResultItem label="HCM" value={pdfData.hcm} unit="pg" />
            <ResultItem label="CHCM" value={pdfData.chcm} unit="g/dL" />
            <ResultItem label="RDW" value={pdfData.rdw} unit="%" />
          </View>

        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ir Para Atividade</Text>
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
    paddingTop: 56,
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },

  loadingText: {
    fontSize: 16,
    color: '#3B6EF6',
  },

  card: {
    backgroundColor: '#CAD6FF',
    borderRadius: 20,
    padding: 20,
  },

  

  tag: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
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

  dateBox: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },

  dateLabel: {
    fontSize: 12,
    color: '#666',
  },

  dateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2260FF',
  },

  resultsBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
  },

  sectionTitle: {
    color: '#2260FF',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },

  resultLabel: {
    fontWeight: '600',
    color: '#333',
  },

  resultValue: {
    color: '#2260FF',
    fontWeight: 'bold',
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
  topSection: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 15,
},
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  sideBox: {
    flex: 1,
    marginLeft: 15,
    backgroundColor: '#2260FF',
    padding: 15,
    borderRadius: 15,
    width: 150, 
  },

  sideBox2: {
    marginLeft: 15,
    backgroundColor: '#2260FF',
    padding: 15,
    borderRadius: 15,
    width: 150,  
    
  },
  teste: {
    marginLeft: 15,
    backgroundColor: '#CAD6FF',
    padding: 15,
    borderRadius: 15,
  },

  sideTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  sideText: {
    color: '#E0E7FF',
    fontSize: 12,
    marginTop: 4,
  },
});