
import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackInstance = useRef(null);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await playbackInstance.current.pauseAsync();
      setIsPlaying(false);
    } else {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'http://live.amperwave.net/direct/ppm-jazz24mp3-ibc1' },
        { shouldPlay: true }
      );
      playbackInstance.current = sound;
      setSound(sound);
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={() => navigation.navigate('Logout')} />
      <TouchableOpacity onPress={handlePlayPause} style={styles.button}>
        <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'} Radio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
