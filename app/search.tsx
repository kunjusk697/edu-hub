import { useMemo, useState, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ProductCard } from '@/components/ProductCard';
import { colors, radius } from '@/constants/theme';
import {
  products,
  type Compatibility,
  type Material,
} from '@/data/products';

const materials: Material[] = ['Tri-Ply', 'Non-Stick Granite', 'Aluminium', 'Stainless Steel'];
const warranties = [1, 2, 5] as const;
const compat: Compatibility[] = ['Induction', 'Gas', 'Ceramic', 'Dishwasher'];
const priceBands = [
  { id: 'u1k', label: 'Under ₹1,000', min: 0, max: 999 },
  { id: '1to3', label: '₹1,000–3,000', min: 1000, max: 3000 },
  { id: '3plus', label: 'Above ₹3,000', min: 3001, max: 99999 },
];

export default function SearchScreen() {
  const [q, setQ] = useState('');
  const [material, setMaterial] = useState<Material | null>(null);
  const [warranty, setWarranty] = useState<1 | 2 | 5 | null>(null);
  const [comp, setComp] = useState<Compatibility | null>(null);
  const [band, setBand] = useState<string | null>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const selectedBand = priceBands.find((b) => b.id === band);
    return products.filter((p) => {
      if (query) {
        const hay = `${p.name} ${p.series} ${p.material} ${p.features.join(' ')}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      if (material && p.material !== material) return false;
      if (warranty && p.warrantyYears !== warranty) return false;
      if (comp && !p.compatibility.includes(comp)) return false;
      if (selectedBand) {
        const price = p.salePrice ?? p.mrp;
        if (price < selectedBand.min || price > selectedBand.max) return false;
      }
      return true;
    });
  }, [q, material, warranty, comp, band]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Try granite tawa, Aura kadai, Sparkle…"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      <Text style={styles.label}>Material</Text>
      <Wrap>
        {materials.map((m) => (
          <Chip key={m} label={m} active={material === m} onPress={() => setMaterial(material === m ? null : m)} />
        ))}
      </Wrap>

      <Text style={styles.label}>MRP range</Text>
      <Wrap>
        {priceBands.map((b) => (
          <Chip key={b.id} label={b.label} active={band === b.id} onPress={() => setBand(band === b.id ? null : b.id)} />
        ))}
      </Wrap>

      <Text style={styles.label}>Warranty</Text>
      <Wrap>
        {warranties.map((w) => (
          <Chip
            key={w}
            label={`${w}-year`}
            active={warranty === w}
            onPress={() => setWarranty(warranty === w ? null : w)}
          />
        ))}
      </Wrap>

      <Text style={styles.label}>Compatibility</Text>
      <Wrap>
        {compat.map((c) => (
          <Chip key={c} label={c} active={comp === c} onPress={() => setComp(comp === c ? null : c)} />
        ))}
      </Wrap>

      <Text style={styles.count}>{results.length} matching products</Text>
      <View style={styles.grid}>
        {results.map((p) => (
          <View key={p.id} style={styles.cardWrap}>
            <ProductCard product={p} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function Wrap({ children }: { children: ReactNode }) {
  return <View style={styles.wrap}>{children}</View>;
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
  input: {
    backgroundColor: colors.ivory,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    marginBottom: 14,
  },
  label: { fontWeight: '800', color: colors.text, marginTop: 8, marginBottom: 6 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.ivory,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipOn: { backgroundColor: colors.brown, borderColor: colors.brown },
  chipText: { fontSize: 12, fontWeight: '700', color: colors.text },
  chipTextOn: { color: '#fff' },
  count: { marginVertical: 14, color: colors.muted, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cardWrap: { width: '47%', flexGrow: 1 },
});
