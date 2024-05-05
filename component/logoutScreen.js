import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { firebase } from '../config/firebase'; // Make sure the path matches where your firebase config file is
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.replace('Login');  // Using replace to avoid going back to the logout screen
    } catch (error) {
      console.error('Logout error:', error);
      // Optionally display an error message if logout fails
      Alert.alert('Logout Failed', 'Unable to log out at this time, please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    fontSize: 18,
    marginBottom: 20
  }
});

export default LogoutScreen;

