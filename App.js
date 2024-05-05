import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './component/LoginScreen.js';
import RegisterScreen from './component/RegisterScreen.js';
import HomeScreen from './component/HomeScreen.js';
import RegisteredScreen from './component/RegisteredScreen.js';
import LogoutScreen from './component/LogoutScreen.js';


// Initialize Firebase



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registered" component = {RegisteredScreen}/>
        <Stack.Screen name="Logout" component={LogoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
