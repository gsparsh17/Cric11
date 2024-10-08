import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const JoinLeaguePage = ({ navigation }) => {
  const [leagueCode, setLeagueCode] = useState('');
  const [matches, setMatches] = useState([]);

  // Fetch match data from JSON API
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://cricapi2.onrender.com/api/upcoming-matches'); // Replace with the actual endpoint
        setMatches(response.data); // Assuming the data is in response.data
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };
    fetchMatches();
  }, []);

  const handleJoinLeague = () => {
    console.log('Joining league with code:', leagueCode);
    // Implement further logic for joining the league
  };

  const handleMatchClick = (match) => {
    navigation.navigate('CreateTeam', { match });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Join Any Match</Text>
      <Text style={styles.instructions}>Select any Match to Join with your teams.</Text>

      {/* <TextInput
        style={styles.input}
        placeholder="Enter League Code"
        placeholderTextColor="#bbb"
        value={leagueCode}
        onChangeText={setLeagueCode}
      /> */}

      <TouchableOpacity style={styles.joinButton} onPress={handleJoinLeague}>
        <Text style={styles.joinButtonText}>Join League</Text>
      </TouchableOpacity>

      {/* Display Matches */}
      <ScrollView style={styles.matchesContainer}>
        {matches.map((match, index) => (
          <TouchableOpacity key={index} style={styles.matchCard} onPress={() => handleMatchClick(match)}>
            <Text style={styles.matchType}>{match.match_type}</Text>
            <Text style={styles.teams}>
              {match.teams[0].name} vs {match.teams[1].name}
            </Text>
            <Text style={styles.location}>{match.location}</Text>
            <Text style={styles.matchTime}>{match.match_time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Navigate Back to Home */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#013425',  // Dark green background
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    color: '#ffffff',  // White text
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#ffbc01',  // Yellow text for instructions
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#014d2d',  // Slightly lighter green for the input field
    color: '#ffffff',  // White text
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  joinButton: {
    backgroundColor: '#ffbc01',  // Yellow button for joining league
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  joinButtonText: {
    color: '#013425',  // Dark green text on the yellow button
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ffbc01',  // Yellow button for back
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#013425',  // Dark green text on the yellow button
    fontWeight: 'bold',
    fontSize: 18,
  },
  matchesContainer: {
    marginTop: 20,
    flex: 1,
  },
  matchCard: {
    backgroundColor: '#2b2b2b',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#ffbc01',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  matchType: {
    color: '#ffbc01',  // Yellow text
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  teams: {
    color: '#ffffff',  // White text for teams
    fontSize: 16,
    marginBottom: 5,
  },
  location: {
    color: '#ffffff',  // White text for location
    fontSize: 14,
    marginBottom: 5,
  },
  matchTime: {
    color: '#888',  // Grey text for match time
    fontSize: 14,
  },
});

export default JoinLeaguePage;
