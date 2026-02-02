import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const handleRegister = async () => {
    setError('');

    if (!name || !email || !password || !dob) {
      setError('Preencha todos os campos.');
      return;
    }

    // Validação simples de email
    if (!email.includes('@') || !email.includes('.')) {
      setError('Email inválido.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.1.7:3333/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, dob }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao cadastrar.');
      } else {
        setShowSuccessModal(true);

      }
    } catch (err) {
      console.log(err);
      setError('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    
    <View style={styles.container}>
      

          <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Conta</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.form}>
        

        {/* Nome */}
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="exemplo@exemplo.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Senha */}
        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#2563EB"
            />
          </TouchableOpacity>
        </View>

        {/* Data de Nascimento */}
        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          placeholder="DD / MM / YYYY"
          placeholderTextColor="#9CA3AF"
          value={dob}
          onChangeText={setDob}
        />
        {/* ERRO */}
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        {/* Termos */}
        <TouchableOpacity
          onPress={() => router.push('/PrivacyPolicyScreen')}
          activeOpacity={0.7}
        >
          <Text style={styles.terms}>
            Ao continuar, você concorda com os{' '}
            <Text style={styles.link}>Termos de Uso</Text> e{' '}
            <Text style={styles.link}>Política de Privacidade</Text>.
          </Text>
        </TouchableOpacity>

        {/* Botão */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerText}>
            {loading ? 'Cadastrando...' : 'Cadastrar-se'}
          </Text>
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

        {/* Footer */}
        <Text style={styles.footer}>
          Já tem uma conta?{' '}
          <Text style={styles.link} onPress={() => router.push('/login')}>
            Entrar
          </Text>
        </Text>
      </View>
      {showSuccessModal && (
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Cadastro realizado </Text>

          <Text style={styles.modalText}>
            Seu e-mail foi cadastrado com sucesso.
            Agora você já pode acessar sua conta.
          </Text>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setShowSuccessModal(false);
                router.replace('/login');
              }}
            >
              <Text style={styles.cancelButton}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 56, paddingBottom: 12 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 26, color: '#2563EB', fontFamily: 'LeagueSpartan-SemiBold' },
  form: { paddingHorizontal: 24, marginTop: 24 },
  label: { fontSize: 20, fontFamily: 'LeagueSpartan-Medium', marginBottom: 6 },
  input: { backgroundColor: '#EEF2FF', borderRadius: 14, paddingHorizontal: 16, height: 56, fontSize: 18, fontFamily: 'LeagueSpartan-Regular', marginBottom: 10 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', borderRadius: 12, paddingHorizontal: 14, marginBottom: 16 },
  passwordInput: { flex: 1, paddingVertical: 14, fontFamily: 'LeagueSpartan-Regular', fontSize: 15 },
  terms: { textAlign: 'center', fontSize: 13, marginBottom: 15, marginTop: 10 },
  link: { color: '#2563EB', fontFamily: 'LeagueSpartan-SemiBold' },
  registerButton: { backgroundColor: '#2563EB', paddingVertical: 11, borderRadius: 30, alignItems: 'center', width: '70%', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 12, elevation: 6, alignSelf: 'center' },
  registerText: { color: '#FFFFFF', fontSize: 22, fontFamily: 'LeagueSpartan-SemiBold' },
  orText: { textAlign: 'center', fontSize: 13, marginBottom: 12, marginTop: 12 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 15 },
  socialButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  footer: { textAlign: 'center', fontSize: 13 },
  error: { color: '#DC2626', fontSize: 14, marginBottom: 10, fontFamily: 'LeagueSpartan-SemiBold', alignSelf: 'center'},
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

confirmButton: {
  paddingVertical: 10,
  paddingHorizontal: 18,
  borderRadius: 20,
  backgroundColor: "#2563EB",
},

confirmText: {
  fontSize: 14,
  fontFamily: "LeagueSpartan-SemiBold",
  color: "#FFFFFF",
},

});
