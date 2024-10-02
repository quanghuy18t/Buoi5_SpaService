import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { formatDateTime } from '../utils';
import { TouchableOpacity } from 'react-native';
import { confirmedBooking, userMyContextController } from '../store';
import { Toast } from 'toastify-react-native';

export default function TransactionDetail() {
  const route = useRoute();
  const {item} = route.params;
  const [controller, dispatch] = userMyContextController();

  const dateObject = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);

    return formatDateTime(date);
  }

  const handleConfirm = () => {
    confirmedBooking(dispatch, item);
    Toast.success('Confirm Booking', 'top')
  }

  return (
    <View>
      <View style={{paddingTop: 30, paddingHorizontal: 20, height: '90%'}}>
        <Text style={{fontSize: 18, marginBottom: 10}}> 
          <Text style={{fontWeight: 'bold'}}>Time Booking: </Text>
          {dateObject(item.timeBooking)}
        </Text>
        <Text style={{fontSize: 18, marginBottom: 10}}> 
          <Text style={{fontWeight: 'bold'}}>Customer: </Text>
          {item.user}
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
      </View>
      {item.status === 'unconfirmed' && <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            backgroundColor: '#F2719D',
            borderColor: '#F2719D',
            borderRadius: 10,
            width: '50%',
            alignItems: 'center'
          }}
          onPress={handleConfirm}
        >
          <Text style={{
            fontSize: 17,
            color: 'white',
            padding: 10
          }}>Confirm</Text>
        </TouchableOpacity>
      </View>}
    </View>
  )
}