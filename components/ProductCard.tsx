import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/constants/theme';
import { productImage } from '@/data/productImages';
import { formatInr, priceOf, type Product } from '@/data/products';

const badgeColor: Record<string, string> = {
  '1-Year Warranty': colors.badgeTop,
  '2-Year Warranty': colors.badgeBestseller,
  '5-Year Warranty': colors.badgeWarranty,
  Seasonal: colors.badgeSeasonal,
};

export function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const price = priceOf(product);
  const router = useRouter();
  return (
    <Pressable
      style={[styles.card, compact ? styles.compact : null]}
      onPress={() => router.push(`/product/${product.id}`)}>
        <View style={styles.artWrap}>
          <Image source={productImage(product.id)} style={styles.art} resizeMode="contain" />
          {product.badge ? (
            <View style={[styles.badge, { backgroundColor: badgeColor[product.badge] ?? colors.brown }]}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.body}>
          <Text style={styles.series}>{product.sku}</Text>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          {product.size ? <Text style={styles.meta}>{product.size}</Text> : null}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatInr(price)}</Text>
            {product.salePrice ? <Text style={styles.mrp}>{formatInr(product.mrp)}</Text> : null}
          </View>
          {product.warrantyYears ? (
            <Text style={styles.warranty}>{product.warrantyYears}-year warranty</Text>
          ) : null}
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.ivory,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
    flex: 1,
  },
  compact: { maxWidth: 220 },
  artWrap: {
    height: 128,
    backgroundColor: colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  art: { width: '100%', height: 128 },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  body: { padding: 12, gap: 3 },
  series: { color: colors.goldDeep, fontSize: 11, letterSpacing: 0.6, textTransform: 'uppercase' },
  name: { color: colors.text, fontSize: 15, fontWeight: '700' },
  meta: { color: colors.muted, fontSize: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 },
  price: { color: colors.brown, fontSize: 16, fontWeight: '800' },
  mrp: { color: colors.muted, fontSize: 12, textDecorationLine: 'line-through' },
  warranty: { color: colors.success, fontSize: 11, marginTop: 2 },
});
