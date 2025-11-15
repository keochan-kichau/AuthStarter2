import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// Import 'db' và các hàm Firestore cần thiết
import { auth, db } from '../firebase/firebaseConfig'; // Cần đảm bảo 'db' được export từ firebaseConfig.ts
import { doc, setDoc } from 'firebase/firestore'; // <<< THÊM: Import setDoc và doc
import { colors, spacing } from '../theme/tokens';
import { Field } from '../components/Form';
import NeonButton from '../components/NeonButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [mssv, setMssv] = useState('');
  const [err, setErr] = useState('');
  const [errMssv, setErrMssv] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    setErr('');
    setErrMssv('');
    if (!email.includes('@')) return setErr('Email chưa hợp lệ');
    if (mssv.length === 0) return setErrMssv('MSSV không được để trống');
    if (pass.length < 8) return setErr('Mật khẩu ≥ 8 ký tự');

    try {
      setLoading(true);
      // 1. Tạo tài khoản Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, email, pass);

      // 2. Cập nhật tên hiển thị trong Firebase Auth
      await updateProfile(cred.user, { displayName: name });

      // 3. LƯU THÔNG TIN BỔ SUNG (MSSV) VÀO FIRESTORE
      // Sử dụng uid của người dùng làm Document ID trong collection 'users'
      const userRef = doc(db, 'users', cred.user.uid);
      await setDoc(userRef, {
        studentId: mssv, // Lưu MSSV
        // Thêm các trường khác nếu cần
      });

      console.log('Đăng ký thành công và đã lưu MSSV vào Firestore!');
      navigation.replace('Home');
    } catch (e: any) {
      console.error('Lỗi đăng ký:', e);
      if (e.code === 'auth/email-already-in-use') {
        setErr('Email này đã được sử dụng.');
      } else {
        setErr('Lỗi đăng ký. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Image
            source={require('../assets/logo.png')}
            style={{ width: 200, height: 200, top: -60 }}
            resizeMode="contain"
          />
          <Text style={styles.title}>Hãy đăng kí</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.titleform1}>Tên hiển thị</Text>
          <TextInput
            style={styles.form1}
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên của bạn"
          />
          <Text style={styles.titleform1}>Email</Text>
          <TextInput
            style={styles.form1}
            value={email}
            onChangeText={setEmail}
            placeholder="Nhập Email của bạn"
          />
          {!!err && <Text style={styles.err}>{err}</Text>}
          <Text style={styles.titleform1}>Mã số sinh viên (MSSV)</Text>
          <TextInput
            style={styles.form1}
            value={mssv}
            onChangeText={setMssv}
            placeholder="Nhập MSSV của bạn"
          />
          {!!errMssv && <Text style={styles.err}>{errMssv}</Text>}
          <Text style={styles.titleform1}>Mật khẩu</Text>
          <TextInput
            style={styles.form1}
            value={pass}
            onChangeText={setPass}
            placeholder="Nhập Mật khẩu của bạn"
            secureTextEntry
          />
          <NeonButton label="Đăng kí" onPress={onSignup} disabled={loading} />
          <Text style={styles.alt} onPress={() => navigation.replace('Login')}>
            Đã có tài khoản? <Text style={styles.altStrong}>Đăng nhập</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (Styles cũ của bạn được giữ nguyên)
  wrap: { flex: 1, backgroundColor: colors.white, padding: spacing(2) },
  header: { alignItems: 'center', marginVertical: spacing(4) },
  title: { color: colors.black, fontSize: 26, fontWeight: '800', top: -80 },
  form: { gap: spacing(2), top: -20 },
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
  err: { color: '#FF6B81', marginBottom: spacing(1) },
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
});
