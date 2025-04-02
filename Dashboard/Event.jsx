import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Event = () => {
  const [newEvent, setNewEvent] = useState({ title: '', description: '', address: '', date: '' });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Event</Text>
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
          onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={newEvent.address}
          onChangeText={(text) => setNewEvent({ ...newEvent, address: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={newEvent.date}
          onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
        />
        <TouchableOpacity style={styles.createButton}>
          <Icon name="add" size={24} color="#FFF" />
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#FFF',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default Event;
