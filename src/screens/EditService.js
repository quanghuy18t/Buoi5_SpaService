import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { editService, userMyContextController } from '../store';
import { Toast } from 'toastify-react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditService() {
  const navigation = useNavigation();
  const [controller, dispatch] = userMyContextController();
  const {currentService} = controller;
  const [serviceName, setServiceName] = useState(currentService.name);
  const [price, setPrice] = useState(currentService.price);

  const handleEditService = () => {
    const newService = {
      name: serviceName,
      price: price
    }
    editService(dispatch, currentService, newService);

    navigation.navigate('Services');
    Toast.success('Edit Successful', 'top')
  };

  return (
    <View style={{
      paddingHorizontal: 10,
      paddingVertical: 10
    }}>
      <Text style={{
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10
      }}>Service name *</Text>
      <TextInput
        label={'Input a service name'}
        value={serviceName}
        onChangeText={setServiceName}
        style={{marginBottom: 20}}
      />

      <Text style={{
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10
      }}>Price *</Text>
      <TextInput
        defaultValue='0'
        label={'Input price'}
        value={price}
        onChangeText={setPrice}
        style={{marginBottom: 20}}
      />
      <Button
        mode='contained'
        buttonColor='deeppink'
        onPress={handleEditService}
      >
        Edit
      </Button>
    </View>
  )
}