import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import {
  Silkscreen_400Regular,
  Silkscreen_700Bold,
} from '@expo-google-fonts/silkscreen';
import RootNavigator from './src/navigation/RootNavigator';
import { SPLASH_DURATION_MS, IMAGE_URLS } from './src/utils/constants';
import { colors } from './src/theme/colors';

// Keep native splash visible while loading
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
    Silkscreen_400Regular,
    Silkscreen_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;

    const timer = setTimeout(() => {
      setAppIsReady(true);
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.splash} onLayout={onLayoutRootView}>
        <Image
          source={IMAGE_URLS.heroLogo}
          style={styles.splashLogo}
          resizeMode="contain"
          accessibilityLabel="TechStorm 2026"
        />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style="light" />
        <RootNavigator />
      </View>
    </NavigationContainer>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    width: width * 0.85,
    maxWidth: 350,
    aspectRatio: 2.5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
