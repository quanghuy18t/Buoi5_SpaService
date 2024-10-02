import { FlatList, Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { queryBookingByUser, userMyContextController } from '../../store'
import { TouchableOpacity } from 'react-native';

export default function History({navigation}) {
  const [controller, dispatch] = userMyContextController();
  const {listBookings, userLogin} = controller;

  useEffect(() => {
    queryBookingByUser(dispatch, userLogin);
  }, [listBookings])

  return (
    <View>
      <FlatList 
        style={{
          paddingTop: 20
        }}
        data={listBookings}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{paddingHorizontal: 20, marginBottom: 20}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 5,
                borderWidth: 0.5,
                borderRadius: 20
              }}
              onPress={() => navigation.navigate('HistoryDetail', {item})}
            >
              <View>
                <Image 
                  source={
                    item.status === 'confirmed' ?
                    require('../../../assets/checked.png') :
                    require('../../../assets/failed.png')
                  }
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    marginTop: 4,
                    marginRight: 10
                  }}
                />
              </View>
              <View>
                <Text style={{fontSize: 16}}>Booking</Text>
                <Text style={{color: 'gray'}}>{item.createAt}</Text>

              </View>
            </TouchableOpacity>
          </View>
        )}
      />  
    </View>
    
  )
}