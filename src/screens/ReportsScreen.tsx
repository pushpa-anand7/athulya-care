import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { FadeInView } from '../components/FadeInView';
import { HealthRecordCard } from '../components/HealthRecordCard';
import { HeroCard } from '../components/HeroCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { SectionTitle } from '../components/SectionTitle';
import { colors, radius, shadows, spacing } from '../constants/theme';
import { getHealthRecordsByType } from '../data/mockData';
import { ReportsStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ReportsStackParamList, 'ReportsHome'>;

const PREVIEW = 2;

export function ReportsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const prescriptions = getHealthRecordsByType('prescription');
  const labReports = getHealthRecordsByType('lab-report');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader title="Reports" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <FadeInView>
          <HeroCard
            title="Your health records"
            subtitle="Prescriptions and lab reports shared by Athulya Healthcare after your visits."
          />
        </FadeInView>

        <FadeInView delay={60}>
          <View style={styles.summaryRow}>
            <Pressable
              style={[styles.summaryCard, shadows.card]}
              onPress={() =>
                navigation.navigate('HealthRecordsHistory', {
                  recordType: 'prescription',
                })
              }
            >
              <View style={[styles.summaryIcon, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="document-text" size={24} color={colors.primary} />
              </View>
              <AppText variant="h3">Prescriptions</AppText>
              <AppText variant="caption" muted>
                {prescriptions.length} documents
              </AppText>
              <AppText variant="caption" color={colors.primary} style={styles.viewAll}>
                Manage all →
              </AppText>
            </Pressable>

            <Pressable
              style={[styles.summaryCard, shadows.card]}
              onPress={() =>
                navigation.navigate('HealthRecordsHistory', {
                  recordType: 'lab-report',
                })
              }
            >
              <View style={[styles.summaryIcon, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="flask" size={24} color={colors.teal} />
              </View>
              <AppText variant="h3">Lab reports</AppText>
              <AppText variant="caption" muted>
                {labReports.length} documents
              </AppText>
              <AppText variant="caption" color={colors.primary} style={styles.viewAll}>
                Manage all →
              </AppText>
            </Pressable>
          </View>
        </FadeInView>

        <FadeInView delay={100}>
          <View style={styles.sectionHead}>
            <SectionTitle title="Recent prescriptions" />
            <Pressable
              onPress={() =>
                navigation.navigate('HealthRecordsHistory', {
                  recordType: 'prescription',
                })
              }
            >
              <AppText variant="caption" color={colors.primary}>
                View history
              </AppText>
            </Pressable>
          </View>
          {prescriptions.slice(0, PREVIEW).map((record) => (
            <HealthRecordCard
              key={record.id}
              record={record}
              onPress={() =>
                navigation.navigate('HealthRecordDetail', { recordId: record.id })
              }
            />
          ))}
        </FadeInView>

        <FadeInView delay={140}>
          <View style={styles.sectionHead}>
            <SectionTitle title="Recent lab reports" />
            <Pressable
              onPress={() =>
                navigation.navigate('HealthRecordsHistory', {
                  recordType: 'lab-report',
                })
              }
            >
              <AppText variant="caption" color={colors.primary}>
                View history
              </AppText>
            </Pressable>
          </View>
          {labReports.slice(0, PREVIEW).map((record) => (
            <HealthRecordCard
              key={record.id}
              record={record}
              onPress={() =>
                navigation.navigate('HealthRecordDetail', { recordId: record.id })
              }
            />
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
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 4,
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  viewAll: {
    marginTop: spacing.sm,
    fontWeight: '700',
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
});
