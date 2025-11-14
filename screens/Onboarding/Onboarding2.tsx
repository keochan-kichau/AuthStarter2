import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NeonButton from '../../components/NeonButton';
import { colors, spacing } from '../../theme/tokens';

export default function Onboarding2({ navigation }: any) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.center}>
        <Text style={styles.title}>Nhanh & Mượt</Text>
        <Text style={styles.body}>
          Thiết kế tối giản, thao tác nhanh cho sinh viên VN.
        </Text>
      </View>
      <View style={styles.bottom}>
        <NeonButton
          label="Tiếp"
          onPress={() => navigation.navigate('Onboarding3')}
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
  center: { alignItems: 'center', marginTop: spacing(6) },
  title: { color: colors.white, fontSize: 28, fontWeight: '800' },
  body: { color: colors.gray300, marginTop: spacing(1), textAlign: 'center' },
  bottom: { alignItems: 'center' },
  link: { color: colors.cyan, marginTop: spacing(1) },
});
