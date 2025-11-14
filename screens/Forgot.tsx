import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { colors, spacing } from '../theme/tokens';
import { Field } from '../components/Form';
import NeonButton from '../components/NeonButton';

export default function Forgot({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const onReset = async () => {
    setErr('');
    setMsg('');
    if (!email.includes('@')) return setErr('Email chưa hợp lệ');
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg('Đã gửi email đặt lại mật khẩu');
    } catch (e: any) {
      setErr(e?.message || 'Không gửi được email');
    }
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Quên mật khẩu</Text>
        </View>
        <View style={styles.form}>
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="email@domain.com"
          />
          {!!err && <Text style={styles.err}>{err}</Text>}
          {!!msg && <Text style={styles.msg}>{msg}</Text>}
          <NeonButton label="Gửi email đặt lại" onPress={onReset} />
          <Text style={styles.alt} onPress={() => navigation.replace('Login')}>
            Quay lại đăng nhập
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
  err: { color: '#FF6B81' },
  msg: { color: '#52FFA8' },
  alt: { color: colors.cyan, marginTop: spacing(1) },
});
