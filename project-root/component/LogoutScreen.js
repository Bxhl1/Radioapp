// In your LogoutScreen.js or wherever you're handling the logout
import React from 'react';
import { Button, View, Text } from 'react-native';
import { firebase } from '../../config/firebase.js';  // Adjust the path according to your structure

const LogoutScreen = ({ navigation }) => {
  const handleLogout = () => {
    firebase.auth.signOut()  // Use firebase.auth as defined in your export
      .then(() => {
        console.log('User logged out!');
        navigation.replace('Login');
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Are you sure you want to log out?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutScreen;



