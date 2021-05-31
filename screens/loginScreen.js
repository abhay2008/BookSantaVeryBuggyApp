import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { db, auth } from "../config";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isModalVisible: false,
      firstName: "",
      lastName: "",
      mobileNumber: 0,
      address: "",
      confirmPassword: "",
    };
  }

  login = async (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('DonateScreen');
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  signUp = async (email, password, confirmPassword) => {
    if (password != confirmPassword) {
      return alert("Password doesn't match  ¯\\_ (ツ)_/¯ ");
    } else {
      auth.createUserWithEmailAndPassword(email, password).then(() => {
        db.collection("users").add({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          mobileNumber: this.state.mobileNumber,
          emailId: this.state.email,
          address: this.state.address,
        });
        return alert("User added successfully!", "", [
          {
            text: "OK",
            onPress: () => {
              this.setState({ isModalVisible: false });
            },
          },
        ]);
      }).catch((error)=>{return alert(error.message)});
    }
  };

  renderModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: "100%", height: '100%' }}>
            <KeyboardAvoidingView style={styles.keyBoardAvoidingContainer}>
              <Text style={styles.modelTitle}>Registration</Text>
              <TextInput
                style={styles.modalTextInput}
                placeholder={"FirstName"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
              />
              <TextInput
                style={styles.modalTextInput}
                placeholder={"LastName"}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
              />
              <TextInput
                style={styles.modalTextInput}
                placeholder={"Contact"}
                maxLength={10}
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({ mobileNumber: text });
                }}
              />
              <TextInput
                style={styles.modalTextInput}
                placeholder={"Address"}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
              />
              <TextInput
                style={styles.modalTextInput}
                placeholder={"Email"}
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  this.setState({ email: text });
                }}
              />
              <TextInput
                style={styles.modalTextInput}
                placeholder={"Password"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              />
              <TextInput
                style={styles.modalTextInput}
                placeholder={"ConfirmPassword"}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
              />
              <View style={{flexDirection: 'row',}}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}
                >
                  <MaterialIcons name="cancel" size={55} color="maroon" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    this.signUp(
                      this.state.email,
                      this.state.password,
                      this.state.confirmPassword
                    );
                  }}
                >
                  <FontAwesome name="sign-in" size={50} color="blue" />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {this.renderModal()}
        </View>
        <View
          style={{ backgroundColor: "transparent", width: "100%", height: 30 }}
        ></View>
        <View style={styles.header}>
          <Text style={styles.title}>WelcomeScreen</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            height: "60%",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            value={this.state.email}
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry
            value={this.state.password}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              this.login(this.state.email, this.state.password);
            }}
            style={[styles.button, { marginTop: 30 }]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({isModalVisible: true})
            }}
            style={[
              styles.button,
              {
                marginTop: 30,
                width: 120,
                backgroundColor: "#68851a",
                borderColor: "#cabe34",
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: "#98ff28" }]}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: 330,
    height: 55,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#89DCF3",
    backgroundColor: "#C6BEE4",
    margin: 10,
    padding: 10,
    color: "#190FAB",
    fontSize: 19,
  },
  modalTextInput: {
    width: 330,
    height: 55,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#109beb",
    backgroundColor: "#42d6aa",
    margin: 10,
    paddingLeft: 23,
    color: "#190FAB",
    fontSize: 19,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#BBE9D9",
  },
  title: {
    fontSize: 35,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#003153",
  },
  header: {
    backgroundColor: "#6161EA",
    width: "100%",
    height: 100,
    justifyContent: "center",
  },
  button: {
    width: 110,
    height: 50,
    backgroundColor: "#228c63",
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#15d5a8",
  },
  buttonText: {
    fontSize: 25,
    color: "#aafff9",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2adeeb',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 40,
    marginBottom: 70,
    borderWidth: 3,
  },
  keyBoardAvoidingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  modelTitle: {
    fontSize: 35,
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  registerButton: {
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  cancelButton: {
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
    marginRight: 50,
  }
});
