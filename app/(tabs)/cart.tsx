import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius } from '@/constants/theme';
import { cartSubtotal, useApp } from '@/context/AppContext';
import { productImage } from '@/data/productImages';
import { formatInr, getProduct, priceOf, products } from '@/data/products';

const FREE_DELIVERY = 1999;

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { cart, setQty } = useApp();
  const subtotal = cartSubtotal(cart, products);
  const remaining = Math.max(0, FREE_DELIVERY - subtotal);
  const progress = Math.min(1, subtotal / FREE_DELIVERY);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <Text style={styles.title}>Cart</Text>
      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="bag-handle-outline" size={48} color={colors.gold} />
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptyBody}>Browse the catalog for Aura, Marvel, and Sparkle pieces.</Text>
          <Pressable style={styles.cta} onPress={() => router.push('/(tabs)/catalog')}>
            <Text style={styles.ctaText}>Open catalog</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.mile}>
            <Text style={styles.mileText}>
              {remaining === 0
                ? 'Free delivery unlocked'
                : `${formatInr(remaining)} more for free delivery`}
            </Text>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${progress * 100}%` }]} />
            </View>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
            {cart.map((line) => {
              const p = getProduct(line.productId);
              if (!p) return null;
              return (
                <View key={p.id} style={styles.row}>
                  <Image source={productImage(p.id)} style={styles.swatch} resizeMode="contain" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{p.name}</Text>
                    <Text style={styles.meta}>{p.size || p.capacity || p.series}</Text>
                    <Text style={styles.price}>{formatInr(priceOf(p))}</Text>
                  </View>
                  <View style={styles.stepper}>
                    <Pressable onPress={() => setQty(p.id, line.qty - 1)} style={styles.stepBtn}>
                      <Ionicons name="remove" size={16} color={colors.brown} />
                    </Pressable>
                    <Text style={styles.qty}>{line.qty}</Text>
                    <Pressable onPress={() => setQty(p.id, line.qty + 1)} style={styles.stepBtn}>
                      <Ionicons name="add" size={16} color={colors.brown} />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.footer}>
            <View>
              <Text style={styles.footLabel}>Subtotal</Text>
              <Text style={styles.footTotal}>{formatInr(subtotal)}</Text>
            </View>
            <Pressable style={styles.cta} onPress={() => router.push('/checkout')}>
              <Text style={styles.ctaText}>Guest checkout</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: '800', color: colors.brownDeep, marginBottom: 12 },
  empty: { alignItems: 'center', marginTop: 80, gap: 8 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  emptyBody: { color: colors.muted, textAlign: 'center' },
  mile: { backgroundColor: colors.ivory, borderRadius: radius.md, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: colors.line },
  mileText: { color: colors.brown, fontWeight: '700', fontSize: 13, marginBottom: 8 },
  track: { height: 6, backgroundColor: colors.creamDark, borderRadius: 3, overflow: 'hidden' },
  fill: { height: 6, backgroundColor: colors.success },
  row: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.ivory,
    borderRadius: radius.md,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
  },
  swatch: { width: 56, height: 56, borderRadius: 12, backgroundColor: colors.creamDark },
  name: { fontWeight: '800', color: colors.text },
  meta: { color: colors.muted, fontSize: 12 },
  price: { color: colors.brown, fontWeight: '800', marginTop: 4 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: { minWidth: 16, textAlign: 'center', fontWeight: '800' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: colors.ivory,
    borderTopWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footLabel: { color: colors.muted, fontSize: 12 },
  footTotal: { fontSize: 22, fontWeight: '800', color: colors.text },
  cta: { backgroundColor: colors.brown, paddingHorizontal: 18, paddingVertical: 12, borderRadius: radius.pill },
  ctaText: { color: '#fff', fontWeight: '800' },
});
