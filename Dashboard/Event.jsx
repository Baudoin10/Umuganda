import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const Event = () => {
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

    try {
      const response = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create event");

      Toast.show({
        type: "success",
        text1: "Event created successfully!",
      });

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
      <Button title="Create Event" onPress={handleSubmit} />
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
});

export default Event;
