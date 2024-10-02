import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { logout, userMyContextController } from '../store'
import { Button } from 'react-native-paper';

export default function Setting({ navigation }) {
  const [controller, dispatch] = userMyContextController();
  const { userLogin } = controller;

  const handleLogout = () => {
    logout(dispatch);
  }

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Login')
    }
  }, [userLogin]);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Button
        mode='contained'
        onPress={handleLogout}
      >
        Logout
      </Button>
    </View>
  )
}