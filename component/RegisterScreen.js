// RegisterScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword
import { firebase } from '../config/firebase'; // Import your Firebase configuration

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(firebase.auth, email, password);
      // Navigate to the home screen or another screen upon successful registration
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('Email address is already in use');
        // Display a message to the user indicating that the email address is already in use
      } else {
        console.error('Registration error:', error);
        // Handle other registration errors
      }
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default RegisterScreen;

