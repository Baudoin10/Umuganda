
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
import Notification from "../Dashboard/Notification";
import Profile from "../Dashboard/Profile";
import EditProfile from "../Dashboard/EditProfile";
import Users from "../Dashboard/Users";
import Introduction from "../Screens/Introduction"; 
import ListTask from "../Dashboard/ListTask";
import Event from "../Dashboard/Event";
import Chart from "../Dashboard/Chart";
import EventDetails from "../Screens/EventDetails";
import UserDashboard from "../UserDashboard/UserDashboard";
import ViewEvent from "../UserDashboard/ViewEvent";
import ViewTask from "../UserDashboard/ViewTask";


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Introduction">
        <Stack.Screen
          name="Introduction"
          component={Introduction}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="Participation" component={Participation} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="History" component={HistoryEvent} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="user" component={UserDashboard} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="ListTask" component={ListTask} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="Chart" component={Chart} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="ViewEvent" component={ViewEvent} />
        <Stack.Screen name="ViewTask" component={ViewTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
