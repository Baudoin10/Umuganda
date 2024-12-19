// AdminDashboard.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const Dashboard = ({ navigation }) => {
  const sidebarItems = [
    { id: "1", title: "Reports", screen: "Reports" },
    { id: "2", title: "Notifications", screen: "Notifications" },
    { id: "3", title: "Feedback", screen: "Feedback" },
    { id: "4", title: "Profile/Settings", screen: "ProfileSettings" },
    { id: "5", title: "Logout", screen: "Logout" },
  ];

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <FlatList
          data={sidebarItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.sidebarText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Content changes based on the selected sidebar item */}
        {/* Example: */}
        <Text style={styles.mainContentText}>
          Select an option from the sidebar
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 250,
    backgroundColor: "#333",
    padding: 10,
  },
  sidebarItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  sidebarText: {
    color: "#FFF",
    fontSize: 18,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  mainContentText: {
    fontSize: 20,
    color: "#000",
  },
});

export default Dashboard;



