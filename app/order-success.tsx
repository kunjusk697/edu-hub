import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/constants/theme';
import { formatInr } from '@/data/products';

export default function OrderSuccessScreen() {
  const { id, total, name } = useLocalSearchParams<{ id: string; total?: string; name?: string }>();
  const router = useRouter();
  const amount = total ? formatInr(Number(total)) : null;

  return (
    <View style={styles.screen}>
      <Text style={styles.kicker}>Order confirmed</Text>
      <Text style={styles.title}>Thank you</Text>
      <Text style={styles.body}>
        {id
          ? `${id}${amount ? ` · ${amount}` : ''} will be collected on delivery${name ? ` to ${name}` : ''}.`
          : 'Your guest order is saved on this device.'}
      </Text>
      <Pressable style={styles.cta} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.ctaText}>Back home</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/(tabs)/catalog')}>
        <Text style={styles.link}>Continue browsing</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center', padding: 28 },
  kicker: { color: colors.goldDeep, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontSize: 36, fontWeight: '800', color: colors.brownDeep, marginVertical: 8 },
  body: { textAlign: 'center', color: colors.muted, lineHeight: 22, marginBottom: 24 },
  cta: { backgroundColor: colors.brown, borderRadius: radius.pill, paddingHorizontal: 24, paddingVertical: 14 },
  ctaText: { color: '#fff', fontWeight: '800' },
  link: { marginTop: 16, color: colors.brown, fontWeight: '700' },
});
