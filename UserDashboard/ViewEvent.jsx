
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
// import { CalendarDays, MapPin } from 'lucide-react-native';
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from '@expo/vector-icons';
// import { IP } from "@env";

// const ViewEvent = () => {

//   const navigation = useNavigation();
//   const ip = IP;

//   const [events, setEvents] = useState([]); 
//   const [loading, setLoading] = useState(true); 
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch(`http://${ip}:3000/api/events`); 
//         const data = await response.json();

//         if (response.ok) {
//           setEvents(data);
//         } else {
//           console.error('Failed to fetch events');
//         }
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchEvents();
//   }, []);


//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   // Event Card
//   const EventCard = ({ event }) => (
//     <View style={{
//       margin: 10,
//       padding: 15,
//       backgroundColor: 'white',
//       borderRadius: 10,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 4 },
//       shadowOpacity: 0.3,
//       shadowRadius: 5,
//       elevation: 5,
//     }}>
//       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{event.title}</Text>
//       <Text style={{ fontSize: 14, color: '#6e6e6e' }}>{event.description}</Text>
//       <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
//         <CalendarDays color="#6e6e6e" />
//         <Text style={{ fontSize: 12, marginLeft: 5 }}>{event.date}</Text>
//       </View>
//       <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
//         <MapPin color="#6e6e6e" />
//         <Text style={{ fontSize: 12, marginLeft: 5 }}>{event.address}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 15 }}>
//       <TouchableOpacity
//         onPress={() => navigation.navigate("user")}
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           marginTop: "10%",
//           paddingVertical: 10,
//         }}
//       >
//         <Ionicons
//           name='arrow-back'
//           size={24}
//           color='black'
//           style={{ marginRight: 5 }}
//         />
//         <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
//       </TouchableOpacity>
//       <Text
//         style={{
//           fontSize: 22,
//           fontWeight: "600",
//           marginBottom: 15,
//           marginTop: "3%",
//         }}
//       >
//         Upcoming Events
//       </Text>
//       <FlatList
//         data={events}
//         keyExtractor={(item) => item._id.toString()}
//         renderItem={({ item }) => <EventCard event={item} />}
//       />
//     </View>
//   );
// };

// export default ViewEvent;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CalendarDays, MapPin } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { IP } from "@env";

const ViewEvent = () => {
  const navigation = useNavigation();
  const ip = IP;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Events");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://${ip}:3000/api/events`);
        const data = await response.json();

        if (response.ok) {
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
        navigation.navigate("Profile");
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
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 15,
        paddingBottom: 80,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("user")}
        style={styles.backButton}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          style={{ marginRight: 5 }}
        />
        <Text style={{ fontSize: 16, color: "black" }}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <EventCard event={item} />}
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
            <Icon
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: "3%",
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
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDescription: {
    fontSize: 14,
    color: "#6e6e6e",
  },
  eventDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  eventDetailText: {
    fontSize: 12,
    marginLeft: 5,
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

export default ViewEvent;
