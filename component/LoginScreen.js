
import React from 'react';
import { View, TextInput, Button } from 'react-native';

const LoginScreen = () => {
  return (
    <View>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" secureTextEntry={true} />
      <Button title="Login" onPress={() => {/* Handle login */}} />
      
    </View>
  );
};

export default LoginScreen;

