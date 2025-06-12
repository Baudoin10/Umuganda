
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const TaskCard = ({ task, onStatusUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'green';
      case 'In Progress': return 'orange';
      case 'Pending': return 'red';
      default: return 'gray';
    }
  };
  
  const renderActionButtons = () => {
    switch (task.status) {
      case 'Pending':
        return (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#f39c12' }]}
            onPress={() => onStatusUpdate(task._id, 'In Progress')}
          >
            <Text style={styles.actionButtonText}>Start Task</Text>
          </TouchableOpacity>
        );
      case 'In Progress':
        return (
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#2ecc71' }]}
            onPress={() => onStatusUpdate(task._id, 'Completed')}
          >
            <Text style={styles.actionButtonText}>Mark Complete</Text>
          </TouchableOpacity>
        );
      case 'Completed':
        return (
          <View style={styles.completedWrapper}>
            <Icon name="check-circle" size={16} color="green" />
            <Text style={styles.completedText}>Completed</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.taskDescription}>{task.description}</Text>
      <Text style={styles.taskDetail}>Location: {task.location}</Text>
      <Text style={styles.taskDetail}>Date: {task.date}</Text>
      <Text style={[styles.taskStatus, { color: getStatusColor(task.status) }]}>
        Status: {task.status}
      </Text>
      
      {/* Last status update info for admin tracking */}
      {task.lastUpdated && (
        <Text style={styles.lastUpdated}>
          Last updated: {new Date(task.lastUpdated).toLocaleString()}
        </Text>
      )}
      
      {/* Action buttons section */}
      <View style={styles.actionContainer}>
        {renderActionButtons()}
      </View>
    </View>
  );
};

// Main component for the View Task page
const ViewTask = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('user'); // 'user' or 'admin'

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(" 192.168.50.129/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
      
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        const { role } = JSON.parse(userInfo);
        setUserRole(role || 'user');
      }
      
      setLoading(false);
    } catch (error) {
      console.log("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again.");
      setLoading(false);
    }
  };

  // Function to update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const token = await AsyncStorage.getItem("token");
      
      // Add confirmation for completing tasks
      if (newStatus === 'Completed') {
        Alert.alert(
          "Complete Task",
          "Are you sure you want to mark this task as completed?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { 
              text: "Yes", 
              onPress: async () => {
                // Update task status
                await axios.put(
                  ` 192.168.50.129/api/tasks/${taskId}`,
                  {
                    status: newStatus,
                    lastUpdated: new Date().toISOString(),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                
                // Update local state
                setTasks(prev => 
                  prev.map(task => 
                    task._id === taskId 
                      ? { ...task, status: newStatus, lastUpdated: new Date().toISOString() } 
                      : task
                  )
                );

                // Show success message
                Alert.alert("Success", "Task marked as completed!");
              } 
            }
          ]
        );
      } else {
        // For other status updates that don't need confirmation
        await axios.put(
          ` 192.168.50.129/api/tasks/${taskId}`,
          {
            status: newStatus,
            lastUpdated: new Date().toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Update local state
        setTasks(prev => 
          prev.map(task => 
            task._id === taskId 
              ? { ...task, status: newStatus, lastUpdated: new Date().toISOString() } 
              : task
          )
        );
      }
    } catch (error) {
      console.log("Error updating task:", error);
      Alert.alert("Error", "Failed to update task status.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
          name="arrow-back"
          size={24}
          color="black"
          style={{ marginRight: 5 }}
        />
        <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>
        {userRole === "admin" ? "All Tasks" : "Your Tasks"}
      </Text>
      {tasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks available</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TaskCard task={item} onStatusUpdate={updateTaskStatus} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: '3%'
  },
  taskCard: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#6e6e6e',
    marginTop: 5,
  },
  taskDetail: {
    fontSize: 12,
    marginTop: 4,
    color: '#6e6e6e',
  },
  taskStatus: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  lastUpdated: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#888',
    marginTop: 4,
  },
  actionContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
  },
  completedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    marginLeft: 5,
    color: 'green',
    fontSize: 12,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6e6e6e',
  },
});

export default ViewTask;
