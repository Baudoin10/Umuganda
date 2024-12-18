


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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
