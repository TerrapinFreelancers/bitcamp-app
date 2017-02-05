import React, { Component } from 'react';

import { AppRegistry, View, Text, ListView, StyleSheet } from 'react-native';
import Accordion from './Accordion'

import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../shared/styles';
import aleofy from '../shared/aleo';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCDA47vn27sRJVu575IcduceK7ahZsWrJA",
  authDomain: "bitcamp-app.firebaseapp.com",
  databaseURL: "https://bitcamp-app.firebaseio.com/",
  storageBucket: ""
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const AleoText = aleofy(Text);
const BoldAleoText = aleofy(Text, 'Bold');
const downIcon = (<Icon name="chevron-down"/>);
const upIcon = (<Icon name="chevron-up"/>);

class AccordionMenu extends Component {

  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
        //dataSource: ds,
        dataSource: this.ds.cloneWithRows(this._genRows({})),
    };
    this.itemsRef = this.getRef();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      console.log("some snapshot received");
      var jsonDataBlob = snap.exportVal();
      this.setState({
        dataSource: this.ds.cloneWithRows(jsonDataBlob.Schedule)
      });

    });
  }

  componentDidMount() {
    console.log("in mounting function");
    this.listenForItems(this.itemsRef);
  }

  render() {

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  }

  getRef() {
    console.log("ref requested");
    return firebaseApp.database().ref();
  }

  _renderRow(rowData) {

    var content = <View></View>;

    //if the header is just a DATE STAMP, then create a new kind of date header
    if(rowData[0] == "DATEHEADER"){
      header = (
        <View style={styles.date_header}>
          <BoldAleoText style={{color: '#ffffff'}}>{rowData[1]}</BoldAleoText>
        </View>
      );

      return (
      <Accordion
        header={header}
        content={content}
        activeOpacity={0}
        underlayColor={'#ffaf3f'}
        easing="easeOutCubic"
      />
    );
    }

    content = (
        <View style={{
          backgroundColor: '#ffffff'
        }}>
          <Text style={styles.content}>{rowData[2]}</Text>
          <Text style={styles.content}>Company: {rowData[3]}</Text>
          <Text style={styles.content}>Location: {rowData[4]}</Text>
        </View>
    );

    // console.log('returning', toRet);
    return (
      <Accordion
        time={rowData[0]}
        title={rowData[1]}
        header={header}
        content={content}
        easing="easeOutCubic"
      />
    );
  }

  _genRows() {
    //these are the data needed for schedule information.
    var dataBlob = [];

    // array to modify in firebase [event time, event name, event description, event company, event location]
    // format is as follows:
    // [["DATEHEADER", "April xxth"],
    // ["00:00 AM", "Intro", "introducing blah blah", "FINRA", "hi"],
    // ["00:00 PM", "Next One", "no one cares blah", "Google", "hello"],
    // ["DATEHEADER", "April xxth"],
    // ["00:00 PM", "Last", "generic content lol", "MITRE", "sohai"]];


    return dataBlob;
  }

}

export default class ScheduleScene extends Component {

  static get defaultProps() {
    return {
      title: 'Schedule'
    };
  }

  render() {
    return (
      <AccordionMenu/>
    );
  }
}

const styles = StyleSheet.create({

  date_header: {
       paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#ffaf3f'
  },
  content: {
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        color: '#000',
  },
  text: {
    flex: 1,
  },
});
