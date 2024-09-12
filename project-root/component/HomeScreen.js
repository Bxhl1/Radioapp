import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import styles from '../Styles/styles.js';

const radioStations = {
  Jazz: { uri: 'http://stream.radioparadise.com/aac-128', image: require('../assets/jazz.png') },
  Classical: { uri: 'http://stream.radioparadise.com/mellow-128', image: require('../assets/classical.png') },
  Rock: { uri: 'http://stream.radioparadise.com/rock-128', image: require('../assets/rock.png') },
  Pop: { uri: 'http://stream.radioparadise.com/global-128', image: require('../assets/pop.png') },
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const playbackInstances = useRef({});
  
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    return () => {
      Object.values(playbackInstances.current).forEach(async (playbackInstance) => {
        await playbackInstance?.stopAsync();
        await playbackInstance?.unloadAsync();
      });
    };
  }, []);

  const preloadStream = async (station) => {
    try {
      console.log(`Preloading stream for station: ${station}`);
      
      // Unload previous station's sound if switching stations
      if (currentStation && currentStation !== station && playbackInstances.current[currentStation]) {
        console.log(`Unloading previous station: ${currentStation}`);
        await playbackInstances.current[currentStation].stopAsync();
        await playbackInstances.current[currentStation].unloadAsync();
        delete playbackInstances.current[currentStation];
      }

      if (playbackInstances.current[station]) {
        console.log(`Station ${station} already preloaded.`);
      } else {
        setIsBuffering(true);
        const { sound } = await Audio.Sound.createAsync(
          { uri: radioStations[station].uri },
          { shouldPlay: false },
          (status) => onPlaybackStatusUpdate(status, station)
        );
        playbackInstances.current[station] = sound;
        console.log(`Sound object created for station: ${station}`);
        setIsBuffering(false);
      }

      setCurrentStation(station);
    } catch (error) {
      console.error('Error during stream preload:', error);
      setIsBuffering(false);
      Alert.alert('Error', 'Failed to load the stream. Please check your connection and try again.');
    }
  };

  const handlePlayPause = async () => {
    const playbackInstance = playbackInstances.current[currentStation];

    if (!playbackInstance) {
      Alert.alert('Playback Error', 'No audio loaded for current station.');
      return;
    }

    const status = await playbackInstance.getStatusAsync();
    if (!status.isLoaded) {
      Alert.alert('Playback Error', 'Audio not loaded yet, please wait.');
      return;
    }

    if (status.isPlaying) {
      await playbackInstance.pauseAsync();
      setIsPlaying(false);
    } else {
      await playbackInstance.playAsync();
      setIsPlaying(true);
    }
  };

  const onPlaybackStatusUpdate = (status, station) => {
    if (station === currentStation) {
      setIsPlaying(status.isPlaying);
      setIsBuffering(status.isBuffering);
    }
    if (status.didJustFinish && !status.isLooping) {
      playbackInstances.current[station]?.unloadAsync();
      delete playbackInstances.current[station];
    }
  };












  return (
    <View style={styles.homescreenContainer}>
    
      <Text style={styles.title}>Choose Your Station</Text>
      <View style={styles.buttonsContainer}>
        {Object.keys(radioStations).map((station) => (
          <TouchableOpacity
            key={station}
            onPress={() => preloadStream(station)}
            style={styles.stationButton}
          >
            <Text style={styles.stationButtonText}>{station}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {currentStation && (
        <View style={styles.radioContainer}>
          <Image source={radioStations[currentStation].image} style={styles.radioImage} />
          {isBuffering ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
              <Text style={styles.playPauseButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={styles.bottomContainer}>
        <Button title="Logout" onPress={() => navigation.navigate('Logout')} />
      </View>
    </View>
  );
};

  export default HomeScreen;