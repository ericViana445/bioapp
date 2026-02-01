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


export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function handleLogin() {
    setError('');

    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    // validação simples de email
    if (!email.includes('@') || !email.includes('.')) {
      setError('Email inválido.');
      return;
    }

    // aqui futuramente entra o BACKEND
    // por enquanto simulamos sucesso
    router.replace('/home');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Entrar</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>Bem-Vindo</Text>

        <Text style={styles.description}>
          O Bio App ajuda você a compreender exames laboratoriais de forma clara
          e educativa.
        </Text>

        

        {/* EMAIL */}
        <Text style={styles.label}>Email ou número</Text>
        <TextInput
          style={styles.input}
          placeholder="exemplo@exemplo.com"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
        />

        {/* SENHA */}
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

        <TouchableOpacity onPress={() => router.push('forgot-password')}>
          <Text style={styles.forgot}>Esqueceu a Senha?</Text>
        </TouchableOpacity>

        {/* ERRO */}
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
      </View>

          

        {/* SOCIAL */}
        <Text style={styles.orText}>Ou cadastrar-se com</Text>

        <View style={styles.socialRow}>
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
        </View>

        {/* CADASTRO */}
        <Text style={styles.signupText}>
          Não tem uma conta?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => router.push('/register')}
          >
            Cadastrar-se
          </Text>f
        </Text>
                      
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  error: {
  color: '#DC2626',
  fontSize: 14,
  marginBottom: 10,
  fontFamily: 'LeagueSpartan-SemiBold',
  alignSelf: 'center',
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

  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  welcome: {
    fontSize: 26,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
    marginBottom: 8,
  },

  description: {
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
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 18,
    fontFamily: "LeagueSpartan-Regular",
    marginBottom: 10,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingHorizontal: 14,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontFamily: 'LeagueSpartan-regular',
    fontSize: 15,
  },

  eyeIcon: {
      width: 22,
      height: 22,
    },


  forgot: {
    marginTop: 5,
    alignSelf: "flex-end",
    fontSize: 16,
    color: "#2563EB",
    fontFamily: "LeagueSpartan-SemiBold",
    marginBottom: 10,
  },

  loginButton: {
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


  loginText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  orText: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 12,
    marginTop: 14,
  },
  
  socialIcon: {
      width: 22,
      height: 22,
    },

    socialIconFacebook: {
      width: 27,   // 👈 menor
      height: 27,
    },

    socialIconDigital: {
      width: 26,   // 👈 maior
      height: 26,
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
    backgroundColor: '#CAD6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  signupText: {
    textAlign: 'center',
    fontSize: 13,
  },

  signupLink: {
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-SemiBold',
  },
});
