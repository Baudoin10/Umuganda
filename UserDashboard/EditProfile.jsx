
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { IP } from "@env";

const EditProfile = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const ip = IP;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");

        if (!userId || !token) {
          Alert.alert("Error", "Missing user info. Please login again.");
          return;
        }

        const res = await axios.get(`http://${ip}:3000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFirstName(res.data.firstname || "");
        setLastName(res.data.lastname || "");
        setEmail(res.data.email || "");
      } catch (err) {
        Alert.alert("Error", "Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [ip]);

  const handleSave = async () => {
    try {
      if (!firstName.trim() || !lastName.trim() || !email.trim()) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      const response = await axios.put(
        `http://${ip}:3000/api/users/${userId}`,
        {
          firstname: firstName.trim(),
          lastname: lastName.trim(),
          email: email.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Success", "Profile updated successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Update failed. Try again.";
      Alert.alert("Error", msg);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading profile data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10%",
          paddingVertical: 10,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          style={{ marginRight: 5 }}
        />
        <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
      </TouchableOpacity>
      <View style={styles.formCard}>
        <Text style={styles.title}>Edit Your Profile</Text>
        <Text style={styles.share}>
          Please don't share this information with anyone else.
        </Text>

        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          autoCapitalize="words"
          placeholderTextColor="#b1b5c9"
        />

        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          autoCapitalize="words"
          placeholderTextColor="#b1b5c9"
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#b1b5c9"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    padding: 20,
    marginTop: "30%",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 28,
    shadowColor: "#2d3142",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 2,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222e4c",
    marginBottom: 10,
    textAlign: "center",
  },
  share: {
    marginBottom: 22,
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f4f6fa",
    borderWidth: 1,
    borderColor: "#e3e7ed",
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    fontSize: 16,
    color: "#222e4c",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 16,
    color: "#4f8cff",
    fontWeight: "500",
  },
});

export default EditProfile;
