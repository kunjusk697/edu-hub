import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/constants/theme';
import { careTips } from '@/data/care';

export default function CareScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.lead}>
        Follow these notes so coatings, gaskets, and induction bases stay within warranty.
      </Text>
      {careTips.map((tip) => (
        <View key={tip.id} style={styles.card}>
          <Text style={styles.title}>{tip.title}</Text>
          <Text style={styles.body}>{tip.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  lead: { color: colors.muted, marginBottom: 12, lineHeight: 20 },
  card: {
    backgroundColor: colors.ivory,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 12,
  },
  title: { fontWeight: '800', color: colors.brownDeep, marginBottom: 6, fontSize: 16 },
  body: { color: colors.text, lineHeight: 22 },
});
