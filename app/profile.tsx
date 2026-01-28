import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

          <Text style={styles.userName}>John Doe</Text>
        </View>

        {/* FORMULÁRIO */}
        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            value="John Doe"
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value="+123 567 89000"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value="johndoe@example.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            placeholder="DD / MM / YYYY"
            placeholderTextColor="#2563EB"
          />

          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Atualizar Perfil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
});
