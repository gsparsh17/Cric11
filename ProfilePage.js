import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

const ProfilePage = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Login'); // Navigate back to login page on logout
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://example.com/user-profile.jpg' }} // Replace with the actual profile image
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <TouchableOpacity style={styles.editButton}>
          <MaterialIcons name="edit" size={24} color="#ffbc01" />
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      <View style={styles.profileInfo}>
        <Text style={styles.infoText}>Email: johndoe@example.com</Text>
        <Text style={styles.infoText}>Joined: January 2023</Text>
        <Text style={styles.infoText}>Favorite Team: India</Text>
      </View>
      <TouchableOpacity style={styles.backButton}  onPress={handleLogout}>
        <Text style={styles.backButtonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Navigation to Home Page */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002b36',  // Dark green background
    padding: 20,
  },
  header: {
    fontSize: 28,
    color: '#ffffff',  // White text
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    color: '#ffbc01',  // Yellow text for profile name
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#014d2d',  // Slightly lighter green for edit button
    padding: 10,
    borderRadius: 5,
  },
  editText: {
    color: '#ffbc01',  // Yellow text for edit button
    fontWeight: 'bold',
    marginLeft: 5,
  },
  profileInfo: {
    marginTop: 30,
  },
  infoText: {
    color: '#bbb',  // Grey text for profile info
    fontSize: 16,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#ffbc01',  // Yellow button for back
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  backButtonText: {
    color: '#013425',  // Dark green text on the yellow button
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProfilePage;
