import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { addBooking, queryServices, userMyContextController } from '../../store'
import { MultiSelect } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker';
import { Toast } from 'toastify-react-native';
import { useNavigation } from '@react-navigation/native';

export default function ServiceBooking() {
  const navigation = useNavigation();
  const [controller, dispatch] = userMyContextController();
  const {listServices, userLogin} = controller;

  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleSelect = (item) => {
    console.log(item);
    const result = listServices.filter(value => value.id == item);
    setSelectedItems(result);
  }

  const handleAdd = () => {
    const services = listServices.filter(item => selectedItems.includes(item.id));

    const newBooking = {
      services: services,
      date: date,
    }

    addBooking(dispatch, userLogin, newBooking);
    navigation.navigate('BookingSuccess')
    Toast.success('Booking Successful', 'top');
  }

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>1</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Chọn dịch vụ</Text>
          <Text style={styles.description}>Hãy chọn dịch vụ phù hợp với nhu cầu của bạn.</Text>
          <MultiSelect 
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={listServices}
            labelField={'name'}
            valueField={'id'}
            placeholder='Select services'
            value={selectedItems}
            onChange={item => setSelectedItems(item)}
          />
        </View>
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>2</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Chọn Thời gian</Text>
          <Text style={styles.description}>Hãy chọn thời gian phù hợp với bạn.</Text>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              borderWidth: 0.5,
              borderRadius: 10,
              padding: 12
            }}
            onPress={() => setOpen(true)}
          >
            <Text>{date.toLocaleString()}</Text>
          </TouchableOpacity>
          <DatePicker 
            modal
            open={open}
            date={date}
            mode='datetime'
            locale='vi'
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity 
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F2719D',
            borderRadius: 10
          }}
          onPress={handleAdd}
        >
          <Text style={{fontSize: 20, color: 'white', paddingVertical: 10}}>Hoàn tất</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FC',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
    borderRadius: 999,
    backgroundColor: '#F2719D',
    paddingHorizontal: 8
    
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#8A8A8A',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationButtonText: {
    color: '#F2719D',
    marginLeft: 5,
  },
  dropdown: {
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#8A8A8A',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
})