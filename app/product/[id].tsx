import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { productImage } from '@/data/productImages';
import { formatInr, getProduct, priceOf } from '@/data/products';

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProduct(Array.isArray(id) ? id[0] : id);
  const { addToCart } = useApp();
  const router = useRouter();

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const price = priceOf(product);

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.hero}>
          <Image source={productImage(product.id)} style={styles.heroImg} resizeMode="contain" />
          {product.badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.body}>
          <Text style={styles.series}>{product.sku} · {product.series} · {product.material}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatInr(price)}</Text>
            {product.salePrice ? <Text style={styles.mrp}>MRP {formatInr(product.mrp)}</Text> : <Text style={styles.mrp}>MRP</Text>}
          </View>
          <Text style={styles.desc}>{product.description}</Text>

          <View style={styles.chips}>
            {product.size ? <Chip text={product.size} /> : null}
            {product.capacity ? <Chip text={product.capacity} /> : null}
            {product.warrantyYears ? <Chip text={`${product.warrantyYears}-year warranty`} /> : null}
          </View>

          {product.construction ? (
            <>
              <Text style={styles.h}>3-layer construction</Text>
              {product.construction.map((c) => (
                <Text key={c} style={styles.li}>
                  • {c}
                </Text>
              ))}
            </>
          ) : null}

          <Text style={styles.h}>Features</Text>
          {product.features.map((f) => (
            <Text key={f} style={styles.li}>
              • {f}
            </Text>
          ))}

          <Text style={styles.h}>Compatibility</Text>
          <View style={styles.chips}>
            {product.compatibility.length ? (
              product.compatibility.map((c) => <Chip key={c} text={c} />)
            ) : (
              <Chip text="Not cooktop-bound" />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Pressable
          style={styles.secondary}
          onPress={() => {
            addToCart(product.id);
            router.push('/(tabs)/cart');
          }}>
          <Text style={styles.secondaryText}>Add to cart</Text>
        </Pressable>
        <Pressable
          style={styles.primary}
          onPress={() => {
            addToCart(product.id);
            router.push('/checkout');
          }}>
          <Text style={styles.primaryText}>Buy now</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { height: 260, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  heroImg: { width: '100%', height: 260 },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.brown,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: { color: '#fff', fontWeight: '800', fontSize: 11 },
  body: { padding: 20 },
  series: { color: colors.goldDeep, letterSpacing: 0.6, textTransform: 'uppercase', fontSize: 12 },
  name: { fontSize: 28, fontWeight: '800', color: colors.brownDeep, marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 10, marginVertical: 10 },
  price: { fontSize: 24, fontWeight: '800', color: colors.brown },
  mrp: { color: colors.muted, textDecorationLine: 'line-through' },
  desc: { color: colors.text, lineHeight: 22 },
  h: { marginTop: 18, marginBottom: 6, fontWeight: '800', color: colors.text, fontSize: 16 },
  li: { color: colors.muted, lineHeight: 22 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  chip: {
    backgroundColor: colors.ivory,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipText: { fontSize: 12, fontWeight: '700', color: colors.brown },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    backgroundColor: colors.ivory,
    borderTopWidth: 1,
    borderColor: colors.line,
  },
  secondary: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.brown,
    borderRadius: radius.pill,
    alignItems: 'center',
    paddingVertical: 14,
  },
  secondaryText: { color: colors.brown, fontWeight: '800' },
  primary: {
    flex: 1,
    backgroundColor: colors.brown,
    borderRadius: radius.pill,
    alignItems: 'center',
    paddingVertical: 14,
  },
  primaryText: { color: '#fff', fontWeight: '800' },
});
