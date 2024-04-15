// RegisterScreen.js

import React, {useState} from 'react';
import { View, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const RegisterScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleRegister = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      // Navigate to login screen or another screen upon successful registration
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  return (
    <View>
      <TextInput 
      placeholder="Enter your email"
      value={email} 
      onChangeText={setEmail}
      />
      <TextInput
        placeholder="Enter your password" 
        value={password}
        onChangeText={setPassword}
      
      secureTextEntry={true} />
      {/* Add more input fields for registration */}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
