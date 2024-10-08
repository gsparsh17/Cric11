import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const NotificationsPage = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'New Match Scheduled: India vs Australia', time: '2 hrs ago' },
    { id: '2', title: 'Join League Reminder', time: '1 day ago' },
    { id: '3', title: 'System Maintenance: Fantasy Leagues down for 2 hours', time: '3 days ago' },
  ]);

  useEffect(() => {
    // Fetch notifications from API if needed
  }, []);

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      {notifications.length === 0 ? (
        <Text style={styles.noNotifications}>No new notifications</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <FontAwesome name="bell" size={24} color="#ffbc01" style={styles.icon} />
              <View>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
            </View>
          )}
        />
      )}

      {/* Clear Notifications Button */}
      <TouchableOpacity style={styles.clearButton} onPress={handleClearNotifications}>
        <Text style={styles.clearButtonText}>Clear All Notifications</Text>
      </TouchableOpacity>

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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495e',  // Slightly lighter green for notification items
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
  },
  notificationTitle: {
    color: '#ffbc01',  // Yellow text for notification title
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationTime: {
    color: '#bbb',  // Keeping the same color for time
    fontSize: 14,
    marginTop: 5,
  },
  noNotifications: {
    color: '#bbb',  // Grey text for no notifications
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  clearButton: {
    backgroundColor: '#ffbc01',  // Yellow button for clearing notifications
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  clearButtonText: {
    color: '#013425',  // Dark green text on the yellow button
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ffbc01',  // Yellow button for back
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#013425',  // Dark green text on the yellow button
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default NotificationsPage;
