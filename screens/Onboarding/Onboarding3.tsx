// screens/Onboarding/Onboarding3.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import NeonButton from '../../components/NeonButton';
import { colors, spacing } from '../../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding3'>;

export default function Onboarding3({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.center}>
        <Text style={styles.title}>Bắt đầu thôi ✨</Text>
        <Text style={styles.body}>
          Đăng nhập hoặc tạo tài khoản để vào màn hình chính.
        </Text>
      </View>

      <View style={styles.bottom}>
        <NeonButton
          label="Đăng nhập"
          onPress={() => navigation.navigate('Login')}
        />

        <Text style={styles.alt} onPress={() => navigation.navigate('Signup')}>
          Chưa có tài khoản? <Text style={styles.altStrong}>Đăng ký</Text>
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
  center: {
    alignItems: 'center',
    marginTop: spacing(6),
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
  },
  body: {
    marginTop: spacing(1),
    textAlign: 'center',
    color: colors.gray300,
  },
  bottom: {
    alignItems: 'center',
    paddingBottom: spacing(2),
  },
  alt: {
    marginTop: spacing(1.5),
    color: colors.gray300,
  },
  altStrong: {
    color: colors.cyan,
    fontWeight: '600',
  },
});
