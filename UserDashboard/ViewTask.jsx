
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Task = ({ taskDetails, photo }) => {
  const mapLocation = taskDetails.location ? JSON.parse(taskDetails.location) : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{taskDetails.title}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.text}>{taskDetails.description}</Text>

      <Text style={styles.label}>Date:</Text>
      <Text style={styles.text}>{taskDetails.date}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.text}>{taskDetails.status}</Text>

      {photo && (
        <>
          <Text style={styles.label}>Photo:</Text>
          <Image source={{ uri: photo }} style={styles.image} />
        </>
      )}

      {mapLocation && (
        <>
          <Text style={styles.label}>Location:</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: mapLocation.latitude,
              longitude: mapLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker coordinate={mapLocation} />
          </MapView>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  map: {
    height: 180,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Task;

