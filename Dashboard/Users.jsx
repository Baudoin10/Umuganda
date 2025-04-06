
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    let token = localStorage.getItem("token");
    axios({
      url: "http://localhost:3000/api/users",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const allUsers = response.data;
        setUsers(allUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      let token = localStorage.getItem("token");
      axios({
        url: `http://localhost:3000/api/users/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          fetchUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const renderHeader = () => (
    <View style={[styles.row, styles.header]}>
      <Text style={[styles.headerCell, { flex: 2 }]}>Firstname</Text>
      <Text style={[styles.headerCell, { flex: 1 }]}>Lastname</Text>
      <Text style={[styles.headerCell, { flex: 1 }]}>username</Text>
      <Text style={[styles.headerCell, { width: 70 }]}>Email</Text>
    </View>
  );

  const renderItem = ({ item: user }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 2 }]}>{user.firstname}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{user.lastname}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{user.username}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{user.email}</Text>
      <TouchableOpacity
        style={[styles.cell, styles.deleteButton, { width: 70 }]}
        onPress={() => handleDeleteUser(user._id)}
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
