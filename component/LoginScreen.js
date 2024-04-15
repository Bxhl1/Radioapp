import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword directly
import { firebase } from '../config/firebase'; // Import your Firebase configuration

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to store the error message
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebase.auth, email, password);
      // Navigate to home screen or another screen upon successful login
    } catch (error) {
      console.error('Login error:', error);
      // Update the error state with the error message
      setError('Invalid email or password. Please try again.'); // Set a generic error message
    }
  };

  // Conditional rendering of the error message
  const errorMessage = error && <Text style={{ color: 'red' }}>{error}</Text>;

  return (
    <View>
      {errorMessage}
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
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default LoginScreen;
