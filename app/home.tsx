import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'exams' | 'info'>('exams');
  const [exams, setExams] = useState<any[]>([]);
  const [openInfoIndex, setOpenInfoIndex] = useState<number | null>(null);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const uploadPDF = async (file: any) => {
    const formData = new FormData();

    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: 'application/pdf',
    } as any);

    await fetch('http://192.168.1.18:3333/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
    
      if (result.canceled === false) {
        const file = result.assets[0];
      
        console.log('PDF selecionado:', file);
      
        // 🔥 AQUI QUE ENTRA
        uploadPDF(file);
      }
    } catch (error) {
      console.log('Erro ao selecionar PDF:', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      };
    
      loadUser();
    }, [])
  );

  const infoExams = [
    {
      title: 'Hemograma Completo',
      description:
        'Avalia as células do sangue, auxiliando na identificação de anemias, infecções e alterações do sistema imunológico.',
    },
    { title: 'Perfil Lipídico' },
    { title: 'Glicemia em Jejum' },
    { title: 'Função Renal' },
    { title: 'PCR – Indicador inflamatório' },
  ];

  function toggleInfo(index: number) {
    setOpenInfoIndex(prev => (prev === index ? null : index));
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcome}>Olá, Bem-Vindo</Text>
            <Text style={styles.username}>
              {user ? user.name : 'Seu nome aqui'}
            </Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/options")}
          >
            <Ionicons name="settings-outline" size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardsContainer}>

      {/* CONTEÚDO */}
      <TouchableOpacity 
        style={styles.card}
        onPress={() => router.push("/contentHemogramaScreen")}
        >
        <Image
          source={require('../assets/images/books.png')}
          style={styles.cardImage}
        />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Conteúdo</Text>
          <Text style={styles.cardSubtitle}>
            Veja explicações e materiais de apoio
          </Text>
        </View>
      </TouchableOpacity>

      {/* DIAGNÓSTICO */}
      <TouchableOpacity style={styles.card} onPress={pickDocument}>
        <Image
          source={require('../assets/images/exame.png')}
          style={styles.cardImage}
        />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Diagnóstico</Text>
          <Text style={styles.cardSubtitle}>
            Envie seus parâmetros
          </Text>
        </View>
      </TouchableOpacity>

      {/* ATIVIDADES */}
      <TouchableOpacity style={styles.card}>
        <Image
          source={require('../assets/images/study.png')}
          style={styles.cardImage}
        />
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>Atividades</Text>
          <Text style={styles.cardSubtitle}>
            Teste seus conhecimentos
          </Text>
        </View>
      </TouchableOpacity>

    </View>


          {/* ABA INFORMAÇÕES (ACCORDION) */}
          {activeTab === 'info' && (
            <View>
              {infoExams.map((item, index) => {
                const isOpen = openInfoIndex === index;
              
                return (
                  <View key={index}>
                    {/* CARD AZUL (APENAS O TÍTULO) */}
                    <TouchableOpacity
                      style={styles.infoCard}
                      onPress={() => toggleInfo(index)}

                    >

                      <Text style={[styles.infoTitle, { marginLeft: 10 }]}>
                        {item.title}
                      </Text>
                
                      <Ionicons
                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                
                    {/* DESCRIÇÃO (CARD SEPARADO) */}
                {isOpen && item.description && (
                  <>
                    <View style={styles.infoDescription}>
                      <Text style={styles.infoText}>{item.description}</Text>
                    </View>
                
                    <TouchableOpacity
                      style={styles.infoButton}
                      onPress={() => router.push("/exam-details")}
                    >
                      <Text style={styles.infoButtonText}>Saber mais</Text>
                    </TouchableOpacity>
                                    
                  </>
                )}
              </View>
            );

          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 56,
    marginBottom: 20,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  welcome: {
    fontSize: 12,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-Medium',
  },

  username: {
    fontSize: 16,
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },

  iconButton: {
    width: 37,
    height: 37,
    borderRadius: 50,
    backgroundColor: '#E6EEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardsContainer: {
    marginTop: 50,
    gap: 20,
  },

  card: {
    backgroundColor: '#CAD6FF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 140,
  },

  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginRight: 16,
  },

  cardText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  cardSubtitle: {
    fontSize: 13,
    color: '#1F2937',
    marginTop: 4,
  },

  infoCard: {
    backgroundColor: '#2563EB',
    borderRadius: 35,
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoTitle: {
    color: '#FFFFFF',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: 17,
  },

  infoDescription: {
    backgroundColor: '#DDE6FF',
    borderRadius: 14,
    padding: 12,
  },

  infoText: {
    fontSize: 14,
    marginBottom: 14,
    marginTop: 14,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'LeagueSpartan-extraLight',
  },

  infoButton: {
    backgroundColor: '#DDE6FF',
    borderRadius: 35,
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  infoButtonText: {
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-Medium',
    fontSize: 17,
    marginTop: -8,
    marginBottom: -8,
  },
});