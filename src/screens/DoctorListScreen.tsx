import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DoctorCard } from '../components/DoctorCard';
import { FadeInView } from '../components/FadeInView';
import { ScreenHeader } from '../components/ScreenHeader';
import { SearchBar } from '../components/SearchBar';
import { ProgressStepper } from '../components/ProgressStepper';
import { AppText } from '../components/AppText';
import { colors, spacing } from '../constants/theme';
import { getDoctorsBySpecialty } from '../data/mockData';
import { ConsultStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ConsultStackParamList, 'DoctorList'>;

export function DoctorListScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { specialtyId, specialtyLabel } = route.params;
  const [search, setSearch] = useState('');

  const doctors = useMemo(() => {
    const list = getDoctorsBySpecialty(specialtyId);
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q),
    );
  }, [specialtyId, search]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Select Doctors"
        onBack={() => navigation.goBack()}
      />

      <ProgressStepper
        current={2}
        labels={['Specialty', 'Doctor', 'Schedule']}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <FadeInView>
          <AppText variant="caption" muted style={styles.subtitle}>
            {specialtyLabel} specialists near you
          </AppText>
          <SearchBar
            placeholder="Search doctors"
            value={search}
            onChangeText={setSearch}
          />
        </FadeInView>

        {doctors.map((doctor, index) => (
          <FadeInView key={doctor.id} delay={60 + index * 50}>
            <DoctorCard
              doctor={doctor}
              variant="list"
              onPress={() =>
                navigation.navigate('SelectAvailability', {
                  doctorId: doctor.id,
                })
              }
              onBook={() =>
                navigation.navigate('SelectAvailability', {
                  doctorId: doctor.id,
                })
              }
            />
          </FadeInView>
        ))}
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
  subtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.md,
    marginTop: -4,
  },
});
