import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebase } from '../../config/firebase.js';

import styles from '../Styles/styles.js'; // Correct import
 // Import the styles




const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebase.auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.topSection}>
    <Image source={require('../../assets/radioicon-1.png')} style={styles.icon} />
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  </View>
    
  );
};


export default LoginScreen;
