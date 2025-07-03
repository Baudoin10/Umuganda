
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { IP } from "@env";

const Event = () => {
  const navigation = useNavigation();
  const ip = IP;
  const [activeTab, setActiveTab] = useState("Events");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    date: "",
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    const { title, description, address, date } = formData;

    if (!title || !description || !address || !date) {
      Toast.show({
        type: "error",
        text1: "All fields are required!",
      });
      return;
    }

    const dateObj = new Date(date);
    const day = dateObj.getDate().toString();
    const month = (dateObj.getMonth() + 1).toString();
    const eventData = { ...formData, day, month };

    try {
      const response = await fetch(`http://${ip}:3000/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error("Failed to create event");

      Toast.show({
        type: "success",
        position: "top",
        text1: "Event created successfully!",
      });

      setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 3000);

      setFormData({ title: "", description: "", address: "", date: "" });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong. Please try again.",
      });
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.container}>
        <Text style={styles.heading}>Create Event</Text>
        <TextInput
          style={styles.input}
          placeholder="Event Title"
          value={formData.title}
          onChangeText={(text) => handleChange("title", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Event Description"
          value={formData.description}
          onChangeText={(text) => handleChange("description", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) => handleChange("address", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={formData.date}
          onChangeText={(text) => handleChange("date", text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="add" size={24} color="#FFF" />
          <Text style={styles.submitText}>Create Event</Text>
        </TouchableOpacity>
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
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: "30%",
    marginBottom: "10%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
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

export default Event;
