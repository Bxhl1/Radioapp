// In your LogoutScreen.js or wherever you're handling the logout
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config/firebase.js';
import styles from '../Styles/styles.js'; // Import the styles

const LogoutScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    firebase.auth.signOut()
      .then(() => {
        console.log('User logged out!');
        navigation.replace('Login');
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {/* You can add any design elements or leave it empty */}
      </View>
      
      <View style={styles.bottomSection}>
        <Text style={styles.outsideText}>Are you sure you want to log out?</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogoutScreen;



