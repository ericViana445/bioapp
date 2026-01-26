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

export default function RegisterScreen() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Nova Conta</Text>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        {/* Nome */}
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#9CA3AF"
        />

        {/* Senha */}
        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#2563EB"
            />
          </TouchableOpacity>
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="exemplo@exemplo.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Data */}
        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          placeholder="DD / MM / YYYY"
          placeholderTextColor="#9CA3AF"
        />

        {/* Termos */}
        <Text style={styles.terms}>
          Ao continuar, você concorda com os{' '}
          <Text style={styles.link}>Termos de Uso</Text> e{' '}
          <Text style={styles.link}>Política de Privacidade</Text>.
        </Text>

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.registerText}>Cadastrar-se</Text>
        </TouchableOpacity>
          

        {/* SOCIAL */}
        <Text style={styles.orText}>Ou cadastrar-se com</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={22} color="#2563EB" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={22} color="#2563EB" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="finger-print" size={22} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Já tem uma conta?{' '}
          <Text
            style={styles.link}
            onPress={() => router.push('/login')}
          >
            Entrar
          </Text>
        </Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  form: {
    paddingHorizontal: 24,
    marginTop: 24,
  },

  label: {
    fontSize: 20,
    fontFamily: 'LeagueSpartan-Medium',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontFamily: 'LeagueSpartan-regul',
    fontSize: 15,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontFamily: 'LeagueSpartan-regular',
    fontSize: 15,
  },

  terms: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 15,
    marginTop: 10,
  },

  link: {
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  registerButton: {
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

  registerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  orText: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 12,
    marginTop: 12,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 15,
  },

  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    textAlign: 'center',
    fontSize: 13,
  },
});
