
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from 'react-native-toast-message';  // Import Toast

const Users = () => {
  const [users, setUsers] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const isSmallScreen = screenWidth < 380;

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get("http://192.168.1.39:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              await axios.delete(
                `http://192.168.1.39:3000/api/users/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              fetchUsers();
              Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'User deleted successfully',
              });
            } catch (error) {
              console.log(error);
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error deleting user',
              });
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const renderHeader = () => (
    <View style={[styles.row, styles.header]}>
      <Text style={[styles.headerCell, { flex: 3 }]} numberOfLines={1}>{isSmallScreen ? "First" : "Firstname"}</Text>
      <Text style={[styles.headerCell, { flex: 3 }]} numberOfLines={1}>{isSmallScreen ? "Last" : "Lastname"}</Text>
      <Text style={[styles.headerCell, { flex: 4 }]} numberOfLines={1}>Email</Text>
      <Text style={[styles.headerCell, { width: 50, textAlign: 'center' }]} numberOfLines={1}>Action</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 3 }]} numberOfLines={1}>{item.firstname}</Text>
      <Text style={[styles.cell, { flex: 3 }]} numberOfLines={1}>{item.lastname}</Text>
      <Text style={[styles.cell, { flex: 4 }]} numberOfLines={1}>{item.email}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteUser(item._id)}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        initialNumToRender={10}
      />
      <Toast /> {/* Toast container */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingRight: 8,
  },
  header: {
    backgroundColor: "#F0F0F0",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  headerCell: {
    padding: 8,
    fontWeight: "bold",
    fontSize: 13,
  },
  cell: {
    padding: 8,
    fontSize: 13,
  },
  deleteButton: {
    backgroundColor: "#DC3545",
    width: 36,
    height: 36,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
    marginRight: 8,
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Users;
