import { Alert, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { register, userMyContextController } from '../store';
import { Toast } from 'toastify-react-native';

export default function Register({ navigation }) {
  const [controller, dispatch] = userMyContextController();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const hasErrorFullName = () => fullName === '';
  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => passwordConfirm != password;
  
  const handleSignup = () => {
    try {
      const newUser = {
        fullName,
        email,
        password,
        phone,
        address
      }
      register(dispatch, newUser);

      Toast.success('Register successful', 'top');
      navigation.navigate('Login');
    } catch (err) {
      Toast.error('Register Failed', 'top');
    }
  }

  return (
    <View style={{flex: 1, padding: 10}}>
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'deeppink',
        marginTop: 50,
        marginBottom: 50
      }}>Register New Account</Text>
      <TextInput
        label={'Full Name'}
        value={fullName}
        onChangeText={setFullName}
      />
      <HelperText type='error' visible={hasErrorFullName()}>
        Full Name is required
      </HelperText>

      <TextInput
        label={'Email'}
        value={email}
        onChangeText={setEmail}
      />
      <HelperText type='error' visible={hasErrorEmail()}>
        Email invalid
      </HelperText>

      <TextInput
        label={'Password'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hiddenPassword}
        right={<TextInput.Icon icon={'eye'} onPress={() => setHiddenPassword(!hiddenPassword)} />}
      />
      <HelperText type='error' visible={hasErrorPassword()}>
        Password must 6 characters
      </HelperText>

      <TextInput
        label={'Confirm Password'}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry={hiddenPasswordConfirm}
        right={<TextInput.Icon icon={'eye'} onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)} />}
      />
      <HelperText type='error' visible={hasErrorPasswordConfirm()}>
        Do not match password
      </HelperText>

      <TextInput
        label={'Address'}
        value={address}
        onChangeText={setAddress}
        style={{marginBottom: 20}}
      />
      <TextInput
        label={'Phone'}
        value={phone}
        onChangeText={setPhone}
        style={{marginBottom: 20}}
      />
      <Button 
        mode='contained'
        buttonColor='deeppink'
        onPress={handleSignup}
      >
        Create New Account
      </Button>

      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Do you have an account ?</Text>
        <Button onPress={() => navigation.navigate('Login')}>
          Login Account
        </Button>
      </View>
    </View>
  )
}