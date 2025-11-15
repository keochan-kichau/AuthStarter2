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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { colors, spacing } from '../theme/tokens';
import { Field } from '../components/Form';
import NeonButton from '../components/NeonButton';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Login({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [mssv, setMssv] = useState('');
  const [errMssv, setErrMssv] = useState('');
  const [errPass, setErrPass] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setErrEmail('');
    setErrPass('');
    setErrMssv('');
    if (!email.includes('@')) return setErrEmail('Email chưa hợp lệ');
    if (mssv.length === 0) return setErrMssv('MSSV không được để trống');
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
          <Image
            source={require('../assets/logo.png')}
            style={{ width: 200, height: 200, top: -20 }}
            resizeMode="contain"
          />
          <Text style={styles.title}>Chào mừng trở lại</Text>
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
          <Text style={styles.titleform1}> Mật khẩu </Text>
          <TextInput
            style={styles.form1}
            value={pass}
            onChangeText={setPass}
            placeholder="Nhập Mật khẩu của bạn"
            secureTextEntry
          />
          <NeonButton label="Đăng nhập" onPress={onLogin} />
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
            Chưa có tài khoản? <Text style={styles.altStrong}>Đăng ký</Text>
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
  form: { gap: spacing(2) },
  //Hộp
  hop: { backgroundColor: colors.white },
  link: {
    color: colors.black,
    marginTop: spacing(2),
    top: -135,
    right: -270,
    fontWeight: 'bold',
  },
  alt: {
    color: colors.black,
    marginTop: spacing(2),
    top: -50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  altStrong: {
    color: colors.blue,
    fontWeight: '600',
    right: -270,
  },
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
    top: -20,
  },
});
