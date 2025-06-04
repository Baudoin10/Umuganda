import React from "react";
import { View, Text, StyleSheet,  TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
   
      <View style={styles.header}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.section}>
      <Text style={styles.name}>Profile Overview</Text>
        <Text style={styles.sectionTitle}>This is your Personal Information and it's will not be sharing to any one else.</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Firstname</Text>
          <Text style={styles.value}>John Doe</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Lastname</Text>
          <Text style={styles.value}>John Doe</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>johndoe@example.com</Text>
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
    marginTop: '15%'
  },
  sectionTitle: {
   marginTop: '4%',
   marginBottom: '13%',
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


