
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

//         if (!userId) {
//           Alert.alert("Error", "User ID not found. Please login again.");
//           return;
//         }

//         if (!token) {
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

//         setFirstName(res.data.firstname || "");
//         setLastName(res.data.lastname || "");
//         setEmail(res.data.email || "");
//       } catch (err) {
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

//       Alert.alert("Success", "Profile updated successfully!", [
//         {
//           text: "OK",
//           onPress: () => navigation.goBack(),
//         },
//       ]);
//     } catch (error) {
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
//       <View style={styles.formCard}>
//         <Text style={styles.title}>Edit Your Profile</Text>
//         <Text style={styles.share}>
//           Please don't share this information with anyone else. Keep it for
//           yourself.
//         </Text>

//         <TextInput
//           style={styles.input}
//           value={firstName}
//           onChangeText={setFirstName}
//           placeholder="First Name"
//           autoCapitalize="words"
//           placeholderTextColor="#b1b5c9"
//         />

//         <TextInput
//           style={styles.input}
//           value={lastName}
//           onChangeText={setLastName}
//           placeholder="Last Name"
//           autoCapitalize="words"
//           placeholderTextColor="#b1b5c9"
//         />

//         <TextInput
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//           placeholder="Email"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           autoCorrect={false}
//           placeholderTextColor="#b1b5c9"
//         />

//         <TouchableOpacity style={styles.button} onPress={handleSave}>
//           <Text style={styles.buttonText}>Save Changes</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f1f6fb",
//     padding: 20,
//     justifyContent: "center",
//   },
//   formCard: {
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     padding: 28,
//     shadowColor: "#2d3142",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.09,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   centered: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#222e4c",
//     marginBottom: 10,
//     letterSpacing: 0.2,
//     textAlign: "center",
//     marginTop: 8,
//   },
//   share: {
//     marginBottom: 22,
//     fontSize: 14,
//     color: "#6b7280",
//     textAlign: "center",
//     lineHeight: 20,
//   },
//   input: {
//     backgroundColor: "#f4f6fa",
//     borderWidth: 1,
//     borderColor: "#e3e7ed",
//     borderRadius: 10,
//     padding: 14,
//     marginBottom: 18,
//     fontSize: 16,
//     color: "#222e4c",
//   },
//   button: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 16,
//     borderRadius: 30,
//     marginTop: 10,
//     shadowColor: "#4f8cff",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.18,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 17,
//     fontWeight: "bold",
//     letterSpacing: 0.4,
//   },
//   loadingText: {
//     fontSize: 16,
//     color: "#4f8cff",
//     fontWeight: "500",
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
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { IP } from "@env";

const EditProfile = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Settings");
  const ip = IP;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");

        if (!userId || !token) {
          Alert.alert("Error", "Missing user info. Please login again.");
          return;
        }

        const res = await axios.get(`http://${ip}:3000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFirstName(res.data.firstname || "");
        setLastName(res.data.lastname || "");
        setEmail(res.data.email || "");
      } catch (err) {
        Alert.alert("Error", "Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [ip]);

  const handleSave = async () => {
    try {
      if (!firstName.trim() || !lastName.trim() || !email.trim()) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

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
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Update failed. Try again.";
      Alert.alert("Error", msg);
    }
  };

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
    { id: "Events", title: "Events", icon: "event" },
    { id: "Community", title: "Community", icon: "people" },
    { id: "Discuss", title: "Notification", icon: "notifications" },
    { id: "Settings", title: "Settings", icon: "settings" },
  ];

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading profile data...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: 80 }]}>
      <View style={styles.formCard}>
        <Text style={styles.title}>Edit Your Profile</Text>
        <Text style={styles.share}>
          Please don't share this information with anyone else.
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
            <MaterialIcon
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
    backgroundColor: "#f1f6fb",
    padding: 20,
    marginTop: "30%",
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
    textAlign: "center",
  },
  share: {
    marginBottom: 22,
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
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
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 16,
    color: "#4f8cff",
    fontWeight: "500",
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

export default EditProfile;
