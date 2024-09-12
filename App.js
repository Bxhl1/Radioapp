import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './project-root/component/LoginScreen.js';
import RegisterScreen from './project-root/component/RegisterScreen.js';
import HomeScreen from './project-root/component/HomeScreen.js';
import RegisteredScreen from './project-root/component/RegisteredScreen.js';
import LogoutScreen from './project-root/component/LogoutScreen.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Hide header for Login screen
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} // Hide header for Register screen
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Hide header for Home screen
        />
        <Stack.Screen 
          name="Registered" 
          component={RegisteredScreen} 
          options={{ headerShown: false }} // Hide header for Registered screen
        />
        <Stack.Screen 
          name="Logout" 
          component={LogoutScreen} 
          options={{ headerShown: false }} // Hide header for Logout screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


