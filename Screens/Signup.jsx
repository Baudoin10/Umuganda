
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { signup as signupApi } from "../Services/authAPI";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: screenHeight } = Dimensions.get("window");

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      if (
        !firstname ||
        !lastname ||
        !email ||
        !phone ||
        !sector ||
        !address ||
        !password
      ) {
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
        phone,
        sector,
        address,
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Create Account</Text>
              <Text style={styles.subHeaderText}>Sign up to get started</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.nameRow}>
                <Field
                  label="Firstname"
                  value={firstname}
                  onChangeText={setFirstname}
                  placeholder="First name"
                  style={styles.halfWidth}
                />

                <Field
                  label="Lastname"
                  value={lastname}
                  onChangeText={setLastname}
                  placeholder="Last name"
                  style={styles.halfWidth}
                />
              </View>

              <Field
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Field
                label="Phone"
                value={phone}
                onChangeText={setPhone}
                placeholder="07XXXXXXXX"
                keyboardType="phone-pad"
              />

              <View style={styles.locationRow}>
                <Field
                  label="Sector"
                  value={sector}
                  onChangeText={setSector}
                  placeholder="Gasabo / Nyarugenge"
                  autoCapitalize="words"
                  style={styles.halfWidth}
                />

                <Field
                  label="Address"
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Street/Cell"
                  autoCapitalize="words"
                  style={styles.halfWidth}
                />
              </View>

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
                activeOpacity={0.8}
              >
                <Text style={styles.submitText}>Create Account</Text>
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
  style,
}) => (
  <View style={[styles.inputGroup, style]}>
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
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: screenHeight * 0.9, // Ensure minimum height for smaller screens
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "center",
    maxWidth: 400, // Limit width on larger screens
    alignSelf: "center",
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: screenHeight < 700 ? 20 : 32, // Responsive spacing
  },
  headerText: {
    fontSize: screenHeight < 700 ? 28 : 32, // Responsive font size
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
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12, // Space between firstname and lastname
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12, // Space between sector and address
  },
  halfWidth: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: screenHeight < 700 ? 16 : 20, // Responsive spacing
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 16,
    paddingVertical: screenHeight < 700 ? 12 : 16, // Responsive padding
    borderRadius: 12,
    fontSize: 16,
    color: "#333",
    minHeight: 48, // Ensure minimum touch target
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 52, // Ensure minimum touch target
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20, // Extra padding at bottom
  },
  loginText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Signup