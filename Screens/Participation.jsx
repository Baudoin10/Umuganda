import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const Participation = ({ navigation }) => {
  const participationData = [
    {
      id: "1",
      event: "Umuganda Cleaning - Kimironko",
      date: "Nov 20, 2024",
      status: "Attended",
    },
    {
      id: "2",
      event: "Community Planting - Kicukiro",
      date: "Oct 15, 2024",
      status: "Missed",
    },
    {
      id: "3",
      event: "Market Cleaning - Nyarutarama",
      date: "Sep 25, 2024",
      status: "Attended",
    },
    {
      id: "4",
      event: "Road Cleaning - Remera",
      date: "Aug 10, 2024",
      status: "Attended",
    },
  ];

  const totalEvents = participationData.length;
  const attendedEvents = participationData.filter(
    (item) => item.status === "Attended"
  ).length;
  const missedEvents = totalEvents - attendedEvents;
  const participationRate = ((attendedEvents / totalEvents) * 100).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Participation Summary</Text>

      {/* Overview Section */}
      <View style={styles.overview}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Total Events</Text>
          <Text style={styles.overviewValue}>{totalEvents}</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Attended</Text>
          <Text style={styles.overviewValue}>{attendedEvents}</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Missed</Text>
          <Text style={styles.overviewValue}>{missedEvents}</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Participation Rate</Text>
          <Text style={styles.overviewValue}>{participationRate}%</Text>
        </View>
      </View>

      {/* Participation List */}
      <Text style={styles.sectionHeader}>Event Details</Text>
      <FlatList
        data={participationData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.event}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
            <Text
              style={[
                styles.eventStatus,
                { color: item.status === "Attended" ? "#28A745" : "#FF5733" },
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />

      {/* Back Button */}
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
    padding: 25,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    
   
  
  },
  overviewCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  
  },
  overviewTitle: {
    fontSize: 14,
    color: "#555",
  },
  overviewValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventCard: {
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
  eventTitle: {
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
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignSelf: "center",
    width: "60%",
  },
  backButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Participation;
