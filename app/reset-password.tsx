import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ResetPasswordScreen() {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isValid =
    password.length >= 8 && password === confirmPassword;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Definir Senha</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Crie uma senha segura para proteger sua conta.
          Use pelo menos 8 caracteres.
        </Text>

        {/* SENHA */}
        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={22}
              color="#2563EB"
            />
          </TouchableOpacity>
        </View>

        {/* CONFIRMAR SENHA */}
        <Text style={styles.label}>Confirmar Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons
              name={showConfirm ? 'eye-outline' : 'eye-off-outline'}
              size={22}
              color="#2563EB"
            />
          </TouchableOpacity>
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isValid ? '#2563EB' : '#b1c1f5be' },
          ]}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Criar Nova Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingTop: 56,
    paddingHorizontal: 16,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  content: {
    paddingHorizontal: 24,
    marginTop: 32,
  },

  subtitle: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'LeagueSpartan-light',
    lineHeight: 18,
    marginBottom: 24,
  },

  label: {
    fontSize: 20,
    fontFamily: 'LeagueSpartan-Medium',
    marginBottom: 6,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    fontFamily: 'LeagueSpartan-regular',
    fontSize: 15,
  },

  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 11,
    borderRadius: 30,
    alignItems: 'center',
    width: '70%',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
    alignSelf: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-SemiBold',
  },
});
