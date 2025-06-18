
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import { CalendarDays, MapPin } from 'lucide-react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const ViewEvent = () => {

  const navigation = useNavigation();
  const ip = import.meta.env.VITE_IP;

  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://${ip}:3000/api/events`); 
        const data = await response.json();

        if (response.ok) {
          setEvents(data);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchEvents();
  }, []);


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Event Card
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
        <Text style={{ fontSize: 12, marginLeft: 5 }}>{event.date}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
        <MapPin color="#6e6e6e" />
        <Text style={{ fontSize: 12, marginLeft: 5 }}>{event.address}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 15 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("user")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "10%",
          paddingVertical: 10,
        }}
      >
        <Ionicons
          name='arrow-back'
          size={24}
          color='black'
          style={{ marginRight: 5 }}
        />
        <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          marginBottom: 15,
          marginTop: "3%",
        }}
      >
        Upcoming Events
      </Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
};

export default ViewEvent;
