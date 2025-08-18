
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
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Chart from "./Chart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { getMe } from "../Services/meAPI";
import { fetchTasks as apiFetchTasks } from "../Services/tasksAPI";
import { fetchEvents as apiFetchEvents } from "../Services/eventAPI";
import { logout as apiLogout } from "../Services/authAPI";

const UserDashboard = ({ navigation }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("Home");


  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.warn("No token found");
          return;
        }
        const me = await getMe(); // meAPI should use your BASE_URL + interceptor/authHeader
        setUser(me);
      } catch (error) {
        console.error(
          "Error fetching user:",
          error?.response?.data || error.message
        );
      }
    };

    loadUser();
  }, []);


   const fetchTasks = async () => {
     try {
       const data = await apiFetchTasks();
       setTasks(Array.isArray(data) ? data : []);
     } catch (error) {
       console.log(
         "Error loading tasks:",
         error?.response?.data || error.message
       );
     }
   };

  useEffect(() => {
    fetchTasks();
  }, []);
  

  const fetchEvents = async () => {
    try {
      const data = await apiFetchEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(
        "Error loading events:",
        error?.response?.data || error.message
      );
    }
  };


  useEffect(() => {
    fetchEvents();
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
      id: "4",
      title: "Notifications",
      screen: "view",
      icon: "notifications",
    },
    {
      id: "5",
      title: "Profile/Settings",
      screen: "Profile",
      icon: "person",
    },
    { id: "6", title: "Logout", screen: "Login", icon: "logout" },
  ];

  const dashboardCards = [
    {
      id: "1",
      title: "My Tasks",
      count: tasks.length,
      icon: "assignment",
      color: "#4CAF50",
      subtitle: "Active tasks",
    },
    {
      id: "2",
      title: "Available Events",
      count: events.length,
      icon: "event",
      color: "#2196F3",
      subtitle: "This month",
    },
    {
      id: "3",
      title: "Events Joined",
      count: events.length,
      icon: "people",
      color: "#FF9800",
      subtitle: "Community events",
    },
    {
      id: "4",
      title: "Community Points",
      count: 245,
      icon: "star",
      color: "#9C27B0",
      subtitle: "Total earned",
    },
  ];

  const bottomTabs = [
    { id: "Home", title: "Home", icon: "home" },
    { id: "Events", title: "Events", icon: "event" },
    { id: "Community", title: "Community", icon: "people" },
    { id: "Discuss", title: "Notification", icon: "notifications" },
    { id: "Settings", title: "Settings", icon: "settings" },
  ];

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    // Navigate to different screens based on tab
    switch (tabId) {
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
        // Stay on Home
        break;
    }
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]}>
      <View style={styles.cardHeader}>
        <Icon name={item.icon} size={28} color="#FFF" />
        <Text style={styles.cardCount}>{item.count}</Text>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

    // Handle logout
      const handleLogout = async () => {
        try {
          await logout(); 
          Toast.show({
            type: "success",
            position: "top",
            text1: "Logout successful!",
          });
          navigation.navigate("Login");
        } catch (e) {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Logout failed. Please try again.",
          });
        }
      };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Icon name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Muraho!</Text>
          <Text style={styles.userEmail}>
            {user ? user.email : "Loading..."}
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="#333" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.sectionTitle}>Umuganda Dashboard</Text>
          <Text style={styles.sectionSubtitle}>
            Building stronger communities together
          </Text>
        </View>

        {/* Dashboard Cards */}
        <View style={styles.cardsContainer}>
          <FlatList
            data={dashboardCards}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.cardRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Chart Section */}
        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Community Activity</Text>
          <Chart />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("joinEvent")}
            >
              <Icon name="add-circle" size={24} color="#4CAF50" />
              <Text style={styles.actionButtonText}>Join Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("ViewTask")}
            >
              <Icon name="checklist" size={24} color="#2196F3" />
              <Text style={styles.actionButtonText}>View Tasks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Navigation */}
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

      {/* Side Menu Modal */}
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
              <View>
                <Text style={styles.menuTitle}>Umuganda App</Text>
                <Text style={styles.menuSubtitle}>Community Service</Text>
              </View>
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
                  <View style={styles.menuItemIconContainer}>
                    <Icon name={item.icon} size={24} color="#4CAF50" />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                  <Icon name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4CAF50",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  notificationButton: {
    position: "relative",
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#FF5722",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    paddingBottom: 80, // Space for bottom tabs
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: "#4CAF50",
    margin: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFF",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#E8F5E8",
    marginTop: 4,
  },
  cardsContainer: {
    paddingHorizontal: 16,
  },
  cardRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardCount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFF",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  chartSection: {
    margin: 16,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  quickActions: {
    margin: 16,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButton: {
    flex: 0.48,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
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
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContent: {
    width: "85%",
    height: "100%",
    backgroundColor: "#FFF",
    paddingTop: StatusBar.currentHeight,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    marginTop: 40,
    backgroundColor: "#F8F9FA",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4CAF50",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    fontWeight: "500",
  },
});

export default UserDashboard;