import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import icons from Expo

const MyMatches = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulated data loading
    setTimeout(() => {
      setMatches([
        { id: 1, matchName: 'Team A vs Team B', date: '2024-09-10', status: 'Completed' },
        { id: 2, matchName: 'Team C vs Team D', date: '2024-09-11', status: 'Live' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const renderMatchItem = ({ item }) => {
    const statusColor = item.status === 'Live' ? '#ffbc01' : '#ffffff'; // Yellow for live, white for completed
    return (
      <TouchableOpacity 
        style={styles.matchCard} 
        onPress={() => navigation.navigate('MatchDetails', { matchId: item.id })}
      >
        <View style={styles.matchInfo}>
          <Text style={styles.matchTitle}>{item.matchName}</Text>
          <Text style={styles.matchDate}>{new Date(item.date).toLocaleDateString()}</Text>
          <Text style={[styles.matchStatus, { color: statusColor }]}>Status: {item.status}</Text>
        </View>
        <FontAwesome5 name="chevron-right" size={20} color="#ffffff" />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffbc01" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Matches</Text>
      {matches.length === 0 ? (
        <View style={styles.noMatchesContainer}>
          <Text style={styles.noMatchesText}>You haven't played any matches yet.</Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
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
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',  // White text
    textAlign: 'center',
  },
  matchCard: {
    backgroundColor: '#34495e',  // Slightly lighter green for the card
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ffbc01',  // Yellow bottom border for card
    borderBottomWidth: 2,
    shadowColor: '#000',  // Adding shadow for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  matchInfo: {
    flex: 1,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',  // White text for match title
  },
  matchDate: {
    fontSize: 14,
    color: '#ffbc01',  // Yellow text for date
    marginTop: 5,
  },
  matchStatus: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#ffbc01',  // Yellow text for error messages
  },
  noMatchesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMatchesText: {
    fontSize: 18,
    color: '#ffffff',  // White text for no matches message
  },
  backButton: {
    backgroundColor: '#ffbc01',  // Yellow button for back
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',  // Adding shadow for back button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonText: {
    color: '#013425',  // Dark green text on the yellow button
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyMatches;
