import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { queryServices, setCurrentService, userMyContextController } from '../../store';
import { TouchableOpacity } from 'react-native';
import { formatCurrencyVND, formatStirng } from '../../utils';

export default function UserServices() {
  const navigation = useNavigation();
  const [controller, dispatch] = userMyContextController();
  const {listServices} = controller;

  useEffect(() => {
    queryServices(dispatch);
  }, [dispatch, listServices]);

  const handleSelect = (item) => {
    setCurrentService(dispatch, item);
    navigation.navigate('UserServiceDetail');
  }

  return (
    <View>
      <Image 
        source={require('../../../assets/logo.png')}
        resizeMode='contain'
        style={{
          height: 200,
          width: 200,
          top: -30,
          alignSelf: 'center'
        }}
      />
      <Text style={{
        fontSize: 20, 
        fontWeight: '500',
        top: -70,
        marginBottom: 10,
        paddingLeft: 15
      }}>List Service</Text>
      <FlatList 
        style={{top: -70}}
        data={listServices}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <View style={{
              marginHorizontal: 15,
              marginVertical: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderWidth: 0.5,
              borderRadius: 10,
            }}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
                <Image 
                  source={{uri: item.image}}
                  style={{height: 200, width: 370, borderRadius: 10}}
                />
              </View>
              
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{formatStirng(item.name, 25)}</Text>
                <Text style={{fontSize: 20}}>{formatCurrencyVND(item.price)}</Text>
              </View>
              
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}