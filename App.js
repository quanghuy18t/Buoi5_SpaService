import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MyContextControllerProvider } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './src/routers/Routers';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import ToastManager from 'toastify-react-native';

export default function App() {
  const USERS = firestore().collection('USERS');

  const admin = {
    fullName: 'Admin',
    email: 'quanghuy.tbqh@gmail.com',
    password: '123456',
    phone: '0392829243',
    address: 'Binh Duong',
    role: 'admin'
  };

  useEffect(() => {
    USERS.doc(admin.email)
    .onSnapshot(u => {
      if (!u.exists) {
        auth().createUserWithEmailAndPassword(admin.email, admin.password)
        .then(() => {
          USERS.doc(admin.email).set(admin);
          console.log('Add new admin account');
        })
      }
    })
  }, []);

  return (
    <GestureHandlerRootView>
      <ToastManager />
      <MyContextControllerProvider>
        <NavigationContainer>
          <Routers />
        </NavigationContainer>
      </MyContextControllerProvider>
    </GestureHandlerRootView>
  );
}