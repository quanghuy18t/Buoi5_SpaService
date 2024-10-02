import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { createContext, useContext, useMemo, useReducer } from 'react';
import { Alert } from 'react-native';
import { formatDateTime } from '../utils';
import { Toast } from 'toastify-react-native';

const MyContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN': 
      return {...state, userLogin: action.value};
    case 'LOGOUT':
      return {...state, userLogin: null};
    case 'LIST_SERVICES':
      return {...state, listServices: action.value};
    case 'CURRENT_SERVICE':
      return {...state, currentService: action.value};
    case 'LIST_USERS':
      return {...state, listUsers: action.value};
    case 'CURRENT_USER':
      return {...state, currentUser: action.value};
    case 'LIST_BOOKINGS':
      return {...state, listBookings: action.value};
      case 'LIST_UNCONFIRM_BOOKINGS':
        return {...state, listUnConfirmBookings: action.value};
    case 'CURRENT_BOOKING':
      return {...state, currentBooking: action.value};
    default: 
      return new Error('Action not found');
  }
};

const MyContextControllerProvider = ({ children }) => {
  const initialState = {
    userLogin: null,
    listServices: [],
    currentService: null,
    listUsers: [],
    currentUser: null,
    listBookings: [],
    listUnConfirmBookings: [],
    currentBooking: null,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  )
};

const userMyContextController = () => {
  const context = useContext(MyContext);

  if (context === null) {
    return new Error('userMyContextController must inside in MyContextControllerProvider');
  }

  return context;
};

const USERS = firestore().collection('USERS');

const login = (dispatch, email, password) => {
  auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log('Login Context');
    USERS.doc(email).onSnapshot(u => dispatch({type: 'USER_LOGIN', value: u.data()}))
  })
  .catch(() => Alert.alert('Email or Password wrong'))
};

const register = (dispatch, newUser) => {
  console.log(newUser);
  auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
  .then(() => {
    USERS.doc(newUser.email).set({
      fullName: newUser.fullName,
      email: newUser.email,
      password: newUser.password,
      phone: newUser.phone,
      address: newUser.address,
      role: 'customer'
    });
  })
  .catch((err) => {
    console.log(err);
    Alert.alert('Account already existed')
  });

  queryUsers(dispatch);
}

const logout = (dispatch) => {
  auth().signOut()
  .then(() => dispatch({type: 'LOGOUT'}))
};

const queryUsers = (dispatch) => {
  USERS.where('role', '!=', 'admin').get()
  .then((querySnapshot) => {
    const users = querySnapshot.docs.map((doc) => ({email: doc.email, ...doc.data()}));
    dispatch({type: 'LIST_USERS', value: users});
  })
  .catch(() => Alert.alert('Query User failed'));
}

const SERVICES = firestore().collection('SERVICES');

const queryServices = (dispatch) => {
  SERVICES.get()
  .then((querySnapshot) => {
    const services = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    dispatch({type: 'LIST_SERVICES', value: services});
  })
  .catch(() => Alert.alert('Query Service failed')); 
}

const queryServicesByID = (dispatch, id) => {
  SERVICES.doc(id).get()
  .then((querySnapshot) => {
    const services = {id: querySnapshot.id, ...querySnapshot.data()};
    //console.log('services', services);
    return services;
  })
  .catch(() => Alert.alert('Query Service failed')); 
}

const addService = (dispatch, userLogin, newService) => {
  SERVICES.add({
    name: newService.name,
    price: newService.price,
    image: newService.image,
    creator: userLogin.fullName,
    createAt: formatDateTime(new Date()),
    updateAt: formatDateTime(new Date())
  })
  .catch(() => Alert.alert('Add Service Failed'));

  queryServices(dispatch);
}

const editService = (dispatch, currentService, newService) => {
  SERVICES.doc(currentService.id).update({
    name: newService.name,
    price: newService.price,
    updateAt: formatDateTime(new Date()),
  })
  .catch((err) => {
    Alert.alert('Edit Service failed');
    console.log(err);
  })

  queryServices(dispatch);
}

const deleteService = (dispatch, currentService) => {
  SERVICES.doc(currentService.id).delete()
  .catch(() => Alert.alert('Delete Service failed'));

  setCurrentService(dispatch, null);
  queryServices(dispatch);
}

const setCurrentService = (dispatch, value) => {
  dispatch({type: 'CURRENT_SERVICE', value})
}

const BOOKING = firestore().collection('BOOKINGS');

const queryBookingUnconfirmedByAdmin = (dispatch) => {
  BOOKING.where('status', '==', 'unconfirmed').get()
  .then((querySnapshot) => {
    const bookings = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    dispatch({type: 'LIST_UNCONFIRM_BOOKINGS', value: bookings});
  })
}

const queryBookingConfirmedByAdmin = (dispatch) => {
  BOOKING.where('status', '==', 'confirmed').get()
  .then((querySnapshot) => {
    const bookings = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    dispatch({type: 'LIST_BOOKINGS', value: bookings});
  })
}

const queryBookingByUser = (dispatch, userLogin) => {
  if (userLogin) {
    BOOKING.where('user', '==', userLogin.fullName).get()
    .then((querySnapshot) => {
      const bookings = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      dispatch({type: 'LIST_BOOKINGS', value: bookings});
    })  
  }
  
}

const addBooking = (dispatch, userLogin, newBooking) => {
  BOOKING.add({
    user: userLogin.fullName,
    services: newBooking.services,
    timeBooking: newBooking.date,
    status: 'unconfirmed',
    createAt: formatDateTime(new Date())
  })
  .catch(() => Alert.alert('Add Service Failed'));
}

const confirmedBooking = (dispatch, currentBooking) => {
  BOOKING.doc(currentBooking.id).update({
    status: 'confirmed'
  })
}

export {
  MyContextControllerProvider,
  userMyContextController,
  login,
  register,
  logout,
  queryUsers,
  queryServices,
  queryServicesByID,
  addService,
  editService,
  deleteService,
  setCurrentService,
  addBooking,
  confirmedBooking,
  queryBookingUnconfirmedByAdmin,
  queryBookingConfirmedByAdmin,
  queryBookingByUser
}