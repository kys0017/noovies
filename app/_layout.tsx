import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useAssets } from 'expo-asset';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useColorScheme } from '@/hooks/useColorScheme';
import { darkTheme, lightTheme } from '@/theme';
import { ThemeProvider } from 'styled-components/native';
import { BLACK_COLOR } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [loaded] = Font.useFonts(Ionicons.font);
  const [assets] = useAssets([require('./../coffee.jpg')]);

  useEffect(() => {
    if (loaded) {
      Image.prefetch(
        'https://media.istockphoto.com/id/1366930330/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EC%86%90%EC%97%90-%EB%9C%A8%EA%B1%B0%EC%9A%B4-%EC%BB%A4%ED%94%BC-%EC%BB%B5.jpg?s=2048x2048&w=is&k=20&c=KKdy4ZIUyTB0GCcOiOTlMOr9jahEIGf5vAMjiR-0nD4=',
      );
      SplashScreen.hideAsync();
      console.log('loaded!!');
    }
  }, [loaded]);

  if (!loaded || !assets) {
    console.log('not loaded!!');
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Stack
          screenOptions={{
            presentation: 'modal',
            headerStyle: { backgroundColor: isDark ? BLACK_COLOR : 'white' },
            headerTitleStyle: {
              color: isDark ? 'white' : BLACK_COLOR,
            },
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="detail" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
