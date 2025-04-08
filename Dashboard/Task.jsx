
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import * as Location from "expo-location";
// import MapView, { Marker } from "react-native-maps";
// import Icon from "react-native-vector-icons/MaterialIcons";

// const Task = () => {
//   const [photo, setPhoto] = useState(null);
//   const [taskDetails, setTaskDetails] = useState("");
//   const [address, setAddress] = useState("");
//   const [location, setLocation] = useState({
//     latitude: 0,
//     longitude: 0,
//   });

//   // Request camera and location permissions
//   useEffect(() => {
//     const requestPermissions = async () => {
//       const cameraPermission =
//         await ImagePicker.requestCameraPermissionsAsync();
//       const locationPermission =
//         await Location.requestForegroundPermissionsAsync();

//       if (!cameraPermission.granted) {
//         alert("Camera permission is required to take photos.");
//       }

//       if (!locationPermission.granted) {
//         alert("Location permission is required to get the current location.");
//       }
//     };

//     requestPermissions();
//   }, []);

//   // Handle taking a picture
//   const handleTakePicture = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaType: ImagePicker.MediaTypeOptions.Images,
//     });

//     if (!result.cancelled) {
//       setPhoto(result.uri);
//       if (result.location) {
//         setLocation(result.location);
//       }
//     }
//   };

//   // Handle task submission
//   const handleSubmitTask = () => {
//     if (!photo || !taskDetails || !address) {
//       alert("Please fill all fields and take a picture");
//       return;
//     }

//     console.log({
//       photo,
//       taskDetails,
//       address,
//       location,
//     });

//     alert("Task submitted successfully!");
//     // Reset fields after submission
//     setPhoto(null);
//     setTaskDetails("");
//     setAddress("");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Task</Text>

//       {/* Button to take a picture */}
//       <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
//         <Text style={styles.buttonText}>Take Picture</Text>
//       </TouchableOpacity>

//       {/* Display captured image */}
//       {photo && <Image source={{ uri: photo }} style={styles.image} />}

//       {/* Map showing the user's location */}
//       {location.latitude !== 0 && (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker coordinate={location} />
//         </MapView>
//       )}

//       {/* Input fields for task details and address */}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Title"
//         value={taskDetails}
//         onChangeText={setTaskDetails}
//       />

// <TextInput
//         style={styles.input}
//         placeholder="description"
//         value={taskDetails}
//         onChangeText={setTaskDetails}
//       />


//       <TextInput
//         style={styles.input}
//         placeholder="Enter Address"
//         value={address}
//         onChangeText={setAddress}
//       />


// <TextInput
//         style={styles.input}
//         placeholder="Time spent"
//         value={taskDetails}
//         onChangeText={setTaskDetails}
//       />

//       {/* Submit button */}
//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmitTask}>
//       <Icon name="add" size={24} color="#FFF" />
//         <Text style={styles.submitButtonText}>Create a task</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f9f9f9",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   button: {
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   map: {
//     width: "100%",
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 20,
//     backgroundColor: "#fff",
//   },
//   submitButton: {
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   submitButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default Task;


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
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";

const Task = () => {
  const [photo, setPhoto] = useState(null);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    timeSpent: "",
  });
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  // Request permissions
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

  // Take a picture
  const handleTakePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
      if (result.location) {
        setLocation(result.location);
      }
    }
  };

  // Submit task
  const handleSubmitTask = async () => {
    const { title, description, timeSpent } = taskDetails;

    if (!photo || !title || !description || !timeSpent || !address) {
      Toast.show({
        type: "error",
        text1: "Please fill all fields and take a picture",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photo,
          title,
          description,
          timeSpent,
          address,
          location,
        }),
      });

      if (response.ok) {
        Toast.show({ type: "success", text1: "Task submitted successfully!" });
        setPhoto(null);
        setTaskDetails({ title: "", description: "", timeSpent: "" });
        setAddress("");
      } else {
        Toast.show({ type: "error", text1: "Failed to submit task" });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Task</Text>

      <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
        <Text style={styles.buttonText}>Take Picture</Text>
      </TouchableOpacity>

      {photo && <Image source={{ uri: photo }} style={styles.image} />}

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

      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={taskDetails.title}
        onChangeText={(text) =>
          setTaskDetails({ ...taskDetails, title: text })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={taskDetails.description}
        onChangeText={(text) =>
          setTaskDetails({ ...taskDetails, description: text })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Time Spent"
        value={taskDetails.timeSpent}
        onChangeText={(text) =>
          setTaskDetails({ ...taskDetails, timeSpent: text })
        }
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitTask}>
        <Icon name="add" size={24} color="#FFF" />
        <Text style={styles.submitButtonText}>Create a task</Text>
      </TouchableOpacity>

      {/* Toast Container right under button like you said */}
      <Toast />
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
    backgroundColor: "#4CAF50",
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
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default Task;
