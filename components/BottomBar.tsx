// components/BottomBar.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Platform,
} from 'react-native';

type TabKey = 'profile' | 'messages' | 'home' | 'photos' | 'logout';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'profile', label: '👤' },
  { key: 'messages', label: '💬' },
  { key: 'home', label: '🏠' },
  { key: 'photos', label: '🖼️' },
  { key: 'logout', label: '⏻' },
];

type Props = {
  activeKey: 'profile' | 'messages' | 'home' | 'photos';
  onTabPress: (key: TabKey) => void;
};

export default function BottomBar({ activeKey, onTabPress }: Props) {
  const indicatorX = useRef(new Animated.Value(2)).current;
  const TAB_WIDTH = 62;
  const GAP = 10;

  const activeIndex = TABS.findIndex(t => t.key === activeKey);

  useEffect(() => {
    Animated.spring(indicatorX, {
      toValue: activeIndex * (TAB_WIDTH + GAP),
      useNativeDriver: false,
    }).start();
  }, [activeIndex, indicatorX]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        <Animated.View style={[styles.indicator, { left: indicatorX }]} />
        {TABS.map(tab => {
          const isActive = tab.key === activeKey;
          const isCenter = tab.key === 'home';
          return (
            <Pressable
              key={tab.key}
              onPress={() => onTabPress(tab.key)}
              style={({ pressed }) => [
                styles.tab,
                isCenter && styles.centerTab,
                pressed && { opacity: 0.6 },
              ]}
            >
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.tabLabelActive,
                  isCenter && styles.centerLabel,
                ]}
              >
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
    position: 'absolute',
    bottom: 22,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(5, 10, 12, 0.45)',
    borderRadius: 40,
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,255,240,0.22)',
    ...Platform.select({
      ios: {
        shadowColor: '#00FFF0',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  indicator: {
    position: 'absolute',
    width: 62,
    height: 52,
    backgroundColor: 'rgba(0,255,240,0.22)',
    borderRadius: 30,
    top: 6,
  },
  tab: {
    width: 62,
    height: 52,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 20,
    color: '#E9EDF3',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
  centerTab: {
    backgroundColor: 'rgba(0,255,240,0.08)',
  },
  centerLabel: {
    fontSize: 24,
  },
});
