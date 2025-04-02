

import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ListTask = () => {
  const [newTask, setNewTask] = useState({ title: "", description: "", location: "", date: "", timeSpent: "" });

  const createTask = () => {
    if (newTask.title && newTask.description && newTask.location && newTask.date && newTask.timeSpent) {
      setNewTask({ title: "", description: "", location: "", date: "", timeSpent: "" });
    } else {
      Alert.alert("Error", "Please provide all fields for the task.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Task</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={newTask.title}
          onChangeText={(text) => setNewTask({ ...newTask, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Task Description"
          value={newTask.description}
          onChangeText={(text) => setNewTask({ ...newTask, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Task Location"
          value={newTask.location}
          onChangeText={(text) => setNewTask({ ...newTask, location: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Task Date"
          value={newTask.date}
          onChangeText={(text) => setNewTask({ ...newTask, date: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Time Spent"
          value={newTask.timeSpent}
          onChangeText={(text) => setNewTask({ ...newTask, timeSpent: text })}
        />

        <TouchableOpacity style={styles.addButton} onPress={createTask}>
          <Icon name="add" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
       
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
});

export default ListTask;
