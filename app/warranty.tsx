import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { products } from '@/data/products';

export default function WarrantyScreen() {
  const { warranties, registerWarranty } = useApp();
  const [productId, setProductId] = useState(products[0].id);
  const [invoice, setInvoice] = useState('');
  const [serial, setSerial] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const selected = products.find((p) => p.id === productId)!;

  const submit = () => {
    if (!invoice.trim() || !serial.trim()) {
      setMessage('Add invoice number and serial or model number.');
      return;
    }
    registerWarranty({ productId, invoice: invoice.trim(), serial: serial.trim() });
    setInvoice('');
    setSerial('');
    setMessage('Digital warranty registered on this device.');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={styles.lead}>
        Log 1-year Marvel or 5-year Aura coverage with your invoice and serial/model number.
      </Text>
      {message ? <Text style={styles.notice}>{message}</Text> : null}

      <Text style={styles.label}>Product</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 8 }}>
        {products
          .filter((p) => p.warrantyYears > 0)
          .map((p) => (
            <Pressable
              key={p.id}
              onPress={() => setProductId(p.id)}
              style={[styles.pick, productId === p.id && styles.pickOn]}>
              <Text style={[styles.pickText, productId === p.id && styles.pickTextOn]} numberOfLines={1}>
                {p.name}
              </Text>
            </Pressable>
          ))}
      </ScrollView>
      <Text style={styles.hint}>
        Coverage: {selected.warrantyYears}-year · {selected.material}
      </Text>

      <Text style={styles.label}>Invoice number</Text>
      <TextInput
        value={invoice}
        onChangeText={setInvoice}
        placeholder="e.g. FAPL-24081"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />
      <Text style={styles.micro}>Upload is simulated — enter the invoice ID from your bill.</Text>

      <Text style={styles.label}>Serial / model number</Text>
      <TextInput
        value={serial}
        onChangeText={setSerial}
        placeholder="e.g. AURA-K24-00921"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />

      <Pressable style={styles.cta} onPress={submit}>
        <Text style={styles.ctaText}>Register warranty</Text>
      </Pressable>

      <Text style={styles.h}>Your coverage</Text>
      {warranties.length === 0 ? (
        <Text style={styles.hint}>No registrations yet.</Text>
      ) : (
        warranties.map((w) => {
          const p = products.find((x) => x.id === w.productId);
          return (
            <View key={w.id} style={styles.card}>
              <Text style={styles.cardTitle}>{p?.name ?? w.productId}</Text>
              <Text style={styles.hint}>
                {p?.warrantyYears}-year · Invoice {w.invoice} · {w.serial}
              </Text>
              <Text style={styles.micro}>{new Date(w.registeredAt).toLocaleDateString('en-IN')}</Text>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  lead: { color: colors.muted, marginBottom: 12, lineHeight: 20 },
  notice: {
    backgroundColor: colors.ivory,
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    color: colors.brown,
    fontWeight: '700',
    marginBottom: 8,
  },
  label: { fontWeight: '800', color: colors.text, marginTop: 10, marginBottom: 6 },
  input: {
    backgroundColor: colors.ivory,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
  },
  micro: { color: colors.muted, fontSize: 12, marginTop: 6 },
  hint: { color: colors.muted, fontSize: 13 },
  pick: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.ivory,
    borderWidth: 1,
    borderColor: colors.line,
    maxWidth: 200,
  },
  pickOn: { backgroundColor: colors.brown, borderColor: colors.brown },
  pickText: { fontSize: 12, fontWeight: '700', color: colors.text },
  pickTextOn: { color: '#fff' },
  cta: {
    marginTop: 16,
    backgroundColor: colors.brown,
    borderRadius: radius.pill,
    alignItems: 'center',
    paddingVertical: 14,
  },
  ctaText: { color: '#fff', fontWeight: '800' },
  h: { marginTop: 24, fontSize: 18, fontWeight: '800', color: colors.brownDeep, marginBottom: 8 },
  card: {
    backgroundColor: colors.ivory,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 8,
  },
  cardTitle: { fontWeight: '800', color: colors.text },
});
