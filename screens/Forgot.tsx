import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { colors, spacing } from '../theme/tokens';
import { Field } from '../components/Form';
import NeonButton from '../components/NeonButton';

export default function Forgot({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [mssv, setMssv] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const onReset = async () => {
    setErr('');
    setMsg('');
    if (!email.includes('@')) return setErr('Email chưa hợp lệ');
    if (mssv.length === 0) return setErr('MSSV không được để trống');
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
          <Image
            source={require('../assets/logo.png')}
            style={{ width: 200, height: 200, top: -20 }}
            resizeMode="contain"
          />
          <Text style={styles.title}>Đặt lại mật khẩu của bạn</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.titleform1}> Email </Text>
          <TextInput
            style={styles.form1}
            value={email}
            onChangeText={setEmail}
            placeholder="Nhập Email của bạn"
          />
          <Text style={styles.titleform1}> MSSV </Text>
          <TextInput
            style={styles.form1}
            value={mssv}
            onChangeText={setMssv}
            placeholder="Nhập MSSV của bạn"
          />
          <NeonButton label="Gửi email đặt lại" onPress={onReset} />
          <Text style={styles.alt} onPress={() => navigation.navigate('Login')}>
            Đã nhớ lại mật khẩu? <Text style={styles.altStrong}>Đăng nhập</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleform1: {
    color: 'black',
    textAlign: 'left',
    top: -60,
    fontSize: 16,
    fontWeight: 'bold',
  },
  alt: {
    color: colors.black,
    marginTop: spacing(2),
    top: -20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  altStrong: {
    color: colors.blue,
    fontWeight: '600',
    right: -270,
  },
  form1: {
    borderWidth: 2,
    width: 380,
    height: 50,
    padding: 10,
    borderRadius: 15,
    borderColor: colors.blue,
    top: -60,
  },
  wrap: { flex: 1, backgroundColor: colors.white, padding: spacing(2) },
  header: {
    alignItems: 'center',
    marginTop: spacing(3),
    marginBottom: spacing(4),
  },
  title: {
    color: colors.gray600,
    fontSize: 26,
    fontWeight: '800',
    marginTop: spacing(3),
    top: -60,
    textAlign: 'center',
  },
  form: { gap: spacing(1) },
  err: { color: '#FF6B81' },
  msg: { color: '#52FFA8' },
});
