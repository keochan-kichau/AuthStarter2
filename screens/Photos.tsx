// screens/Photos.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Photos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ảnh</Text>
      <Text style={styles.text}>Chỗ ni đựng thư viện ảnh.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0C',
    padding: 24,
    paddingTop: 60,
  },
  title: { color: '#fff', fontSize: 26, fontWeight: '700', marginBottom: 8 },
  text: { color: 'rgba(255,255,255,0.6)' },
});
