
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  fetchTasks as apiFetchTasks,
  updateTaskStatus as apiUpdateTaskStatus,
  submitTaskProof as apiSubmitTaskProof,
} from "../Services/viewTaskAPI";
import BottomTab from "../Component/BottomTab/BottomTab";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const TaskCard = ({ task, onStatusUpdate, userRole }) => {
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
      {task.requiresProof && task.status === "Completed" && (
        <View style={styles.proofContainer}>
          <Icon name="check" size={14} color="green" />
          <Text style={styles.proofText}>Proof submitted & verified</Text>
        </View>
      )}
      <View style={styles.actionContainer}>{renderActionButtons()}</View>
    </View>
  );
};

const ProofVerificationModal = ({
  visible,
  taskTitle,
  taskLocation,
  onVerify,
  onCancel,
  isVerifying,
}) => {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraPermission, setCameraPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [step, setStep] = useState(1); // 1: Location Check, 2: Take Photo, 3: Review
  const ALLOWED_DISTANCE = 100;

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const checkLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });

      const [taskLat, taskLon] = taskLocation.split(",").map(Number);
      const dist = calculateDistance(latitude, longitude, taskLat, taskLon);
      setDistance(dist);

      if (dist <= ALLOWED_DISTANCE) {
        setStep(2);
        await requestCameraPermission();
      } else {
        Alert.alert(
          "Location Verification Failed",
          `You are ${dist.toFixed(
            0
          )}m away. You must be within ${ALLOWED_DISTANCE}m to complete this task.`
        );
      }
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "Failed to get your location.");
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setCameraPermission(status === "granted");
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync();
        setPhoto(photoData);
        setStep(3);
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  const handleSubmitProof = async () => {
    if (photo && userLocation && distance !== null) {
      await onVerify({
        photo,
        userLocation,
        distance,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const resetModal = () => {
    setStep(1);
    setPhoto(null);
    setUserLocation(null);
    setDistance(null);
  };

  const handleCancel = () => {
    resetModal();
    onCancel();
  };

  // Step 1: Location Verification
  if (step === 1) {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Step 1: Verify Location</Text>
            <Text style={styles.modalDescription}>
              Let's verify you're at the correct location before taking a photo.
            </Text>

            <View style={styles.infoBox}>
              <Icon name="map-pin" size={20} color="#2ecc71" />
              <Text style={styles.infoText}>Task Location: {taskLocation}</Text>
            </View>

            {userLocation && distance !== null && (
              <View
                style={[
                  styles.statusBox,
                  distance <= ALLOWED_DISTANCE
                    ? styles.successBox
                    : styles.errorBox,
                ]}
              >
                <Text style={styles.statusText}>
                  📍 Distance: {distance.toFixed(0)}m{" "}
                  {distance <= ALLOWED_DISTANCE ? "✓ OK" : "✗ Too Far"}
                </Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={checkLocation}
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Check My Location</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  // Step 2: Take Photo
  if (step === 2 && cameraPermission) {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.cameraHeader}>
            <Text style={styles.cameraTitle}>Take a Photo of the Location</Text>
            <Text style={styles.cameraSubtitle}>
              Show the area to confirm you're at: {taskLocation}
            </Text>
          </View>

          <View style={styles.cameraFooter}>
            <TouchableOpacity
              style={styles.cancelCameraButton}
              onPress={() => setStep(1)}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>
            <View style={{ width: 60 }} />
          </View>
        </CameraView>
      </Modal>
    );
  }

  // Step 3: Review & Submit
  if (step === 3 && photo) {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Step 3: Review Your Proof</Text>

            <View style={styles.photoContainer}>
              <Image source={{ uri: photo.uri }} style={styles.photo} />
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Icon name="map-pin" size={18} color="#2ecc71" />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Location</Text>
                  <Text style={styles.detailValue}>{taskLocation}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Icon name="navigation" size={18} color="#2ecc71" />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Distance from Target</Text>
                  <Text style={styles.detailValue}>{distance.toFixed(0)}m</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Icon name="clock" size={18} color="#2ecc71" />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Time</Text>
                  <Text style={styles.detailValue}>
                    {new Date().toLocaleTimeString()}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Icon name="info" size={18} color="#2ecc71" />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Coordinates</Text>
                  <Text style={styles.detailValue}>
                    {userLocation?.latitude.toFixed(4)},
                    {userLocation?.longitude.toFixed(4)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setStep(2)}
              >
                <Text style={styles.buttonText}>Retake Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitProof}
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Submit Proof</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  return null;
};

const ViewTask = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("user");
  const [activeTab, setActiveTab] = useState("Events");
  const [verificationModal, setVerificationModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

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
      if (newStatus === "Completed") {
        setSelectedTask({ id: taskId });
        setVerificationModal(true);
      } else {
        await performUpdate(taskId, newStatus, null);
      }
    } catch (error) {
      console.log(
        "Error updating task:",
        error?.response?.data || error.message
      );
      Alert.alert("Error", "Failed to update task status.");
    }
  };

  const performUpdate = async (taskId, newStatus, proofData) => {
    try {
      // If proof data exists, submit it to backend
      if (proofData) {
        const formData = new FormData();
        formData.append("taskId", taskId);
        formData.append("status", newStatus);
        formData.append("distance", proofData.distance);
        formData.append("latitude", proofData.userLocation.latitude);
        formData.append("longitude", proofData.userLocation.longitude);
        formData.append("timestamp", proofData.timestamp);
        formData.append("photo", {
          uri: proofData.photo.uri,
          type: "image/jpeg",
          name: `proof_${Date.now()}.jpg`,
        });

        await apiSubmitTaskProof(formData);
      } else {
        await apiUpdateTaskStatus(taskId, newStatus);
      }

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? {
                ...task,
                status: newStatus,
                lastUpdated: new Date().toISOString(),
                requiresProof:
                  newStatus === "Completed" && proofData ? true : false,
              }
            : task
        )
      );

      if (newStatus === "Completed") {
        Alert.alert("Success", "Task marked as completed with proof!");
        setVerificationModal(false);
      }
    } catch (error) {
      console.log(
        "Error updating task:",
        error?.response?.data || error.message
      );
      Alert.alert("Error", "Failed to update task status.");
    }
  };

  const handleProofSubmitted = async (proofData) => {
    if (selectedTask) {
      setIsVerifying(true);
      await performUpdate(selectedTask.id, "Completed", proofData);
      setIsVerifying(false);
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
        navigation.navigate("Setting");
        break;
      default:
        break;
    }
  };

  const bottomTabs = [
    { id: "Home", title: "Home", icon: "home" },
    { id: "Events", title: "Events", icon: "event" },
    { id: "Community", title: "Community", icon: "people" },
    { id: "Discuss", title: "Notification", icon: "notifications" },
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

  const currentTask = tasks.find((t) => t._id === selectedTask?.id);

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
          name="chevron-back"
          size={24}
          color="black"
          style={{ marginRight: 5 }}
        />
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
            <TaskCard
              task={item}
              onStatusUpdate={updateTaskStatus}
              userRole={userRole}
            />
          )}
          contentContainerStyle={{ paddingBottom: 90 }}
        />
      )}

      <ProofVerificationModal
        visible={verificationModal}
        taskTitle={currentTask?.title}
        taskLocation={currentTask?.location}
        onVerify={handleProofSubmitted}
        onCancel={() => {
          setVerificationModal(false);
          setSelectedTask(null);
        }}
        isVerifying={isVerifying}
      />

      <BottomTab
        tabs={bottomTabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
        activeColor="#999"
        iconComponent={MaterialIcons}
      />
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
  proofContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#e8f5e9",
    borderRadius: 5,
  },
  proofText: {
    marginLeft: 5,
    color: "green",
    fontSize: 12,
    fontWeight: "500",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    lineHeight: 20,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 12,
    color: "#333",
    flex: 1,
  },
  statusBox: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  successBox: {
    backgroundColor: "#e8f5e9",
    borderLeftWidth: 4,
    borderLeftColor: "#4caf50",
  },
  errorBox: {
    backgroundColor: "#ffebee",
    borderLeftWidth: 4,
    borderLeftColor: "#f44336",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#2ecc71",
    alignItems: "center",
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#27ae60",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 14,
    color: "white",
  },
  camera: {
    flex: 1,
  },
  cameraHeader: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  cameraTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  cameraSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  cameraFooter: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
    flexDirection: "row",
  },
  cancelCameraButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureInner: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "white",
  },
  photoContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  detailContent: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});

export default ViewTask;