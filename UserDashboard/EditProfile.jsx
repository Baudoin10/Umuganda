// EditProfile.js

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleSave = () => {
    // You can send updated data to your backend here
    console.log("Updated info:", { firstName, lastName, email });
    navigation.goBack(); // Go back to the profile screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />

      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
  },
});

export default EditProfile;
