import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";

const MyHeader = (props) => {
  return (
    <Header
      backgroundColor="#3497e3"
      centerComponent={{
        text: props.title,
        style: { color: "white", fontSize: 25, height: 70, fontWeight: "bold", padding: 15},
      }}
    />
  );
};
export default MyHeader;
