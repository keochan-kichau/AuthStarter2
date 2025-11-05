// screens/Login.tsx
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

export default function Login({ navigation }: RootScreenProps<'Login'>) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !pass) {
      Alert.alert('Thiếu thông tin', 'Nhập email và mật khẩu');
      return;
    }
    setLoading(true);
    // TODO: call firebase here
    setTimeout(() => {
      setLoading(false);
      navigation.replace('AppShell');
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#0B0B0C' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.subtitle}>Chào mừng quay lại 🌱</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="nhapemail@vd.com"
          placeholderTextColor="rgba(255,255,255,0.25)"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          value={pass}
          onChangeText={setPass}
          placeholder="••••••••"
          placeholderTextColor="rgba(255,255,255,0.25)"
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.primaryBtn, loading && { opacity: 0.5 }]}
          onPress={onLogin}
          disabled={loading}
        >
          <Text style={styles.primaryText}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.link}>Quên mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 70,
  },
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
