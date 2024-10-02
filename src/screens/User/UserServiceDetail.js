import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { userMyContextController } from '../../store'
import { useNavigation } from '@react-navigation/native';
import { formatCurrencyVND } from '../../utils';
import { TouchableOpacity } from 'react-native';

export default function UserServiceDetail() {
  const navigation = useNavigation();
  const [controller, dispatch] = userMyContextController();
  const {currentService} = controller;

  // useEffect(() => {
  //   if (currentService == null) {
  //     navigation.
  //   }
  // })

  return (
    <View>
      <ScrollView>
        <View>
          <View>
            <Image 
              source={{uri: currentService.image}}
              style={{
                width: '100%',
                height: 300,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                resizeMode: 'cover'
              }}
            />
            <View style={{
              margin: 15,
              height: 100,
              position: 'absolute',
              top: 220,
              left: 0,
              right: 0,
              borderRadius: 20,
              backgroundColor: 'white'
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                paddingTop: 10
              }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{currentService.name}</Text>
                <Text style={{fontSize: 20}}>{formatCurrencyVND(currentService.price)}</Text>
              </View>
              <Text style={{paddingLeft: 15, paddingTop: 5}}>4.5 reviews</Text>
            </View>
          </View>
          <View style={{
            paddingTop: 40,
            paddingLeft: 15
          }}>
            <Text style={{fontSize: 24, fontWeight: 'bold', paddingBottom: 5}}>Description</Text>
            <Text>jdsbvdskjvbdskjv</Text>
          </View>
        </View>
        
      </ScrollView> 
    </View>
    
  )
}