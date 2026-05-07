import { API_URL } from '@/config/api';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  const { email } = useLocalSearchParams<{ email: string }>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isValid =
    password.length >= 8 && password === confirmPassword;

  async function handleResetPassword() {
    try {
      setError('');
    
      if (!password || !confirmPassword) {
        setError('Preencha todos os campos.');
        return;
      }
    
      if (password.length < 8) {
        setError('A senha deve ter pelo menos 8 caracteres.');
        return;
      }
    
      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }
    
      setLoading(true);
    
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword: password,
        }),
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        setError(data.error || 'Erro ao redefinir senha.');
        return;
      }
    
      router.replace('/login');
    } catch (error) {
      console.log(error);
      setError('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Redefinir Senha</Text>

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
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        {/* BOTÃO */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isValid ? '#2563EB' : '#b1c1f5be' },
          ]}
          disabled={!isValid}
          onPress={handleResetPassword}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Salvando...' : 'Criar Nova Senha'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({

  error: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'LeagueSpartan-SemiBold',
    alignSelf: 'center',
  },
  
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 8,
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
    marginTop: 24,
  },

  subtitle: {
   fontSize: 16,
    color: "#111827",
    fontFamily: "LeagueSpartan-Regular",
    lineHeight: 22,
    marginBottom: 10,
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
    fontFamily: 'LeagueSpartan-Regular',
    fontSize: 15,
  },

  button: {
    paddingVertical: 11,
    borderRadius: 30,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    marginTop: 12,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-SemiBold',
  },
});
