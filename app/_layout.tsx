import { Stack } from 'expo-router';
import { AppProvider } from '@/context/AppContext';
import { colors } from '@/constants/theme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerTintColor: colors.brown,
          headerStyle: { backgroundColor: colors.cream },
          contentStyle: { backgroundColor: colors.cream },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
        <Stack.Screen name="search" options={{ title: 'Search & filters' }} />
        <Stack.Screen name="warranty" options={{ title: 'Warranty hub' }} />
        <Stack.Screen name="about" options={{ title: 'World of Le Mam' }} />
        <Stack.Screen name="care" options={{ title: 'Care instructions' }} />
        <Stack.Screen name="checkout" options={{ title: 'Guest checkout' }} />
        <Stack.Screen name="order-success" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}
