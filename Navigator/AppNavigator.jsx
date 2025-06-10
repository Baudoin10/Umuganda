
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import Task from "../Dashboard/Task";
import Dashboard from "../Dashboard/Dashboard";
import Notification from "../Dashboard/Notification";
import Profile from "../UserDashboard/Profile";
import Users from "../Dashboard/Users";
import Introduction from "../Screens/Introduction"; 
import ListTask from "../Dashboard/ListTask";
import Event from "../Dashboard/Event";
import Chart from "../Dashboard/Chart";
import UserDashboard from "../UserDashboard/UserDashboard";
import ViewEvent from "../UserDashboard/ViewEvent";
import ViewTask from "../UserDashboard/ViewTask";
import joinEvent from "../UserDashboard/joinEvent";
import EventForm from "../UserDashboard/EventForm";
import Viewnotifications from "../UserDashboard/Viewnotifications";
import EditProfile from "../UserDashboard/EditProfile";


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Introduction"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Introduction" component={Introduction} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="user" component={UserDashboard} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="ListTask" component={ListTask} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="Chart" component={Chart} />
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