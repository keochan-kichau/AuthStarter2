// navigation/RootNavigator.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

import Onboarding1 from '../screens/Onboarding/Onboarding1';
import Onboarding2 from '../screens/Onboarding/Onboarding2';
import Onboarding3 from '../screens/Onboarding/Onboarding3';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Forgot from '../screens/Forgot';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';
import Notifications from '../screens/Notifications';
// nếu còn Buying / Shop / Checkout / Bills thì import thêm

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;

  Login: undefined;
  Signup: undefined;
  Forgot: undefined;

  Home: undefined;
  Profile: undefined;
  Chat: undefined;
  Notifications: undefined;
  // Buying: undefined;
  // Shop: undefined;
  // Checkout: undefined;
  // Bills: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, fbUser => {
      setUser(fbUser);
      setInitializing(false);
    });
    return () => sub();
  }, []);

  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020617',
        }}
      >
        <ActivityIndicator size="large" color="#22d3ee" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        // đã đăng nhập
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Notifications" component={Notifications} />
          {/* Buying / Shop / Checkout / Bills thêm ở đây nếu dùng */}
        </Stack.Navigator>
      ) : (
        // chưa đăng nhập
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Onboarding1"
        >
          <Stack.Screen name="Onboarding1" component={Onboarding1} />
          <Stack.Screen name="Onboarding2" component={Onboarding2} />
          <Stack.Screen name="Onboarding3" component={Onboarding3} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Forgot" component={Forgot} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
