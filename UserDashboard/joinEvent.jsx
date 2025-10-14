
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { fetchEvents } from "../Services/eventAPI";
import { Ionicons } from "@expo/vector-icons";

const EventCard = ({ event, navigation }) => (
  <View style={styles.card}>
    <Text style={styles.eventTitle}>{event.title}</Text>
    <Text style={styles.eventDescription}>{event.description}</Text>
    <View style={styles.eventDetails}>
      <Icon name="calendar" size={16} color="#6e6e6e" />
      <Text style={styles.eventInfo}>{event.date}</Text>
    </View>
    <View style={styles.eventDetails}>
      <Icon name="map-pin" size={16} color="#6e6e6e" />
      <Text style={styles.eventInfo}>{event.address}</Text>
    </View>
    <Text style={styles.eventStatus(event.status)}>{event.status}</Text>
    {event.status === "Open" && (
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => navigation.navigate("EventForm", { eventId: event._id })}
      >
        <Text style={styles.joinButtonText}>Join Event</Text>
      </TouchableOpacity>
    )}
  </View>
);

const JoinEvent = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Community");


  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          "Error fetching events:",
          error?.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);


  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case "Home":
        navigation.navigate("user");
        break;
      case "Events":
        navigation.navigate("ViewEvent");
        break;
      case "Community":
        navigation.navigate("joinEvent");
        break;
      case "Discuss":
        navigation.navigate("view");
        break;
      case "Settings":
        navigation.navigate("Profile");
        break;
      default:
        break;
    }
  };

  const bottomTabs = [
    { id: "Home", title: "Home", icon: "home" },
    { id: "Events", title: "Events", icon: "event" },
    { id: "Community", title: "Community", icon: "people" },
    { id: "Discuss", title: "Notification", icon: "notifications" },
    { id: "Settings", title: "Settings", icon: "settings" },
  ];

  if (loading) {
    return <Text style={{ padding: 20 }}>Loading events...</Text>;
  }

  return (
    <View style={[styles.container, { paddingBottom: 80 }]}>
       <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Events</Text>
              <View style={{ width: 32 }} />
            </View>

      <Text style={styles.pageTitle}>Choose The Events to join</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <EventCard event={item} navigation={navigation} />
        )}
      />

      {/* Bottom Tabs */}
      <View style={styles.bottomTabContainer}>
        {bottomTabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(tab.id)}
          >
            <MaterialIcon
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? "#4CAF50" : "#999"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: "19%",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: "10%",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDescription: {
    fontSize: 14,
    color: "#6e6e6e",
    marginTop: 5,
  },
  eventDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  eventInfo: {
    fontSize: 12,
    marginLeft: 5,
    color: "#6e6e6e",
  },
  eventStatus: (status) => ({
    fontSize: 14,
    marginTop: 8,
    fontWeight: "bold",
    color: status === "Open" ? "green" : "red",
  }),
  joinButton: {
    marginTop: 15,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  joinButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomTabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 8,
  },
  tabText: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
});

export default JoinEvent;
