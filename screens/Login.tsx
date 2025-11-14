import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { colors, spacing } from '../theme/tokens';
import AnimatedLogo from '../components/AnimatedLogo';
import { Field } from '../components/Form';
import NeonButton from '../components/NeonButton';

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPass, setErrPass] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setErrEmail('');
    setErrPass('');
    if (!email.includes('@')) return setErrEmail('Email chưa hợp lệ');
    if (pass.length < 8) return setErrPass('Mật khẩu ≥ 8 ký tự');
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, pass);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (e: any) {
      setErrPass(e?.message || 'Đăng nhập thất bại');
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
          <AnimatedLogo />
          <Text style={styles.title}>Chào mừng trở lại</Text>
        </View>

        <View style={styles.form}>
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="nhap@email.com"
            error={errEmail}
          />
          <Field
            label="Mật khẩu"
            value={pass}
            onChangeText={setPass}
            placeholder="••••••••"
            secureTextEntry
            error={errPass}
          />
          <NeonButton
            label={loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            onPress={onLogin}
          />
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Forgot')}
          >
            Quên mật khẩu?
          </Text>
          <Text
            style={styles.alt}
            onPress={() => navigation.navigate('Signup')}
          >
            Chưa có tài khoản? Đăng ký
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, padding: spacing(2) },
  header: {
    alignItems: 'center',
    marginTop: spacing(2),
    marginBottom: spacing(3),
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '800',
    marginTop: spacing(2),
  },
  form: { gap: spacing(1) },
  link: { color: colors.cyan, marginTop: spacing(1) },
  alt: { color: colors.cyan, marginTop: spacing(1) },
});
