// screens/Home.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomBar, { BottomTabKey } from '../components/BottomBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import NeonButton from '../components/NeonButton';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import Onboarding1 from './Onboarding/Onboarding1';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const [active, setActive] = useState<BottomTabKey>('home');

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
      <View style={styles.content}>
        <Text style={styles.title}>Xin chào 👋</Text>
        <Text style={styles.subtitle}>Home</Text>

        <NeonButton
          label="Đi tới Tin nhắn"
          onPress={() => {
            setActive('chat');
            navigation.navigate('Chat');
          }}
          style={{ marginTop: 24 }}
        />
      </View>

      <BottomBar active={active} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  title: { fontSize: 26, fontWeight: '700', color: '#111827' },
  subtitle: {
    marginTop: 12,
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
  },
});
