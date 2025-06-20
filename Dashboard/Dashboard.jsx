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
import axios from "axios";
import Toast from "react-native-toast-message";
import { IP } from "@env";

const Dashboard = ({ navigation }) => {
  const ip = IP;
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");

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
      title: "Events Management",
      screen: "Event",
      icon: "event",
    },
    {
      id: "2",
      title: "Task Creation",
      screen: "Task",
      icon: "assignment",
    },
    {
      id: "3",
      title: "Users Management",
      screen: "Users",
      icon: "group",
    },
    {
      id: "4",
      title: "Task Overview",
      screen: "ListTask",
      icon: "list",
    },
    {
      id: "5",
      title: "Notifications",
      screen: "Notification",
      icon: "notifications",
    },
    { id: "6", title: "Logout", screen: "Login", icon: "logout" },
  ];

  // Bottom tabs for admin
  const bottomTabs = [
    { id: "Dashboard", title: "Dashboard", icon: "dashboard" },
    { id: "Events", title: "Events", icon: "event" },
    { id: "Tasks", title: "Tasks", icon: "assignment" },
    { id: "Users", title: "Users", icon: "group" },
    { id: "Discuss", title: "Notification", icon: "notifications" },
  ];

  // Dashboard cards with enhanced data
  const dashboardCards = [
    {
      id: "1",
      title: "Total Users",
      count: users.length,
      icon: "people",
      color: "#4CAF50",
      subtitle: "Active members",
      trend: "+12%",
    },
    {
      id: "2",
      title: "Active Events",
      count: events.length,
      icon: "event",
      color: "#2196F3",
      subtitle: "This month",
      trend: "+5%",
    },
    {
      id: "3",
      title: "Total Tasks",
      count: tasks.length,
      icon: "assignment",
      color: "#FF9800",
      subtitle: "Assigned",
      trend: "+8%",
    },
    {
      id: "4",
      title: "Completion Rate",
      count: "87%",
      icon: "trending-up",
      color: "#9C27B0",
      subtitle: "This month",
      trend: "+3%",
    },
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      type: "user",
      message: "New user registered",
      time: "2 mins ago",
      icon: "person-add",
    },
    {
      id: 2,
      type: "event",
      message: "Umuganda event created",
      time: "15 mins ago",
      icon: "event",
    },
    {
      id: 3,
      type: "task",
      message: "Task completed by user",
      time: "1 hour ago",
      icon: "check-circle",
    },
    {
      id: 4,
      type: "notification",
      message: "Notification sent to all users",
      time: "2 hours ago",
      icon: "notifications",
    },
  ];

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  // Handle tab press
  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case "Dashboard":
        navigation.navigate("Dashboard");
        break;
      case "Events":
        navigation.navigate("Event");
        break;
      case "Tasks":
        navigation.navigate("Task");
        break;
      case "Users":
        navigation.navigate("Users");
        break;
      case "Discuss":
        navigation.navigate("Notification");
        break;
    }
  };

  // Render dashboard card
  const renderCard = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]}>
      <View style={styles.cardHeader}>
        <Icon name={item.icon} size={28} color="#FFF" />
        <Text style={styles.cardTrend}>{item.trend}</Text>
      </View>
      <Text style={styles.cardCount}>{item.count}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  // Render activity item
  const renderActivity = ({ item }) => (
    <View style={styles.activityItem}>
      <View
        style={[
          styles.activityIcon,
          { backgroundColor: `${getActivityColor(item.type)}20` },
        ]}
      >
        <Icon name={item.icon} size={20} color={getActivityColor(item.type)} />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityMessage}>{item.message}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
    </View>
  );

  const getActivityColor = (type) => {
    switch (type) {
      case "user":
        return "#4CAF50";
      case "event":
        return "#2196F3";
      case "task":
        return "#FF9800";
      case "notification":
        return "#9C27B0";
      default:
        return "#666";
    }
  };

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

      {/* Enhanced Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Icon name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Admin Panel</Text>
          <Text style={styles.userEmail}>
            {user ? user.email : "Loading..."}
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="#333" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>5</Text>
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
          <Text style={styles.sectionTitle}>Umuganda Admin Dashboard</Text>
          <Text style={styles.sectionSubtitle}>
            Manage community activities and users
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
          <Text style={styles.chartTitle}>System Analytics</Text>
          <Chart />
        </View>

        {/* Recent Activities */}
        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <FlatList
            data={recentActivities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
              onPress={() => navigation.navigate("Event")}
            >
              <Icon name="add" size={24} color="#FFF" />
              <Text style={styles.actionButtonText}>Create Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#2196F3" }]}
              onPress={() => navigation.navigate("Task")}
            >
              <Icon name="assignment" size={24} color="#FFF" />
              <Text style={styles.actionButtonText}>New Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#FF9800" }]}
              onPress={() => navigation.navigate("Users")}
            >
              <Icon name="group" size={24} color="#FFF" />
              <Text style={styles.actionButtonText}>Manage Users</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#9C27B0" }]}
              onPress={() => navigation.navigate("Notification")}
            >
              <Icon name="notifications" size={24} color="#FFF" />
              <Text style={styles.actionButtonText}>Send Alert</Text>
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

      {/* Enhanced Side Menu Modal */}
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
                <Text style={styles.menuTitle}>Admin Panel</Text>
                <Text style={styles.menuSubtitle}>Umuganda Management</Text>
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
      <Toast  />
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
    paddingBottom: 80,
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
  cardTrend: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFF",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cardCount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFF",
    marginBottom: 4,
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
  activitiesSection: {
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
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  activityTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
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
  actionButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButton: {
    width: "48%",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFF",
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

export default Dashboard;
