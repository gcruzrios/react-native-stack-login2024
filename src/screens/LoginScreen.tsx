import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import Dashboard from './Dashboard';
import RegisterScreen from './RegisterScreen';
import Reset from './ResetPasswordScreen';

import { NavigationContainer } from '@react-navigation/native';
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'

import axios from "axios";

// export default function LoginScreen({ navigation }) {

export default function LoginScreen({ navigation }) {
 
  //const [email, setEmail] = useState({ value: '', error: '' })
  //const [password, setPassword] = useState({ value: '', error: '' })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [data, setData] = useState();
    
  const onLoginPressed = async () => {
    // const emailError = emailValidator(email.value)
    // const passwordError = passwordValidator(password.value)
    // if (emailError || passwordError) {
    //   setEmail({ ...email, error: emailError })
    //   setPassword({ ...password, error: passwordError })
    //   return
    // }
    
    interface usuario{
      email:string,
      password:string
    }
    const ingreso = { email, password };
    console.log(ingreso)
    const response = await axios.post(`https://minimal.greiv.in/api/login`, ingreso);
   
    // let datauser = { 
    //   email: email,
    //   password:password
    //  }   

    // fetch("https://minimal.greiv.in/api/login" ,{
    //    method: 'post',
    //    headers: {
    //      'Accept': 'application/json',
    //      'Content-Type': 'application/json'
    //    },
    //    body: JSON.stringify(datauser)
    //  }) 
    //  .then((response: { json: () => any }) => response.json()) 
    //  .then(data => setData(data))
    //  .catch((error) => { 
    //      // Handle any errors that occur 
    //      console.error(error); 
    //  }); 

    
     
    //const mensaje = data;
    const mensaje = response.data;



    if (mensaje ==="Las Credenciales de usuario fallaron") {
      Alert.alert('An error has occurred', mensaje, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {

    //Alert.alert('Alert Title',mensaje)  
    navigation.navigate('Dashboard')
    }
  }

  return (
    <Background >
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Header> Admin Dashboard.</Header> 
      <Logo />
      <Header>Welcome back.</Header> 
      <TextInput
        label="Email"
        returnKeyType="next"
        // value={email.value}
        // 
        // error={!!email.error}
        errorText={email}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description = ""
        onChangeText={(text: any) => setEmail(text)}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        // value={password.value}
        // onChangeText={(text: any) => setPassword({ value: text, error: '' })}
        // error={!!password.error}
        errorText={password}
        description = ""
        secureTextEntry
        onChangeText={(text: any) => setPassword(text)}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Reset')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" style={undefined} onPress={onLoginPressed}>
        Login
        
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View> 
    </Background>
  )
}

// onPress=
//onPress={() => navigation.replace('RegisterScreen')}
//onPress={() => navigation.navigate('ResetPasswordScreen')}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
