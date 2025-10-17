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
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { fetchEvents, joinEvent } from "../Services/eventAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomTab from "../Component/BottomTab/BottomTab";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");
const BOTTOM_TAB_HEIGHT = 80;

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

        const data = await fetchEvents();
        setEvents(Array.isArray(data) ? data : []);

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

      Toast.show({ type: "success", text1: "Hi you have join the event!" });
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
        navigation.navigate("Setting");
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
        activeOpacity={0.7}
      >
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDate}>{event.date}</Text>
        <Text style={styles.eventAddress} numberOfLines={2}>
          {event.address}
        </Text>
        <View style={styles.participantsCount}>
          <MaterialIcon name="people" size={16} color="#555" />
          <Text style={styles.participantsText}>
            {event.participants?.length || 0} participants
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Join An Event</Text>
            <View style={{ width: 32 }} />
          </View>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#26366C" />
                <Text style={styles.loadingText}>Loading events...</Text>
              </View>
            ) : events.length === 0 ? (
              <View style={styles.noEventsContainer}>
                <MaterialIcon name="event-busy" size={48} color="#ccc" />
                <Text style={styles.noEventsText}>No events available</Text>
                <Text style={styles.noEventsSubtext}>
                  Check back later for new events
                </Text>
              </View>
            ) : (
              <View style={styles.eventsContainer}>
                <Text style={styles.sectionTitle}>Available Events</Text>
                {events.map(renderEventItem)}
              </View>
            )}
          </ScrollView>

          {/* Join Button - Fixed at bottom of content area */}
          {!loading && events.length > 0 && (
            <View style={styles.buttonContainer}>
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
          )}
        </View>

        {/* Bottom Tabs */}
        <BottomTab
          tabs={bottomTabs}
          activeTab={activeTab}
          onTabPress={handleTabPress}
          activeColor="#999"
          iconComponent={MaterialIcons}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafc",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: "5",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
    marginBottom: BOTTOM_TAB_HEIGHT,
  },

  title: {
    fontSize: width > 375 ? 28 : 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: width > 375 ? 16 : 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "400",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#666",
  },
  noEventsContainer: {
    paddingVertical: 60,
    alignItems: "center",
  },
  noEventsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 15,
    marginBottom: 5,
  },
  noEventsSubtext: {
    fontSize: 14,
    color: "#999",
  },
  eventsContainer: {
    marginBottom: 10,
  },
  eventItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e1e1e8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedEvent: {
    borderColor: "#26366C",
    borderWidth: 2,
    backgroundColor: "rgba(76, 175, 80, 0.05)",
    transform: [{ scale: 1.02 }],
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
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
    marginBottom: 10,
    lineHeight: 20,
  },
  participantsCount: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  participantsText: {
    fontSize: 12,
    color: "#555",
    marginLeft: 4,
    fontWeight: "500",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f9fafc",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e8",
  },
  joinButton: {
    borderRadius: 12,
    backgroundColor: "#26366C",
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#a5d6a7",
    opacity: 0.6,
    shadowOpacity: 0.1,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },

});

export default EventJoinForm;
