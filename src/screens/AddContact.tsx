import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import Dashboard from './Dashboard';
import Home from './LoginScreen';
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddContact({ navigation }) {
  
 
  
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");

//   const [role, setRole] = useState('')
//   const [password, setPassword] = useState('')
//   const [cpassword, setCpassword] = useState('')

  const onSignUpPressed = async () => {
    
   // setRole("User")

    const usuario = await AsyncStorage.getItem('idUsuario');

    const contacto = { nombre, telefono, empresa, email, usuario };

    
    console.log(contacto);

    
    const response = await axios.post(`https://nodejs-contactos-fc9722b786ad.herokuapp.com/api/contacto/agregarcontacto`, contacto);
    const mensaje = response.data;
    console.log("Este es el mensaje: ",mensaje);

    if (mensaje ===null) {
      Alert.alert('An error has occurred', "Error insertando contacto..", [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      Alert.alert('Exito', "Contacto insertado con éxito..", [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      navigation.navigate('Dashboard')
    }
   
  }


  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Header>Add Contact</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={nombre}
        onChangeText={(text:string) => setNombre(text)}
        error={!!nombre}
        errorText={nombre}
        description = ""
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text:string) => setEmail(text)}
        error={!!email}
        errorText={email}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description = ""
      />
         <TextInput
        label="Phone"
        returnKeyType="next"
        value={telefono}
        onChangeText={(text:string) => setTelefono(text)}
        error={!!telefono}
        errorText={telefono}
        autoCapitalize="none"
        autoCompleteType="Phone"
        textContentType="Phone"
        keyboardType="phone"
        description = ""
      />
      <TextInput
        label="Empresa"
        returnKeyType="next"
        value={empresa}
        onChangeText={(text:string) => setEmpresa(text)}
        error={!!empresa}
        errorText={empresa}
        description = ""
      />
     
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Add new Contact
      </Button>
      
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
