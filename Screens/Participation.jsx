// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";

// const Participation = ({ navigation }) => {
//   const participationData = [
//     {
//       id: "1",
//       event: "Umuganda Cleaning - Kimironko",
//       date: "Nov 20, 2024",
//       status: "Attended",
//     },
//     {
//       id: "2",
//       event: "Community Planting - Kicukiro",
//       date: "Oct 15, 2024",
//       status: "Missed",
//     },
//     {
//       id: "3",
//       event: "Market Cleaning - Nyarutarama",
//       date: "Sep 25, 2024",
//       status: "Attended",
//     },
//     {
//       id: "4",
//       event: "Road Cleaning - Remera",
//       date: "Aug 10, 2024",
//       status: "Attended",
//     },
//   ];

//   const totalEvents = participationData.length;
//   const attendedEvents = participationData.filter(
//     (item) => item.status === "Attended"
//   ).length;
//   const missedEvents = totalEvents - attendedEvents;
//   const participationRate = ((attendedEvents / totalEvents) * 100).toFixed(2);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Participation Summary</Text>

//       {/* Overview Section */}
//       <View style={styles.overview}>
//         <View style={styles.overviewCard}>
//           <Text style={styles.overviewTitle}>Total Events</Text>
//           <Text style={styles.overviewValue}>{totalEvents}</Text>
//         </View>
//         <View style={styles.overviewCard}>
//           <Text style={styles.overviewTitle}>Attended</Text>
//           <Text style={styles.overviewValue}>{attendedEvents}</Text>
//         </View>
//         <View style={styles.overviewCard}>
//           <Text style={styles.overviewTitle}>Missed</Text>
//           <Text style={styles.overviewValue}>{missedEvents}</Text>
//         </View>
//         <View style={styles.overviewCard}>
//           <Text style={styles.overviewTitle}>Participation Rate</Text>
//           <Text style={styles.overviewValue}>{participationRate}%</Text>
//         </View>
//       </View>

//       {/* Participation List */}
//       <Text style={styles.sectionHeader}>Event Details</Text>
//       <FlatList
//         data={participationData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.eventCard}>
//             <Text style={styles.eventTitle}>{item.event}</Text>
//             <Text style={styles.eventDate}>{item.date}</Text>
//             <Text
//               style={[
//                 styles.eventStatus,
//                 { color: item.status === "Attended" ? "#28A745" : "#FF5733" },
//               ]}
//             >
//               {item.status}
//             </Text>
//           </View>
//         )}
//       />

//       {/* Back Button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.navigate("Home")}
//       >
//         <Text style={styles.backButtonText}>Back to Home</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9f9f9",
//     padding: 25,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 15,
//   },
//   overview: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
    
   
  
//   },
//   overviewCard: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 10,
//     marginHorizontal: 5,
//     borderRadius: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
  
//   },
//   overviewTitle: {
//     fontSize: 14,
//     color: "#555",
//   },
//   overviewValue: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   sectionHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   eventCard: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   eventTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   eventDate: {
//     fontSize: 14,
//     color: "#555",
//     marginVertical: 5,
//   },
//   eventStatus: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   backButton: {
//    margin: 20,
//     paddingVertical: 16,
//     backgroundColor: "#2196F3",
//     borderRadius: 12,
//     shadowColor: "#2196F3",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     }
//   },
//   backButtonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });

// export default Participation;


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

      <View style={styles.overview}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Total Events</Text>
          <Text style={styles.overviewValue}>{totalEvents}</Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Attended</Text>
          <Text style={[styles.overviewValue, styles.attendedValue]}>
            {attendedEvents}
          </Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Missed</Text>
          <Text style={[styles.overviewValue, styles.missedValue]}>
            {missedEvents}
          </Text>
        </View>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Rate</Text>
          <Text style={[styles.overviewValue, styles.rateValue]}>
            {participationRate}%
          </Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Event Details</Text>

      <FlatList
        data={participationData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.event}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor:
                    item.status === "Attended" ? "#e8f5e9" : "#ffebee",
                },
              ]}
            >
              <Text
                style={[
                  styles.eventStatus,
                  { color: item.status === "Attended" ? "#2e7d32" : "#c62828" },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />

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
  overview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewTitle: {
    fontSize: 12,
    color: "black",
    marginBottom: 8,
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },
  attendedValue: {
    color: "black",
  },
  missedValue: {
    color: "#c62828",
  },
  rateValue: {
    color: "#1565c0",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 16,
  },
  eventCard: {
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
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a237e",
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

export default Participation;