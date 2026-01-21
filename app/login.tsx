import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';


export default function LoginScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

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

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.welcome}>Bem-Vindo</Text>

        <Text style={styles.description}>
          O Bio App ajuda você a compreender exames laboratoriais de forma clara
          e educativa, explicando cada resultado e seus valores de referência,
          para que você tenha mais conhecimento ao conversar com seu médico.
        </Text>

        {/* EMAIL */}
        <Text style={styles.label}>Email ou número</Text>
        <TextInput
          style={styles.input}
          placeholder="exemplo@exemplo.com"
          placeholderTextColor="#9CA3AF"
        />

        {/* SENHA */}
        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="************"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!passwordVisible}

          />
          <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Image
                source={
                  passwordVisible
                    ? require('../assets/images/open-eyes-password.png')
                    : require('../assets/images/eyes-password.png')
                }
                style={styles.eyeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            

        </View>

        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueci minha senha</Text>
        </TouchableOpacity>

        {/* BOTÃO */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>

        {/* SOCIAL */}
        <Text style={styles.orText}>Ou cadastrar-se com</Text>

        <View style={styles.socialRow}>
          <View style={styles.socialButton}>
              <Image
                source={require('../assets/images/G.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </View>

          <View style={styles.socialButton}>
              <Image
                source={require('../assets/images/F.png')}
                style={styles.socialIconFacebook}
                resizeMode="contain"
              />
            </View>
          <View style={styles.socialButton}>
              <Image
                source={require('../assets/images/Digital.png')}
                style={styles.socialIconDigital}
                resizeMode="contain"
              />
            </View>
        </View>

        {/* CADASTRO */}
        <Text style={styles.signupText}>
          Não tem uma conta?{' '}
          <Text style={styles.signupLink}>Cadastrar-se</Text>
        </Text>
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
    color: '#2563EB',
    fontSize: 13,
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 24,
  },

  loginButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
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
    fontSize: 24,
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
    marginBottom: 24,
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
