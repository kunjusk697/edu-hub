import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { colors, radius } from '@/constants/theme';
import {
  catalogTags,
  homeCollections,
  products,
  type CategorySlug,
  type HomeCollection,
} from '@/data/products';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const featured: { slug: CategorySlug; title: string; line: string; color: string }[] = [
  { slug: 'tri-ply', title: 'Tri-Ply Aura', line: '304 · Aluminium · 430', color: '#6B3E2A' },
  { slug: 'marvel', title: 'Marvel Granite', line: 'Non-stick, low-oil cooking', color: '#3D3A38' },
  { slug: 'cookers-stoves', title: 'Gas Stoves', line: 'Stello steel · Sparkle glass', color: '#1F1F1F' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tagId, setTagId] = useState('aura');
  const seasonal = products.find((p) => p.id === 'aura-kadai-frypan');
  const tagged = useMemo(() => {
    const tag = catalogTags.find((t) => t.id === tagId) ?? catalogTags[0];
    return products.filter(tag.match).slice(0, 8);
  }, [tagId]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 40, paddingTop: insets.top + 8 }}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>Fathish Appliances · Ernakulam</Text>
        <Text style={styles.logo}>Le Mam</Text>
        <Text style={styles.ethos}>Health is homemade</Text>
        <SearchBar />
      </View>

      <View style={styles.pad}>
        <SectionHeader title="Featured collections" subtitle="From the Le Mam master catalog" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hRow}>
          {featured.map((f) => (
            <Pressable
              key={f.slug}
              style={[styles.feature, { backgroundColor: f.color }]}
              onPress={() => router.push({ pathname: '/(tabs)/catalog', params: { category: f.slug } })}>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureLine}>{f.line}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <SectionHeader title="Explore the collection" subtitle="Jump into a filtered catalog view" />
        <View style={styles.grid}>
          {homeCollections.map((c) => (
            <Pressable
              key={c.slug}
              style={styles.tile}
              onPress={() =>
                router.push({ pathname: '/(tabs)/catalog', params: { collection: c.slug as HomeCollection } })
              }>
              <View style={styles.tileIcon}>
                <Ionicons name={c.icon as any} size={22} color={colors.brown} />
              </View>
              <Text style={styles.tileLabel}>{c.title}</Text>
            </Pressable>
          ))}
        </View>

        {seasonal ? (
          <Pressable
            style={styles.banner}
            onPress={() => router.push(`/product/${seasonal.id}`)}>
            <Text style={styles.bannerKicker}>Seasonal savings</Text>
            <Text style={styles.bannerTitle}>Aura Starter Set</Text>
            <Text style={styles.bannerBody}>Kadai, fry pan & sauce pan with 5-year Aura warranty.</Text>
          </Pressable>
        ) : null}

        <View style={styles.warrantyCard}>
          <Ionicons name="shield-checkmark" size={28} color={colors.goldDeep} />
          <View style={{ flex: 1 }}>
            <Text style={styles.wTitle}>5-year Aura warranty</Text>
            <Text style={styles.wBody}>Food-first 304 steel interiors. Register coverage in minutes.</Text>
          </View>
          <Pressable style={styles.wBtn} onPress={() => router.push('/warranty')}>
            <Text style={styles.wBtnText}>Register</Text>
          </Pressable>
        </View>

        <SectionHeader title="Tagged from the catalog" subtitle="Brochure SKUs and printed MRPs" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {catalogTags.map((t) => (
            <Pressable
              key={t.id}
              onPress={() => setTagId(t.id)}
              style={[styles.chip, tagId === t.id && styles.chipOn]}>
              <Text style={[styles.chipText, tagId === t.id && styles.chipTextOn]}>{t.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.cards}>
          {tagged.map((p) => (
            <View key={p.id} style={styles.cardWrap}>
              <ProductCard product={p} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  hero: { paddingHorizontal: 20, paddingBottom: 8, gap: 6 },
  kicker: { color: colors.muted, fontSize: 12, letterSpacing: 0.4 },
  logo: { fontSize: 36, fontWeight: '800', color: colors.brownDeep },
  ethos: { color: colors.brownSoft, fontStyle: 'italic', marginBottom: 10 },
  pad: { paddingHorizontal: 20, paddingTop: 18 },
  hRow: { gap: 12, paddingBottom: 22 },
  feature: {
    width: 200,
    borderRadius: radius.md,
    padding: 16,
    minHeight: 110,
    justifyContent: 'flex-end',
  },
  featureTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  featureLine: { color: 'rgba(255,255,255,0.8)', marginTop: 4, fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 22 },
  tile: {
    width: '48%',
    backgroundColor: colors.ivory,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLabel: { fontWeight: '700', color: colors.text },
  banner: {
    backgroundColor: colors.brown,
    borderRadius: radius.lg,
    padding: 18,
    marginBottom: 16,
  },
  bannerKicker: { color: colors.gold, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' },
  bannerTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 4 },
  bannerBody: { color: 'rgba(255,255,255,0.85)', marginTop: 6 },
  warrantyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.ivory,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 22,
  },
  wTitle: { fontWeight: '800', color: colors.text },
  wBody: { color: colors.muted, fontSize: 12, marginTop: 2 },
  wBtn: { backgroundColor: colors.brown, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill },
  wBtnText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  cards: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cardWrap: { width: '48%', flexGrow: 1 },
  chips: { gap: 8, paddingBottom: 14 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.ivory,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipOn: { backgroundColor: colors.brown, borderColor: colors.brown },
  chipText: { color: colors.text, fontSize: 12, fontWeight: '700' },
  chipTextOn: { color: '#fff' },
});
