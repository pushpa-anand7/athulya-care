import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { FadeInView } from '../components/FadeInView';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors, radius, spacing } from '../constants/theme';
import { getHealthRecordById } from '../data/mockData';
import { ReportsStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ReportsStackParamList, 'HealthRecordDetail'>;

export function HealthRecordDetailScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const record = getHealthRecordById(route.params.recordId);

  if (!record) {
    return null;
  }

  const isPrescription = record.type === 'prescription';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScreenHeader
        title={isPrescription ? 'Prescription' : 'Lab report'}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <FadeInView>
          <View style={styles.fileCard}>
            <View style={styles.fileIcon}>
              <Ionicons
                name={isPrescription ? 'document-text' : 'flask'}
                size={28}
                color={colors.primary}
              />
            </View>
            <View style={styles.fileInfo}>
              <AppText variant="h2">{record.title}</AppText>
              <AppText variant="caption" muted>
                {record.subtitle}
              </AppText>
              <AppText variant="caption" color={colors.primary}>
                {record.dateLabel} · {record.fileType}
              </AppText>
            </View>
          </View>
        </FadeInView>

        {record.medicines?.length ? (
          <FadeInView delay={60}>
            <AppText variant="h3" style={styles.sectionLabel}>
              Medicines prescribed
            </AppText>
            <View style={styles.detailCard}>
              {record.medicines.map((med) => (
                <View key={med} style={styles.bulletRow}>
                  <View style={styles.bullet} />
                  <AppText variant="body">{med}</AppText>
                </View>
              ))}
            </View>
          </FadeInView>
        ) : null}

        {record.notes ? (
          <FadeInView delay={100}>
            <AppText variant="h3" style={styles.sectionLabel}>
              {isPrescription ? 'Doctor notes' : 'Report summary'}
            </AppText>
            <View style={styles.detailCard}>
              <AppText variant="body" muted>
                {record.notes}
              </AppText>
            </View>
          </FadeInView>
        ) : null}

        <FadeInView delay={140}>
          <View style={styles.downloadRow}>
            <Ionicons name="download-outline" size={20} color={colors.primary} />
            <AppText variant="bodyMedium" color={colors.primary}>
              Download {record.fileType}
            </AppText>
          </View>
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
  fileCard: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  fileIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
    gap: 4,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },
  detailCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  downloadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
});
