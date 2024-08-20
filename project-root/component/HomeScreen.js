import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

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
  const [bufferRetryCount, setBufferRetryCount] = useState(0);

  useEffect(() => {
    const setAudioMode = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,
        });
      } catch (error) {
        console.error('Error setting audio mode:', error);
      }
    };

    setAudioMode();

    return () => {
      Object.values(playbackInstances.current).forEach(async (playbackInstance) => {
        if (playbackInstance) {
          await playbackInstance.stopAsync().catch((error) => console.error('Error stopping sound:', error));
          await playbackInstance.unloadAsync().catch((error) => console.error('Error unloading sound:', error));
        }
      });
      playbackInstances.current = {};
    };
  }, []);

  const preloadStream = async (station) => {
    try {
      setIsBuffering(true);
      setCurrentStation(station);

      // Stop and unload the current playing sound, if any
      if (playbackInstances.current[currentStation]) {
        const currentInstance = playbackInstances.current[currentStation];
        const status = await currentInstance.getStatusAsync();
        if (status.isLoaded) {
          await currentInstance.stopAsync();
          await currentInstance.unloadAsync();
        }
      }

      // If the station is already preloaded, return early
      if (playbackInstances.current[station]) {
        setIsBuffering(false);
        return;
      }

      // Create a new sound object
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: radioStations[station].uri },
        { shouldPlay: false } // Set to false to preload without playing immediately
      );

      if (!sound || !status.isLoaded) {
        throw new Error("Sound object creation failed or sound is not loaded.");
      }

      playbackInstances.current[station] = sound;
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      setIsBuffering(false);
    } catch (error) {
      console.error('Error during stream preload:', error);
      setIsBuffering(false);
      Alert.alert('Error', 'Failed to load the stream. Please check your connection and try again.');
    }
  };

  const handlePlayPause = async () => {
    const playbackInstance = playbackInstances.current[currentStation];

    if (!playbackInstance) {
      console.warn('No sound instance available for the current station.');
      return;
    }

    try {
      const status = await playbackInstance.getStatusAsync();

      if (!status.isLoaded) {
        console.warn('Sound is not yet loaded. Please wait.');
        return;
      }

      if (isPlaying) {
        await playbackInstance.pauseAsync();
        setIsPlaying(false);
      } else {
        setIsBuffering(true);
        await playbackInstance.playAsync();
        setIsPlaying(true);
        setIsBuffering(false);
      }
    } catch (error) {
      console.error('Error during play/pause:', error);
      setIsBuffering(false);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    console.log("Playback Status:", status);
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setIsBuffering(status.isBuffering);

      if (status.isBuffering && bufferRetryCount < 3) {
        setBufferRetryCount(bufferRetryCount + 1);
        playbackInstances.current[currentStation].playAsync().catch((error) => {
          console.error('Error retrying play during buffering:', error);
          setIsBuffering(false);
        });
      } else if (status.isBuffering && bufferRetryCount >= 3) {
        setIsBuffering(false);
        Alert.alert('Buffering Issue', 'The stream is experiencing buffering issues. Please try again later or check your connection.');
      }
    } else if (status.error) {
      console.error('Playback Error:', status.error);
      setIsPlaying(false);
      setIsBuffering(false);
    }
  };

  return (
    <View style={styles.container}>
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
    marginBottom: 20,
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
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default HomeScreen;

