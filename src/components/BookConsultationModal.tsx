import { Ionicons } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { AppText } from './AppText';
import { colors, radius, spacing } from '../constants/theme';

type Props = {
  visible: boolean;
  notes: string;
  prescriptionFile: string | null;
  onChangeNotes: (text: string) => void;
  onPickPrescription: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

export function BookConsultationModal({
  visible,
  notes,
  prescriptionFile,
  onChangeNotes,
  onPickPrescription,
  onConfirm,
  onClose,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <AppText variant="h2" style={styles.title}>
            Before your visit
          </AppText>
          <AppText variant="caption" muted style={styles.subtitle}>
            Share notes for the doctor. Upload a previous prescription if you have one
            (optional).
          </AppText>

          <AppText variant="label" style={styles.label}>
            Consultation notes
          </AppText>
          <TextInput
            style={styles.input}
            placeholder="Describe symptoms, concerns, or questions..."
            placeholderTextColor={colors.textLight}
            multiline
            value={notes}
            onChangeText={onChangeNotes}
          />

          <AppText variant="label" style={styles.label}>
            Previous prescription (optional)
          </AppText>
          <Pressable style={styles.uploadRow} onPress={onPickPrescription}>
            <Ionicons
              name={prescriptionFile ? 'document-text' : 'cloud-upload-outline'}
              size={22}
              color={colors.primary}
            />
            <View style={styles.uploadText}>
              <AppText variant="bodyMedium" color={colors.primary}>
                {prescriptionFile ? prescriptionFile : 'Upload prescription'}
              </AppText>
              {!prescriptionFile ? (
                <AppText variant="caption" muted>
                  PDF or image · optional
                </AppText>
              ) : null}
            </View>
            {prescriptionFile ? (
              <Pressable onPress={onPickPrescription} hitSlop={8}>
                <AppText variant="caption" color={colors.textMuted}>
                  Change
                </AppText>
              </Pressable>
            ) : null}
          </Pressable>

          <View style={styles.actions}>
            <Pressable style={styles.cancelBtn} onPress={onClose}>
              <AppText variant="bodyMedium" muted>
                Cancel
              </AppText>
            </Pressable>
            <Pressable
              style={[styles.confirmBtn, !notes.trim() && styles.confirmDisabled]}
              onPress={onConfirm}
              disabled={!notes.trim()}
            >
              <AppText variant="bodyMedium" color={colors.white}>
                Confirm booking
              </AppText>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  label: {
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 100,
    fontSize: 14,
    fontFamily: 'NunitoSans_400Regular',
    color: colors.text,
    textAlignVertical: 'top',
    backgroundColor: colors.background,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  uploadText: {
    flex: 1,
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  cancelBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmBtn: {
    flex: 1.4,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  confirmDisabled: {
    opacity: 0.5,
  },
});
