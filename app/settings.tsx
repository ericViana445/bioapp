import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


export default function Settings() {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Configurações</Text>

        {/* Espaçador */}
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* MENU */}
        <View style={styles.menu}>
          <MenuItem
            icon="key-outline"
            label="Alterar Senha"
            onPress={() => router.push("/change-password")}
          />

          <MenuItem
            icon="trash-outline"
            label="Excluir Conta"
            onPress={() => setShowDeleteConfirm(true)}
            danger
          />
            
        </View>
      </ScrollView>
      {showDeleteConfirm && (
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Excluir conta</Text>

            <Text style={styles.modalText}>
              Esta ação é permanente e não poderá ser desfeita.
              Tem certeza que deseja excluir sua conta?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDeleteConfirm(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  setShowDeleteConfirm(false);
                  // aqui entra a lógica real de deletar conta
                }}
              >
                <Text style={styles.deleteText}>Excluir</Text>
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
  danger,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={styles.iconCircle}>
          <Ionicons
            name={icon}
            size={20}
            color={danger ? "#2563EB" : "#2563EB"}
          />
        </View>

        <Text
          style={[
            styles.menuText,
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

  menu: {
    paddingHorizontal: 20,
    marginTop: 12,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
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

  menuText: {
    fontSize: 24,
    fontFamily: "LeagueSpartan-SemiBold",
    color: "#111827",
  },

  menuTextDanger: {
    color: "#000000",
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
  gap: 12,
},

cancelButton: {
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 20,
  backgroundColor: "#E5E7EB",
},

cancelText: {
  fontSize: 14,
  fontFamily: "LeagueSpartan-SemiBold",
  color: "#111827",
},

deleteButton: {
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 20,
  backgroundColor: "#DC2626",
},

deleteText: {
  fontSize: 14,
  fontFamily: "LeagueSpartan-SemiBold",
  color: "#FFFFFF",
},

});
