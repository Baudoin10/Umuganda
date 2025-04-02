import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
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
  <Card className="m-2 p-4 bg-white shadow-lg rounded-2xl">
    <Text className="text-xl font-bold">{event.title}</Text>
    <Text className="text-base text-gray-600">{event.description}</Text>
    <View className="flex-row items-center mt-2">
      <CalendarDays className="text-gray-500" />
      <Text className="text-sm ml-1">{event.date} ({event.day})</Text>
    </View>
    <View className="flex-row items-center mt-1">
      <MapPin className="text-gray-500" />
      <Text className="text-sm ml-1">{event.address}</Text>
    </View>
  </Card>
);

const ViewEvent = () => {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-semibold mb-4">Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
};

export default ViewEvent;