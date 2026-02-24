import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  // 🔹 ADICIONADO: controle de opacidade
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
    
      // animação de fade
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        if (token) {
          router.replace('/home');
        } else {
          router.replace('/');
        }
      });
    };
  
    // pequena pausa só para mostrar splash
    const timer = setTimeout(() => {
      checkLogin();
    }, 1500);
  
    return () => clearTimeout(timer);
  }, []);


  return (
    <Animated.View style={[styles.container, { opacity }]}>
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
