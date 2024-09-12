import { StyleSheet } from 'react-native';


export const Colors = {
  primary: '#30afb6',  // Teal color (Bottom section)
  secondary: '#4861bb', // Darker blue color (Top section)
  button: '#532494',    // Purple color for the button
  text: '#ffffff',  
  inputtext: '#000000',   // White color for all text
  homecolor: '#2f4d7b',

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary, // Bottom section color
  },
  topSection: {
    height: '30%', // Adjust the height as needed for your design
    backgroundColor: Colors.secondary, // Top section color
    borderBottomLeftRadius: 50, // Adjust for curve effect
    borderBottomRightRadius: 50, // Adjust for curve effect
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40, // Adds spacing from bottom of top section
  },
  bottomSection: {
    flex: 1,  // Takes up the remaining space
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff', // White background for input
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25, // Rounded input fields
    marginBottom: 15,
    paddingHorizontal: 20,
    color: Colors.inputtext , // White text color inside input
  },
  button: {
    backgroundColor: Colors.button, // Purple color for button
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  buttonText: {
    color: Colors.text, // White text color for button
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  registerButton: {
    marginTop: 20, // Adds space between the login button and register button
  },

  outsideText: {
    color: Colors.text,
    fontSize: 50,
  },
  icon: {
    width: 100,  // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: 'contain', // Ensures the image scales correctly
    marginBottom: 20, // Space between the icon and the form elements
  },


  //Homescreen styes are below here 
  
  homescreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.homecolor,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: Colors.text

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






export default styles;
