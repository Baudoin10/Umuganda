import React from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';

const EventForm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Title"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
      />
      <TextInput
        style={styles.input}
        placeholder="Day"
      />
      <TextInput
        style={styles.input}
        placeholder="Month"
      />

     
<TouchableOpacity style={styles.submitButton} onPress={() => {}}>
  <Text style={styles.submitButtonText}>Submit</Text>
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  submitButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EventForm;
