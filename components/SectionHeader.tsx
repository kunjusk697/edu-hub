import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12, gap: 4 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  sub: { color: colors.muted, fontSize: 13 },
});
