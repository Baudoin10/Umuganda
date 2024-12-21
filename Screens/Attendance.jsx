
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

      <View style={styles.checkInSection}>
        {!hasCheckedIn ? (
          <>
            <View style={styles.statusCard}>
              <Text style={styles.checkInText}>Today's Status</Text>
              <Text style={styles.pendingText}>Not Checked In</Text>
            </View>
            <TouchableOpacity
              style={styles.checkInButton}
              onPress={handleCheckIn}
            >
              <Text style={styles.checkInButtonText}>Check In Now</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.statusCard}>
            <Text style={styles.checkInText}>Today's Status</Text>
            <Text style={styles.checkedInText}>Successfully Checked In</Text>
          </View>
        )}
      </View>

      <View style={styles.historySection}>
        <Text style={styles.historyHeader}>Attendance History</Text>
        <FlatList
          data={attendanceHistory}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.eventName}>{item.event}</Text>
              <Text style={styles.eventDate}>{item.date}</Text>
              <View
                style={[
                  styles.statusContainer,
                  {
                    backgroundColor:
                      item.status === "Present" ? "#e8f5e9" : "#ffebee",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.eventStatus,
                    {
                      color: item.status === "Present" ? "#2e7d32" : "#c62828",
                    },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

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
    backgroundColor: "#ffffff",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "black",
    marginBottom: 20,
  },
  checkInSection: {
    marginBottom: 24,
  },
  statusCard: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkInText: {
    fontSize: 16,
    color: "#616161",
    marginBottom: 8,
    fontWeight: "500",
  },
  pendingText: {
    fontSize: 18,
    color: "#f57c00",
    fontWeight: "600",
  },
  checkedInText: {
    fontSize: 18,
    color: "#2e7d32",
    fontWeight: "600",
  },
  checkInButton: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#1a237e",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  checkInButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  historySection: {
    flex: 1,
  },
  historyHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 16,
  },
  historyItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: "#616161",
    marginBottom: 8,
  },
  statusContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  eventStatus: {
    fontSize: 14,
    fontWeight: "500",
  },
  backButton: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: "#1a237e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Attendance;