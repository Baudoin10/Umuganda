// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";

// const Task = ({ navigation }) => {
//   const [tasks, setTasks] = useState([
//     {
//       id: "1",
//       title: "Clean Kimironko Market Area",
//       description: "Sweep and collect garbage in the market area.",
//       status: "Pending",
//     },
//     {
//       id: "2",
//       title: "Plant Trees at Kicukiro Park",
//       description: "Help plant 10 trees in the designated area.",
//       status: "In Progress",
//     },
//     {
//       id: "3",
//       title: "Paint Community Hall Walls",
//       description: "Assist in painting the walls of the community hall.",
//       status: "Completed",
//     },
//   ]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Your Assigned Tasks</Text>
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.taskCard}>
//             <Text style={styles.taskTitle}>{item.title}</Text>
//             <Text style={styles.taskDescription}>{item.description}</Text>
//             <Text style={styles.taskStatus}>
//               Status: <Text style={styles.statusText}>{item.status}</Text>
//             </Text>
//             <View style={styles.buttonGroup}>
//               <TouchableOpacity
//                 style={[styles.button, styles.detailsButton]}
//                 onPress={() => alert(`Details for: ${item.title}`)}
//               >
//                 <Text style={styles.buttonText}>View Details</Text>
//               </TouchableOpacity>
//               {item.status === "Pending" && (
//                 <TouchableOpacity
//                   style={[styles.button, styles.completeButton]}
//                   onPress={() => alert(`Task Completed: ${item.title}`)}
//                 >
//                   <Text style={styles.buttonText}>Mark as Completed</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>
//         )}
//       />
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
//     padding: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 15,
//   },
//   taskCard: {
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
//   taskTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   taskDescription: {
//     fontSize: 14,
//     color: "#555",
//     marginVertical: 5,
//   },
//   taskStatus: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   statusText: {
//     color: "#007BFF",
//   },
//   buttonGroup: {
//     flexDirection: "row",
//     marginTop: 10,
//     justifyContent: "space-between",
//   },
//   button: {
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   detailsButton: {
//     backgroundColor: "#007BFF",
//   },
//   completeButton: {
//     backgroundColor: "#28A745",
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   backButton: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: "#007BFF",
//     borderRadius: 10,
//     alignSelf: "center",
//     width: "60%",
//   },
//   backButtonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });

// export default Task;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

const Task = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Clean Kimironko Market Area",
      description: "Sweep and collect garbage in the market area.",
      status: "Pending",
    },
    {
      id: "2",
      title: "Plant Trees at Kicukiro Park",
      description: "Help plant 10 trees in the designated area.",
      status: "In Progress",
    },
    {
      id: "3",
      title: "Paint Community Hall Walls",
      description: "Assist in painting the walls of the community hall.",
      status: "Completed",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FF9800";
      case "In Progress":
        return "#2196F3";
      case "Completed":
        return "#4CAF50";
      default:
        return "#666";
    }
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <View style={styles.taskTitleContainer}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <View 
            style={[
              styles.statusBadge, 
              { backgroundColor: getStatusColor(item.status) }
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.taskDescription}>{item.description}</Text>
      
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => alert(`Details for: ${item.title}`)}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
        
        {item.status === "Pending" && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => alert(`Task Completed: ${item.title}`)}
          >
            <Text style={styles.completeButtonText}>Mark as Completed</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Tasks</Text>
        <Text style={styles.subHeaderText}>Manage your assigned activities</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.taskList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666",
  },
  taskList: {
    padding: 20,
    paddingTop: 10,
  },
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskHeader: {
    marginBottom: 12,
  },
  taskTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  detailsButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  detailsButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  completeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
  },
  completeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  backButton: {
    margin: 20,
    paddingVertical: 16,
    backgroundColor: "#2196F3",
    borderRadius: 12,
    shadowColor: "#2196F3",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Task;
