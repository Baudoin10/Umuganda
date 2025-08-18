
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

function Introduction() {
  const navigation = useNavigation();
  const handleNext = () => {
    navigation.navigate("Login");
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#1E3A8A", "#3B82F6", "#60A5FA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>U</Text>
            </View>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.title}>Welcome to Umuganda</Text>
            <Text style={styles.subtitle}>Community Service Platform</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.description}>
              Connecting communities and fostering collaboration for a brighter Rwanda. 
              Join us in making a difference through monthly Umuganda activities!
            </Text>
            
            <View style={styles.features}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>🤝</Text>
                </View>
                <Text style={styles.featureText}>Connect with volunteers</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>📍</Text>
                </View>
                <Text style={styles.featureText}>Find local projects</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>📊</Text>
                </View>
                <Text style={styles.featureText}>Track your impact</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.button}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginTop: 8,
  },
  divider: {
    height: 2,
    width: 60,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    alignSelf: "center",
    marginVertical: 24,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  features: {
    marginVertical: 20,
 
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
   marginLeft: 16
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  footer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#2563EB",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default Introduction;