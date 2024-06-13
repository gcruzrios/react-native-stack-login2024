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
  
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [celphone, setCelphone] = useState('')
  const [role, setRole] = useState('')
  
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')




  const onSignUpPressed = async () => {
    
    setRole("User")
    const usuario = { name, email, phone, celphone, password, role };
    console.log(usuario);

    const response = await axios.post(`https://minimal.greiv.in/api/usuarios`, usuario);
    const mensaje = response.data;
    console.log(mensaje);

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

    Alert.alert('An error has occurred', mensaje, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);



    navigation.navigate('Dashboard')
  }

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Create Account</Header>
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
