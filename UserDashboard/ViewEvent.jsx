import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { CalendarDays, MapPin } from 'lucide-react-native';

const events = [
  {
    id: 1,
    title: 'Community Cleanup',
    description: 'Join us to clean up the neighborhood park!',
    address: 'Kigali Park, Nyarugenge',
    date: 'April 5, 2025',
    day: 'Saturday',
    month: 'April',
  },
  {
    id: 2,
    title: 'Tree Planting Day',
    description: 'Help us plant new trees and preserve nature.',
    address: 'Gisozi Hill, Kigali',
    date: 'April 12, 2025',
    day: 'Saturday',
    month: 'April',
  },
];

const EventCard = ({ event }) => (
  <View style={{
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{event.title}</Text>
    <Text style={{ fontSize: 14, color: '#6e6e6e' }}>{event.description}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
      <CalendarDays color="#6e6e6e" />
      <Text style={{ fontSize: 12, marginLeft: 5 }}>{event.date} ({event.day})</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
      <MapPin color="#6e6e6e" />
      <Text style={{ fontSize: 12, marginLeft: 5 }}>{event.address}</Text>
    </View>
  </View>
);

const ViewEvent = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 15 }}>
      <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 15 }}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
};

export default ViewEvent;
