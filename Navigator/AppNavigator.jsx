import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "../Screens/Homescreen";
import Beanscreen from "../Screens/Beanscreen";
import Cartscreen from "../Screens/Cartscreen";
import Paymentscreen from "../Screens/Payementscreen";
import Orderscreen from "../Screens/Orderscreen";
import Cofescreen from "../Screens/Cofescreen";
import Espressoscreen from "../Screens/Espressoscreen";
import SecondCart from "../Screens/SecondCart";
import Store from "../Store/Store";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Robusta Beans" component={Beanscreen} />
        <Stack.Screen name="Cofe" component={Cofescreen} />
        <Stack.Screen name="Cart" component={Cartscreen} />
        <Stack.Screen name="Payment" component={Paymentscreen} />
        <Stack.Screen name="OrderHistory" component={Orderscreen} />
        <Stack.Screen name="Cappuccino" component={Espressoscreen} />
        <Stack.Screen name="Second" component={SecondCart} />
      </Stack.Navigator>
      <Stack.Screen name="Store" component={Store} />
    </NavigationContainer>
  );
};

export default AppNavigator;
