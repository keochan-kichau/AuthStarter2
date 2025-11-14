// screens/Profile.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import BottomBar, { BottomTabKey } from '../components/BottomBar';
import NeonButton from '../components/NeonButton';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function Profile({ navigation }: Props) {
  const [active, setActive] = useState<BottomTabKey>('profile');

  const handleTabPress = async (key: BottomTabKey) => {
    setActive(key);
    switch (key) {
      case 'profile':
        break;
      case 'buying':
        navigation.navigate('Buying');
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
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Hồ sơ của bạn</Text>
        <Text style={styles.subtitle}>Cập nhật thông tin cá nhân.</Text>

        <Text style={styles.label}>Tên hiển thị</Text>
        <TextInput style={styles.input} placeholder="Nhập tên" />

        <Text style={styles.label}>Mô tả ngắn</Text>
        <TextInput
          style={[styles.input, { height: 90, textAlignVertical: 'top' }]}
          placeholder="Giới thiệu đôi chút về bạn..."
          multiline
        />

        <NeonButton
          label="Lưu thay đổi"
          onPress={() => {}}
          style={{ marginTop: 24 }}
        />
      </ScrollView>

      <BottomBar active={active} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  subtitle: { marginTop: 6, color: '#6b7280' },
  label: {
    marginTop: 24,
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});
