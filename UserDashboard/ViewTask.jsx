
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  fetchTasks as apiFetchTasks,
  updateTaskStatus as apiUpdateTaskStatus,
} from "../Services/viewTaskAPI";

const TaskCard = ({ task, onStatusUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "In Progress":
        return "orange";
      case "Pending":
        return "red";
      default:
        return "gray";
    }
  };

  const renderActionButtons = () => {
    switch (task.status) {
      case "Pending":
        return (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#f39c12" }]}
            onPress={() => onStatusUpdate(task._id, "In Progress")}
          >
            <Text style={styles.actionButtonText}>Start Task</Text>
          </TouchableOpacity>
        );
      case "In Progress":
        return (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#2ecc71" }]}
            onPress={() => onStatusUpdate(task._id, "Completed")}
          >
            <Text style={styles.actionButtonText}>Mark Complete</Text>
          </TouchableOpacity>
        );
      case "Completed":
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
      {task.lastUpdated && (
        <Text style={styles.lastUpdated}>
          Last updated: {new Date(task.lastUpdated).toLocaleString()}
        </Text>
      )}
      <View style={styles.actionContainer}>{renderActionButtons()}</View>
    </View>
  );
};

const ViewTask = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("user");
  const [activeTab, setActiveTab] = useState("Events");

   const fetchTasks = async () => {
     try {
       setLoading(true);

       const data = await apiFetchTasks();
       setTasks(Array.isArray(data) ? data : []);

       const userInfo = await AsyncStorage.getItem("userInfo");
       if (userInfo) {
         const { role } = JSON.parse(userInfo);
         setUserRole(role || "user");
       }
     } catch (error) {
       console.log(
         "Error fetching tasks:",
         error?.response?.data || error.message
       );
       setError("Failed to load tasks. Please try again.");
     } finally {
       setLoading(false);
     }
   };


   const updateTaskStatus = async (taskId, newStatus) => {
     try {
       const performUpdate = async () => {
         await apiUpdateTaskStatus(taskId, newStatus);
         setTasks((prev) =>
           prev.map((task) =>
             task._id === taskId
               ? {
                   ...task,
                   status: newStatus,
                   lastUpdated: new Date().toISOString(),
                 }
               : task
           )
         );
       };

       if (newStatus === "Completed") {
         Alert.alert(
           "Complete Task",
           "Are you sure you want to mark this task as completed?",
           [
             { text: "Cancel", style: "cancel" },
             {
               text: "Yes",
               onPress: async () => {
                 await performUpdate();
                 Alert.alert("Success", "Task marked as completed!");
               },
             },
           ]
         );
       } else {
         await performUpdate();
       }
     } catch (error) {
       console.log(
         "Error updating task:",
         error?.response?.data || error.message
       );
       Alert.alert("Error", "Failed to update task status.");
     }
   };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case "Home":
        navigation.navigate("user");
        break;
      case "Events":
        navigation.navigate("ViewEvent");
        break;
      case "Community":
        navigation.navigate("joinEvent");
        break;
      case "Discuss":
        navigation.navigate("view");
        break;
      case "Settings":
        navigation.navigate("Profile");
        break;
      default:
        break;
    }
  };

  const bottomTabs = [
    { id: "Home", title: "Home", icon: "home" },
    { id: "Events", title: "Events", icon: "calendar" },
    { id: "Community", title: "Community", icon: "users" },
    { id: "Discuss", title: "Notification", icon: "bell" },
    { id: "Settings", title: "Settings", icon: "settings" },
  ];

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
          contentContainerStyle={{ paddingBottom: 90 }} // space for bottom tab
        />
      )}

      {/* Bottom Tabs */}
      <View style={styles.bottomTabContainer}>
        {bottomTabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(tab.id)}
          >
            <Icon
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? "#4CAF50" : "#999"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: "3%",
  },
  taskCard: {
    margin: 10,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "#6e6e6e",
    marginTop: 5,
  },
  taskDetail: {
    fontSize: 12,
    marginTop: 4,
    color: "#6e6e6e",
  },
  taskStatus: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  lastUpdated: {
    fontSize: 11,
    fontStyle: "italic",
    color: "#888",
    marginTop: 4,
  },
  actionContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  completedWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedText: {
    marginLeft: 5,
    color: "green",
    fontSize: 12,
    fontWeight: "500",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  noTasksText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#6e6e6e",
  },
  bottomTabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 8,
  },
  tabText: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
});

export default ViewTask;
