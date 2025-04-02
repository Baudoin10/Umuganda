

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const Notification = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const handleCreateNotification = () => {
    if (title && description && time) {
      // In a real app, you would send this data to the server or store it in the database
      Alert.alert("Notification Created", `Title: ${title}\nDescription: ${description}\nTime: ${time}`);
      // Clear the input fields after creating the notification
      setTitle("");
      setDescription("");
      setTime("");
    } else {
      Alert.alert("Error", "Please fill out all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Notification</Text>

      <TextInput
        style={styles.input}
        placeholder="Notification Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Notification Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />
      
      <TextInput
        style={styles.input}
        placeholder="Time (e.g., 2 days ago)"
        value={time}
        onChangeText={(text) => setTime(text)}
      />
      
      <TouchableOpacity style={styles.createButton}>
  <Text style={styles.createButtonText}>Create Notification</Text>
</TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },


  createButton: {
    backgroundColor: "#007BFF", 
    paddingVertical: 12,        
    paddingHorizontal: 20,      
    borderRadius: 5,           
    alignItems: "center",       
    marginTop: 20,              
  },
  createButtonText: {
    color: "#FFF",              
    fontSize: 16,              
    fontWeight: "bold",       
  },
});

export default Notification;
