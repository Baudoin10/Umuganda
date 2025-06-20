
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { IP } from "@env";

// const EditProfile = () => {
//   const navigation = useNavigation();
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(true);
//   const ip = IP;

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userId = await AsyncStorage.getItem("userId");
//         const token = await AsyncStorage.getItem("token");

//         console.log("EditProfile - Retrieved userId:", userId);
//         console.log(
//           "EditProfile - Retrieved token:",
//           token ? "exists" : "not found"
//         );

//         if (!userId) {
//           console.error("No userId found in AsyncStorage");
//           Alert.alert("Error", "User ID not found. Please login again.");
//           return;
//         }

//         if (!token) {
//           console.error("No token found in AsyncStorage");
//           Alert.alert(
//             "Error",
//             "Authentication token not found. Please login again."
//           );
//           return;
//         }

//         const res = await axios.get(`http://${ip}:3000/api/users/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("EditProfile - User data received:", res.data);

//         // Set the form fields with the fetched data
//         setFirstName(res.data.firstname || "");
//         setLastName(res.data.lastname || "");
//         setEmail(res.data.email || "");
//       } catch (err) {
//         console.error("EditProfile - Failed to load user:", err);

//         Alert.alert(
//           "Error",
//           "Failed to load user data. Please check your connection and try again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [ip]);

//   const handleSave = async () => {
//     try {
//       // Basic validation
//       if (!firstName.trim() || !lastName.trim() || !email.trim()) {
//         Alert.alert("Error", "Please fill in all fields.");
//         return;
//       }

//       const userId = await AsyncStorage.getItem("userId");
//       const token = await AsyncStorage.getItem("token");

//       if (!token) {
//         Alert.alert(
//           "Error",
//           "Authentication token not found. Please login again."
//         );
//         return;
//       }

//       console.log("EditProfile - Updating user with data:", {
//         firstname: firstName,
//         lastname: lastName,
//         email,
//       });

//       const response = await axios.put(
//         `http://${ip}:3000/api/users/${userId}`,
//         {
//           firstname: firstName.trim(),
//           lastname: lastName.trim(),
//           email: email.trim(),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("EditProfile - Update response:", response.data);

//       Alert.alert("Success", "Profile updated successfully!", [
//         {
//           text: "OK",
//           onPress: () => navigation.goBack(),
//         },
//       ]);
//     } catch (error) {
//       console.error("EditProfile - Error updating profile:", error);
//       console.error("EditProfile - Error response:", error.response?.data);
//       console.error("EditProfile - Error status:", error.response?.status);

//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Failed to update profile. Please try again.";

//       Alert.alert("Error", errorMessage);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.centered]}>
//         <Text style={styles.loadingText}>Loading profile data...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Edit your Profile</Text>
//       <Text style={styles.share}>
//         Please don't share this information with anyone else. Keep it for
//         yourself.
//       </Text>

//       <TextInput
//         style={styles.input}
//         value={firstName}
//         onChangeText={setFirstName}
//         placeholder="First Name"
//         autoCapitalize="words"
//       />

//       <TextInput
//         style={styles.input}
//         value={lastName}
//         onChangeText={setLastName}
//         placeholder="Last Name"
//         autoCapitalize="words"
//       />

//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Email"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         autoCorrect={false}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSave}>
//         <Text style={styles.buttonText}>Save Changes</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#FFF",
//   },
//   centered: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     marginTop: "20%",
//   },
//   share: {
//     marginBottom: 25,
//     fontSize: 14,
//     color: "#555",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#CCC",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#FFF",
//     textAlign: "center",
//     fontSize: 16,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: "#555",
//   },
// });

// export default EditProfile;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from "@env";

const EditProfile = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const ip = IP;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");

        if (!userId) {
          Alert.alert("Error", "User ID not found. Please login again.");
          return;
        }

        if (!token) {
          Alert.alert(
            "Error",
            "Authentication token not found. Please login again."
          );
          return;
        }

        const res = await axios.get(`http://${ip}:3000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFirstName(res.data.firstname || "");
        setLastName(res.data.lastname || "");
        setEmail(res.data.email || "");
      } catch (err) {
        Alert.alert(
          "Error",
          "Failed to load user data. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [ip]);

  const handleSave = async () => {
    try {
      // Basic validation
      if (!firstName.trim() || !lastName.trim() || !email.trim()) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert(
          "Error",
          "Authentication token not found. Please login again."
        );
        return;
      }

      const response = await axios.put(
        `http://${ip}:3000/api/users/${userId}`,
        {
          firstname: firstName.trim(),
          lastname: lastName.trim(),
          email: email.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Success", "Profile updated successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update profile. Please try again.";

      Alert.alert("Error", errorMessage);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading profile data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>Edit Your Profile</Text>
        <Text style={styles.share}>
          Please don't share this information with anyone else. Keep it for
          yourself.
        </Text>

        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          autoCapitalize="words"
          placeholderTextColor="#b1b5c9"
        />

        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          autoCapitalize="words"
          placeholderTextColor="#b1b5c9"
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#b1b5c9"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f6fb",
    padding: 20,
    justifyContent: "center",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 28,
    shadowColor: "#2d3142",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 2,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222e4c",
    marginBottom: 10,
    letterSpacing: 0.2,
    textAlign: "center",
    marginTop: 8,
  },
  share: {
    marginBottom: 22,
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  input: {
    backgroundColor: "#f4f6fa",
    borderWidth: 1,
    borderColor: "#e3e7ed",
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    fontSize: 16,
    color: "#222e4c",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: "#4f8cff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.4,
  },
  loadingText: {
    fontSize: 16,
    color: "#4f8cff",
    fontWeight: "500",
  },
});

export default EditProfile;