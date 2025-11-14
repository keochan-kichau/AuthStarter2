// screens/Bills.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import BottomBar, { BottomTabKey } from '../components/BottomBar';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'Bills'>;

const DATA = [
  { id: '1', title: 'Đơn #0001', status: 'Đã thanh toán' },
  { id: '2', title: 'Đơn #0002', status: 'Đã thanh toán' },
];

export default function Bills({ navigation }: Props) {
  const [active, setActive] = useState<BottomTabKey>('bills');

  const handleTabPress = async (key: BottomTabKey) => {
    setActive(key);
    switch (key) {
      case 'profile':
        navigation.navigate('Profile');
        break;
      case 'buying':
        navigation.navigate('Buying');
        break;
      case 'home':
        navigation.navigate('Home');
        break;
      case 'bills':
        break;
      case 'logout':
        await signOut(auth);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding1' }],
        });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bills</Text>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingTop: 16 }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemStatus}>{item.status}</Text>
            </View>
          )}
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
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  item: {
    marginTop: 12,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  itemTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },
  itemStatus: { marginTop: 4, color: '#16a34a', fontWeight: '500' },
});
