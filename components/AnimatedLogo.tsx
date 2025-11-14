// components/AnimatedLogo.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

// Đổi đường dẫn logo của bạn tại đây
const LOGO = require('../assets/logo.jpg'); // hoặc logo.jpg

export default function AnimatedLogo() {
  // scale cho logo (native OK)
  const scale = useRef(new Animated.Value(1)).current;
  // glow: dùng một vòng tròn mờ overlay -> animate opacity + scale (native OK)
  const glowOpacity = useRef(new Animated.Value(0.5)).current;
  const glowScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Nhịp tim (pulse) cho logo
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.06,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true, // chỉ transform
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    // Glow chạy lệch pha một chút để nhìn mềm
    const glow = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(glowOpacity, {
            toValue: 0.9,
            duration: 900,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true, // opacity OK
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.4,
            duration: 900,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(glowScale, {
            toValue: 1.15,
            duration: 900,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true, // transform OK
          }),
          Animated.timing(glowScale, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    pulse.start();
    glow.start();

    return () => {
      pulse.stop();
      glow.stop();
    };
  }, [glowOpacity, glowScale, scale]);

  return (
    <View style={styles.wrap}>
      {/* Glow layer: một vòng tròn mờ, không animate shadow* */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.glow,
          {
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />
      {/* Logo chính */}
      <Animated.Image
        source={LOGO}
        resizeMode="contain"
        style={[styles.logo, { transform: [{ scale }] }]}
      />
    </View>
  );
}

const SIZE = 140;

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: SIZE * 0.95,
    height: SIZE * 0.95,
    borderRadius: (SIZE * 0.95) / 2,
    // tạo cảm giác “neon” bằng gradient giả qua 2 lớp màu trong suốt
    backgroundColor: 'rgba(0,255,240,0.25)', // neon cyan nhạt
    // KHÔNG animate shadow*, tránh lỗi
  },
  logo: {
    width: SIZE,
    height: SIZE,
  },
});
