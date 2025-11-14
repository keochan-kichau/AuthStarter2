// RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// === ONBOARDING ===
import Onboarding1 from '../screens/Onboarding/Onboarding1';
import Onboarding2 from '../screens/Onboarding/Onboarding2';
import Onboarding3 from '../screens/Onboarding/Onboarding3';

// === AUTH ===
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Forgot from '../screens/Forgot';

// === APP ===
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Buying from '../screens/Buying';
import Shop from '../screens/Shop';
import Checkout from '../screens/Checkout';
import Bills from '../screens/Bills';

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;

  Login: undefined;
  Signup: undefined;
  Forgot: undefined;

  Home: undefined;
  Profile: undefined;
  Buying: undefined;
  Shop: undefined;
  Checkout: undefined;
  Bills: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding1"
      screenOptions={{ headerShown: false }}
    >
      {/* ONBOARDING FLOW */}
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />

      {/* AUTH FLOW */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Forgot" component={Forgot} />

      {/* APP FLOW */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Buying" component={Buying} />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Bills" component={Bills} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
