// RegisterScreen.js

import React from 'react';
import { View, TextInput, Button } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  return (
    <View>
      <TextInput placeholder="Enter your email" />
      <TextInput placeholder="Enter your password" secureTextEntry={true} />
      {/* Add more input fields for registration */}
      <Button
        title="Register"
        onPress={() => {
          // Handle registration logic
          // After registration, navigate to login screen
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default RegisterScreen;
