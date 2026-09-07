import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius } from '@/constants/theme';
import { cartSubtotal, useApp } from '@/context/AppContext';
import { formatInr, products } from '@/data/products';

export default function CheckoutScreen() {
  const { cart, placeOrder } = useApp();
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const subtotal = cartSubtotal(cart, products);
  const delivery = subtotal >= 1999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + delivery;

  const submit = () => {
    if (!cart.length) {
      setError('Add a product before checkout.');
      return;
    }
    if (!name.trim() || phone.trim().length < 10 || !address.trim()) {
      setError('Name, 10-digit phone, and address are required.');
      return;
    }
    const order = placeOrder({ name: name.trim(), phone: phone.trim(), address: address.trim() });
    router.replace({
      pathname: '/order-success',
      params: { id: order.id, total: String(order.total), name: order.name },
    });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.note}>Guest checkout — no account needed.</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Field label="Full name" value={name} onChange={setName} placeholder="Your name" />
      <Field label="Mobile" value={phone} onChange={setPhone} placeholder="10-digit number" keyboard="phone-pad" />
      <Field
        label="Delivery address"
        value={address}
        onChange={setAddress}
        placeholder="House, street, city, PIN"
        multiline
      />

      <View style={styles.summary}>
        <Row k="Items" v={formatInr(subtotal)} />
        <Row k="Delivery" v={delivery === 0 ? 'Free' : formatInr(delivery)} />
        <Row k="Total" v={formatInr(total)} bold />
      </View>

      <Pressable style={styles.cta} onPress={submit}>
        <Text style={styles.ctaText}>Place order</Text>
      </Pressable>
    </ScrollView>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  keyboard,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboard?: 'phone-pad';
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        multiline={multiline}
        keyboardType={keyboard}
        style={[styles.input, multiline && { minHeight: 90, textAlignVertical: 'top' }]}
      />
    </View>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.k, bold && styles.bold]}>{k}</Text>
      <Text style={[styles.v, bold && styles.bold]}>{v}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  note: { color: colors.muted, marginBottom: 16 },
  error: { color: colors.danger, fontWeight: '700', marginBottom: 12 },
  label: { fontWeight: '800', color: colors.text, marginBottom: 6 },
  input: {
    backgroundColor: colors.ivory,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
  },
  summary: {
    backgroundColor: colors.ivory,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
    marginTop: 8,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  k: { color: colors.muted },
  v: { color: colors.text, fontWeight: '700' },
  bold: { color: colors.brownDeep, fontWeight: '800', fontSize: 16 },
  cta: {
    marginTop: 18,
    backgroundColor: colors.brown,
    borderRadius: radius.pill,
    alignItems: 'center',
    paddingVertical: 14,
  },
  ctaText: { color: '#fff', fontWeight: '800' },
});
