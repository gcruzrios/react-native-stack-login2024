import React, { useEffect, useState } from 'react'
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



export default function EditContact({ route, navigation }) {
  
  
  const [data, setData] = useState([]);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [celphone, setCelphone] = useState('')
//   const [role, setRole] = useState('')
//   const [password, setPassword] = useState('')
//   const [cpassword, setCpassword] = useState('')



  const peticionGet = async () => {
    //const idUsuario = localStorage.getItem('idUsuario');
    const { id } = route.params;

    const response = await axios.get(`https://minimal.greiv.in/api/contactos/${id}`);
    const mensaje = response.data;
    setName(mensaje.nombre);
    setPhone(mensaje.telefono);
    setCelphone(mensaje.celular);
    setEmail(mensaje.email);
    
  };
  useEffect(() => {
    peticionGet();
  }, []);
  
  
  

  const onSignUpPressed = async () => {
    
   // setRole("User")
    const contacto = { nombre:name, email:email, telefono:phone, celular:celphone};
    console.log(contacto);
    const { id } = route.params;
    const response = await axios.put(`https://minimal.greiv.in/api/contactos/${id}`, contacto);
    //const response = await axios.post(`https://minimal.greiv.in/api/contactos`, contacto);
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
      <Header>Edit Contact</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name}
        onChangeText={(text:string) => setName(text)}
        error={!!name}
        errorText={name}
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
        value={phone}
        onChangeText={(text:string) => setPhone(text)}
        error={!!phone}
        errorText={phone}
        autoCapitalize="none"
        autoCompleteType="Phone"
        textContentType="Phone"
        keyboardType="phone"
        description = ""
      />
         <TextInput
        label="Cel phone"
        returnKeyType="next"
        value={celphone}
        onChangeText={(text:string) => setCelphone(text)}
        error={!!celphone}
        errorText={celphone}
        autoCapitalize="none"
        autoCompleteType="Cel Phone"
        textContentType="Cel phone"
        keyboardType="cel-phone"
        description = ""
      />
     
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Edit Contact
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
