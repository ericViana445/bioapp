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


export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.title}>Esqueci senha</Text>

        <Text style={styles.subtitle}>
          Por favor, insira seu email cadastrado para receber o codigo de verificação e redefinir sua senha.
        </Text>

        <Text style={styles.label}>Seu Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={[
            styles.resetButton,
            { backgroundColor: email ? '#2563EB' : '#b1c1f5be' },
          ]}
          disabled={!email}
          onPress={() => router.push('/verify-code')}
        >
          <Text style={styles.resetText}>Verificar Email</Text>
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
    paddingTop: 56,
    paddingHorizontal: 16,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: 24,
    marginTop: 32,
  },

  title: {
    fontSize: 26,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
    marginBottom: 8,
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

  input: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontFamily: 'LeagueSpartan-regul',
    fontSize: 15,
  },

  resetButton: {
    backgroundColor: '#b1c1f5be',
    paddingVertical: 11,
    borderRadius: 30,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },


  resetText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-SemiBold',
  },
});
