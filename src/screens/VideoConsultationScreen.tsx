// Full-screen video call UI — doctor video, self view, and call controls.
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { images } from '../constants/images';
import { radius, spacing } from '../constants/theme';
import { getAppointmentById, getDoctorById } from '../data/mockData';
import { ConsultStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ConsultStackParamList, 'VideoConsultation'>;

function formatTimer(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function VideoConsultationScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const appointment = getAppointmentById(route.params.appointmentId);
  const doctor = appointment
    ? getDoctorById(appointment.doctorId)
    : undefined;
  const [seconds, setSeconds] = useState(265);
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [fadeAnim]);

  if (!doctor) return null;

  return (
    <Animated.View style={[styles.root, { opacity: fadeAnim }]}>
      <StatusBar style="light" />

      <Image source={images.doctor} style={styles.videoBg} resizeMode="cover" />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.55)']}
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      <View style={[styles.pip, { top: insets.top + 8, right: spacing.md }]}>
        <View style={styles.pipInner}>
          <Ionicons name="person" size={32} color="rgba(255,255,255,0.5)" />
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        {Platform.OS === 'web' ? (
          <View style={styles.infoBar}>
            <InfoContent doctorName={doctor.name} specialty={doctor.specialty} seconds={seconds} />
          </View>
        ) : (
          <BlurView intensity={55} tint="dark" style={styles.infoBar}>
            <InfoContent doctorName={doctor.name} specialty={doctor.specialty} seconds={seconds} />
          </BlurView>
        )}

        <View style={styles.controlsRow}>
          <RoundControl icon="camera-reverse" onPress={() => {}} />
          <RoundControl
            icon={muted ? 'mic-off' : 'mic'}
            onPress={() => setMuted(!muted)}
          />
          <RoundControl
            icon={videoOn ? 'pause' : 'videocam'}
            onPress={() => setVideoOn(!videoOn)}
          />
          <Pressable
            style={styles.endCall}
            onPress={() =>
              navigation.replace('CallEnded', {
                appointmentId: route.params.appointmentId,
                durationMinutes: Math.max(1, Math.ceil(seconds / 60)),
              })
            }
          >
            <Ionicons name="call" size={26} color="#FFFFFF" style={styles.hangupIcon} />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

function InfoContent({
  doctorName,
  specialty,
  seconds,
}: {
  doctorName: string;
  specialty: string;
  seconds: number;
}) {
  return (
    <>
      <View style={styles.infoText}>
        <AppText variant="h2" color="#FFFFFF" numberOfLines={1}>
          {doctorName}
        </AppText>
        <AppText variant="caption" color="rgba(255,255,255,0.88)">
          {specialty}
        </AppText>
      </View>
      <View style={styles.timerWrap}>
        <View style={styles.recDot} />
        <AppText variant="h3" color="#FFFFFF" style={styles.timer}>
          {formatTimer(seconds)}
        </AppText>
      </View>
    </>
  );
}

function RoundControl({
  icon,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.roundBtn} onPress={onPress}>
      <Ionicons name={icon} size={26} color="#1E293B" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoBg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '45%',
  },
  pip: {
    position: 'absolute',
    zIndex: 20,
  },
  pipInner: {
    width: 92,
    height: 124,
    borderRadius: 14,
    backgroundColor: 'rgba(28,28,28,0.75)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    gap: 20,
    zIndex: 30,
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.full,
    overflow: 'hidden',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  infoText: {
    flex: 1,
    gap: 2,
    paddingRight: 12,
  },
  timerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
  timer: {
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: spacing.sm,
  },
  roundBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  endCall: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  hangupIcon: {
    transform: [{ rotate: '135deg' }],
  },
});
