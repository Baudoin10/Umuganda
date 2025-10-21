
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { CalendarDays, MapPin } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { fetchEvents } from "../Services/viewEventAPI";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTab from "../Component/BottomTab/BottomTab";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ViewEvent = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("Events");

  const loadEvents = useCallback(async () => {
    try {
      const data = await fetchEvents();
      setEvents(data || []);
    } catch (error) {
      console.error(
        "Error fetching events:",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
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
        navigation.navigate("user");
    }
  };

  const EventCard = ({ event }) => (
    <View style={styles.card}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <View style={styles.eventDetailRow}>
        <CalendarDays color="#6e6e6e" />
        <Text style={styles.eventDetailText}>{event.date}</Text>
      </View>
      <View style={styles.eventDetailRow}>
        <MapPin color="#6e6e6e" />
        <Text style={styles.eventDetailText}>{event.address}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const bottomTabs = [
    { id: "Home", title: "Home", icon: "home" },
    { id: "Events", title: "Events", icon: "event" },
    { id: "Community", title: "Community", icon: "people" },
    { id: "Discuss", title: "Notification", icon: "notifications" },
    { id: "Settings", title: "Settings", icon: "settings" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Events</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Event List */}
      <FlatList
        data={events}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <EventCard event={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadEvents} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
            No events available
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
      
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
  safeArea: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    margin: 10,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  eventTitle: { fontSize: 18, fontWeight: "bold" },
  eventDescription: { fontSize: 14, color: "#6e6e6e" },
  eventDetailRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  eventDetailText: { fontSize: 12, marginLeft: 5 },
 
});

export default ViewEvent;
