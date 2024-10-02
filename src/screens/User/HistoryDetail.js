import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import QRCode from 'react-native-qrcode-svg';
import { formatDateTime } from '../../utils';

export default function HistoryDetail() {
  const route = useRoute();
  const {item} = route.params;

  const dateObject = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);

    return formatDateTime(date);
  }

  return (
    <View>
      <View style={{alignItems: 'center', paddingTop: 50}}>
        <QRCode 
          value={item.id}
          size={200}
        />  
      </View>
      <View style={{paddingTop: 30, paddingHorizontal: 20}}>
        <Text style={{fontSize: 18, marginBottom: 10}}> 
          <Text style={{fontWeight: 'bold'}}>Time Booking: </Text>
          {dateObject(item.timeBooking)}
        </Text>
        <Text style={{fontSize: 18, marginBottom: 10}}> 
          <Text style={{fontWeight: 'bold'}}>Service: </Text>
          {
            item.services.map((data, index) => {
              if (index === item.services.length - 1) {
                return data.name;
              }
              return data.name + ' - '
            })
          }
        </Text>
        <Text style={{fontSize: 18, marginBottom: 10}}> 
          <Text style={{fontWeight: 'bold'}}>Create At: </Text>
          {item.createAt}
        </Text>
      </View>
    </View>
  )
}