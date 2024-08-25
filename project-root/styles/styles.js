import { StyleSheet } from 'react-native';

export const Colors = {
  primary: '#3498db',  // Blue
  secondary: '#2ecc71', // Green
  tertiary: '#f1c40f',  // Yellow
};

export const Gradients = {
  screenOne: ['#3498db', '#2ecc71', '#f1c40f'], // Replace with actual gradient colors
  screenTwo: ['#2ecc71', '#f1c40f', '#3498db'], // Replace with actual gradient colors
  screenThree: ['#f1c40f', '#3498db', '#2ecc71'], // Replace with actual gradient colors
};

export const styles = StyleSheet.create({
  screenOneBackground: {
    flex: 1,
  },
  screenTwoBackground: {
    flex: 1,
  },
  screenThreeBackground: {
    flex: 1,
  },
});

export default styles;

