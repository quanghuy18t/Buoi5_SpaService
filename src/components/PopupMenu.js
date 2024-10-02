import { Alert, Modal, Text, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { IconButton } from 'react-native-paper';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { deleteService, userMyContextController } from '../store';
import { Toast } from 'toastify-react-native';

export default function PopupMenu() {
  const menuRef = useRef(null);
  const navigation = useNavigation();
  const [controller, dispatch] = userMyContextController();
  const {currentService} = controller;

  const showMenu = () => menuRef.current.show();
  const hideMenu = () => menuRef.current.hide();

  const handleDelete = () => {
    deleteService(dispatch, currentService)
    navigation.navigate('Services');
    Toast.success('Delete Successful', 'top');
    
  };
  
  const deleteAlert = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this service? This operation cannot be returned',
      [
        {
          text: 'Delete',
          onPress: () => {
            handleDelete();
          },
          style: 'destructive',
        },
        {
          text: 'Cancle',
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
  };

  useFocusEffect(
    useCallback(() => {
      hideMenu();
    })
  );

  return (
    <View>
      
      <Menu
        ref={menuRef}
        anchor={
          <IconButton 
            icon={'dots-vertical'} 
            size={24}
            onPress={showMenu}
          />
        }
      >
        <MenuItem onPress={() => navigation.navigate('EditService')}>Edit</MenuItem>
        <MenuDivider />
        <MenuItem onPress={deleteAlert}>Delete</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Exit</MenuItem>
      </Menu>
    </View>
  )
}