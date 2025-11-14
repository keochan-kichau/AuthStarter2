// screens/Buying.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import BottomBar, { BottomTabKey } from '../components/BottomBar';
import NeonButton from '../components/NeonButton';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'Buying'>;

export default function Buying({ navigation }: Props) {
  const [active, setActive] = useState<BottomTabKey>('buying');

  const handleTabPress = async (key: BottomTabKey) => {
    setActive(key);
    switch (key) {
      case 'profile':
        navigation.navigate('Profile');
        break;
      case 'buying':
        break;
      case 'home':
        navigation.navigate('Home');
        break;
      case 'bills':
        navigation.navigate('Bills');
        break;
      case 'logout':
        await signOut(auth);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding1' }],
        });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mua sắm</Text>
        <Text style={styles.subtitle}>
          Đây là hub Mua sắm. Bạn có thể vào Chọn hàng hoặc đi thẳng sang Thanh
          toán.
        </Text>

        <NeonButton
          label="Chọn hàng"
          onPress={() => navigation.navigate('Shop')}
          style={{ marginTop: 24 }}
        />
        <NeonButton
          label="Thanh toán"
          onPress={() => navigation.navigate('Checkout')}
          style={{ marginTop: 12 }}
        />
      </View>

      <BottomBar active={active} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  subtitle: {
    marginTop: 8,
    color: '#6b7280',
    lineHeight: 22,
  },
});
