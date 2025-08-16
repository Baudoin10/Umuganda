import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Switch,
} from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createNotification } from "../Services/notificationAPI"; 

const Notification = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBroadcast, setIsBroadcast] = useState(true);
  const [activeTab, setActiveTab] = useState("Discuss");

  const handleCreateNotification = async () => {
    if (!title || !description) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Incomplete Form",
        text2: "Please fill out both title and description.",
      });
      return;
    }

    setIsLoading(true);
    try {
      await createNotification({
        title,
        message: description,
        isBroadcast,
      });

      Toast.show({
        type: "success",
        position: "top",
        text1: "Notification Created",
        text2: `Successfully sent to ${
          isBroadcast ? "all users" : "selected users"
        }`,
      });

      setTitle("");
      setDescription("");

      setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 1500);
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Failed to create notification.",
      });
      console.error(
        "Create notification failed:",
        error?.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

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

  const bottomTabs = [
    { id: "Dashboard", title: "Dashboard", icon: "dashboard" },
    { id: "Events", title: "Events", icon: "event" },
    { id: "Tasks", title: "Tasks", icon: "assignment" },
    { id: "Users", title: "Users", icon: "group" },
    { id: "Discuss", title: "Send alert", icon: "notifications" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Send an Alert</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Notification Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title here"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Notification Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter description here"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.broadcastRow}>
            <Text style={styles.label}>Send to all users</Text>
            <Switch
              value={isBroadcast}
              onValueChange={setIsBroadcast}
              trackColor={{ false: "#cccccc", true: "#a0d8a3" }}
              thumbColor={isBroadcast ? "#4CAF50" : "#f4f3f4"}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.createButton,
            (isLoading || !title || !description) && styles.disabledButton,
          ]}
          onPress={handleCreateNotification}
          disabled={isLoading || !title || !description}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.createButtonText}>Create Notification</Text>
          )}
        </TouchableOpacity>

        <Toast />
      </View>

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
    padding: 20,
    backgroundColor: "#F9F9F9",
    flex: 1,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: "10%",
    textAlign: "left",
    color: "#333",
    marginTop: "22%",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  broadcastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  createButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: "#4CAF50",
    elevation: 0,
  },
  createButtonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
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
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
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

export default Notification;
