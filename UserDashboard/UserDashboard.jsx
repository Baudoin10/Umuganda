// import React from 'react'

// const UserDashboard = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default UserDashboard
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import EventsScreen from "./screens/EventsScreen";
import TasksScreen from "./screens/TasksScreen";
import JoinUmugandaScreen from "./screens/JoinUmugandaScreen";
import { View, Text } from "react-native";

const Drawer = createDrawerNavigator();

const UserDashboard = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Events">
        <Drawer.Screen name="View Events" component={EventsScreen} />
        <Drawer.Screen name="Check Tasks" component={TasksScreen} />
        <Drawer.Screen name="Join Umuganda" component={JoinUmugandaScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default UserDashboard;
