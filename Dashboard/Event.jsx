import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Event = () => {
  const [events, setEvents] = useState([
    { id: "1", title: "Event 1", description: "Description for Event 1" },
    { id: "2", title: "Event 2", description: "Description for Event 2" },
  ]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "" });

  const addEvent = () => {
    if (newEvent.title && newEvent.description) {
      setEvents([...events, { id: `${events.length + 1}`, ...newEvent }]);
      setNewEvent({ title: "", description: "" });
    } else {
      Alert.alert(
        "Error",
        "Please provide both title and description for the event."
      );
    }
  };

  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Events</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Event Title"
          value={newEvent.title}
          onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Event Description"
          value={newEvent.description}
          onChangeText={(text) =>
            setNewEvent({ ...newEvent, description: text })
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={addEvent}>
          <Icon name="add" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>Add Event</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={styles.eventList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F7FA",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#FFF",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFF",
    marginLeft: 8,
    fontSize: 16,
  },
  eventList: {
    marginTop: 16,
  },
  eventCard: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
});

export default Event;
