import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Transaction from '../screens/Transaction';
import TransactionDetail from '../screens/TransactionDetail';

const Stack = createStackNavigator();

export default function RouterBookingAdmin() {
  return (
    <Stack.Navigator
      initialRouteName='Transaction'

    >
      <Stack.Screen 
        name='Transactions' 
        component={Transaction} 
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name='TransactionDetail' 
        component={TransactionDetail} 
        options={{title: 'Detail'}} 
      />
    </Stack.Navigator>
  )
}