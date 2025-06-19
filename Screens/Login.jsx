
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Ionicons } from '@expo/vector-icons';
import { IP } from "@env";


const Login = () => {
  const ip = IP;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://${ip}:3000/api/auth/login`, {
        email,
        password,
      });

      const { token, role } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("role", role);

      Toast.show({
        type: "success",
        text1: "Login successful!",
      });

      setTimeout(() => {
        if (role === "admin") {
          navigation.navigate("Dashboard");
        } else {
          navigation.navigate("user");
        }
      }, 1500);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Invalid credentials. Please try again.",
      });
      console.error("Login failed:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Introduction")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "-20%",
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
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome Back</Text>
            <Text style={styles.subHeaderText}>Sign in to continue</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
              <Text style={styles.submitText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#666",
    fontSize: 14,
  },
  signupLink: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Login;
