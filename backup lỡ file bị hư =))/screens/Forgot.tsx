// screens/Forgot.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import type { RootScreenProps } from '../App';

export default function Forgot({ navigation }: RootScreenProps<'Forgot'>) {
  const [email, setEmail] = useState('');

  const onReset = () => {
    if (!email) {
      Alert.alert('Thiếu thông tin', 'Nhập email để reset');
      return;
    }
    // TODO: firebase send password email
    Alert.alert('Đã gửi', 'Kiểm tra email của bạn');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0B0B0C' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Quên mật khẩu</Text>
        <Text style={styles.subtitle}>Nhập email để khôi phục</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="email@vd.com"
          placeholderTextColor="rgba(255,255,255,0.25)"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.primaryBtn} onPress={onReset}>
          <Text style={styles.primaryText}>Gửi liên kết</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 70 },
  title: { color: '#fff', fontSize: 28, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: 'rgba(255,255,255,0.6)', marginBottom: 28 },
  label: { color: '#fff', marginTop: 12, marginBottom: 6, fontWeight: '600' },
  input: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,240,0.22)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#fff',
  },
  primaryBtn: {
    backgroundColor: '#00FFF0',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 26,
    alignItems: 'center',
  },
  primaryText: { color: '#000', fontWeight: '700', fontSize: 16 },
  link: {
    color: '#fff',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});
