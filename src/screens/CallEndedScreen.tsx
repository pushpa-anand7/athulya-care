// Shown after video call ends — rate doctor and leave feedback.
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInView } from '../components/FadeInView';
import { OutlinedButton } from '../components/OutlinedButton';
import { StarRating } from '../components/StarRating';
import { TagSelector } from '../components/TagSelector';
import { images } from '../constants/images';
import { colors, radius, spacing } from '../constants/theme';
import { feedbackTags, getAppointmentById, getDoctorById } from '../data/mockData';
import { ConsultStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ConsultStackParamList, 'CallEnded'>;

export function CallEndedScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { appointmentId, durationMinutes } = route.params;
  const appointment = getAppointmentById(appointmentId);
  const doctor = appointment
    ? getDoctorById(appointment.doctorId)
    : undefined;
  const [rating, setRating] = useState(4);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Friendly']);
  const [comment, setComment] = useState('');

  const finish = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ConsultHome', params: { appointmentId } }],
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  if (!doctor) return null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <FadeInView>
          <View style={styles.success}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={36} color={colors.white} />
            </View>
            <Text style={styles.title}>Call Ended</Text>
            <Text style={styles.sub}>
              Thank you for consulting with {doctor.name}
            </Text>
          </View>
        </FadeInView>

        <FadeInView delay={80}>
          <View style={styles.summaryCard}>
            <Image source={images.doctor} style={styles.avatar} />
            <View>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.meta}>{doctor.specialty}</Text>
            </View>
            <Text style={styles.duration}>{durationMinutes}min Duration</Text>
          </View>
        </FadeInView>

        <FadeInView delay={120}>
          <Text style={styles.sectionLabel}>Rate your experience</Text>
          <StarRating value={rating} onChange={setRating} />
        </FadeInView>

        <FadeInView delay={160}>
          <Text style={styles.sectionLabel}>What did you like?</Text>
          <TagSelector
            tags={feedbackTags}
            selected={selectedTags}
            onToggle={toggleTag}
          />
        </FadeInView>

        <FadeInView delay={200}>
          <Text style={styles.sectionLabel}>Additional Comments</Text>
          <TextInput
            style={styles.input}
            placeholder="Share your feedback..."
            placeholderTextColor={colors.textLight}
            multiline
            value={comment}
            onChangeText={setComment}
          />
        </FadeInView>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <OutlinedButton label="Skip for now" onPress={finish} />
        <OutlinedButton label="Submit" filled onPress={finish} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: 120,
  },
  success: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  sub: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: spacing.lg,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  meta: {
    fontSize: 11,
    color: colors.textMuted,
  },
  duration: {
    marginLeft: 'auto',
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 90,
    textAlignVertical: 'top',
    fontSize: 13,
    color: colors.text,
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
});
