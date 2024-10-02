import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { login, userMyContextController } from '../store'
import { View } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function Login({ navigation }) {
  const [controller, dispatch] = userMyContextController();
  const { userLogin } = controller;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(false);

  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;

  const handleLogin = () => {
    try {
      login(dispatch, email, password);

      Toast.success('Login Successful', 'top')
    } catch (error) {
      console.log(error.message);
      Toast.error('Login Failed', 'top');
    }
  };

  useEffect(() => {
    if (userLogin !== null) {
      if (userLogin.role === 'admin') {
        navigation.navigate('Admin');
      } else if (userLogin.role === 'customer') {
        navigation.navigate('Customer');
      }
    }
  }, [userLogin])

  return (
    <View style={{flex: 1, padding: 10}}>
      <Text style={{
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'deeppink',
        marginTop: 100,
        marginBottom: 50
      }}>Login</Text>
      <TextInput 
        label={'Email'}
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type='error' visible={hasErrorEmail()}>
        Email Address Invalid
      </HelperText>

      <TextInput 
        label={'Password'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!hiddenPassword}
        right={<TextInput.Icon icon={'eye'} onPress={() => setHiddenPassword(!hiddenPassword)} />}
      />
      <HelperText type='error' visible={hasErrorPassword()}>
        Password must 6 characters
      </HelperText>

      <Button
        mode='contained'
        buttonColor='deeppink'
        onPress={handleLogin}
      >
        Login
      </Button>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Don't have an account ?</Text>
        <Button onPress={() => navigation.navigate('Register')}>
          Create new account
        </Button>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Button>
      </View>
    </View>
  )
}