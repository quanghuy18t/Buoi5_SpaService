import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { addService, userMyContextController } from '../store';
import { Toast } from 'toastify-react-native';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage'

export default function AddNewService() {
  const [controller, dispatch] = userMyContextController();
  const { userLogin } = controller;
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const pickerImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri);
    }
  }

  const uploadImage = async () => {
    const storageRef = storage().ref(`image/${Date.now()}`)
    await storageRef.putFile(image);

    const downloadURL = await storageRef.getDownloadURL();
    console.log(downloadURL);
    return downloadURL;
  }

  const handleAddService = async () => {
    const downloadURL = await uploadImage();
    console.log(downloadURL);

    const newService = {
      name: serviceName,
      price: price,
      image: downloadURL
    };
    Toast.success('Add Successful', 'top')
    addService(dispatch, userLogin, newService);
    
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
      <Button onPress={pickerImage}>Upload</Button>
      <Button
        mode='contained'
        buttonColor='deeppink'
        onPress={handleAddService}
      >
        Add
      </Button>
    </View>
  )
}