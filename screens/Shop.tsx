// screens/Shop.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Shop'>;

const PRODUCTS = [
  { id: '1', name: 'Combo Hoa quả', price: '120.000đ' },
  { id: '2', name: 'Set Đặc sản', price: '220.000đ' },
  { id: '3', name: 'Hộp quà mùa lễ', price: '350.000đ' },
];

export default function Shop({}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Chọn hàng</Text>
        <Text style={styles.subtitle}>Danh sách sản phẩm demo.</Text>

        <FlatList
          data={PRODUCTS}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            </View>
          )}
        />
      </View>
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
  subtitle: { marginTop: 6, color: '#6b7280' },
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  itemName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  itemPrice: { marginTop: 4, color: '#16a34a', fontWeight: '600' },
});
