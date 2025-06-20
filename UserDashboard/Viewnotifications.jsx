
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator,TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { IP } from "@env";

// const Viewnotifications = () => {
//   const ip = IP;
//   const navigation = useNavigation();
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchNotifications = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const response = await axios.get(`http://${ip}:3000/api/notifications`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setNotifications(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//     setLoading(false);
//   };
  
//   useEffect(() => {
//     fetchNotifications();
//   }, []);
  
//   const renderItem = ({ item }) => (
//     <View style={styles.notificationItem}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.message}>{item.message}</Text>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate("user")}
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             marginTop: "10%",
//             paddingVertical: 10,
//           }}
//         >
//           <Ionicons
//             name="arrow-back"
//             size={24}
//             color="black"
//             style={{ marginRight: 5 }}
//           />
//           <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Notifications</Text>
//       </View>

//       <FlatList
//         data={notifications}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//         ListEmptyComponent={
//           <Text style={styles.emptyText}>No notifications yet</Text>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     padding: 16,
//     backgroundColor: '#0000',
//     alignItems: 'left',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   notificationItem: {
//     backgroundColor: 'white',
//     padding: 16,
//     margin: 8,
//     borderRadius: 8,
//     elevation: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   message: {
//     fontSize: 14,
//     color: '#666',
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: 50,
//     fontSize: 16,
//     color: '#666',
//   }
// });

// export default Viewnotifications;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { IP } from "@env";

const Viewnotifications = () => {
  const ip = IP;
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Discuss");

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`http://${ip}:3000/api/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: 80 }]}>
      <View style={styles.header}>
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
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications yet</Text>
        }
      />

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
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 16,
    backgroundColor: "#0000",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationItem: {
    backgroundColor: "white",
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
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

export default Viewnotifications;
