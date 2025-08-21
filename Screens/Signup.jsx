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
import Toast from "react-native-toast-message";
import { signup as signupApi } from "../Services/authAPI";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // ✅ new
  const [sector, setSector] = useState(""); // ✅ new
  const [address, setAddress] = useState(""); // ✅ new
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      if (!firstname || !lastname || !email || !phone || !sector || !password) {
        Toast.show({
          type: "error",
          position: "top",
          text2: "Please fill all required fields.",
        });
        return;
      }

      await signupApi({
        firstname,
        lastname,
        email,
        password,
        phone, // ✅ send
        sector, // ✅ send
        address, // ✅ send
      });

      Toast.show({
        type: "success",
        position: "top",
        text2: "Account created successfully!",
      });

      setTimeout(() => navigation.navigate("Login"), 1500);
    } catch (error) {
      console.error("Signup failed:", error?.response?.data || error.message);
      Toast.show({
        type: "error",
        position: "top",
        text2: "There was an issue creating the account.",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Create Account</Text>
            <Text style={styles.subHeaderText}>Sign up to get started</Text>
          </View>

          <View style={styles.form}>
            <Field
              label="Firstname"
              value={firstname}
              onChangeText={setFirstname}
              placeholder="Enter your Firstname"
            />

            <Field
              label="Lastname"
              value={lastname}
              onChangeText={setLastname}
              placeholder="Enter your Lastname"
            />

            <Field
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* ✅ Phone */}
            <Field
              label="Phone"
              value={phone}
              onChangeText={setPhone}
              placeholder="07XXXXXXXX"
              keyboardType="phone-pad"
            />

            {/* ✅ Sector */}
            <Field
              label="Sector"
              value={sector}
              onChangeText={setSector}
              placeholder="Gasabo / Nyarugenge / Kicukiro"
              autoCapitalize="words"
            />

            {/* ✅ Address (optional) */}
            <Field
              label="Address"
              value={address}
              onChangeText={setAddress}
              placeholder="Street / Landmark (optional)"
            />

            <Field
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSignup}
            >
              <Text style={styles.submitText}>Create Account</Text>
            </TouchableOpacity>

            <View className="loginContainer" style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const Field = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = "none",
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  keyboardView: { flex: 1 },
  content: { flex: 1, padding: 24, justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 40 },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subHeaderText: { fontSize: 16, color: "#666" },
  form: { width: "100%" },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 8 },
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: { color: "white", fontSize: 16, fontWeight: "600" },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: { color: "#666", fontSize: 14 },
  loginLink: { color: "#4CAF50", fontSize: 14, fontWeight: "600" },
});

export default Signup;
