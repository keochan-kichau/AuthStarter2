import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AnimatedLogo from '../../components/AnimatedLogo';
import NeonButton from '../../components/NeonButton';
import { colors, spacing } from '../../theme/tokens';

export default function Onboarding1({ navigation }: any) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.top}>
        <AnimatedLogo />
        <Text style={styles.title}>Xin chào 👋</Text>
        <Text style={styles.body}>
          Ứng dụng neon + glass.\nVuốt tiếp để khám phá.
        </Text>
      </View>
      <View style={styles.bottom}>
        <NeonButton
          label="Tiếp"
          onPress={() => navigation.navigate('Onboarding2')}
        />
        <Text style={styles.link} onPress={() => navigation.replace('Login')}>
          Bỏ qua
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing(2),
    justifyContent: 'space-between',
  },
  top: { alignItems: 'center', marginTop: spacing(4) },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '800',
    marginTop: spacing(2),
  },
  body: { color: colors.gray300, textAlign: 'center', marginTop: spacing(1) },
  bottom: { alignItems: 'center', gap: spacing(1) },
  link: { color: colors.cyan, marginTop: spacing(1) },
});
