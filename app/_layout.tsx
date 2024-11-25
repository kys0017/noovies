import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {router, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {useAssets} from 'expo-asset';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Image, Text, View} from 'react-native'

import {useColorScheme} from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = Font.useFonts(Ionicons.font);
  // const [loaded] = Font.useFonts({
  //   "SpaceMono": require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });
  const [assets] = useAssets([require('./../coffee.jpg')])

  useEffect(() => {
    if (loaded) {
      Image.prefetch('https://media.istockphoto.com/id/1366930330/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EC%86%90%EC%97%90-%EB%9C%A8%EA%B1%B0%EC%9A%B4-%EC%BB%A4%ED%94%BC-%EC%BB%B5.jpg?s=2048x2048&w=is&k=20&c=KKdy4ZIUyTB0GCcOiOTlMOr9jahEIGf5vAMjiR-0nD4=')
      SplashScreen.hideAsync();
      console.log('loaded!!')

      // router.navigate('/(tabs)/search')
    }
  }, [loaded]);

  if (!loaded || !assets) {
    console.log('not loaded!!')
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/*<Stack.Screen name="(tabs)" options={{headerShown: false}}/>*/}
        {/*<Stack.Screen name="+not-found"/>*/}
        <Stack.Screen name='one'/>
        <Stack.Screen name='two'/>
        <Stack.Screen name='three'/>
      </Stack>
      <StatusBar style="auto"/>
    </ThemeProvider>
  );
}