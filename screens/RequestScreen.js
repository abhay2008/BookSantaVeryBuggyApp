import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import MyHeader from "../components/Header";
import firebase from "firebase";
import { auth, db } from "../config";
import { KeyboardAvoidingView } from "react-native";

export default class RequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      bookName: "",
      reasonToRequest: "",
    };
  }

  addBookRequest = (bookName, reasonToRequest) => {
    if (bookName.trim() !== '' && reasonToRequest.trim() !== '') {
      let userId = this.state.userId;
    let requestId = Math.random().toString(36).substring(7);
    db.collection("requestedBooks").add({
      userId: userId,
      bookName: bookName,
      reasonToRequest: reasonToRequest,
      requestId: requestId,
    });
    this.setState({ bookName: "", reasonToRequest: "" });
    ToastAndroid.show("Book Requested Successfully!", ToastAndroid.SHORT);
    } else if (bookName.trim() === '' && reasonToRequest.trim() !== ''){
      ToastAndroid.show("Please enter book name", ToastAndroid.SHORT);
    } else if (bookName.trim() !== '' && reasonToRequest.trim() === '') {
      ToastAndroid.show("Please enter the reason to request the book!", ToastAndroid.SHORT);
    } else if (bookName.trim() === '' && reasonToRequest.trim() === ''){
      ToastAndroid.show("Please enter information in the fields above!!", ToastAndroid.SHORT);
    }
    
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="RequestBook" />
        <KeyboardAvoidingView style={styles.keyBoardStyle} behavior="height">
          <TextInput
            style={[styles.textInput, { height: 50, marginTop: 60 }]}
            placeholder={"enter book name"}
            placeholderTextColor="#0a7082"
            onChangeText={(text) => this.setState({ bookName: text })}
            value={this.state.bookName}
          />
          <TextInput
            style={[styles.textInput, { height: 300 }]}
            placeholder={"why do you need the book?"}
            placeholderTextColor="#0a7082"
            onChangeText={(text) => this.setState({ reasonToRequest: text })}
            value={this.state.reasonToRequest}
            multiline
            numberOfLines={8}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addBookRequest(
                this.state.bookName,
                this.state.reasonToRequest
              );
            }}
          >
            <Text style={styles.buttonText}>RequestButton</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "75%",
    height: 40,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    fontSize: 17,
    backgroundColor: "#c6f5f7",
    borderColor: "#189fed",
  },
  button: {
    width: "55%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#16c9c0",
    shadowColor: "#2a2e2e",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 30,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
