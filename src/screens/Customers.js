import { FlatList, Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { IconButton } from 'react-native-paper'
import { queryUsers, userMyContextController } from '../store'
import { TouchableOpacity } from 'react-native';

export default function Customers() {
  const [controller, dispatch] = userMyContextController();
  const {listUsers} = controller;

  useEffect(() => {
    queryUsers(dispatch);
  }, [dispatch, listUsers]);
  
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
        data={listUsers}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.email}
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
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.fullName}</Text>
              <Text style={{fontSize: 20}}>{item.role}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}