// firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCUHCk1apbuQdClSfDXQcODkBTJi9-OQQM',
  authDomain: 'radioapp-64a81.firebaseapp.com',
  projectId: 'radioapp-64a81',
  storageBucket: 'radioapp-64a81.appspot.com',
  messagingSenderId: '389016255563',
  appId: '1:389016255563:web:3fe8ae820eef9b67a414be',
  measurementId: 'G-GQWX7E07RD',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export firebaseApp and auth for use in the app
export const firebase = {
  app: firebaseApp,
  auth: auth,
};