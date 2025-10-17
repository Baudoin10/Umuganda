

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
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
        navigation.navigate("Setting");
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
    <SafeAreaView style={styles.container}>
      {/* Header */}
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

      {/* Scrollable List */}
      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <EventCard event={item} navigation={navigation} />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Tabs */}
      <BottomTab
        tabs={bottomTabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
        activeColor="#999"
        iconComponent={MaterialIcons}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 10,
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
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
    backgroundColor: "#26366C",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  joinButtonText: {
    color: "white",
    fontWeight: "bold",
  },
 
});

export default JoinEvent;
