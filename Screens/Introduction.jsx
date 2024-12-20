


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function Introduction() {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={require("C:/Users/GIS/Desktop/umuganda/umuganda/assets/logo.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to the Umuganda App!</Text>
          <Text style={styles.description}>
            Connecting communities and fostering collaboration for a brighter
            Rwanda. Join us in making a difference through monthly Umuganda
            activities!
          </Text>
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 26,
    letterSpacing: 0.3,
    opacity: 0.9,
    
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default Introduction;