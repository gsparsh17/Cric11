import React, { useState } from 'react';
import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth'; // Import Firebase auth
import firestore from '@react-native-firebase/firestore'; // Import Firestore

const SignUpPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    setLoading(true);
    setErrorMessage('');
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const { uid } = userCredential.user;

      // Save user details to Firestore
      await firestore().collection('users').doc(uid).set({
        name,
        phone,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      navigation.navigate('Home'); // Navigate to home after successful signup
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error.message) // Set error if signup fails
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
      <Text style={styles.header}>Sign Up</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={'#ffbc01'} // Yellow placeholder
        value={name}
        onChangeText={setName}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone No."
        placeholderTextColor={'#ffbc01'} // Yellow placeholder
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
        autoCapitalize="none"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={'#ffbc01'} // Yellow placeholder
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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

export default SignUpPage;
