import { Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { formatCurrencyVND } from '../utils';
import { userMyContextController } from '../store';
import { useNavigation } from '@react-navigation/native';

export default function ServiceDetail() {
  const [controller, dispatch] = userMyContextController();
  const {currentService} = controller;
  const navigation = useNavigation();


  useEffect(() => {
    console.log('item', currentService)
    if (currentService == null) {
      console.log('123')
      navigation.navigate('Services');
    }
  }, [dispatch, currentService]);

  return (
    currentService !== null &&
    <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
      <Text style={{fontSize: 18, marginBottom: 10}}>
        <Text style={{fontWeight: 'bold'}}>Service name: </Text>
        {currentService.name}
      </Text>

      <Text style={{fontSize: 18, marginBottom: 10}}>
        <Text style={{fontWeight: 'bold'}}>Price: </Text>
        {formatCurrencyVND(currentService.price)}
      </Text>

      <Text style={{fontSize: 18, marginBottom: 10}}>
        <Text style={{fontWeight: 'bold'}}>Creator: </Text>
        {currentService.creator}
      </Text>

      <Text style={{fontSize: 18, marginBottom: 10}}>
        <Text style={{fontWeight: 'bold'}}>Time: </Text>
        {currentService.createAt}
      </Text>

      <Text style={{fontSize: 18, marginBottom: 10}}>
        <Text style={{fontWeight: 'bold'}}>Final update: </Text>
        {currentService.updateAt}
      </Text>
      <Image 
        source={{uri: currentService.image}}
        style={{width: 390, height: 500, top: -100}}
        resizeMode='contain'
      />
    </View>
  )
}