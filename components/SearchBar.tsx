import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

export function SearchBar({ placeholder = 'Search kadai, granite, stoves…' }: { placeholder?: string }) {
  const router = useRouter();
  return (
    <Pressable style={styles.bar} onPress={() => router.push('/search')}>
      <Ionicons name="search" size={18} color={colors.muted} />
      <Text style={styles.placeholder}>{placeholder}</Text>
      <View style={styles.filter}>
        <Ionicons name="options-outline" size={16} color={colors.brown} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ivory,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  placeholder: { flex: 1, color: colors.muted, fontSize: 14 },
  filter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
