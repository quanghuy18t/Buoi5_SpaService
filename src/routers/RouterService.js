import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import Services from '../screens/Services';
import AddNewService from '../screens/AddNewService';
import ServiceDetail from '../screens/ServiceDetail';
import EditService from '../screens/EditService';
import PopupMenu from '../components/PopupMenu';

const Stack = createStackNavigator();

export default function RouterService() {
  return (
    <Stack.Navigator
      initialRouteName='Services'

    >
      <Stack.Screen 
        name='Services' 
        component={Services} 
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name='AddNewService' 
        component={AddNewService} 
        options={{title: 'Add'}} 
      />
      <Stack.Screen 
        name='ServiceDetail' 
        component={ServiceDetail} 
        options={{
          headerRight: () => <PopupMenu />
        }}
      />
      <Stack.Screen 
        name='EditService' 
        component={EditService} 
        options={{title: 'Edit'}} 
      />
    </Stack.Navigator>
  )
}