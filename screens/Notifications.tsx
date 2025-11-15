// screens/Notifications.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import BottomBar, { BottomTabKey } from '../components/BottomBar';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { colors } from '../theme/tokens';
// import { Image } from 'react-native/types_generated/index';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>;

export default function Notifications({ navigation }: Props) {
  const [active, setActive] = useState<BottomTabKey>('notifications');

  const handleTabPress = async (key: BottomTabKey) => {
    setActive(key);
    switch (key) {
      case 'profile':
        navigation.navigate('Profile');
        break;
      case 'chat':
        navigation.navigate('Chat');
        break;
      case 'home':
        navigation.navigate('Home');
        break;
      case 'notifications':
        //stays
        break;
      case 'nothing':
        await signOut(auth);
        navigation.navigate('Onboarding1');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Thông báo</Text>

        {/* {[
          'Đơn hàng #1234 đã được xác nhận.',
          'Có ưu đãi mới cho sinh viên.',
          'Tài khoản của bạn vừa đăng nhập ở thiết bị mới.',
          'Hóa đơn tháng này đã sẵn sàng.',
        ].map((msg, idx) => (
          <View key={idx} style={styles.item}>
            <View style={styles.dot} />
            <Text style={styles.message}>{msg}</Text>
          </View>
        ))} */}
      </ScrollView>
      <View style={{ top: 600 }}>
        <Image
          source={require('../assets/meo.jpg')}
          style={{
            width: 60,
            height: 60,
            top: -560,
            right: -16,
            marginTop: 50,
            borderRadius: 30,
          }}
        />
        <Text style={styles.title1}>
          Khởi My <Text style={styles.p}>đã gửi tin nhắn cho bạn</Text>
        </Text>
        <Text style={styles.p1}>9:50</Text>
      </View>
      <View style={{ top: 520 }}>
        <Image
          source={require('../assets/capybara.webp')}
          style={{
            width: 60,
            height: 60,
            top: -560,
            right: -16,
            marginTop: 50,
            borderRadius: 30,
          }}
        />
        <Text style={styles.title1}>
          Gia Khánh <Text style={styles.p}>đã gửi tin nhắn cho bạn</Text>
        </Text>
        <Text style={styles.p1}>9:43</Text>
      </View>
      <View style={{ top: 440 }}>
        <Image
          source={require('../assets/cho.webp')}
          style={{
            width: 60,
            height: 60,
            top: -560,
            right: -16,
            marginTop: 50,
            borderRadius: 30,
          }}
        />
        <Text style={styles.title1}>
          Bảo Anh <Text style={styles.p}>đã gửi tin nhắn cho bạn</Text>
        </Text>
        <Text style={styles.p1}>9:36</Text>
      </View>
      <View style={{ top: 360 }}>
        <Image
          source={require('../assets/vit.jpg')}
          style={{
            width: 60,
            height: 60,
            top: -560,
            right: -16,
            marginTop: 50,
            borderRadius: 30,
          }}
        />
        <Text style={styles.title1}>
          Gia Bảo <Text style={styles.p}>đã gửi tin nhắn cho bạn</Text>
        </Text>
        <Text style={styles.p1}>9:21</Text>
      </View>

      <BottomBar active={active} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  p1: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'italic',
    color: colors.blue,
    marginTop: 8,
    top: -635,
    right: -100,
  },
  p: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000ff',
    marginTop: 8,
  },
  title1: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000ff',
    marginTop: 8,
    marginLeft: 8,
    top: -630,
    right: -86,
  },
  container: { flex: 1, backgroundColor: '#fefce8' },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    top: 15,
  },
  subtitle: { marginTop: 6, color: '#6b7280' },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 18,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#f97316',
    marginRight: 10,
    marginTop: 4,
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
});
