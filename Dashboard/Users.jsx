


import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: "1",
      email: "josh@example.com",
      phone: "0788123456",
      address: "Kigali, Rwanda",
    },
    {
      id: "2",
      email: "janesmith@example.com",
      phone: "0788654321",
      address: "Nyarutarama, Rwanda",
    },
    {
      id: "3",
      email: "mikebrown@example.com",
      phone: "0788987654",
      address: "Kacyiru, Rwanda",
    },
  ]);

  const handleDelete = (id) => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        },
      },
    ]);
  };

  const renderHeader = () => (
    <View style={[styles.row, styles.header]}>
      <Text style={[styles.headerCell, { flex: 2 }]}>Email</Text>
      <Text style={[styles.headerCell, { flex: 1 }]}>Phone</Text>
      <Text style={[styles.headerCell, { flex: 1 }]}>Address</Text>
      <Text style={[styles.headerCell, { width: 70 }]}>Action</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 2 }]}>{item.email}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.phone}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.address}</Text>
      <TouchableOpacity
        style={[styles.cell, styles.deleteButton, { width: 70 }]}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#F0F0F0",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  headerCell: {
    padding: 12,
    fontWeight: "bold",
    fontSize: 14,
  },
  cell: {
    padding: 12,
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#DC3545",
    margin: 6,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Users;