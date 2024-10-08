import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const MatchSchedulePage = ({ navigation }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://192.168.1.38:5000/'); // Replace with your API URL
        const data = await response.json();
        const processedMatches = data.map((match, index) => ({
          id: index.toString(),
          teams: match.teams,
          date: match.date.split(',')[0],
          time: match.date.split(',')[1].trim(),
          match_url: match.match_url,
        }));
        setMatches(processedMatches);
      } catch (error) {
        console.error('Error fetching match schedule:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Matches</Text>

      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.matchCard}
            onPress={() => navigation.navigate('CreateTeam', { match_url: item.match_url, match_detail: item.teams + ' ' + item.date })}
            activeOpacity={0.8}
          >
            <Text style={styles.teams}>{item.teams}</Text>
            <Text style={styles.matchDetails}>
              {item.date} at {item.time}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002b36', // Deep teal background for a modern look
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    color: '#ffbc01', // Bright yellow for a vibrant header
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1.2,
    textShadowColor: 'rgba(255, 255, 255, 0.2)', // Subtle white shadow for the header
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 5,
  },
  matchCard: {
    backgroundColor: '#34495e', // Cool blue-grey for match cards
    padding: 20,
    marginBottom: 20,
    borderRadius: 15, // Rounded corners for smooth appearance
    shadowColor: '#000', // Dark shadow for depth
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    transform: [{ scale: 1 }],
    transition: 'transform 0.3s ease', // Smooth scale transition
  },
  teams: {
    color: '#ffbc01', // Neon yellow for team names to make them stand out
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase', // Uppercase for bold presentation
    marginBottom: 8, // Glow effect on text
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
  },
  matchDetails: {
    color: '#e0e0e0', // Light grey for match date and time
    fontSize: 16,
    opacity: 0.9,
  },
  backButton: {
    backgroundColor: '#ffbc01', // Bright yellow button for attention
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30, // Rounded button for a cool look
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    transform: [{ scale: 1 }],
    transition: 'transform 0.3s ease', // Button press scale effect
  },
  backButtonText: {
    color: '#002b36', // Dark background to contrast with yellow button
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});

export default MatchSchedulePage;
