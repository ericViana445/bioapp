import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'LeagueSpartan-Thin': require('../assets/fonts/LeagueSpartan-Thin.ttf'),
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <>
      <Stack
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',        // 👈 ESSENCIAL
          animationDuration: 600,   // suave
        }}
      />
      
    </>
  );
}
