import React, {Component, PropsWithChildren} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen() {
//export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained" style={undefined}       
      >
        Login
      </Button>
      <Button
        mode="outlined" style={undefined} 
        
      >
        Sign Up
      </Button>
    </Background>
  )
  //onPress={() => navigation.navigate('LoginScreen')}
  //onPress={() => navigation.navigate('RegisterScreen')}
}
