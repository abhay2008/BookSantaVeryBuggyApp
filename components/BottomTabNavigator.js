import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import DonateScreen from "../screens/DonateScreen";
import RequestScreen from "../screens/RequestScreen";

export const AppTabNavigator = createBottomTabNavigator({
  DonateScreen: {
    screen: DonateScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../assets/RequestList.jpeg")}
        />
      ),
      tabBarLabel: "DonateBooks",
    },
  },
  RequestScreen: {
    screen: RequestScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../assets/RequestBook.jpeg")}
        />
      ),
      tabBarLabel: "RequestBooks",
    },
  },
});
