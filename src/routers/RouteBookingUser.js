import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import History from '../screens/User/History';
import HistoryDetail from '../screens/User/HistoryDetail';

const Stack = createStackNavigator();

export default function RouteBookingUser() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='HistoryBooking'
        component={History}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name='HistoryDetail'
        component={HistoryDetail}
      />
    </Stack.Navigator>
  )
}