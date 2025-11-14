// screens/Checkout.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import NeonButton from '../components/NeonButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

export default function Checkout({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Thanh toán</Text>
        <Text style={styles.subtitle}>
          Thông tin đơn hàng demo. Nhấn "Thanh toán" để hoàn tất và chuyển sang
          Bills.
        </Text>

        <View style={styles.card}>
          <Text style={styles.rowLabel}>Tổng cộng</Text>
          <Text style={styles.rowValue}>350.000đ</Text>
        </View>

        <NeonButton
          label="Thanh toán"
          onPress={() => navigation.navigate('Bills')}
          style={{ marginTop: 24 }}
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
  subtitle: {
    marginTop: 8,
    color: '#6b7280',
    lineHeight: 22,
  },
  card: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: { color: '#374151', fontSize: 15 },
  rowValue: { fontWeight: '700', color: '#16a34a', fontSize: 16 },
});
