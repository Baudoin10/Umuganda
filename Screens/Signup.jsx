// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";


// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Signup</Text>
//       </View>

//       <View style={styles.form}>
//         <View style={styles.inputGroup}>
//           <TextInput
//             style={styles.input}
//             placeholder="Username"
//             value={username}
//             onChangeText={setUsername}
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />
//         </View>

//         <TouchableOpacity style={styles.submitButton}>
//           <Text style={styles.submitText}>Signup</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.toggleButton}>
//           <Text style={styles.toggleText}>
//             Already have an account?{" "}
//             <Text
//               style={styles.log}
//               onPress={() => navigation.navigate("Login")}
//             >
//               Login
//             </Text>
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Signup;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#ffffff",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: "bold",
//   },
//   form: {
//     width: "100%",
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#d3d3d3",
//     padding: 10,
//     borderRadius: 5,
//     fontSize: 16,
//   },
//   submitButton: {
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 5,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   submitText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   toggleButton: {
//     alignItems: "center",
//   },
//   toggleText: {
//     color: "#007BFF",
//     fontSize: 16,
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Create Account</Text>
            <Text style={styles.subHeaderText}>Sign up to get started</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Choose a username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
              <Text style={styles.submitText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Signup;
