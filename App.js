import { StatusBar } from "expo-status-bar";
import { enableExpoCliLogging } from "expo/build/logs/Logs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/loginScreen";
import { AppTabNavigator } from "./components/BottomTabNavigator";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const SwitchNavigator = createSwitchNavigator({
  LoginScreen: LoginScreen,
  AppTabNavigator: AppTabNavigator,
});

const AppContainer = createAppContainer(SwitchNavigator);
