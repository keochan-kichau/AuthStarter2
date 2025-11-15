import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import NeonButton from '../../components/NeonButton';
import { colors, spacing } from '../../theme/tokens';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Onboarding1({ navigation }: any) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.top}>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 90, height: 90, top: -40 }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/on1.jpg')}
          style={{ width: 350, height: 350, top: 0, borderRadius: 40 }}
          resizeMode="contain"
        />
        <Text style={styles.title}>Xin chào 👋</Text>
        <Text style={styles.body}>Đây là app Victoria, hãy bắt đầu.</Text>
      </View>
      <View style={styles.bottom}>
        <Text
          style={styles.next}
          onPress={() => navigation.navigate('Onboarding2')}
        >
          Đi tiếp nào!
        </Text>
        <Text style={styles.link} onPress={() => navigation.replace('Login')}>
          Bỏ qua
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing(2),
    justifyContent: 'space-between',
  },
  top: { alignItems: 'center', marginTop: spacing(4) },
  title: {
    color: colors.bg,
    fontSize: 28,
    fontWeight: '800',
    marginTop: spacing(2),
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    top: 50,
  },
  body: {
    color: colors.gray600,
    textAlign: 'center',
    marginTop: spacing(1),
    fontSize: 16,
    lineHeight: 22,
    top: 50,
  },
  bottom: {
    alignItems: 'center',
    gap: spacing(1),
    borderRadius: 8,
    padding: spacing(2),
  },

  next: {
    width: '100%',
    textAlign: 'center',
    height: 55,
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#00ccffff',
    padding: spacing(2),
    borderRadius: 20,
    top: -50,
  },
  link: { color: colors.black, marginTop: spacing(1), top: -50, fontSize: 16 },
});
