
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { getMe } from "../Services/meAPI";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Settings");
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const loadUser = async () => {
        try {
          const data = await getMe();
          if (isActive) setUser(data);
        } catch (err) {
          console.error(
            "Failed to fetch user:",
            err?.response?.data || err?.message || err
          );
        }
      };
      loadUser();
      return () => {
        isActive = false;
      };
    }, [])
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
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ],
      { cancelable: true }
    );
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#26366C" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFB" }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatarText}>
              {(user.firstname?.[0] || "").toUpperCase()}
              {(user.lastname?.[0] || "").toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>
            {user.firstname} {user.lastname}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <View style={styles.infoRow}>
            <Icon name="user" size={18} color="#26366C" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>
                {user.firstname} {user.lastname}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Icon name="mail" size={18} color="#26366C" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Icon name="phone" size={18} color="#26366C" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>
                {user.phone || "Not provided"}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Icon name="briefcase" size={18} color="#26366C" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Sector</Text>
              <Text style={styles.infoValue}>
                {user.sector || "Not provided"}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Icon name="map-pin" size={18} color="#26366C" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>
                {user.address || "Not provided"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Icon
              name="edit-2"
              size={18}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About</Text>

          <TouchableOpacity style={styles.aboutItem}>
            <Icon name="file-text" size={20} color="#26366C" />
            <Text style={styles.aboutItemText}>Terms and Privacy</Text>
            <Icon name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.aboutItem}>
            <Icon name="shield" size={20} color="#26366C" />
            <Text style={styles.aboutItemText}>Usage of Information</Text>
            <Icon name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.aboutItem}>
            <Icon name="help-circle" size={20} color="#26366C" />
            <Text style={styles.aboutItemText}>Help and Support</Text>
            <Icon name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="log-out" size={20} color="#E53935" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
              color={activeTab === tab.id ? "#26366C" : "#999"}
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
  scrollContainer: {
     padding: 16,
     paddingBottom: 120
     },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFB",
  },
  loadingText: { fontSize: 16, color: "#26366C", fontWeight: "500", marginTop: 12 },
  header: { alignItems: "center", marginBottom: 24, marginTop: 20 },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#26366C",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222e4c",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#888",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222e4c",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: "#222e4c",
    fontWeight: "500",
  },
  editButton: {
    backgroundColor: "#26366C",
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  aboutItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  aboutItemText: {
    flex: 1,
    fontSize: 15,
    color: "#222e4c",
    fontWeight: "500",
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 15,
    color: "#E53935",
    fontWeight: "600",
    marginLeft: 12,
  },
  bottomTabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 8,
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
    backgroundColor: "rgba(38, 54, 108, 0.1)",
    borderRadius: 8,
  },
  tabText: { fontSize: 11, color: "#999", marginTop: 4, fontWeight: "500" },
  activeTabText: { color: "#26366C", fontWeight: "600" },
});

export default Profile;