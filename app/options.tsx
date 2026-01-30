import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Settings() {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);


  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Meu Perfil</Text>

        {/* Espaçador */}
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PERFIL */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../assets/images/avatar.png')}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="pencil" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>John Doe</Text>
        </View>

        {/* MENU */}
        <View style={styles.menu}>
          <MenuItem
            icon="person-outline"
            label="Perfil"
            onPress={() => router.push("/profile")}
            highlight
          />

          <MenuItem
            icon="lock-closed-outline"
            label="Política de Privacidade"
            onPress={() => router.push("/PrivacyPolicyScreen")}
          />

          <MenuItem
            icon="settings-outline"
            label="Configurações"
            onPress={() => router.push("/settings")}
          />

          <MenuItem
            icon="log-out-outline"
            label="Sair"
            onPress={() => setShowLogoutConfirm(true)}
            danger
          />

        </View>
      </ScrollView>
      {showLogoutConfirm && (
  <View style={styles.overlay}>
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>Sair da conta</Text>

      <Text style={styles.modalText}>
        Tem certeza que deseja sair da sua conta?
      </Text>

      <View style={styles.modalActions}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setShowLogoutConfirm(false)}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            setShowLogoutConfirm(false);
            // aqui você coloca o logout real depois
          }}
        >
          <Text style={styles.confirmText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)}

    </View>
  );
}

/* COMPONENTE DO ITEM */
function MenuItem({
  icon,
  label,
  onPress,
  highlight,
  danger,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  highlight?: boolean;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View
          style={[
            styles.iconCircle,
            highlight && styles.iconHighlight,
          ]}
        >
          <Ionicons
            name={icon}
            size={20}
            color={highlight ? "#2563EB" : "#2563EB"}
          />
        </View>

        <Text
          style={[
            styles.menuText,
            highlight && styles.menuTextHighlight,
            danger && styles.menuTextDanger,
          ]}
        >
          {label}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
    </TouchableOpacity>
  );
}

/* STYLES */
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
    marginBottom: 32,
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
    marginTop: 5,
    fontSize: 24,
    fontFamily: "LeagueSpartan-SemiBold",
  },

  menu: {
    paddingHorizontal: 20,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
  },

  iconHighlight: {
    backgroundColor: "#DBEAFE",
  },

  menuText: {
    fontSize: 24,
    fontFamily: "LeagueSpartan-SemiBold",
    color: "#111827",
  },

  menuTextHighlight: {
    color: "#000000",
  },

  menuTextDanger: {
    color: "#DC2626",
  },
  overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(37, 99, 235, 0.35)", // azul com transparência
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
  gap: 12,
},

cancelButton: {
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 20,
  backgroundColor: "#E5E7EB",
},

cancelText: {
  fontFamily: "LeagueSpartan-SemiBold",
  fontSize: 14,
  color: "#111827",
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
