import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  ViewStyle,
} from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  style?: ViewStyle;
};

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  style,
}: FieldProps) {
  const [secure, setSecure] = useState(!!secureTextEntry);

  return (
    <View style={[styles.wrap, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputBox, error && { borderColor: '#FF6B81' }]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.gray300}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          style={styles.input}
          autoCapitalize="none"
        />
        {secureTextEntry ? (
          <Pressable onPress={() => setSecure(s => !s)} style={styles.eye}>
            <Text style={{ color: colors.cyan }}>{secure ? '👁️‍🗨️' : '👁️'}</Text>
          </Pressable>
        ) : null}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing(2) },
  label: { color: colors.gray300, marginBottom: 6, fontSize: 13 },
  inputBox: {
    borderWidth: 1,
    borderColor: colors.outline,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: radius.md,
    paddingHorizontal: spacing(1.5),
    paddingVertical: spacing(1),
  },
  input: { color: colors.white, fontSize: 16 },
  eye: { position: 'absolute', right: spacing(1), top: spacing(1) },
  error: { color: '#FF6B81', marginTop: 6, fontSize: 12 },
});
