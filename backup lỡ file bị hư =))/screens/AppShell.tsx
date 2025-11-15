// screens/AppShell.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { RootScreenProps } from '../App';
import Home from './Home';
import Profile from './Profile';
import Messages from './Messages';
import Photos from './Photos';
import BottomBar from '../../components/BottomBar';

type TabKey = 'home' | 'profile' | 'messages' | 'photos';

export default function AppShell({ navigation }: RootScreenProps<'AppShell'>) {
  const [active, setActive] = useState<TabKey>('home');

  const renderScreen = () => {
    switch (active) {
      case 'profile':
        return <Profile />;
      case 'messages':
        return <Messages />;
      case 'photos':
        return <Photos />;
      case 'home':
      default:
        return <Home />;
    }
  };

  const handleTabPress = (key: string) => {
    if (key === 'logout') {
      navigation.reset({ index: 0, routes: [{ name: 'Onboarding1' }] });
      return;
    }
    setActive(key as TabKey);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>{renderScreen()}</View>
      <BottomBar activeKey={active} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0C' },
});
