import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>John Doe</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>johndoe@example.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>+250 788 123 456</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>Kigali, Rwanda</Text>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Language:</Text>
          <Text style={styles.value}>English</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Notifications:</Text>
          <Text style={styles.value}>Enabled</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={()=> navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  value: {
    color: "#555",
    fontSize: 16,
  },
  actions: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButton: {
    padding: 15,
    backgroundColor: "#F44336",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Profile;
