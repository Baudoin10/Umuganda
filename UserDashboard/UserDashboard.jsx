
import React, { useState } from "react";
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

const UserDashboard = ({ navigation }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [user, setUser] = useState(null);


    useEffect(() => {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("No token found");
            console.log("response", response)
            return;
          }
  
          const response = await axios.get(
            "http://192.168.1.39:3000/api/users",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
  
      fetchUser();
    }, []);

  const menuItems = [
    {
      id: "1",
      title: "View Events",
      screen: "ViewEvent",
      icon: "event",
    },
    {
      id: "2",
      title: "View Tasks",
      screen: "ViewTask",
      icon: "assignment",
    },
    {
      id: "3",
      title: "Join Events",
      screen: "joinEvent",
      icon: "event",
    },
    {
      id: "5",
      title: "Profile/Settings",
      screen: "Profile",
      icon: "settings",
    },
    { id: "6", title: "Logout", screen: "Login", icon: "logout" },
  ];

  const dashboardCards = [
    { id: "1", title: "Tasks", count: "10", icon: "people", color: "#1976D2" },
    { id: "2", title: "Events", count: "110", icon: "event", color: "#00897B" },
    {
      id: "3",
      title: "Events joined",
      count: "100",
      icon: "task",
      color: "#D81B60",
    },
  ];

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const renderCard = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.color }]}>
      <Icon name={item.icon} size={32} color="#FFF" />
      <Text style={styles.cardCount}>{item.count}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
    </View>
  );

  // Logout Functionality
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.warn("No token found, user already logged out.");
        navigation.navigate("Login");
        return;
      }

      await axios.post(
        "http://192.168.1.39:3000/api/auth/logout", 
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Clear the stored data
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("user");

      // Show toast on success
      Toast.show({
        type: "success",
        position: "top",
        text1: "Logout successful!",
      });

      // Redirect to login after a brief delay
      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    } catch (error) {
      console.error("Logout failed", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Logout failed. Please try again.",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Top Bar with Menu Icon */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Icon name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>User</Text>
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
              <Text style={styles.menuTitle}>UserDashboard</Text>
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
                      handleLogout();
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

      {/* Toast Message */}
      <Toast />
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
  profileButton: {
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
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    marginTop: 60,
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

export default UserDashboard;
