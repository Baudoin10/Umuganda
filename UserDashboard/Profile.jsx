
// import React, { useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/Feather";
// import { getMe } from "../Services/meAPI";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("Settings");
//   const navigation = useNavigation();

//   useFocusEffect(
//     useCallback(() => {
//       let isActive = true;
//       const loadUser = async () => {
//         try {
//           const data = await getMe();
//           if (isActive) setUser(data);
//         } catch (err) {
//           console.error(
//             "Failed to fetch user:",
//             err?.response?.data || err?.message || err
//           );
//         }
//       };
//       loadUser();
//       return () => {
//         isActive = false;
//       };
//     }, [])
//   );

//   const handleTabPress = (tabId) => {
//     setActiveTab(tabId);
//     switch (tabId) {
//       case "Home":
//         navigation.navigate("user");
//         break;
//       case "Events":
//         navigation.navigate("ViewEvent");
//         break;
//       case "Community":
//         navigation.navigate("joinEvent");
//         break;
//       case "Discuss":
//         navigation.navigate("view");
//         break;
//       case "Settings":
//         navigation.navigate("Profile");
//         break;
//     }
//   };

//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Logout",
//           style: "destructive",
//           onPress: () => {
//             navigation.reset({
//               index: 0,
//               routes: [{ name: "Login" }],
//             });
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const bottomTabs = [
//     { id: "Home", title: "Home", icon: "home" },
//     { id: "Events", title: "Events", icon: "calendar" },
//     { id: "Community", title: "Community", icon: "users" },
//     { id: "Discuss", title: "Notification", icon: "bell" },
//     { id: "Settings", title: "Settings", icon: "settings" },
//   ];

//   if (!user) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//         <Text style={styles.loadingText}>Loading your profile...</Text>
//       </View>
//     );
//   }

//   const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//     (user.firstname || "") + " " + (user.lastname || "")
//   )}&background=4f8cff&color=fff&size=128&rounded=true`;

//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff" }}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.avatarWrapper}>
//             <Image
//               source={{ uri: avatarUrl }}
//               style={styles.avatar}
//               resizeMode="cover"
//             />
//           </View>
//           <Text style={styles.name}>
//             {user.firstname} {user.lastname}
//           </Text>
//         </View>

       

//         <View style={styles.formCard}>
//           <TextInput
//             style={styles.input}
//             value={user.firstname}
//             editable={false}
//             placeholder="First Name"
//             placeholderTextColor="#b1b5c9"
//           />
//           <TextInput
//             style={styles.input}
//             value={user.lastname}
//             editable={false}
//             placeholder="Last Name"
//             placeholderTextColor="#b1b5c9"
//           />
//           <TextInput
//             style={styles.input}
//             value={user.email}
//             editable={false}
//             placeholder="Email"
//             placeholderTextColor="#b1b5c9"
//           />
//           <TextInput
//             style={styles.input}
//             value={user.phone}
//             editable={false}
//             placeholder="Phone Number"
//             placeholderTextColor="#b1b5c9"
//           />
//           <TextInput
//             style={styles.input}
//             value={user.sector}
//             editable={false}
//             placeholder="Sector"
//             placeholderTextColor="#b1b5c9"
//           />
//           <TextInput
//             style={styles.input}
//             value={user.address}
//             editable={false}
//             placeholder="Address"
//             placeholderTextColor="#b1b5c9"
//           />

//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate("EditProfile")}
//           >
//             <Text style={styles.buttonText}>Edit Profile</Text>
//           </TouchableOpacity>
//         </View>

//       </ScrollView>

//       {/* Bottom Tabs */}
//       <View style={styles.bottomTabContainer}>
//         {bottomTabs.map((tab) => (
//           <TouchableOpacity
//             key={tab.id}
//             style={[
//               styles.tabButton,
//               activeTab === tab.id && styles.activeTabButton,
//             ]}
//             onPress={() => handleTabPress(tab.id)}
//           >
//             <Icon
//               name={tab.icon}
//               size={24}
//               color={activeTab === tab.id ? "#4CAF50" : "#999"}
//             />
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === tab.id && styles.activeTabText,
//               ]}
//             >
//               {tab.title}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: { padding: 24, paddingBottom: 120 },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   loadingText: { fontSize: 16, color: "#4f8cff", fontWeight: "500" },
//   header: { alignItems: "center", marginBottom: 28, marginTop: 30 },
//   avatarWrapper: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     backgroundColor: "#4CAF50",
//     borderWidth: 3,
//     borderColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 18,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.14,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   avatar: { width: 100, height: 100, borderRadius: 50 },
//   name: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#222e4c",
//     letterSpacing: 0.5,
//   },

//   input: {
//     backgroundColor: "#ffff",
//     borderWidth: 1,
//     borderColor: "#e3e7ed",
//     borderRadius: 10,
//     padding: 14,
//     marginBottom: 18,
//     fontSize: 16,
//     color: "#222e4c",
//   },
//   button: {
//     backgroundColor: "#26366C",
//     paddingVertical: 16,
//     borderRadius: 30,
//     marginTop: 10,
//     elevation: 3,
//   },

//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 17,
//     fontWeight: "bold",
//   },
//   bottomTabContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     backgroundColor: "#FFF",
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderTopWidth: 1,
//     borderTopColor: "#E9ECEF",
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 8,
//     paddingHorizontal: 4,
//   },
//   activeTabButton: {
//     backgroundColor: "rgba(76, 175, 80, 0.1)",
//     borderRadius: 8,
//   },
//   tabText: { fontSize: 11, color: "#999", marginTop: 4, fontWeight: "500" },
//   activeTabText: { color: "#4CAF50", fontWeight: "600" },
// });

// export default Profile;

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { getMe } from "../Services/meAPI";
import { Picker } from "@react-native-picker/picker";

const kigaliSectors = ["Nyarugenge", "Gasabo", "Kicukiro"]; // Kigali sectors

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Settings");
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const loadUser = async () => {
        try {
          const data = await getMe();
          if (isActive) setUser(data);
        } catch (err) {
          console.error(
            "Failed to fetch user:",
            err?.response?.data || err?.message || err
          );
        }
      };
      loadUser();
      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    switch (tabId) {
      case "Home":
        navigation.navigate("user");
        break;
      case "Events":
        navigation.navigate("ViewEvent");
        break;
      case "Community":
        navigation.navigate("joinEvent");
        break;
      case "Discuss":
        navigation.navigate("view");
        break;
      case "Settings":
        navigation.navigate("Profile");
        break;
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const bottomTabs = [
    { id: "Home", title: "Home", icon: "home" },
    { id: "Events", title: "Events", icon: "calendar" },
    { id: "Community", title: "Community", icon: "users" },
    { id: "Discuss", title: "Notification", icon: "bell" },
    { id: "Settings", title: "Settings", icon: "settings" },
  ];

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    (user.firstname || "") + " " + (user.lastname || "")
  )}&background=4f8cff&color=fff&size=128&rounded=true`;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: avatarUrl }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.name}>
            {user.firstname} {user.lastname}
          </Text>
        </View>

        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            value={user.firstname}
            editable={false}
            placeholder="First Name"
            placeholderTextColor="#b1b5c9"
          />
          <TextInput
            style={styles.input}
            value={user.lastname}
            editable={false}
            placeholder="Last Name"
            placeholderTextColor="#b1b5c9"
          />
          <TextInput
            style={styles.input}
            value={user.email}
            editable={false}
            placeholder="Email"
            placeholderTextColor="#b1b5c9"
          />
          <TextInput
            style={styles.input}
            value={user.phone}
            editable={false}
            placeholder="Phone Number"
            placeholderTextColor="#b1b5c9"
          />

          {/* Sector Picker (read-only) */}
          <View style={styles.input}>
            <Picker selectedValue={user.sector} enabled={false}>
              {kigaliSectors.map((sec) => (
                <Picker.Item key={sec} label={sec} value={sec} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            value={user.address}
            editable={false}
            placeholder="Address"
            placeholderTextColor="#b1b5c9"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.bottomTabContainer}>
        {bottomTabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(tab.id)}
          >
            <Icon
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? "#4CAF50" : "#999"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { padding: 24, paddingBottom: 120 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: { fontSize: 16, color: "#4f8cff", fontWeight: "500" },
  header: { alignItems: "center", marginBottom: 28, marginTop: 30 },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222e4c",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#ffff",
    borderWidth: 1,
    borderColor: "#e3e7ed",
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    fontSize: 16,
    color: "#222e4c",
  },
  button: {
    backgroundColor: "#26366C",
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  bottomTabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 8,
  },
  tabText: { fontSize: 11, color: "#999", marginTop: 4, fontWeight: "500" },
  activeTabText: { color: "#4CAF50", fontWeight: "600" },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 28,
    shadowColor: "#2d3142",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default Profile;
