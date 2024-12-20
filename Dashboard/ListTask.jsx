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

const ListTask = () => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Task 1", description: "Description for Task 1" },
    { id: "2", title: "Task 2", description: "Description for Task 2" },
  ]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const addTask = () => {
    if (newTask.title && newTask.description) {
      setTasks([...tasks, { id: `${tasks.length + 1}`, ...newTask }]);
      setNewTask({ title: "", description: "" });
    } else {
      Alert.alert(
        "Error",
        "Please provide both title and description for the task."
      );
    }
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Tasks</Text>
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
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Icon name="add" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.taskList}
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
  taskList: {
    marginTop: 16,
  },
  taskCard: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
});

export default ListTask;
