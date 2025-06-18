  
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ListTask = () => {
  const navigation = useNavigation();
  const ip = import.meta.env.VITE_IP;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`http://${ip}:3000/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => {
          if (filter === "pending") return task.status === "Pending";
          if (filter === "inProgress") return task.status === "In Progress";
          if (filter === "completed") return task.status === "Completed";
          return true;
        });

  const getStatusStyle = (status) => {
    if (status === "Pending") return styles.statusPending;
    if (status === "In Progress") return styles.statusInProgress;
    if (status === "Completed") return styles.statusCompleted;
    return styles.statusDefault;
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Dashboard")}
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
      <Text style={styles.title}>Task Management</Text>

      {/* Filters */}
      <View style={styles.filterRow}>
        {["all", "pending", "inProgress", "completed"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.activeFilter]}
            onPress={() => setFilter(f)}
          >
            <Text style={filter === f ? styles.activeText : styles.defaultText}>
              {f === "inProgress"
                ? "In Progress"
                : f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <SummaryBox title="Total Tasks" count={tasks.length} />
        <SummaryBox
          title="Pending"
          count={tasks.filter((t) => t.status === "Pending").length}
        />
        <SummaryBox
          title="In Progress"
          count={tasks.filter((t) => t.status === "In Progress").length}
        />
        <SummaryBox
          title="Completed"
          count={tasks.filter((t) => t.status === "Completed").length}
        />
      </View>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <View key={task._id} style={styles.taskCard}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskDesc}>{task.description}</Text>
            <Text style={styles.taskInfo}>Location: {task.location}</Text>
            <Text style={styles.taskInfo}>Date: {task.date}</Text>
            <Text style={[styles.statusBadge, getStatusStyle(task.status)]}>
              {task.status}
            </Text>
            <Text style={styles.taskInfo}>
              Assigned To:{" "}
              {task.assignedTo?.name ||
                `User ID: ${task.assignedTo || "Unassigned"}`}
            </Text>
            <Text style={styles.taskInfo}>
              Last Updated:{" "}
              {task.lastUpdated
                ? new Date(task.lastUpdated).toLocaleString()
                : "Not updated"}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noTasksText}>
          No tasks found matching the selected filter
        </Text>
      )}

      {/* Completed Task Details */}
      {filter === "completed" && filteredTasks.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Completed Task Details</Text>
          {filteredTasks.map((task) => (
            <View key={`detail-${task._id}`} style={styles.completedCard}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDesc}>{task.description}</Text>
              <Text style={styles.taskInfo}>Location: {task.location}</Text>
              <Text style={styles.taskInfo}>
                Completed by:{" "}
                {task.assignedTo?.name || `User ID: ${task.assignedTo}`}
              </Text>
              <Text style={styles.taskInfo}>
                Completed on:{" "}
                {task.lastUpdated
                  ? new Date(task.lastUpdated).toLocaleString()
                  : "Unknown"}
              </Text>

              {task.photo && (
                <Image source={{ uri: task.photo }} style={styles.image} />
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const SummaryBox = ({ title, count }) => (
  <View style={styles.summaryBox}>
    <Text style={styles.summaryTitle}>{title}</Text>
    <Text style={styles.summaryCount}>{count}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    // marginTop: '20%'
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
    margin: 4,
  },
  activeFilter: {
    backgroundColor: "#3b82f6",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  defaultText: {
    color: "#111",
  },
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryTitle: {
    color: "#6b7280",
    fontSize: 12,
  },
  summaryCount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDesc: {
    color: "#6b7280",
  },
  taskInfo: {
    fontSize: 12,
    color: "#4b5563",
    marginTop: 2,
  },
  noTasksText: {
    textAlign: "center",
    marginTop: 16,
    color: "#6b7280",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  completedCard: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 10,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  statusPending: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
  },
  statusInProgress: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  statusCompleted: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
  statusDefault: {
    backgroundColor: "#e5e7eb",
    color: "#374151",
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default ListTask;
