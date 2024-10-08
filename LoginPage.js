import React, { useState } from 'react';
import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home'); // Navigate to Home page on success
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error.message) // Set the error message if login fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./icon.png')} 
        style={styles.featureImage}
      />
      <Text style={styles.header}>Login</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#ffbc01'} // Yellow placeholder
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#ffbc01'} // Yellow placeholder
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#002b36',  // Dark green background
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffbc01',  // Yellow header text
  },
  featureImage: {
    width: '50%',
    height: 200,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#34495e',  // Dark input background
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#ffbc01',  // Yellow button
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#013425',  // Dark green text on the yellow button
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginTop: 15,
    color: '#ffbc01',  // Yellow link text
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginPage;
