import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

const Attendance = ({ navigation }) => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const attendanceHistory = [
    {
      id: "1",
      event: "Community Cleaning - Kimironko",
      date: "Nov 20, 2024",
      status: "Present",
    },
    {
      id: "2",
      event: "Tree Planting - Kicukiro",
      date: "Oct 15, 2024",
      status: "Absent",
    },
    {
      id: "3",
      event: "Market Cleaning - Nyarutarama",
      date: "Sep 25, 2024",
      status: "Present",
    },
  ];

  const handleCheckIn = () => {
    setHasCheckedIn(true);
    Alert.alert(
      "Check-In Successful",
      "You have checked in for today's event!"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Attendance</Text>

      {/* Check-In Section */}
      {!hasCheckedIn ? (
        <View style={styles.checkInSection}>
          <Text style={styles.checkInText}>You haven’t checked in yet!</Text>
          <TouchableOpacity
            style={styles.checkInButton}
            onPress={handleCheckIn}
          >
            <Text style={styles.checkInButtonText}>Check In Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.checkInSection}>
          <Text style={styles.checkedInText}>
            You have successfully checked in for today's event.
          </Text>
        </View>
      )}

      {/* Attendance History */}
      <Text style={styles.historyHeader}>Your Attendance History</Text>
      <FlatList
        data={attendanceHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.eventName}>{item.event}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
            <Text
              style={[
                styles.eventStatus,
                { color: item.status === "Present" ? "#28A745" : "#FF5733" },
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />

      {/* Back to Home Button */}
        <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  checkInSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  checkInText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  checkedInText: {
    fontSize: 16,
    color: "#28A745",
    textAlign: "center",
  },
  checkInButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
  },
  checkInButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  historyHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  eventStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },
  backButton: {
    margin: 20,
    paddingVertical: 16,
    backgroundColor: "#2196F3",
    borderRadius: 12,
    shadowColor: "#2196F3",
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  backButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Attendance;
