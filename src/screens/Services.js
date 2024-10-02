import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { queryServices, setCurrentService, userMyContextController } from '../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { formatCurrencyVND, formatStirng } from '../utils';

export default function Services() {
  const navigation = useNavigation();
  const [controller, dispatch] = userMyContextController();
  const { listServices } = controller;

  useEffect(() => {
    queryServices(dispatch);
  }, [dispatch, listServices]);

  const handleSelect = (item) => {
    setCurrentService(dispatch, item);
    navigation.navigate('ServiceDetail');
  }

  return (
    <View> 
      <Image 
        source={require('../../assets/logo.png')}
        resizeMode='contain'
        style={{
          height: 200,
          width: 200,
          top: -30,
          alignSelf: 'center'
        }}
      />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
        top: -70
      }}> 
        <Text style={{fontSize: 20, fontWeight: '500'}}>List Service</Text>
        <IconButton 
          icon={'plus-circle'}
          iconColor='red'
          size={40}
          onPress={() => navigation.navigate('AddNewService')}
        />
      </View>
      <FlatList 
        style={{top: -70}}
        data={listServices}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 15,
              marginVertical: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderWidth: 0.5,
              borderRadius: 10,
            }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{formatStirng(item.name, 25)}</Text>
              <Text style={{fontSize: 20}}>{formatCurrencyVND(item.price)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}