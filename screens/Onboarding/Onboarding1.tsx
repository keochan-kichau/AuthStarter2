// screens/Onboarding1.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { RootScreenProps } from '../../App';

export default function Onboarding1({
  navigation,
}: RootScreenProps<'Onboarding1'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bloom App ✨</Text>
      <Text style={styles.subtitle}>Ứng dụng demo 😎</Text>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.primaryText}>Bắt đầu</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Tạo tài khoản mới</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { color: '#fff', fontSize: 30, fontWeight: '700', marginBottom: 8 },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 24,
  },
  primaryBtn: {
    backgroundColor: '#00FFF0',
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 12,
  },
  primaryText: { color: '#000', fontWeight: '700', fontSize: 16 },
  link: { color: '#fff', textDecorationLine: 'underline' },
});
