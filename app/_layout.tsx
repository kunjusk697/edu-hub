import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { AppProvider } from '@/context/AppContext';
import { colors } from '@/constants/theme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <AppProvider>
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="dark" />
        <SplashGate />
      </ThemeProvider>
    </AppProvider>
  );
}

function SplashGate() {
  const [showSplash, setShowSplash] = useState(true);
  const opacity = useState(() => new Animated.Value(1))[0];

  useEffect(() => {
    const t = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 420, useNativeDriver: true }).start(() => {
        setShowSplash(false);
      });
    }, 1600);
    return () => clearTimeout(t);
  }, [opacity]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <Stack screenOptions={{ headerTintColor: colors.brown, headerStyle: { backgroundColor: colors.cream } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
        <Stack.Screen name="search" options={{ title: 'Search & filters' }} />
        <Stack.Screen name="warranty" options={{ title: 'Warranty hub' }} />
        <Stack.Screen name="about" options={{ title: 'World of Le Mam' }} />
        <Stack.Screen name="care" options={{ title: 'Care instructions' }} />
        <Stack.Screen name="checkout" options={{ title: 'Guest checkout' }} />
        <Stack.Screen name="order-success" options={{ headerShown: false }} />
      </Stack>
      {showSplash ? (
        <Animated.View style={[styles.splash, { opacity }]} pointerEvents="none">
          <View style={styles.mark}>
            <Ionicons name="restaurant" size={36} color={colors.cream} />
          </View>
          <Text style={styles.brand}>Le Mam</Text>
          <Text style={styles.tag}>Kitchenware</Text>
          <Text style={styles.ethos}>Health is homemade</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.brownDeep,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  mark: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: colors.brownSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  brand: { color: colors.cream, fontSize: 40, fontWeight: '800', letterSpacing: 1 },
  tag: { color: colors.gold, fontSize: 16, letterSpacing: 4, textTransform: 'uppercase', marginTop: 4 },
  ethos: { color: colors.cream, opacity: 0.8, marginTop: 18, fontStyle: 'italic' },
});
