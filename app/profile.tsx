import { API_URL } from "@/config/api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
  const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setName(parsedUser.name || '');
        setEmail(parsedUser.email || '');
        setBirthDate(parsedUser.dob || '');
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  return (

    
    <View style={styles.container}>
      {/* HEADER — mesmo padrão */}
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Perfil</Text>

        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PERFIL */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("../assets/images/avatar.png")}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="pencil" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{name}</Text>
        </View>

        {/* FORMULÁRIO */}
        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="DD / MM / YYYY"
          />

          <TouchableOpacity
            style={styles.updateButton}
            onPress={async () => {
              try {
                const storedUser = await AsyncStorage.getItem('user');
                if (!storedUser) return;
              
                const parsedUser = JSON.parse(storedUser);
              
                const response = await fetch(
                  `${API_URL}/users/${parsedUser.id}`,
                  {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name,
                      email,
                      dob: birthDate,
                    }),
                  }
                );
              
                if (!response.ok) {
                  const text = await response.text();
                  console.log("Erro do servidor:", text);
                  alert("Erro ao atualizar perfil");
                  return;
                }

                const updatedUser = await response.json();
              
                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
              
                setShowSuccessModal(true);
              
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Text style={styles.updateButtonText}>
              Atualizar Perfil
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showSuccessModal && (
  <View style={styles.overlay}>
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>Perfil atualizado</Text>

      <Text style={styles.modalText}>
        Suas informações foram atualizadas com sucesso.
      </Text>

      <View style={styles.modalActions}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setShowSuccessModal(false)}
        >
          <Text style={styles.confirmText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)}
    </View>
  );
}

/* STYLES — seguindo exatamente o padrão */
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
    paddingBottom: 16,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 26,
    color: "#2563EB",
    fontFamily: "LeagueSpartan-SemiBold",
  },

  profileContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E5E7EB",
  },

  editIcon: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "#2563EB",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  userName: {
    marginTop: 8,
    fontSize: 24,
    fontFamily: "LeagueSpartan-SemiBold",
  },

  form: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  label: {
    fontSize: 20,
    fontFamily: "LeagueSpartan-Medium",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: "LeagueSpartan-Regular",
  },

  updateButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 28,
    width: "70%",
    alignSelf: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },

  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
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
});
