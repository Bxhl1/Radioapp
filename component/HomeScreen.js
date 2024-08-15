import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const radioStations = {
  Jazz: { uri: 'http://live.amperwave.net/direct/ppm-jazz24mp3-ibc1', image: require('./assets/jazz.png') },
  Classical: { uri: 'http://someclassicalstation.com/stream', image: require('./assets/classical.png') },
  Rock: { uri: 'http://somerockstation.com/stream', image: require('./assets/rock.png') },
  Pop: { uri: 'http://somepopstation.com/stream', image: require('./assets/pop.png') },
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackInstance = useRef(null);

  useEffect(() => {
    return () => {
      if (playbackInstance.current) {
        playbackInstance.current.unloadAsync();
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await playbackInstance.current.pauseAsync();
      setIsPlaying(false);
    } else {
      if (playbackInstance.current === null) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: radioStations[currentStation].uri },
          { shouldPlay: true }
        );
        playbackInstance.current = sound;
        setIsPlaying(true);
      } else {
        await playbackInstance.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const handleStationChange = async (station) => {
    if (currentStation !== station) {
      if (playbackInstance.current) {
        await playbackInstance.current.stopAsync();
        await playbackInstance.current.unloadAsync();
        playbackInstance.current = null;
        setIsPlaying(false);
      }
      setCurrentStation(station);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Station</Text>
      <View style={styles.buttonsContainer}>
        {Object.keys(radioStations).map((station) => (
          <TouchableOpacity
            key={station}
            onPress={() => handleStationChange(station)}
            style={styles.stationButton}
          >
            <Text style={styles.stationButtonText}>{station}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {currentStation && (
        <View style={styles.radioContainer}>
          <Image source={radioStations[currentStation].image} style={styles.radioImage} />
          <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
            <Text style={styles.playPauseButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <Button title="Logout" onPress={() => navigation.navigate('Logout')} />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  stationButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  stationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  radioContainer: {
    alignItems: 'center',
  },
  radioImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  playPauseButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  playPauseButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;

