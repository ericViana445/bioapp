import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  // 🔹 ADICIONADO: controle de opacidade
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000, // suavidade da transição
        useNativeDriver: true,
      }).start(() => {
        router.replace('/');
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <Animated.View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require('../assets/images/logo-splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bio</Text>
      <Text style={styles.title}>App</Text>

      <Text style={styles.subtitle}>
        Entenda Seus Exames, De{'\n'}
        Forma Simples
      </Text>
     </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
   logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  title: {
    fontSize: 48,
    color: '#FFFFFF',
    fontFamily: 'LeagueSpartan-Thin',
    lineHeight: 48,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'LeagueSpartan-SemiBold',
  },
});
