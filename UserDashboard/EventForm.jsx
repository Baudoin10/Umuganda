import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { fetchEvents, joinEvent } from "../Services/eventAPI";

import AsyncStorage from "@react-native-async-storage/async-storage";


const EventJoinForm = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Community");
  const navigation = useNavigation();
   const [userId, setUserId] = useState(null);
   const [joining, setJoining] = useState(false);



   useEffect(() => {
     const load = async () => {
       try {
         setLoading(true);

         // Load events
        const data = await fetchEvents();
         setEvents(Array.isArray(data) ? data : []);

         // Load userId from AsyncStorage (set elsewhere at login)
         const uid = await AsyncStorage.getItem("userId");
         if (uid) setUserId(uid);
       } catch (error) {
         console.error(error);
         Toast.show({ type: "error", text1: "Failed to fetch events" });
       } finally {
         setLoading(false);
       }
     };

     load();
   }, []);


   const handleJoinEvent = async () => {
     if (!selectedEventId) {
       Toast.show({ type: "error", text1: "Please select an event to join" });
       return;
     }
     if (!userId) {
       Toast.show({
         type: "error",
         text1: "Missing user info. Please login again.",
       });
       return;
     }

     try {
       setJoining(true);
       await joinEvent(selectedEventId, userId);

       Toast.show({ type: "success", text1: "Joined the event successfully!" });
       const data = await fetchEvents();
       setEvents(Array.isArray(data) ? data : []);
       setSelectedEventId(null);

       setTimeout(() => {
         navigation.navigate("user");
       }, 1200);
     } catch (error) {
       const msg =
         error?.response?.data?.message ||
         error?.response?.data?.error ||
         "Something went wrong";
       Toast.show({ type: "error", text1: msg });
     } finally {
       setJoining(false);
     }
   };


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

  const renderEventItem = (event) => {
    const isSelected = selectedEventId === event._id;
    return (
      <TouchableOpacity
        key={event._id}
        style={[styles.eventItem, isSelected && styles.selectedEvent]}
        onPress={() => setSelectedEventId(event._id)}
      >
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDate}>{event.date}</Text>
        <Text style={styles.eventAddress} numberOfLines={1}>
          {event.address}
        </Text>
        <View style={styles.participantsCount}>
          <Text style={styles.participantsText}>
            {event.participants?.length || 0} participants
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { paddingBottom: 80 }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Join Event</Text>
            <Text style={styles.subtitle}>Select an event to participate</Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Loading events...</Text>
            </View>
          ) : events.length === 0 ? (
            <View style={styles.noEventsContainer}>
              <Text style={styles.noEventsText}>No events available</Text>
            </View>
          ) : (
            <View style={styles.eventsContainer}>
              {events.map(renderEventItem)}
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.joinButton,
              !selectedEventId && styles.disabledButton,
            ]}
            onPress={handleJoinEvent}
            disabled={!selectedEventId || joining}
            activeOpacity={0.8}
          >
            {joining ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.joinButtonText}>JOIN EVENT</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
  },
  formContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    marginTop: "15%"
  },
  header: {
    borderRadius: 12,
    padding: 24,
    marginBottom: 25,
    backgroundColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "400",
  },
  loadingContainer: {
    padding: 30,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  noEventsContainer: {
    padding: 30,
    alignItems: "center",
  },
  noEventsText: {
    fontSize: 16,
    color: "#666",
  },
  eventsContainer: {
    marginBottom: 20,
  },
  eventItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e1e1e8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  selectedEvent: {
    borderColor: "#4CAF50",
    borderWidth: 2,
    backgroundColor: "rgba(76, 175, 80, 0.05)",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  eventAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  participantsCount: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  participantsText: {
    fontSize: 12,
    color: "#555",
  },
  joinButton: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#a5d6a7",
    opacity: 0.7,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
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

export default EventJoinForm;
