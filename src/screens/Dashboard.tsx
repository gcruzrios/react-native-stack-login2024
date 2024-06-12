import React, { useEffect, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, ScrollView,StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import axios from "axios";



export default function Dashboard({navigation}) {
  const [data, setData] = useState([]);
  const peticionGet = async () => {
    //const idUsuario = localStorage.getItem('idUsuario');
  
    await axios.get("https://minimal.greiv.in/api/contactos").then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    peticionGet();
  }, []);

 
  //  export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Background>
        <Header>List of Contacts</Header>



        {/* <Button
          style={undefined}
          mode="outlined"
          onPress={() => navigation.navigate('Home')}>
          Logout
        </Button> */}
         {data.map((record) => (
   <Card style={styles.menuContainer}>
  <Card.Title title={record.nombre} subtitle="Info"/> 
   <Card.Content>
     <Text variant="bodyMedium">Email:{record.email}</Text>
     <Text variant="bodyMedium">Phone: {record.telefono}</Text>
     <Text variant="bodyMedium">Cel Phone:{record.celular}</Text>
     {/* <Text variant="labelMedium">{record.url}</Text> */}
   </Card.Content>
   {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
   <Card.Actions>
     <TouchableOpacity
       style={styles.link}
       onPress={() => {}}>
       <Text> Edit</Text>
     </TouchableOpacity>
     <TouchableOpacity
       style={styles.link}
       onPress={() => {}}>
       <Text> Delete</Text>
     </TouchableOpacity>
   </Card.Actions>
 </Card>
         ))}
      </Background>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 40,
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: 'black',
    padding: 20,
  },
  content: {
    fontSize: 25,
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
    padding: 20,
  },
  link: {
    fontSize: 15,
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
    padding: 20,
  },
  menuContainer:{
    // backgroundColor: 'orange',
    //borderRadius: 10,
    margin: 10,
    marginTop: 2,
    paddingHorizontal: 1,
    alignSelf: 'stretch',
},
});
