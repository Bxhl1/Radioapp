// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCUHCk1apbuQdClSfDXQcODkBTJi9-OQQM",
    authDomain: "radioapp-64a81.firebaseapp.com",
    projectId: "radioapp-64a81",
    storageBucket: "radioapp-64a81.appspot.com",
    messagingSenderId: "389010625563",
    appId: "1:389010625563:web:3fe8ae820eef9b67a414be",
    measurementId: "G-GQWX7E07RD"
  };
  

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const firebase = {
  app: firebaseApp,
  auth: getAuth(firebaseApp)
};
