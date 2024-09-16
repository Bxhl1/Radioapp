// RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebase } from '../../config/firebase.js';
import styles from '../Styles/styles.js'; // Import the styles

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(firebase.auth, email, password);
      navigation.navigate('Registered');
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    
   
    <View style={styles.container}>
    <View style={styles.topSection}>

    
         
         <Image source={require('../assets/radioicon-2.png')} style={styles.icon} />
      
    </View>
    
    <View style={styles.bottomSection}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, styles.registerButton]} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  </View>
    
  );
};

export default RegisterScreen;



