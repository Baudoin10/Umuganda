
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { IP } from "@env";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const navigation = useNavigation();
//   const ip = IP;

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const id = await AsyncStorage.getItem("userId");
//         const token = await AsyncStorage.getItem("token");

//         if (!id || !token) return;

//         const res = await axios.get(`http://${ip}:3000/api/users/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUser(res.data);
//       } catch (err) {
//         console.error("Failed to fetch user:", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.loading}>Loading...</Text>
//       </View>
//     );
//   }

//   // Generate avatar URL with initials
//   const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//     user.firstname + " " + user.lastname
//   )}&background=4f8cff&color=fff&size=128&rounded=true`;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.avatarWrapper}>
//           <Image
//             source={{ uri: avatarUrl }}
//             style={styles.avatar}
//             resizeMode="cover"
//           />
//         </View>
//         <Text style={styles.name}>
//           {user.firstname} {user.lastname}
//         </Text>
//       </View>
//       <Text style={styles.sectionHeader}>Profile Overview</Text>
//       <Text style={styles.sectionTitle}>
//         This is your Personal Information and it will not be shared.
//       </Text>

//       <View style={styles.section}>
//         <View style={styles.infoRow}>
//           <Text style={styles.label}>Firstname</Text>
//           <Text style={styles.value}>{user.firstname}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.label}>Lastname</Text>
//           <Text style={styles.value}>{user.lastname}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.label}>Email</Text>
//           <Text style={styles.value}>{user.email}</Text>
//         </View>
//       </View>

//       <View style={styles.actions}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("EditProfile")}
//         >
//           <Text style={styles.buttonText}>Edit Your Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: "#FFFF",
//   },
//   loading: {
//     fontSize: 18,
//     color: "#4f8cff",
//     alignSelf: "center",
//     marginTop: "50%",
//     fontWeight: "500",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 28,
//     marginTop: "10%",
//   },
//   avatarWrapper: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     backgroundColor: "#4CAF50",
//     borderWidth: 3,
//     borderColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 18,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.14,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   name: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#222e4c",
//     letterSpacing: 0.5,
//     marginTop: 2,
//   },
//   section: {
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     padding: 24,
//     marginTop: 22,
//     marginBottom: 20,
//     // iOS shadow
//     shadowColor: "#2d3142",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.09,
//     shadowRadius: 8,
//     // Android shadow
//     elevation: 2,
//   },
//   sectionHeader: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#4CAF50",
//     marginBottom: 6,
//     letterSpacing: 0.2,
//   },
//   sectionTitle: {
//     marginTop: 2,
//     marginBottom: 22,
//     fontSize: 15,
//     color: "#6b7280",
//     fontWeight: "500",
//     textAlign: "left",
//     lineHeight: 21,
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f2f4f8",
//     paddingBottom: 8,
//   },
//   label: {
//     fontWeight: "600",
//     fontSize: 16,
//     color: "#222e4c",
//     letterSpacing: 0.2,
//   },
//   value: {
//     color: "#3f4c6b",
//     fontSize: 16,
//     fontWeight: "400",
//   },
//   actions: {
//     marginTop: 14,
//     alignItems: "center",
//   },
//   button: {
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     backgroundColor: "#4CAF50",
//     borderRadius: 30,
//     shadowColor: "#4f8cff",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.18,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   buttonText: {
//     color: "#FFF",
//     textAlign: "center",
//     fontSize: 17,
//     fontWeight: "bold",
//     letterSpacing: 0.4,
//   },
// });

// export default Profile;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from "@env";
import Icon from "react-native-vector-icons/Feather";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Settings");
  const navigation = useNavigation();
  const ip = IP;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");

        if (!id || !token) return;

        const res = await axios.get(`http://${ip}:3000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
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

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.firstname + " " + user.lastname
  )}&background=4f8cff&color=fff&size=128&rounded=true`;

  return (
    <View style={{ flex: 1, paddingBottom: 80, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: avatarUrl }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.name}>
            {user.firstname} {user.lastname}
          </Text>
        </View>

        <Text style={styles.sectionHeader}>Profile Overview</Text>
        <Text style={styles.sectionTitle}>
          This is your Personal Information and it will not be shared.
        </Text>

        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Firstname</Text>
            <Text style={styles.value}>{user.firstname}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Lastname</Text>
            <Text style={styles.value}>{user.lastname}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.buttonText}>Edit Your Profile</Text>
          </TouchableOpacity>
        </View>
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
    padding: 24,
    backgroundColor: "#FFF",
  },
  loading: {
    fontSize: 18,
    color: "#4f8cff",
    alignSelf: "center",
    marginTop: "50%",
    fontWeight: "500",
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
    marginTop: "10%",
  },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222e4c",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    marginTop: 22,
    marginBottom: 20,
    shadowColor: "#2d3142",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  sectionTitle: {
    marginTop: 2,
    marginBottom: 22,
    fontSize: 15,
    color: "#6b7280",
    fontWeight: "500",
    textAlign: "left",
    lineHeight: 21,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f4f8",
    paddingBottom: 8,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#222e4c",
    letterSpacing: 0.2,
  },
  value: {
    color: "#3f4c6b",
    fontSize: 16,
    fontWeight: "400",
  },
  actions: {
    marginTop: 14,
    alignItems: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    shadowColor: "#4f8cff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.4,
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

export default Profile;
