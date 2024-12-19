import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "data:image/png;base64,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",
          }} // Placeholder image
          style={styles.profileImage}
        />
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
        <TouchableOpacity style={styles.logoutButton}>
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
