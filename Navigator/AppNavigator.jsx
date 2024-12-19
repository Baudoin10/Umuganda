
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import Task from "../Screens/Task";
import Participation from "../Screens/Participation";
import Attendance from "../Screens/Attendance";
import HistoryEvent from "../Screens/HistoryEvent";
import Dashboard from "../Dashboard/Dashboard";
import Feedback from "../Dashboard/Feedback";
import Notification from "../Dashboard/Notification";
import Profile from "../Dashboard/Profile";
import EditProfile from "../Dashboard/EditProfile";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false, // Hides the header when navigating to Home
          }}
        />

        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="Participation" component={Participation} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="History" component={HistoryEvent} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Feedbac" component={Feedback} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
