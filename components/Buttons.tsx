import React from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';


const Btns = () => {
  const createTwoButtonAlert = () =>
 
    Alert.alert('Ingresa El Nombre O El numero de Pokedex', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);


  return (
   
      <Button title={'Presiona Para Buscar'} onPress={createTwoButtonAlert} />
 
  );
};



export default Btns;