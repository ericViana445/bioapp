import { Ionicons } from '@expo/vector-icons';
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
  // 🔹 começa vazio
  const [exams, setExams] = useState<any[]>([]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={require('../assets/images/avatar.png')} // pode trocar depois
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
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>Meus Exames</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inactiveTab}>
          <Text style={styles.inactiveTabText}>Informações</Text>
        </TouchableOpacity>
      </View>

      {/* ADD EXAM */}
      <TouchableOpacity style={styles.addExam}>
        <View style={styles.plusCircle}>
          <Ionicons name="add" size={26} color="#2563EB" />
        </View>
        <Text style={styles.addExamText}>Adicionar novo exame</Text>
      </TouchableOpacity>

      {/* HISTÓRICO */}
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
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View style={styles.examCard}>
              <View style={styles.examInner}>
                <Text style={styles.examTitle}>{item.title}</Text>
                <Text style={styles.examSubtitle}>{item.description}</Text>
              </View>
            </View>
          )}
        />
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
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E6EEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#DDE6FF',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },

  addExamText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'LeagueSpartan-SemiBold',
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
});
