


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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    {
      id: "4",
      email: "sarah@example.com",
      phone: "0788111222",
      address: "Remera, Rwanda",
    },
    {
      id: "5",
      email: "peter@example.com",
      phone: "0788333444",
      address: "Kimihurura, Rwanda",
    },
    {
      id: "6",
      email: "mary@example.com",
      phone: "0788555666",
      address: "Gisozi, Rwanda",
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

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === 1 && styles.paginationButtonDisabled,
        ]}
        onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
      >
        <Text style={styles.paginationButtonText}>Previous</Text>
      </TouchableOpacity>

      <View style={styles.paginationInfo}>
        <Text style={styles.paginationText}>
          Page {currentPage} of {totalPages}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === totalPages && styles.paginationButtonDisabled,
        ]}
        onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.paginationButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <FlatList
        data={paginatedUsers}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        ListFooterComponent={renderPagination}
        ListFooterComponentStyle={styles.paginationWrapper}
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
  paginationWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  paginationButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  paginationButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  paginationButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },
  paginationInfo: {
    marginHorizontal: 20,
  },
  paginationText: {
    fontSize: 14,
    color: "#666",
  },
});

export default Users;