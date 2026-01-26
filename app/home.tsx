import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'exams' | 'info'>('exams');
  const [exams, setExams] = useState<any[]>([]);
  const [openInfoIndex, setOpenInfoIndex] = useState<number | null>(null);
  const router = useRouter();

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
            <Text style={styles.welcome}>Olá, Bem-Vindo de Volta</Text>
            <Text style={styles.username}>John Doe</Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={20} color="#2563EB" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="options-outline" size={18} color="#2563EB" />
        <Text style={styles.searchPlaceholder}>Buscar exame</Text>
        <Ionicons name="search-outline" size={18} color="#2563EB" />
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={activeTab === 'exams' ? styles.activeTab : styles.inactiveTab}
          onPress={() => setActiveTab('exams')}
        >
          <Text
            style={
              activeTab === 'exams'
                ? styles.activeTabText
                : styles.inactiveTabText
            }
          >
            Meus Exames
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={activeTab === 'info' ? styles.activeTab : styles.inactiveTab}
          onPress={() => setActiveTab('info')}
        >
          <Text
            style={
              activeTab === 'info'
                ? styles.activeTabText
                : styles.inactiveTabText
            }
          >
            Informações
          </Text>
        </TouchableOpacity>
      </View>

      {/* ABA MEUS EXAMES */}
      {activeTab === 'exams' && (
        <>
          <TouchableOpacity style={styles.addExam}>
            <View style={styles.plusCircle}>
              <Ionicons name="add" size={26} color="#2563EB" />
            </View>
            <Text style={styles.addExamText}>Adicionar novo exame</Text>
          </TouchableOpacity>

          {exams.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Nenhum exame ainda</Text>
              <Text style={styles.emptySubtitle}>
                Adicione seu primeiro exame para começar seu histórico.
              </Text>
            </View>
          ) : (
            <FlatList
              data={exams}
              keyExtractor={(_, index) => String(index)}
              renderItem={({ item }) => (
                <View style={styles.examCard}>
                  <View style={styles.examInner}>
                    <Text style={styles.examTitle}>{item.title}</Text>
                    <Text style={styles.examSubtitle}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              )}
            />
          )}
        </>
      )}

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

  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#DDE6FF',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  searchPlaceholder: {
    fontSize: 13,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-Medium',
  },

  tabs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },

  activeTab: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },

  activeTabText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  inactiveTab: {
    flex: 1,
    backgroundColor: '#E6EEFF',
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },

  inactiveTabText: {
    color: '#2563EB',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  addExam: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },

  plusCircle: {
    backgroundColor: '#FFFFFF',
    width: 52,
    height: 51,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },

  addExamText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'LeagueSpartan-Medium',
  },

  emptyState: {
    alignItems: 'center',
    marginTop: 32,
  },

  emptyTitle: {
    fontSize: 16,
    fontFamily: 'LeagueSpartan-SemiBold',
    marginBottom: 6,
  },

  emptySubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 240,
  },

  examCard: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
  },

  examInner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
  },

  examTitle: {
    fontSize: 14,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  examSubtitle: {
    fontSize: 11,
    color: '#374151',
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

  infoHeader: {
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
    height: 'auto',
  },  
  infoText: {
    fontSize: 14,
    marginBottom: 14,
    marginTop: 14,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'LeagueSpartan-extraLight',
    justifyContent: 'center', // vertical
    alignItems: 'center',     // horizontal
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
