import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const Home = ({ navigation }) => {
  const upcomingEvents = [
    {
      id: "1",
      title: "Umuganda Cleaning - Kimironko",
      date: "Dec 20, 2024",
      time: "8:00 AM",
    },
    {
      id: "2",
      title: "Community Planting - Kicukiro",
      date: "Jan 5, 2025",
      time: "9:00 AM",
    },
    {
      id: "3",
      title: "Community Planting - Kacyiru",
      date: "Jan 5, 2025",
      time: "9:00 AM",
    },
    {
      id: "4",
      title: "Community Planting - Gikondo",
      date: "Jan 5, 2025",
      time: "9:00 AM",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome! phionah</Text>
      <Text style={styles.sectionTitle}>Upcoming Events</Text>

      <FlatList
        data={upcomingEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDetails}>
              {item.date} at {item.time}
            </Text>
          </View>
        )}
      />

     
      <View style={styles.quickLinks}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Task")}
        >
          <Text style={styles.buttonText}>Task </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Attendance")}
        >
          <Text style={styles.buttonText}>Attendance </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Participation")}
        >
          <Text style={styles.buttonText}>Participation </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    marginTop: 100
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  eventCard: {
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginVertical: 5,
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
  eventDetails: {
    fontSize: 14,
    color: "#555",
  },
  quickLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: "green",
    borderRadius: 10,
    margin: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15
  },
});

export default Home;
