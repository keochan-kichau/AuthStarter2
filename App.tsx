// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

// nhớ chỉnh đúng đường dẫn nếu bạn để khác
import Onboarding1 from './screens/Onboarding/Onboarding1';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Forgot from './screens/Forgot';
import AppShell from './screens/AppShell';

export type RootStackParamList = {
  Onboarding1: undefined;
  Login: undefined;
  Signup: undefined;
  Forgot: undefined;
  AppShell: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Onboarding1"
      >
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="AppShell" component={AppShell} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
