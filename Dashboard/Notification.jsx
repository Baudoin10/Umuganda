import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Notification = () => {
  const notifications = [
    {
      title: "Umuganda Scheduled",
      description:
        "Your Umuganda session is scheduled for this Saturday at 7:00 AM at Nyarutarama.",
      time: "2 days ago",
    },
    {
      title: "Umuganda Confirmation",
      description:
        "Thank you for confirming your participation in this month's Umuganda activity.",
      time: "1 day ago",
    },
    {
      title: "Umuganda Completion",
      description:
        "You have successfully completed this week's Umuganda activities at Kagugu.",
      time: "4 hours ago",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {notifications.map((notification, index) => (
        <View key={index} style={styles.notificationCard}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationDescription}>
            {notification.description}
          </Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Mark as Read" color="#007BFF" />
            <Button title="Delete" color="#DC3545" />
          </View>
        </View>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  notificationTitle: {
    fontWeight: "bold",
  },
  notificationDescription: {
    marginVertical: 5,
  },
  notificationTime: {
    color: "#555",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
});


export default Notification;
