import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../Component/BottomTab/BottomTab";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { logout as apiLogout } from "../Services/authAPI";
import Toast from "react-native-toast-message";

const Setting = () => {
  const navigation = useNavigation();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Settings");
  
   const handleLogout = async () => {
     try {
       await apiLogout();
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
        navigation.navigate("Setting");
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

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFF" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Account Settings Section */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Account Settings</Text>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate("Profile")}
            >
              <View style={styles.settingItemLeft}>
                <Icon name="user" size={20} color="#26366C" />
                <Text style={styles.settingText}>Profile</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>

            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Icon name="bell" size={20} color="#26366C" />
                <Text style={styles.settingText}>Push Notifications</Text>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: "#D1D5DB", true: "#26366C" }}
                thumbColor={"#FFFFFF"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Icon name="moon" size={20} color="#26366C" />
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#D1D5DB", true: "#26366C" }}
                thumbColor={"#FFFFFF"}
              />
            </View>
          </View>

          {/* About Section */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>About</Text>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Icon name="file-text" size={20} color="#26366C" />
                <Text style={styles.settingText}>Terms and Privacy</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Icon name="shield" size={20} color="#26366C" />
                <Text style={styles.settingText}>Usage of Information</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingItemLeft}>
                <Icon name="help-circle" size={20} color="#26366C" />
                <Text style={styles.settingText}>Help and Support</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <View style={styles.settingItemLeft}>
                <Icon name="log-out" size={20} color="#E53935" />
                <Text style={[styles.settingText, styles.logoutText]}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Tabs */}
      <BottomTab
        tabs={bottomTabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
        activeColor="#999"
        iconComponent={MaterialIcons}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    marginTop: "10%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222e4c",
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
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    fontSize: 15,
    color: "#222e4c",
    fontWeight: "500",
    marginLeft: 12,
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  logoutText: {
    color: "#E53935",
    fontWeight: "600",
  },
  
});

export default Setting;
