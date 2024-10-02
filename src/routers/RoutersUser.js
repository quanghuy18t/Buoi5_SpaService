import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserServices from '../screens/User/UserServices';
import UserServiceDetail from '../screens/User/UserServiceDetail';
import ServiceBooking from '../screens/User/ServiceBooking';
import BookingSuccess from '../screens/User/BookingSuccess';
import HistoryDetail from '../screens/User/HistoryDetail';

const Stack = createStackNavigator();

export default function RoutersUser() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='UserService'
        component={UserServices}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name='UserServiceDetail'
        component={UserServiceDetail}
      />
      <Stack.Screen 
        name='ServiceBooking'
        component={ServiceBooking}
      />
      <Stack.Screen 
        name='BookingSuccess'
        component={BookingSuccess}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}