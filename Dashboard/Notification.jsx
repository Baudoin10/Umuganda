
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  Switch
} from "react-native";
import Toast from 'react-native-toast-message'; 
import { useNavigation } from "@react-navigation/native";

const Notification = () => {

  const ip = import.meta.env.VITE_IP;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBroadcast, setIsBroadcast] = useState(true);

  const handleCreateNotification = async () => {
    if (!title || !description) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Incomplete Form',
        text2: 'Please fill out both title and description.',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://${ip}:3000/api/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          message: description,
          targetUserIds: isBroadcast ? "all" : [],
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Notification Created',
          text2: `Successfully sent to ${isBroadcast ? 'all users' : 'selected users'}`,
          visibilityTime: 3000,
          autoHide: true,
        });

        setTimeout(() => {
          navigation.navigate("Dashboard");
        }, 3000);

        // Reset the form
        setTitle("");
        setDescription("");
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: data.message || 'Failed to create notification.',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Network error. Please check your connection.',
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Notification</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Notification Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title here"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Notification Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description here"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
      </View>
      
      <View style={styles.formGroup}>
        <View style={styles.broadcastRow}>
          <Text style={styles.label}>Send to all users</Text>
          <Switch
            value={isBroadcast}
            onValueChange={setIsBroadcast}
            trackColor={{ false: "#cccccc", true: "#a0d8a3" }}
            thumbColor={isBroadcast ? "#4CAF50" : "#f4f3f4"}
          />
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.createButton, (isLoading || !title || !description) && styles.disabledButton]} 
        onPress={handleCreateNotification}
        disabled={isLoading || !title || !description}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" size="small" />
        ) : (
          <Text style={styles.createButtonText}>Create Notification</Text>
        )}
      </TouchableOpacity>

      <Toast /> 
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
    marginBottom: '10%',
    textAlign: "left",
    color: "#333",
    marginTop: '22%',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  broadcastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  createButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,        
    paddingHorizontal: 20,      
    borderRadius: 8,           
    alignItems: "center",       
    marginTop: 20,              
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: "#4CAF50",
    elevation: 0,
  },
  createButtonText: {
    color: "#FFF",              
    fontSize: 17,              
    fontWeight: "bold",       
  },
});

export default Notification;