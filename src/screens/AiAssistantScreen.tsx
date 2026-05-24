// AI chat screen — opened from the floating + button on home.
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/AppText';
import { ScreenHeader } from '../components/ScreenHeader';
import { radius, spacing } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AiAssistant'>;

const starterPrompts = [
  'I have mild fever since yesterday',
  'Explain my blood report',
  'Medicine interaction check',
];

export function AiAssistantScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { colors, minTouchSize } = useTheme();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; text: string }[]
  >([
    {
      role: 'assistant',
      text: 'Hello! I am your Athulya health assistant. How can I help you today?',
    },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { role: 'user', text: text.trim() },
      {
        role: 'assistant',
        text: 'Thank you for sharing. Based on your symptoms, I recommend booking a consultation with a general physician. This is not a medical diagnosis.',
      },
    ]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="AI Health Assistant" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        contentContainerStyle={styles.messages}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.bubble,
              msg.role === 'user' ? styles.userBubble : styles.botBubble,
              {
                backgroundColor:
                  msg.role === 'user' ? colors.primary : colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <AppText
              variant="body"
              color={msg.role === 'user' ? colors.white : colors.text}
            >
              {msg.text}
            </AppText>
          </View>
        ))}

        <AppText variant="label" muted style={styles.promptLabel}>
          Quick prompts
        </AppText>
        {starterPrompts.map((p) => (
          <Pressable
            key={p}
            style={[
              styles.prompt,
              {
                borderColor: colors.border,
                backgroundColor: colors.surface,
                minHeight: minTouchSize - 12,
              },
            ]}
            onPress={() => send(p)}
          >
            <AppText variant="caption">{p}</AppText>
          </Pressable>
        ))}
      </ScrollView>

      <View
        style={[
          styles.inputRow,
          {
            paddingBottom: insets.bottom + 12,
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Describe symptoms or ask a question..."
          placeholderTextColor={colors.textLight}
          value={input}
          onChangeText={setInput}
        />
        <Pressable
          style={[
            styles.sendBtn,
            { backgroundColor: colors.primary, minHeight: minTouchSize, minWidth: minTouchSize },
          ]}
          onPress={() => send(input)}
        >
          <Ionicons name="send" size={20} color={colors.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  messages: {
    padding: spacing.screen,
    paddingBottom: spacing.lg,
  },
  bubble: {
    maxWidth: '88%',
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
  },
  userBubble: { alignSelf: 'flex-end' },
  botBubble: { alignSelf: 'flex-start' },
  promptLabel: { marginTop: spacing.md, marginBottom: spacing.sm },
  prompt: {
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'NunitoSans_400Regular',
    paddingVertical: 10,
  },
  sendBtn: {
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
