import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/splash');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* TOPO */}
      <View style={styles.topSection}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Bio</Text>
        <Text style={styles.title}>App</Text>

        <Text style={styles.subtitle}>
          Entenda Seus Exames, De{ '\n' }
          Forma Simples
        </Text>
      </View>

      {/* MEIO */}
      <Text style={styles.disclaimer}>
        Este aplicativo possui finalidade exclusivamente educativa e não
        fornece diagnóstico, tratamento ou prescrição médica. Sempre consulte
        um profissional de saúde qualificado.
      </Text>

      {/* BASE */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>
          

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.signupText}>Cadastrar-se</Text>
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

  topSection: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    transform: [{ translateY: -140 }],
  },

  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },

  title: {
    fontSize: 48,
    color: '#2563EB',
    fontFamily: 'LeagueSpartan-Thin',
    lineHeight: 48,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#2563EB',
    textAlign: 'center',
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  disclaimer: {
    fontSize: 12,
    color: '#111111',
    textAlign: 'center',
    fontFamily: 'LeagueSpartan-light',
    paddingHorizontal: 24,
    marginTop: 600,
    lineHeight: 18,
    marginLeft: 20,
    marginRight: 20,
  },

  buttonSection: {
    marginBottom: 48,
    marginTop: 16,
    alignItems: 'center',
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
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-SemiBold',
  },

  signupButton: {
    marginTop: 12,
    backgroundColor: '#E6EEFF',
    paddingVertical: 11,
    borderRadius: 30,
    alignItems: 'center',
    width: '70%',
  },

  signupText: {
    color: '#2563EB',
    fontSize: 22,
    fontFamily: 'LeagueSpartan-SemiBold',
  },
});
