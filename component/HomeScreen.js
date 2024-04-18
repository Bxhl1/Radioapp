import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import 
const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
   
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Log out" onPress={handleLogout} />
    </View>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <Button
      onPress={() => navigation.navigate('Login')} // Navigate to the Login screen upon logout
      title="Log out"
    />
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

