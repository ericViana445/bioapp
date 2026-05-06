import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { API_URL } from '../config/api';


export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'exams' | 'info'>('exams');
  const [exams, setExams] = useState<any[]>([]);
  const [openInfoIndex, setOpenInfoIndex] = useState<number | null>(null);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
 
  // Função de upload do PDF
  const uploadPDF = async (file: any) => {
    try {
      const formData = new FormData();
    
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: 'application/pdf',
      } as any);
    
      // 🔹 Faz a requisição para o backend
      const response = await fetch(`${API_URL}/pdf/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      // 🔹 Converte a resposta para JSON
      const data = await response.json();
    
      // 🔹 Se deu certo, redireciona e envia os dados
      if (response.ok) {
        console.log('PDF enviado com sucesso:', data);
      
        // Salva os dados no AsyncStorage para usar na página returnData
        await AsyncStorage.setItem('pdfData', JSON.stringify(data));
      
        // Redireciona para a página returnData
        router.push('/returnData');
      } else {
        console.log('Erro no envio do PDF:', data);
        alert('Erro ao enviar o PDF. Tente novamente.');
      }
    } catch (error) {
      console.log('Erro no upload do PDF:', error);
      alert('Erro no upload do PDF. Verifique sua conexão.');
    }
  };
  
  // Função para selecionar o documento
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
    
      if (!result.canceled && result.assets.length > 0) {
        const file = result.assets[0];
        console.log('PDF selecionado:', file);
      
        // 🔥 Chama o upload e espera terminar
        await uploadPDF(file);
      }
    } catch (error) {
      console.log('Erro ao selecionar PDF:', error);
      alert('Erro ao selecionar o PDF.');
    }
  };

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
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Erro ao carregar usuário:', error);
      }
    };

    loadUser();
  }, []);

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
      <TouchableOpacity
          style={styles.card}
          onPress={() => setShowDiagnosticModal(true)}
        >
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
        {showDiagnosticModal && (
          <View style={styles.overlay}>
            <View style={styles.modal}>
                
              {/* ❌ BOTÃO X */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowDiagnosticModal(false)}
              >
                <Ionicons name="close" size={22} color="#2563EB" />
              </TouchableOpacity>
                
              <Text style={styles.modalTitle}>Inserir dados</Text>
                
              <Text style={styles.modalText}>
                Como você deseja inserir os dados do exame?
              </Text>
                
              <View style={styles.modalActions}>
                
                <TouchableOpacity
                  style={styles.manualButton}
                  onPress={() => {
                    setShowDiagnosticModal(false);
                    router.push('/manualData');
                  }}
                >
                  <Text style={styles.manualText}>Manual</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={async () => {
                    setShowDiagnosticModal(false);
                    await pickDocument();
                  }}
                >
                  <Text style={styles.confirmText}>PDF</Text>
                </TouchableOpacity>
                
              </View>
            </View>
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

  modalTitle: {
    fontSize: 22,
    fontFamily: "LeagueSpartan-SemiBold",
    color: "#111827",
    marginBottom: 8,
  },

  modalText: {
    fontSize: 14,
    fontFamily: "LeagueSpartan-ExtraLight",
    color: "#374151",
    lineHeight: 20,
    marginBottom: 20,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },

  cancelText: {
    fontFamily: "LeagueSpartan-SemiBold",
    fontSize: 14,
    color: "#111827",
  },

  manualButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#DBEAFE",
  },

  manualText: {
    fontFamily: "LeagueSpartan-SemiBold",
    fontSize: 14,
    color: "#2563EB",
  },

  confirmButton: {
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
});