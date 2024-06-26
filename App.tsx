
import * as React from 'react';
import { View, Text, Button, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from './src/screens/Dashboard';
import LoginScreen from './src/screens/LoginScreen';
import Register from './src/screens/RegisterScreen';
import Reset from './src/screens/ResetPasswordScreen';
import AddContact from './src/screens/AddContact';
import EditContact from './src/screens/EditContact ';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  Profile: { name: string }; 
};
const Stack = createNativeStackNavigator();
//const Stack = createStackNavigator<RootStackParamList>();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      {/* <Stack.Screen name="Home" component={HomeScreen}  options={{ title: 'Login' }} /> */}
        <Stack.Screen name="Home" component={LoginScreen}  options={{ title: 'Login' }}/> 
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="AddContact" component={AddContact} />
        <Stack.Screen name="EditContact" component={EditContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;