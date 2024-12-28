

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const Task = () => {
  const [photo, setPhoto] = useState(null);
  const [taskDetails, setTaskDetails] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  // Request camera and location permissions
  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const locationPermission =
        await Location.requestForegroundPermissionsAsync();

      if (!cameraPermission.granted) {
        alert("Camera permission is required to take photos.");
      }

      if (!locationPermission.granted) {
        alert("Location permission is required to get the current location.");
      }
    };

    requestPermissions();
  }, []);

  // Handle taking a picture
  const handleTakePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);

      // Get the location if the picture was successfully taken
      if (result.location) {
        setLocation(result.location);
      }
    }
  };

  // Handle task submission
  const handleSubmitTask = () => {
    if (!photo || !taskDetails || !address) {
      alert("Please fill all fields and take a picture");
      return;
    }

    console.log({
      photo,
      taskDetails,
      address,
      location,
    });

    alert("Task submitted successfully!");
    // Reset fields after submission
    setPhoto(null);
    setTaskDetails("");
    setAddress("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Task</Text>

      {/* Button to take a picture */}
      <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>

      {/* Display captured image */}
      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      {/* Map showing the user's location */}
      {location.latitude !== 0 && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={location} />
        </MapView>
      )}

      {/* Input fields for task details and address */}
      <TextInput
        style={styles.input}
        placeholder="Enter Task Details"
        value={taskDetails}
        onChangeText={setTaskDetails}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitTask}>
        <Text style={styles.submitButtonText}>Submit Task</Text>
      </TouchableOpacity>
    </View>
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
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
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
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#03dac6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Task;
