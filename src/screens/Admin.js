import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RouterService from '../routers/RouterService';
import Transaction from './Transaction';
import Customers from './Customers';
import Setting from './Setting';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { userMyContextController } from '../store';
import { IconButton } from 'react-native-paper';
import RouterBookingAdmin from '../routers/RouterBookingAdmin';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function Admin() {
  const navigation = useNavigation();
  const [controller, dispatch] = userMyContextController();
  const { userLogin } = controller;

  if (userLogin == null) {
    navigation.navigate('Login')
  }

  return (
    <Tab.Navigator 
      screenOptions={() => ({
        tabBarActiveTintColor: 'deeppink',
        tabBarHideOnKeyboard: true,
        title: (userLogin) && (userLogin.fullName),
        headerTitleAlign: 'left',
        headerTitleStyle: {color: 'white', textTransform: 'uppercase'},
        headerStyle: {
          backgroundColor: 'deeppink'
        },
        headerRight: () => <IconButton icon={'account'} iconColor='white' />
      })}
    >
      <Tab.Screen 
        name='RouterService'
        component={RouterService}
        options={{
          tabBarIcon: ({focused}) => (
            focused ? (
              <Ionicons name='home' color={'deeppink'} size={24} />
            ) : (
              <Ionicons name='home-outline' color={'black'} size={24} />
          ))
        }}
      />
      <Tab.Screen 
        name='Transaction'
        component={RouterBookingAdmin}
        options={{
          title: 'Transaction',
          tabBarIcon: ({focused}) => (
            focused ? (
              <Ionicons name='cash' color={'deeppink'} size={24} />
            ) : (
              <Ionicons name='cash-outline' color={'black'} size={24} />
          ))
        }}
      />
      <Tab.Screen 
        name='Customers'
        component={Customers}
        options={{
          title: 'Customers',
          tabBarIcon: ({focused}) => (
            focused ? (
              <MaterialCommunityIcons name='account' color={'deeppink'} size={24} />
            ) : (
              <MaterialCommunityIcons name='account-outline' color={'black'} size={24} />
          ))
        }}
      />
      <Tab.Screen 
        name='Setting'
        component={Setting}
        options={{
          title: 'Setting',
          tabBarIcon: ({focused}) => (
            focused ? (
              <Ionicons name='settings' color={'deeppink'} size={24} />
            ) : (
              <Ionicons name='settings-outline' color={'black'} size={24} />
          ))
        }}
      />
    </Tab.Navigator>
  )
}