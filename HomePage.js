import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; // Import icons from Expo
 // Import Firebase auth

const HomePage = ({ navigation }) => {

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome to Cricket Fantasy Games</Text>
        <Text style={styles.subHeader}>Enjoy live matches, fantasy leagues, and exciting updates!</Text>
        <Image
        source={require('./icon.png')} 
        style={styles.featureImage}
      />
      </View>

      {/* Featured Image */}
      

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="account-circle" size={28} color="#ffbc01" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MyMatches')}>
          <FontAwesome5 name="calendar-alt" size={24} color="#ffbc01" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
          <FontAwesome5 name="trophy" size={24} color="#ffbc01" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Navigation')}>
          <MaterialIcons name="notifications" size={28} color="#ffbc01" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('News')}>
          <MaterialIcons name="web" size={28} color="#ffbc01" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002b36', // Dark background
    justifyContent: 'space-between', // Ensure space between content and navbar
  },
  navbar: {
    position: 'absolute', // Fix the navbar position
    bottom: 0, // Stick it to the bottom
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#34495e', // Dark green background for navbar
    borderTopColor: '#444',
    borderTopWidth: 1,
  },
  headerContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    color: '#ffbc01', // Use the yellow color for the header
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#fff', // Light gray for the subheader
    textAlign: 'center',
    marginVertical: 10,
  },
  featureImage: {
    width: '50%',
    height: 200,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10, // Yellow border for feature image
    borderWidth: 2,
  },
});

export default HomePage;
