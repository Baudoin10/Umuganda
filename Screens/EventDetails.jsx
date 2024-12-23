import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EventDetails = ({ route }) => {
  // Normally you'd get this from route.params or props
  const eventDetails = {
    id: 1,
    title: "Road Cleaning Initiative",
    date: "December 28, 2024",
    time: "8:00 AM - 12:00 PM",
    location: "Kacyiru Sector, KG 7 Ave",
    description:
      "Join us for our monthly road cleaning activity. We'll focus on clearing drainage systems and removing litter from the streets. Please bring water and wear appropriate clothing.",
    organizer: "Kacyiru Sector Office",
    participants: 45,
    maxParticipants: 60,
    requirements: [
      "Wear sturdy shoes",
      "Bring water bottle",
      "Bring work gloves if possible",
    ],
    coordinates: {
      latitude: -1.9441,
      longitude: 30.0619,
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/400x200" }}
          style={styles.headerImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.eventTitle}>{eventDetails.title}</Text>
        </View>
      </View>

      {/* Key Info Cards */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="calendar" size={24} color="#2196F3" />
          <Text style={styles.infoText}>{eventDetails.date}</Text>
        </View>
        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={24}
            color="#2E7D32"
          />
          <Text style={styles.infoText}>{eventDetails.time}</Text>
        </View>
      </View>

      {/* Location Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="map-marker" size={24} color="#2196F3" />
          <Text style={styles.sectionTitle}>Location</Text>
        </View>
        <Text style={styles.sectionContent}>{eventDetails.location}</Text>
        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapButtonText}>View on Map</Text>
        </TouchableOpacity>
      </View>

      {/* Description Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="information"
            size={24}
            color="#2196F3"
          />
          <Text style={styles.sectionTitle}>Description</Text>
        </View>
        <Text style={styles.sectionContent}>{eventDetails.description}</Text>
      </View>

      {/* Requirements Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="clipboard-list"
            size={24}
            color="#2196F3"
          />
          <Text style={styles.sectionTitle}>Requirements</Text>
        </View>
        {eventDetails.requirements.map((requirement, index) => (
          <View key={index} style={styles.requirementItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="#2196F3"
            />
            <Text style={styles.requirementText}>{requirement}</Text>
          </View>
        ))}
      </View>

      {/* Participants Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="account-group"
            size={24}
            color="#2196F3"
          />
          <Text style={styles.sectionTitle}>Participants</Text>
        </View>
        <Text style={styles.participantsText}>
          {eventDetails.participants} / {eventDetails.maxParticipants}{" "}
          participants
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${
                  (eventDetails.participants / eventDetails.maxParticipants) *
                  100
                }%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Join Button */}
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join This Activity</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    height: 200,
    position: "relative",
  },
 
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#2196F3",
    padding: 15,
  },
  eventTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    padding: 15,
    gap: 10,
  },
  infoCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    gap: 10,
    elevation: 2,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  sectionContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  mapButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  mapButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  requirementText: {
    fontSize: 14,
    color: "#666",
  },
  participantsText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2196F3",
  },
  joinButton: {
    backgroundColor: "#2196F3",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventDetails;
