import { Ionicons } from '@expo/vector-icons';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.kicker}>World of Le Mam</Text>
      <Text style={styles.title}>Health is homemade</Text>
      <Text style={styles.body}>
        Le Mam Kitchenware is the cookware and appliances range from Fathish Appliances Pvt. Ltd., Kolencherry,
        Ernakulam. The brand exists so home cooks can buy authorised Tri-Ply steel, Marvel granite, cookers, and
        Sparkle stoves with clear MRPs and steel-mark authentication.
      </Text>

      <View style={styles.card}>
        <Text style={styles.h}>Steel mark authentication</Text>
        <Text style={styles.body}>
          Aura Tri-Ply pieces carry a steel mark confirming 304 food-contact interiors, an aluminium mid-core for
          even heat, and 430 magnetic stainless on the exterior for induction. Buy only from authorised listings in
          this catalog to stay covered.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.h}>Company</Text>
        <Text style={styles.li}>Fathish Appliances Pvt. Ltd.</Text>
        <Text style={styles.li}>Kolencherry, Ernakulam, Kerala</Text>
        <Text style={styles.li}>GST 32AAFCF5325B1Z9</Text>
      </View>

      <Pressable style={styles.contact} onPress={() => Linking.openURL('tel:+917356915954')}>
        <Ionicons name="call" size={18} color="#fff" />
        <Text style={styles.contactText}>Call +91 73569 15954</Text>
      </Pressable>
      <Pressable style={styles.ghost} onPress={() => Linking.openURL('mailto:info@lemam.in')}>
        <Text style={styles.ghostText}>Email info@lemam.in</Text>
      </Pressable>
      <Pressable style={styles.ghost} onPress={() => Linking.openURL('https://www.lemam.in')}>
        <Text style={styles.ghostText}>Visit www.lemam.in</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  kicker: { color: colors.goldDeep, letterSpacing: 1, textTransform: 'uppercase', fontSize: 12 },
  title: { fontSize: 32, fontWeight: '800', color: colors.brownDeep, marginVertical: 8 },
  body: { color: colors.text, lineHeight: 22 },
  card: {
    backgroundColor: colors.ivory,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    marginTop: 16,
  },
  h: { fontWeight: '800', marginBottom: 8, color: colors.text, fontSize: 16 },
  li: { color: colors.muted, lineHeight: 22 },
  contact: {
    marginTop: 20,
    backgroundColor: colors.brown,
    borderRadius: radius.pill,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  contactText: { color: '#fff', fontWeight: '800' },
  ghost: {
    marginTop: 10,
    borderRadius: radius.pill,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    backgroundColor: colors.ivory,
  },
  ghostText: { color: colors.brown, fontWeight: '700' },
});
