import React, { useEffect, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, ScrollView,StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Dashboard({navigation}) {
  const [data, setData] = useState([]);

  const isFocused = useIsFocused();

  const peticionGet = async () => {


    
    
  

    // below is how you would do using react-native-async-storage
    
    const idUsuario = await AsyncStorage.getItem('idUsuario');
    await axios.get(`https://nodejs-contactos-fc9722b786ad.herokuapp.com/api/contacto/obtenercontactos/${idUsuario}`).then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    if(isFocused){ 
      peticionGet();
  }
    
  }, [ isFocused]);


  const eliminar_completo = async (id) => {
    const respuesta = await axios.delete(`https://nodejs-contactos-fc9722b786ad.herokuapp.com/api/contacto/borrarcontacto/${id}`);
    peticionGet();
  };
  
  const handleDelete = async (id) => {
    Alert.alert('Delete Contact', 'Delete contacto', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => eliminar_completo(id)},
    ]);
    ;
  }

 
  //  export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Background>
        <Header>List of Contacts</Header>



         <Button
          style={undefined}
          mode="outlined"
          onPress={() => navigation.navigate('AddContact')}>
          Add New Contact
        </Button> 
         {data.map((record) => (
   <Card key={record._id} style={styles.menuContainer}>
  <Card.Title title={record.nombre} subtitle=""/> 
   <Card.Content>
     <Text variant="bodyMedium">Email:{record.email}</Text>
     <Text variant="bodyMedium">Phone: {record.telefono}</Text>
     
     {/* <Text variant="labelMedium">{record.url}</Text> */}
   </Card.Content>
   {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
   <Card.Actions>
     <TouchableOpacity
       style={styles.link}
       onPress={() => {navigation.navigate('EditContact', {
        id: record._id});
      }}>
       <Text> Edit</Text>
     </TouchableOpacity>
     <TouchableOpacity
       style={styles.link}
       onPress={() =>handleDelete(record._id)}>
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
