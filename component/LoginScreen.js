
import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TextInput placeholder="Username
      " />
      <TextInput placeholder="Password" secureTextEntry={true} />
      <Button title="Login"       onPress={() => {/* Handle login */}} />
      <Button title="Register"    onPress={() => navigation.navigate('RegisterScreen')}/>
      
    </View>
  );
};

export default LoginScreen;

