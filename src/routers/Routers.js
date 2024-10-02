import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login';
import Admin from '../screens/Admin';
import Customer from '../screens/Customer';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createStackNavigator();

export default function Routers() {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Admin' component={Admin} />
      <Stack.Screen name='Customer' component={Customer} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
    </Stack.Navigator>
  )
}