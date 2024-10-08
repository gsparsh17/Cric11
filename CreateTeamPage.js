import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CreateTeamPage = ({ route, navigation }) => {
  const { match_url } = route.params;
  const { match_detail } = route.params;
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [activeIdentity, setActiveIdentity] = useState(null);
  const currentUser = auth().currentUser;

  useEffect(() => {
    const fetchSquad = async () => {
      try {
        const response = await fetch(`http://192.168.1.38:5000/${match_url}`);
        const data = await response.json();
        setPlayers(data);
        setActiveIdentity(Object.keys(groupByIdentity(data))[0]);
      } catch (error) {
        console.error('Error fetching squad data:', error);
        alert('Failed to fetch squad data. Please try again later.');
      }
    };
    fetchSquad();
  }, [match_url]);

  const handleSelectPlayer = (player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
    } else if (selectedPlayers.length < 11) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      alert('You can only select 11 players.');
    }
  };

  const handleConfirmTeam = async () => {
    if (selectedPlayers.length === 11) {
      try {
        // Get current user's ID
        const userId = currentUser.uid;
        // const matchName = match_url.replace(/\//g, '_'); // Sanitize match name for Firestore

        // Save the selected team to Firestore under the current user's document
        await firestore()
          .collection('users')
          .doc(userId)
          .collection('matches')
          .doc(match_detail)
          .set({
            selectedTeam: selectedPlayers,
            timestamp: firestore.FieldValue.serverTimestamp(),
          });

        console.log('Team successfully saved:', selectedPlayers);
        alert('Team saved successfully!');
        navigation.navigate('SomeOtherPage'); // Navigate after saving
      } catch (error) {
        console.error('Error saving team:', error);
        alert('Failed to save the team. Please try again later.');
      }
    } else {
      alert('Please select exactly 11 players.');
    }
  };

  const groupByIdentity = (players) => {
    return players.reduce((acc, player) => {
      const identity = player.identity;
      if (!acc[identity]) acc[identity] = [];
      acc[identity].push(player);
      return acc;
    }, {});
  };

  const groupedPlayers = groupByIdentity(players);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Team</Text>
      <Text style={styles.subHeader}>Select Players</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navbar}>
        {Object.keys(groupedPlayers).map((identity, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.navItem,
              activeIdentity === identity && styles.activeNavItem,
            ]}
            onPress={() => setActiveIdentity(identity)}
          >
            <Text
              style={[
                styles.navItemText,
                activeIdentity === identity && styles.activeNavItemText,
              ]}
            >
              {identity}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.tableContainer}>
        {groupedPlayers[activeIdentity]?.map((player, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.playerRow,
              selectedPlayers.includes(player) && styles.selectedPlayerRow,
            ]}
            onPress={() => handleSelectPlayer(player)}
          >
            <Text style={styles.playerName}>
              {player.player} ({player.team})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmTeam}>
        <Text style={styles.confirmButtonText}>Confirm Team</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002b36',
    padding: 20,
  },
  header: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    color: '#ffbc01',
    textAlign: 'center',
    marginBottom: 20,
  },
  navbar: {
    height: 1,
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 5,
  },
  navItem: {
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 5,
    backgroundColor: '#444',
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    transition: 'background-color 0.3s ease',
  },
  activeNavItem: {
    backgroundColor: '#ffbc01',
    transform: [{ scale: 1.05 }],
  },
  navItemText: {
    color: '#fff',
    fontSize: 14.5,
    textAlign: 'center',
  },
  activeNavItemText: {
    color: '#013425',
    fontWeight: 'bold',
  },
  tableContainer: {
    flex: 1,
    marginTop: -410,
  },
  playerRow: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#34495e',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectedPlayerRow: {
    backgroundColor: '#ffbc01',
    transform: [{ scale: 1.05 }],
  },
  playerName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#ffbc01',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  confirmButtonText: {
    color: '#013425',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ffbc01',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  backButtonText: {
    color: '#013425',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateTeamPage;
