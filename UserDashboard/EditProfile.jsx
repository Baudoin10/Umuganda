
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Feather";
import { getMe } from "../Services/meAPI";
import { updateUserProfile } from "../Services/profileAPI";

const EditProfile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
        setFirstName(data.firstname || "");
        setLastName(data.lastname || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setSector(data.sector || "");
        setAddress(data.address || "");
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load user data.";
        Alert.alert("Error", msg);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleSave = async () => {
    try {
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !phone.trim() ||
        !sector.trim() ||
        !address.trim()
      ) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      const updateData = {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        sector: sector.trim(),
        address: address.trim(),
      };

      await updateUserProfile(user._id, updateData);

      Alert.alert("Success", "Profile updated successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Update failed. Try again.";
      Alert.alert("Error", msg);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently removed.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Add your delete account API call here
              // await deleteUserAccount(user._id);

              Alert.alert(
                "Account Deleted",
                "Your account has been successfully deleted.",
                [
                  {
                    text: "OK",
                    onPress: () =>
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                      }),
                  },
                ]
              );
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete account. Please try again."
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#26366C" />
        <Text style={styles.loadingText}>Loading profile data...</Text>
      </View>
    );
  }

  const avatarInitials =
    (firstName?.[0] || "").toUpperCase() + (lastName?.[0] || "").toUpperCase();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#26366C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatarText}>{avatarInitials}</Text>
          </View>
          <Text style={styles.userName}>
            {firstName} {lastName}
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your first name"
              autoCapitalize="words"
              placeholderTextColor="#b1b5c9"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Last Name *</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter your last name"
              autoCapitalize="words"
              placeholderTextColor="#b1b5c9"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#b1b5c9"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              placeholderTextColor="#b1b5c9"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Sector *</Text>
            <TextInput
              style={styles.input}
              value={sector}
              onChangeText={setSector}
              placeholder="Enter your sector"
              autoCapitalize="words"
              placeholderTextColor="#b1b5c9"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
              autoCapitalize="words"
              multiline
              numberOfLines={3}
              placeholderTextColor="#b1b5c9"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Icon
              name="check"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* Delete Account Section */}
        <View style={styles.dangerCard}>
          <View style={styles.dangerHeader}>
            <Icon name="alert-circle" size={20} color="#E53935" />
            <Text style={styles.dangerTitle}>Danger Zone</Text>
          </View>

          <Text style={styles.dangerText}>
            Deleting your account is permanent and cannot be undone. All your
            data will be lost.
          </Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <Icon
              name="trash-2"
              size={18}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: "5%",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222e4c",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#26366C",
    fontWeight: "500",
    marginTop: 12,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 8,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#26366C",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222e4c",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222e4c",
    marginBottom: 18,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222e4c",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F8FAFB",
    borderWidth: 1.5,
    borderColor: "#E3E7ED",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#222e4c",
  },
  textArea: {
    height: 90,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#26366C",
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dangerCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#E53935",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  dangerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E53935",
    marginLeft: 8,
  },
  dangerText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: "#E53935",
    flexDirection: "row",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default EditProfile;