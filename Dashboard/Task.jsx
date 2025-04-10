

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";

const Task = () => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    status: "Pending",
  });

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const locationPermission = await Location.requestForegroundPermissionsAsync();

      if (!cameraPermission.granted) {
        Toast.show({ type: "error", text1: "Camera permission is required." });
      }

      if (!locationPermission.granted) {
        Toast.show({ type: "error", text1: "Location permission is required." });
      }
    };

    requestPermissions();
  }, []);

  const handleTakePicture = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setPhoto(result.assets[0].uri);

        const currentLocation = await Location.getCurrentPositionAsync({});
        setTaskDetails({
          ...taskDetails,
          location: JSON.stringify({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          }),
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error taking picture",
        text2: error.message,
      });
    }
  };

  const handleSubmitTask = async () => {
    if (!photo || !taskDetails.title || !taskDetails.description || !taskDetails.date) {
      Toast.show({
        type: "error",
        text1: "Please fill all fields and take a picture",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = {
        title: taskDetails.title,
        description: taskDetails.description,
        date: taskDetails.date,
        location: taskDetails.location,
        status: taskDetails.status,
        photo: photo,
      };

      const response = await fetch("http://192.168.1.39:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Toast.show({ type: "success", text1: "Task created successfully!" });
        setPhoto(null);
        setTaskDetails({
          title: "",
          description: "",
          date: "",
          location: "",
          status: "Pending",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to create task",
          text2: result.message || "Please try again",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Network error",
        text2: "Please check your connection",
      });
    } finally {
      setLoading(false);
    }
  };

  const mapLocation = taskDetails.location ? JSON.parse(taskDetails.location) : null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Create Umuganda Task</Text>

            <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
              <Icon name="camera-alt" size={20} color="#FFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Take Picture of Location</Text>
            </TouchableOpacity>

            {photo && <Image source={{ uri: photo }} style={styles.image} />}

            {mapLocation && (
              <View style={{ height: 180, marginBottom: 16 }}>
                <MapView
                  style={{ flex: 1, borderRadius: 8 }}
                  initialRegion={{
                    latitude: mapLocation.latitude,
                    longitude: mapLocation.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                >
                  <Marker coordinate={mapLocation} />
                </MapView>
              </View>
            )}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Task Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter task title"
                value={taskDetails.title}
                onChangeText={(text) => setTaskDetails({ ...taskDetails, title: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the task"
                value={taskDetails.description}
                onChangeText={(text) =>
                  setTaskDetails({ ...taskDetails, description: text })
                }
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
              <TextInput
                style={styles.input}
                placeholder="When will this task take place?"
                value={taskDetails.date}
                onChangeText={(text) => setTaskDetails({ ...taskDetails, date: text })}
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, loading ? styles.disabledButton : null]}
              onPress={handleSubmitTask}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" size="small" />
              ) : (
                <>
                  <Icon name="add-task" size={24} color="#FFF" />
                  <Text style={styles.submitButtonText}>Create Task</Text>
                </>
              )}
            </TouchableOpacity>
            
            <Toast />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  map: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#A0D8A3",
  },
  submitButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Task;