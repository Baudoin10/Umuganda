import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import Introduction from "../Screens/Introduction";

// User Dashboard screens
import UserDashboard from "../UserDashboard/UserDashboard";
import Profile from "../UserDashboard/Profile";
import ViewEvent from "../UserDashboard/ViewEvent";
import ViewTask from "../UserDashboard/ViewTask";
import joinEvent from "../UserDashboard/joinEvent";
import EventForm from "../UserDashboard/EventForm";
import Viewnotifications from "../UserDashboard/Viewnotifications";
import EditProfile from "../UserDashboard/EditProfile";
import Setting from "../UserDashboard/Setting";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Introduction"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Introduction" component={Introduction} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />

        {/* User-related screens */}
        <Stack.Screen name="user" component={UserDashboard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="ViewEvent" component={ViewEvent} />
        <Stack.Screen name="ViewTask" component={ViewTask} />
        <Stack.Screen name="joinEvent" component={joinEvent} />
        <Stack.Screen name="EventForm" component={EventForm} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="view" component={Viewnotifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
