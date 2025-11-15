// screens/Profile.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import BottomBar, { BottomTabKey } from '../components/BottomBar';
import NeonButton from '../components/NeonButton';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { colors } from '../theme/tokens';
type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

interface UserProfile {
  displayName: string;
  email: string;
  studentId: string; // MSSV
}

export default function Profile({ navigation }: Props) {
  const [active, setActive] = useState<BottomTabKey>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        console.log('Firebase currentUser = ', user);

        if (!user) {
          Alert.alert('Chưa đăng nhập', 'Bạn cần đăng nhập lại để xem hồ sơ.', [
            {
              text: 'OK',
              onPress: () =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Onboarding1' }],
                }),
            },
          ]);
          return;
        }

        let profile: UserProfile = {
          displayName: user.displayName || 'Chưa đặt tên',
          email: user.email || 'Không có email',
          studentId: 'Đang tải MSSV...',
        };

        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        console.log('Firestore users doc = ', snap.exists(), snap.data());

        if (snap.exists()) {
          const data = snap.data() as Partial<UserProfile>;
          profile = {
            ...profile,
            studentId: data.studentId || 'Chưa có MSSV',
            displayName: data.displayName || profile.displayName,
          };
        } else {
          profile.studentId = 'Chưa có MSSV';
        }

        setUserProfile(profile);
      } catch (e) {
        console.log('Lỗi lấy profile: ', e);
        Alert.alert('Lỗi', 'Không lấy được thông tin tài khoản.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigation]);

  const handleTabPress = async (key: BottomTabKey) => {
    setActive(key);
    switch (key) {
      case 'profile':
        break;
      case 'chat':
        navigation.navigate('Chat');
        break;
      case 'home':
        navigation.navigate('Home');
        break;
      case 'notifications':
        navigation.navigate('Notifications');
        break;
      case 'nothing':
        await signOut(auth);
        navigation.reset({ index: 0, routes: [{ name: 'Onboarding1' }] });
        break;
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
          style={{ flex: 1, justifyContent: 'center' }}
        />
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 80, textAlign: 'center' }}>
          Không tìm thấy thông tin người dùng.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/con-meo-hoat-hinh-de-thuong-2.webp')}
        style={{ width: 200, height: 200, top: 40, alignSelf: 'center' }}
        resizeMode="contain"
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Hồ sơ của bạn</Text>
        <Text style={styles.subtitle}>Thông tin của bạn hiển thị tại đây.</Text>
        <Text style={styles.label}>Tên hiển thị</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên"
          value={userProfile.displayName}
          editable={false}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email của bạn"
          value={userProfile.email}
          editable={false}
        />

        <Text style={styles.label}>Mã số sinh viên (MSSV)</Text>
        <TextInput
          style={styles.input}
          placeholder="MSSV"
          value={userProfile.studentId}
          editable={false}
        />

        <Text style={styles.label}>Mô tả ngắn</Text>
        <TextInput
          style={[styles.input, { height: 90, textAlignVertical: 'top' }]}
          placeholder="Giới thiệu đôi chút về bạn..."
          multiline
        />
        <NeonButton
          label="Lưu thay đổi"
          onPress={() =>
            Alert.alert(
              'Thông báo',
              'Đã lưu 😆', //Chưa lưu đâu
            )
          }
          style={{ marginTop: 24, top: 10 }}
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
  },
  label: {
    marginTop: 24,
    fontSize: 16,
    color: '#374151',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',

    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 2,

    borderRadius: 15,
    borderColor: colors.blue,
  },
});
