// components/BottomBar.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// 5 tab: Profile – Chat – Home – Notifications – Nothing
export type BottomTabKey =
  | 'profile'
  | 'chat'
  | 'home'
  | 'notifications'
  | 'nothing';

type Props = {
  active: BottomTabKey;
  onTabPress: (key: BottomTabKey) => void;
};

const TABS: {
  key: BottomTabKey;
  label: string;
  icon: string;
  activeIcon: string;
}[] = [
  {
    key: 'profile',
    label: 'Profile',
    icon: 'user',
    activeIcon: 'user',
  },
  {
    key: 'chat',
    label: 'Tin nhắn',
    icon: 'message1',
    activeIcon: 'message1',
  },
  { key: 'home', label: 'Home', icon: 'home', activeIcon: 'home' },
  {
    key: 'notifications',
    label: 'Thông báo',
    icon: 'bell-outline',
    activeIcon: 'bell',
  },
  {
    key: 'nothing',
    label: 'Nothing',
    icon: 'log-out-outline',
    activeIcon: 'log-out',
  },
];

const TAB_COUNT = TABS.length;
const ITEM_WIDTH = width / TAB_COUNT;

export default function BottomBar({ active, onTabPress }: Props) {
  // bong bóng highlight chạy ngang
  const translateX = useRef(new Animated.Value(2 * ITEM_WIDTH)).current; // default Home

  useEffect(() => {
    const idx = TABS.findIndex(t => t.key === active);
    if (idx < 0) {
      return;
    }
    Animated.spring(translateX, {
      toValue: idx * ITEM_WIDTH,
      useNativeDriver: true,
      bounciness: 18,
      speed: 20,
    }).start();
  }, [active, translateX]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {/* bong bóng tròn giống video IG (di chuyển giữa các tab) */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: Animated.add(
                    translateX,
                    new Animated.Value(ITEM_WIDTH / 2 - 28),
                  ),
                },
              ],
            },
          ]}
        />

        {TABS.map(tab => {
          const isActive = tab.key === active;
          return (
            <Pressable
              key={tab.key}
              style={styles.item}
              android_ripple={{ color: '#e0f2ff' }}
              onPress={() => onTabPress(tab.key)}
            >
              <Icon
                name={isActive ? tab.activeIcon : tab.icon}
                size={24}
                color={isActive ? '#007AFF' : '#6b7280'}
              />
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingVertical: 8,
    elevation: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    overflow: 'hidden',
  },
  item: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    color: '#6b7280',
  },
  labelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e0f2ff',
    top: -8,
    shadowColor: '#007AFF',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
});
