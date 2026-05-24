import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryCard } from '../components/CategoryCard';
import { FadeInView } from '../components/FadeInView';
import { HeroCard } from '../components/HeroCard';
import { QueryCard } from '../components/QueryCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { SearchBar } from '../components/SearchBar';
import { SectionTitle } from '../components/SectionTitle';
import { colors, radius, spacing } from '../constants/theme';
import { supportCategories, supportQueries } from '../data/mockData';
import { SupportStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<SupportStackParamList, 'SupportHome'>;

export function SupportScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Support"
        onBack={() => navigation.getParent()?.navigate('Home')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <FadeInView>
          <HeroCard
            badge="✨ We're here for you"
            title="How can we help you today?"
            subtitle="Real humans, calm answers, usually under 5min"
          >
            <SearchBar
              placeholder="Search your issue"
              value={search}
              onChangeText={setSearch}
              light
            />
          </HeroCard>
        </FadeInView>

        <FadeInView delay={60}>
          <Pressable style={styles.raiseBtn}>
            <Ionicons name="add" size={20} color={colors.white} />
            <Text style={styles.raiseText}>Raise a new query</Text>
          </Pressable>
        </FadeInView>

        <FadeInView delay={100}>
          <SectionTitle title="Browse by categories" />
          <View style={styles.categories}>
            {supportCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </View>
        </FadeInView>

        <FadeInView delay={140}>
          <SectionTitle title="Recent Queries" />
          {supportQueries.map((query) => (
            <QueryCard key={query.id} query={query} />
          ))}
        </FadeInView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingBottom: 120,
  },
  raiseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
    marginBottom: spacing.lg,
  },
  raiseText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  categories: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
});
