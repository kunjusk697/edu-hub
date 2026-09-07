import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { colors, radius } from '@/constants/theme';
import {
  categories,
  products,
  type CategorySlug,
  type HomeCollection,
} from '@/data/products';

export default function CatalogScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string; collection?: string }>();
  const category = (params.category as CategorySlug | undefined) || undefined;
  const collection = (params.collection as HomeCollection | undefined) || undefined;

  const list = useMemo(() => {
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (collection && p.homeCollection !== collection) return false;
      return true;
    });
  }, [category, collection]);

  const title = category
    ? categories.find((c) => c.slug === category)?.title
    : collection
      ? collection[0].toUpperCase() + collection.slice(1)
      : 'Full catalog';

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <View style={styles.head}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>{list.length} authorised products</Text>
        <SearchBar placeholder="Filter by material, MRP, warranty…" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          <Chip
            label="All"
            active={!category && !collection}
            onPress={() => router.replace('/(tabs)/catalog')}
          />
          {categories.map((c) => (
            <Chip
              key={c.slug}
              label={c.title}
              active={category === c.slug}
              onPress={() => router.replace({ pathname: '/(tabs)/catalog', params: { category: c.slug } })}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {list.map((p) => (
          <View key={p.id} style={styles.cardWrap}>
            <ProductCard product={p} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipOn]}>
      <Text style={[styles.chipText, active && styles.chipTextOn]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  head: { paddingHorizontal: 20, gap: 6 },
  title: { fontSize: 28, fontWeight: '800', color: colors.brownDeep },
  sub: { color: colors.muted, marginBottom: 8 },
  chips: { gap: 8, paddingVertical: 12 },
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
  grid: { paddingHorizontal: 16, paddingBottom: 32, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cardWrap: { width: '47%', flexGrow: 1 },
});
