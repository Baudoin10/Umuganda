


import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For icons like map-pin and calendar

// Sample events data
const events = [
  {
    id: 1,
    title: 'Community Cleanup',
    description: 'Join us for a community park cleanup. Make a difference!',
    address: 'Kigali Park, Nyarugenge',
    date: '2025-04-05',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Tree Planting Day',
    description: 'Help us plant trees at Gisozi Hill to preserve nature.',
    address: 'Gisozi Hill, Kigali',
    date: '2025-04-12',
    status: 'Full',
  },
  {
    id: 3,
    title: 'Beach Clean-Up',
    description: 'Volunteer to clean the beaches along Lake Kivu.',
    address: 'Kibuye, Lake Kivu',
    date: '2025-04-19',
    status: 'Open',
  },
];

const EventCard = ({ event, navigation }) => (
  <View style={styles.card}>
    <Text style={styles.eventTitle}>{event.title}</Text>
    <Text style={styles.eventDescription}>{event.description}</Text>
    <View style={styles.eventDetails}>
      <Icon name="calendar" size={16} color="#6e6e6e" />
      <Text style={styles.eventInfo}>{event.date}</Text>
    </View>
    <View style={styles.eventDetails}>
      <Icon name="map-pin" size={16} color="#6e6e6e" />
      <Text style={styles.eventInfo}>{event.address}</Text>
    </View>
    <Text style={styles.eventStatus(event.status)}>{event.status}</Text>
    {event.status === 'Open' && (
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => navigation.navigate('EventForm', { eventId: event.id })}
      >
        <Text style={styles.joinButtonText}>Join Event</Text>
      </TouchableOpacity>
    )}
  </View>
);

const JoinEvent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventCard event={item} navigation={navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#6e6e6e',
    marginTop: 5,
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  eventInfo: {
    fontSize: 12,
    marginLeft: 5,
    color: '#6e6e6e',
  },
  eventStatus: (status) => ({
    fontSize: 14,
    marginTop: 8,
    fontWeight: 'bold',
    color: status === 'Open' ? 'green' : 'red',
  }),
  joinButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default JoinEvent;
