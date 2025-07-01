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
export default function RegisterScreen({ navigation }) {
  // const [name, setName] = useState({ value: '', error: '' })
  // const [email, setEmail] = useState({ value: '', error: '' })
  
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  
 // const [password, setPassword] = useState('')
 // const [cpassword, setCpassword] = useState('')




  const onSignUpPressed = async () => {
    
    setRole("User")
    const usuario = { nombreUsuario, email, password, role };
    console.log(usuario);

    const response = await axios.post(`https://nodejs-contactos-fc9722b786ad.herokuapp.com/api/usuario/agregarusuario`, usuario);
    const mensaje = response.data;
    console.log(mensaje);

    if (password === cpassword){
      if (mensaje ===null) {
        Alert.alert('An error has occurred', "Error insertando usuario..", [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else {
        Alert.alert('Exito', "Usuario insertado con éxito..", [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        navigation.navigate('Dashboard')
      }

      // Alert.alert('An error has occurred', mensaje, [
      //   {text: 'OK', onPress: () => console.log('OK Pressed')},
      // ]);
      // navigation.navigate('Dashboard')

    } else {
      Alert.alert('An error has occurred', "Passwords no coinciden..", [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }
  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={nombreUsuario}
        onChangeText={(text:string) => setNombreUsuario(text)}
        error={!!nombreUsuario}
        errorText={nombreUsuario}
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
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text:string) => setPassword(text)}
        error={!!password}
        errorText={password}
        secureTextEntry
        description = ""
      />
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={cpassword}
        onChangeText={(text:string) => setCpassword( text )}
        error={!!cpassword}
        errorText={cpassword}
        secureTextEntry
        description = ""
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() =>  navigation.navigate('Home')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
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
