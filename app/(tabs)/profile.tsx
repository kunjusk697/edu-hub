import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

const rows = [
  { icon: 'shield-checkmark-outline' as const, title: 'Warranty portal', path: '/warranty' },
  { icon: 'leaf-outline' as const, title: 'Care instructions', path: '/care' },
  { icon: 'globe-outline' as const, title: 'World of Le Mam', path: '/about' },
  { icon: 'search-outline' as const, title: 'Smart search', path: '/search' },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { orders, warranties } = useApp();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 40 }}>
      <View style={styles.head}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={28} color={colors.cream} />
        </View>
        <Text style={styles.title}>Guest shopper</Text>
        <Text style={styles.sub}>Checkout without an account · local orders on this device</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statN}>{orders.length}</Text>
          <Text style={styles.statL}>Orders</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statN}>{warranties.length}</Text>
          <Text style={styles.statL}>Warranties</Text>
        </View>
      </View>

      <View style={styles.list}>
        {rows.map((r) => (
          <Pressable key={r.title} style={styles.row} onPress={() => router.push(r.path as any)}>
            <Ionicons name={r.icon} size={20} color={colors.brown} />
            <Text style={styles.rowText}>{r.title}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.muted} />
          </Pressable>
        ))}
      </View>

      <Text style={styles.section}>Support helpline</Text>
      <Pressable style={styles.row} onPress={() => Linking.openURL('tel:+917356915954')}>
        <Ionicons name="call-outline" size={20} color={colors.brown} />
        <Text style={styles.rowText}>+91 73569 15954</Text>
      </Pressable>
      <Pressable style={styles.row} onPress={() => Linking.openURL('mailto:info@lemam.in')}>
        <Ionicons name="mail-outline" size={20} color={colors.brown} />
        <Text style={styles.rowText}>info@lemam.in</Text>
      </Pressable>
      <Pressable style={styles.row} onPress={() => Linking.openURL('https://www.lemam.in')}>
        <Ionicons name="open-outline" size={20} color={colors.brown} />
        <Text style={styles.rowText}>www.lemam.in</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: 20 },
  head: { alignItems: 'center', marginBottom: 18, gap: 6 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.brown,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.brownDeep },
  sub: { color: colors.muted, textAlign: 'center' },
  stats: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  stat: {
    flex: 1,
    backgroundColor: colors.ivory,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
  },
  statN: { fontSize: 22, fontWeight: '800', color: colors.brown },
  statL: { color: colors.muted, fontSize: 12 },
  list: { gap: 8, marginBottom: 18 },
  section: { fontWeight: '800', color: colors.text, marginBottom: 8, marginTop: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.ivory,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 8,
  },
  rowText: { flex: 1, fontWeight: '700', color: colors.text },
});
