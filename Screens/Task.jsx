

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
// } from "react-native";

// const Task = ({ navigation }) => {
//   const [tasks, setTasks] = useState([
//     {
//       id: "1",
//       title: "Clean Kimironko Market Area",
//       description: "Sweep and collect garbage in the market area.",
//       status: "Pending",
//     },
//     {
//       id: "2",
//       title: "Plant Trees at Kicukiro Park",
//       description: "Help plant 10 trees in the designated area.",
//       status: "In Progress",
//     },
//     {
//       id: "3",
//       title: "Paint Community Hall Walls",
//       description: "Assist in painting the walls of the community hall.",
//       status: "Completed",
//     },
//   ]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending":
//         return "#FF9800";
//       case "In Progress":
//         return "#2196F3";
//       case "Completed":
//         return "#4CAF50";
//       default:
//         return "#666";
//     }
//   };

//   const renderTask = ({ item }) => (
//     <View style={styles.taskCard}>
//       <View style={styles.taskHeader}>
//         <View style={styles.taskTitleContainer}>
//           <Text style={styles.taskTitle}>{item.title}</Text>
//           <View 
//             style={[
//               styles.statusBadge, 
//               { backgroundColor: getStatusColor(item.status) }
//             ]}
//           >
//             <Text style={styles.statusText}>{item.status}</Text>
//           </View>
//         </View>
//       </View>
      
//       <Text style={styles.taskDescription}>{item.description}</Text>
      
//       <View style={styles.buttonGroup}>
//         <TouchableOpacity
//           style={styles.detailsButton}
//           onPress={() => alert(`Details for: ${item.title}`)}
//         >
//           <Text style={styles.detailsButtonText}>View Details</Text>
//         </TouchableOpacity>
        
//         {item.status === "Pending" && (
//           <TouchableOpacity
//             style={styles.completeButton}
//             onPress={() => alert(`Task Completed: ${item.title}`)}
//           >
//             <Text style={styles.completeButtonText}>Mark as Completed</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Your Tasks</Text>
//         <Text style={styles.subHeaderText}>Manage your assigned activities</Text>
//       </View>

//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         renderItem={renderTask}
//         contentContainerStyle={styles.taskList}
//         showsVerticalScrollIndicator={false}
//       />

//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.navigate("Home")}
//       >
//         <Text style={styles.backButtonText}>Back to Home</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   header: {
//     padding: 20,
//     paddingBottom: 10,
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 4,
//   },
//   subHeaderText: {
//     fontSize: 16,
//     color: "#666",
//   },
//   taskList: {
//     padding: 20,
//     paddingTop: 10,
//   },
//   taskCard: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   taskHeader: {
//     marginBottom: 12,
//   },
//   taskTitleContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   taskTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#333",
//     flex: 1,
//     marginRight: 12,
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   statusText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   taskDescription: {
//     fontSize: 14,
//     color: "#666",
//     lineHeight: 20,
//     marginBottom: 16,
//   },
//   buttonGroup: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   detailsButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: "#f0f0f0",
//   },
//   detailsButtonText: {
//     color: "#333",
//     fontWeight: "600",
//     fontSize: 14,
//     textAlign: "center",
//   },
//   completeButton: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: "#4CAF50",
//   },
//   completeButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 14,
//     textAlign: "center",
//   },
//   backButton: {
//     margin: 20,
//     paddingVertical: 16,
//     backgroundColor: "#2196F3",
//     borderRadius: 12,
//     shadowColor: "#2196F3",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   backButtonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//     fontSize: 16,
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
