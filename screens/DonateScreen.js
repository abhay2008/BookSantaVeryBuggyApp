import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { db, auth } from "../config";
import MyHeader from "../components/Header";
import { ListItem } from "react-native-elements";

export default class DonateScreen extends React.Component {
  constructor() {
    super();
    this.state = { requestedBookList: [] };
  }

  getRequestedBookList = () => {
    db.collection("requestedBooks").onSnapshot((snapshot) => {
      let requestedBookList = snapshot.docs.map((doc) => doc.data());
      this.setState({ requestedBookList: requestedBookList });
    });
  };

  componentDidMount() {
    this.getRequestedBookList();
    console.log(this.state.requestedBookList);
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.bookName}
      subTitle={item.reasonToRequest}
      titleStyle={{ color: "black", fontWeight: "bold" }}
      rightElement={
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  render() {
    return (
      <View>
        <MyHeader title="DonateScreen" />
        <View style={{ flex: 1 }}>
          {this.state.requestedBookList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List of all Requested Books</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestedBookList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {},
  buttonText: {},
  subcontainer: {},
});
