import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const Task = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Clean Kimironko Market Area",
      description: "Sweep and collect garbage in the market area.",
      status: "Pending",
    },
    {
      id: "2",
      title: "Plant Trees at Kicukiro Park",
      description: "Help plant 10 trees in the designated area.",
      status: "In Progress",
    },
    {
      id: "3",
      title: "Paint Community Hall Walls",
      description: "Assist in painting the walls of the community hall.",
      status: "Completed",
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Assigned Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskStatus}>
              Status: <Text style={styles.statusText}>{item.status}</Text>
            </Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.detailsButton]}
                onPress={() => alert(`Details for: ${item.title}`)}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
              {item.status === "Pending" && (
                <TouchableOpacity
                  style={[styles.button, styles.completeButton]}
                  onPress={() => alert(`Task Completed: ${item.title}`)}
                >
                  <Text style={styles.buttonText}>Mark as Completed</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  taskStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statusText: {
    color: "#007BFF",
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  detailsButton: {
    backgroundColor: "#007BFF",
  },
  completeButton: {
    backgroundColor: "#28A745",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#FF5733",
    borderRadius: 10,
    alignSelf: "center",
    width: "60%",
  },
  backButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Task;
