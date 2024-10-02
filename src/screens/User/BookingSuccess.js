import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function BookingSuccess({navigation}) {
  return (
    <View>
      <View style={{marginTop: '20%'}}>
        <Image 
          source={require('../../../assets/checked.png')}
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'contain'
          }}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={{
            color: 'black',
            fontSize: 20
          }}>Booking Successful</Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <TouchableOpacity
            style={{
              borderColor: 'deeppink',
              borderWidth: 1,
              backgroundColor: 'deeppink',
              width: 100,
              alignItems: 'center',
              borderRadius: 10,
              padding: 10,
              width: '40%'
            }}
            onPress={() => navigation.navigate('UserService')}
          >
            <Text style={{color: 'white', fontSize: 18}}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
