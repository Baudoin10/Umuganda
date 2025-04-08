


import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Event = () => {

    const navigation = useNavigation();

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

    // Check if all fields are filled
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
      const response = await fetch("http://192.168.1.39:3000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error("Failed to create event");

      Toast.show({
        type: "success",
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

  return (
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
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  // submitButton: {
  //   backgroundColor: "#4CAF50",
  //   paddingVertical: 12,
  //   borderRadius: 5,
  //   alignItems: "center",
  //   marginTop: 15,
  // },
  // submitText: {
  //   color: "#fff",
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },

submitButton: {
  backgroundColor: "#4CAF50",
  padding: 15,
  borderRadius: 8,
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "center",
 
},
submitButtonText: {
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
  marginLeft: 8,
},

submitText: {
  color: "white"
},
});

export default Event;
