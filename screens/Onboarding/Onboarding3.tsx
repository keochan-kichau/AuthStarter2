// screens/Onboarding/Onboarding3.tsx
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import NeonButton from '../../components/NeonButton';
import { colors, spacing } from '../../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding3'>;

export default function Onboarding3({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.top}>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 90, height: 90, top: -40 }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/on3.jpg')}
          style={{ width: 350, height: 350, top: 0, borderRadius: 40 }}
          resizeMode="contain"
        />
        <Text style={styles.title}>Xin chào 👋</Text>
        <Text style={styles.body}>
          Đã đến lúc trải nghiệm sức mạnh của AI cùng Victoria!
        </Text>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.next} onPress={() => navigation.navigate('Login')}>
          Đăng nhập nào!
        </Text>
        <Text style={styles.alt} onPress={() => navigation.navigate('Signup')}>
          Chưa có tài khoản? <Text style={styles.altStrong}>Đăng ký</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: { alignItems: 'center', marginTop: spacing(4) },
  next: {
    width: '100%',
    textAlign: 'center',
    height: 55,
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#00ccffff',
    padding: spacing(2),
    borderRadius: 20,
    top: -50,
  },
  wrap: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.gray600,
    top: 70,
  },
  body: {
    marginTop: spacing(1),
    textAlign: 'center',
    color: colors.gray600,
    fontSize: 14,
    top: 70,
  },
  bottom: {
    alignItems: 'center',
    paddingBottom: spacing(2),
  },
  alt: {
    marginTop: spacing(1.5),
    color: colors.gray600,
    top: -50,
    fontSize: 16,
  },
  altStrong: {
    color: colors.cyan,
    fontWeight: '600',
  },
});
