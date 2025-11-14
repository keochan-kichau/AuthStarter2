import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { colors, spacing } from '../theme/tokens';
import { Field } from '../components/Form';
import NeonButton from '../components/NeonButton';

export default function Signup({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    setErr('');
    if (!email.includes('@')) return setErr('Email chưa hợp lệ');
    if (pass.length < 8) return setErr('Mật khẩu ≥ 8 ký tự');
    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (name) await updateProfile(cred.user, { displayName: name });
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (e: any) {
      setErr(e?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Tạo tài khoản</Text>
        </View>

        <View style={styles.form}>
          <Field
            label="Tên"
            value={name}
            onChangeText={setName}
            placeholder="Tên hiển thị"
          />
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="email@domain.com"
          />
          <Field
            label="Mật khẩu"
            value={pass}
            onChangeText={setPass}
            placeholder="••••••••"
            secureTextEntry
          />
          {!!err && <Text style={styles.err}>{err}</Text>}
          <NeonButton
            label={loading ? 'Đang tạo...' : 'Đăng ký'}
            onPress={onSignup}
          />
          <Text style={styles.alt} onPress={() => navigation.replace('Login')}>
            Đã có tài khoản? Đăng nhập
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, padding: spacing(2) },
  header: { alignItems: 'center', marginVertical: spacing(3) },
  title: { color: colors.white, fontSize: 24, fontWeight: '800' },
  form: { gap: spacing(1) },
  err: { color: '#FF6B81', marginBottom: spacing(1) },
  alt: { color: colors.cyan, marginTop: spacing(1) },
});
