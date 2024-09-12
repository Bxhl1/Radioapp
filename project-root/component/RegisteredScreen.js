import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Styles/styles.js'; // Import the styles

const RegisteredScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {/* You can add any design elements here */}
      </View>
      
      <View style={styles.bottomSection}>
        <Text style={styles.outsideText}>You have successfully registered!</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisteredScreen;
