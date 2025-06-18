
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Chart from "./Chart";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Toast from 'react-native-toast-message'; 

const Dashboard = ({ navigation }) => {
  const ip = import.meta.env.VITE_IP;
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");  
        if (!token) {
          console.error("No token found");
          return;
        }
  
        const response = await axios.get(`http://${ip}:3000/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setUser(response.data);  
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUser();
  }, []);
  // Fetch users data
  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`http://${ip}:3000/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch tasks data
  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`http://${ip}:3000/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch events data
  const fetchEvents = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`http://${ip}:3000/api/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Menu items for navigation
  const menuItems = [
    {
      id: "1",
      title: "Events",
      screen: "Event",
      icon: "event",
    },
    {
      id: "2",
      title: "Task creation",
      screen: "Task",
      icon: "assignment",
    },
    {
      id: "4",
      title: "Users",
      screen: "Users",
      icon: "group",
    },
    {
      id: "2",
      title: "Task Overview",
      screen: "ListTask",
      icon: "assignment",
    },
    {
      id: "3",
      title: "Notifications",
      screen: "Notification",
      icon: "notifications",
    },
   
    { id: "6", title: "Logout", screen: "Login", icon: "logout" },
  ];

  // Dashboard cards
  const dashboardCards = [
    { id: "1", title: "Users", count: users.length, icon: "people", color: "#4CAF50" },
    { id: "2", title: "Events", count: events.length, icon: "event", color: "#2196F3" },
    { id: "3", title: "Tasks", count: tasks.length, icon: "task", color: "#FF9800" },
  ];

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  // Render dashboard card
  const renderCard = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.color }]}>
      <Icon name={item.icon} size={32} color="#FFF" />
      <Text style={styles.cardCount}>{item.count}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
    </View>
  );

  // Handle logout
  const handleLogout = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.warn("No token found, user already logged out.");
      navigation.navigate("Login");
      return;
    }

    try {
      await axios.post(
        `http://${ip}:3000/api/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("user");

      Toast.show({
        type: "success",
        position: "top",
        text1: "Logout successful!",
        visibilityTime: 3000,
      });

      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    } catch (error) {
      console.error("Logout failed", error);

      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Logout failed. Please try again.",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Top Bar with Menu Icon */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Icon name="menu" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>{user ? user.email : "Loading..."}</Text>
      </View>

      <View style={styles.mainContent}>
        <FlatList
          data={dashboardCards}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Chart />
      {/* Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <View style={styles.menuContent}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Admin Dashboard</Text>
              <TouchableOpacity onPress={toggleMenu}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    if (item.title === "Logout") {
                      handleLogout(); // Logout functionality
                    } else {
                      navigation.navigate(item.screen);
                    }
                  }}
                >
                  <Icon name={item.icon} size={24} color="#666" />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA", 
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButton: {
    padding: 8,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  cardRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 4,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContent: {
    width: "80%",
    height: "100%",
    backgroundColor: "#FFF",
    paddingTop: StatusBar.currentHeight,
    marginTop: "15%",
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 16,
  },
});

export default Dashboard;
