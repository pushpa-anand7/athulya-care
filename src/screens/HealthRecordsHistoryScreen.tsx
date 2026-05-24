import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SectionList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { FadeInView } from '../components/FadeInView';
import { HealthRecordCard } from '../components/HealthRecordCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, spacing } from '../constants/theme';
import {
  getHealthRecordsByType,
  groupHealthRecordsByMonth,
} from '../data/mockData';
import { ReportsStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ReportsStackParamList, 'HealthRecordsHistory'>;

export function HealthRecordsHistoryScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { recordType } = route.params;
  const isPrescription = recordType === 'prescription';
  const records = getHealthRecordsByType(recordType);
  const sections = groupHealthRecordsByMonth(records);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader
        title={isPrescription ? 'Prescription history' : 'Lab report history'}
        onBack={() => navigation.goBack()}
      />

      <FadeInView style={styles.summary}>
        <AppText variant="caption" muted>
          {records.length} documents in your health records
        </AppText>
      </FadeInView>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <AppText variant="h3" style={styles.sectionTitle}>
            {title}
          </AppText>
        )}
        renderItem={({ item }) => (
          <HealthRecordCard
            record={item}
            onPress={() =>
              navigation.navigate('HealthRecordDetail', { recordId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <AppText variant="body" muted style={styles.empty}>
            No records found.
          </AppText>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  summary: {
    paddingHorizontal: spacing.screen,
    marginBottom: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.screen,
    paddingBottom: 120,
  },
  sectionTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  empty: {
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
