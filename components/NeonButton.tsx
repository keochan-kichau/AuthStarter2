import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

type Props = {
  label: string;
  onPress: () => void | Promise<void>;
  style?: ViewStyle;
  disabled?: boolean;
};

export default function NeonButton({ label, onPress, style, disabled }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={() => {
          if (!disabled) {
            animate();
            onPress();
          }
        }}
        android_ripple={{ color: '#00e5c355' }}
        style={[styles.btn, disabled && { opacity: 0.6 }, style]}
      >
        <Text style={styles.txt}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.cyan,
    paddingVertical: spacing(1.5),
    paddingHorizontal: spacing(2),
    borderRadius: radius.md,
    shadowColor: colors.cyan,
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
    alignItems: 'center',
  },
  txt: { color: '#0B0B0C', fontWeight: '800', fontSize: 16 },
});
