// screens/Chat.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import BottomBar, { BottomTabKey } from '../components/BottomBar';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { colors } from '../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function Chat({ navigation }: Props) {
  const [active, setActive] = useState<BottomTabKey>('chat');

  const handleTabPress = async (key: BottomTabKey) => {
    setActive(key);
    switch (key) {
      case 'profile':
        navigation.navigate('Profile');
        break;
      case 'chat':
        // stay here
        break;
      case 'home':
        navigation.navigate('Home');
        break;
      case 'notifications':
        navigation.navigate('Notifications');
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
        <Text style={styles.title}>Tin nhắn</Text>
        <TextInput
          style={styles.form1}
          placeholder="Tìm người bạn muốn nhắn tin"
        />
        <View style={{ top: 100 }}>
          {['Nhóm bạn lớp', 'Nhóm project', 'Mentor của tôi', 'Gia đình'].map(
            (name, idx) => (
              <TouchableOpacity key={idx} style={styles.card}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{name.charAt(0)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.preview}>Nhắn gì đó với {name}...</Text>
                </View>
                <Text style={styles.time}>· 5 phút</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </ScrollView>

      <BottomBar active={active} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  form1: {
    borderWidth: 2,
    width: 380,
    height: 50,
    padding: 10,
    borderRadius: 15,
    borderColor: colors.blue,
    top: 30,
  },
  container: { flex: 1, backgroundColor: '#eef2ff' },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  title: { fontSize: 24, fontWeight: '700', color: '#111827', top: 10 },
  subtitle: { marginTop: 6, color: '#6b7280' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#fff', fontWeight: '700' },
  name: { fontSize: 15, fontWeight: '600', color: '#111827' },
  preview: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  time: { fontSize: 11, color: '#9ca3af' },
});
