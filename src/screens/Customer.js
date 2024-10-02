import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { userMyContextController } from '../store';
import { IconButton } from 'react-native-paper';
import { Ionicons, Octicons } from '@expo/vector-icons';
import RoutersUser from '../routers/RoutersUser';
import Booking from './User/Booking';
import Setting from './Setting';
import ServiceBooking from './User/ServiceBooking';
import History from './User/History';
import RouteBookingUser from '../routers/RouteBookingUser';

const Tab = createBottomTabNavigator();

export default function Customer() {
  const [controller, dispatch] = userMyContextController();
  const {userLogin} = controller;

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
        name='RouterUser'
        component={RoutersUser}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            focused ? (
              <Ionicons name='home' color={'deeppink'} size={24} />
            ) : (
              <Ionicons name='home-outline' color={'black'} size={24} />
          ))
        }}
      />
      <Tab.Screen 
        name='Booking'
        component={ServiceBooking}
        options={{
          title: 'Booking',
          tabBarIcon: ({focused}) => (
            focused ? (
              <Ionicons name='cart' color={'deeppink'} size={24} />
            ) : (
              <Ionicons name='cart-outline' color={'black'} size={24} />
            )
          )
        }}
      />
      <Tab.Screen 
        name='History'
        component={RouteBookingUser}
        options={{
          title: 'History',
          tabBarIcon: ({focused}) => (
            focused ? (
              <Octicons name='history' color={'deeppink'} size={24} />
            ) : (
              <Octicons name='history' color={'black'} size={24} />
            )
          )
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