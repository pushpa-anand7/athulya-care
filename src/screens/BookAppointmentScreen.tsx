import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { FadeInView } from '../components/FadeInView';
import { HeroCard } from '../components/HeroCard';
import { ProgressStepper } from '../components/ProgressStepper';
import { ScreenHeader } from '../components/ScreenHeader';
import { SearchBar } from '../components/SearchBar';
import { SpecialtyGrid } from '../components/SpecialtyGrid';
import { colors, spacing } from '../constants/theme';
import { specialties } from '../data/mockData';
import { Specialty } from '../types/models';
import { ConsultStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ConsultStackParamList, 'BookAppointment'>;

const STEP_LABELS = ['Specialty', 'Doctor', 'Schedule'];

export function BookAppointmentScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filtered = specialties.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (specialty: Specialty) => {
    navigation.navigate('DoctorList', {
      specialtyId: specialty.id,
      specialtyLabel: specialty.label,
    });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Book Appointments"
        onBack={() => navigation.goBack()}
      />

      <ProgressStepper current={1} labels={STEP_LABELS} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <FadeInView>
          <HeroCard
            title="Find your specialist"
            subtitle="Select a medical specialty to browse available doctors."
          />
          <SearchBar
            placeholder="Search Specialities here"
            value={search}
            onChangeText={setSearch}
          />
        </FadeInView>

        <FadeInView delay={80}>
          <View style={styles.urgentCard}>
            <View style={styles.urgentIcon}>
              <Ionicons name="medkit" size={20} color={colors.white} />
            </View>
            <View style={styles.urgentText}>
              <AppText variant="bodyMedium" color={colors.primary}>
                Need urgent care?
              </AppText>
              <AppText variant="caption" muted>
                General practitioners available now.
              </AppText>
            </View>
          </View>
        </FadeInView>

        <FadeInView delay={120}>
          <SpecialtyGrid items={filtered} onSelect={handleSelect} />
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
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingBottom: 120,
  },
  urgentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  urgentIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  urgentText: {
    flex: 1,
    gap: 2,
  },
});
