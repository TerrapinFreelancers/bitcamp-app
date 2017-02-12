import React, { Component } from 'react';

import {AppRegistry,
        View,
        Text,
        ListView,
        StyleSheet,
        AsyncStorage} from 'react-native';
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
const STORAGE_KEY = '@bitcampapp:schedule'; // the @ may need to be modified...

class AccordionMenu extends Component {

  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        //dataSource: ds,
        dataSource: this.ds.cloneWithRows([]),
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
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jsonDataBlob.Schedule), function(error){
        if (error){
          console.log("Error: " + error);
        }
      });
    });
  }

  async fetchData(){
    let savedData = [];
    try{
      savedData = await AsyncStorage.getItem(STORAGE_KEY);
      savedData = JSON.parse(savedData);
      if (savedData === null) savedData = [{type:"DATEHEADER", date:"Schedule coming soon!"}];
    }catch(error){
      console.log('Error grabbing item from storage');
      console.log(error);
      savedData = [{type:"DATEHEADER", date:"Schedule coming soon!"}];
    }
    this.setState({
      dataSource: this.ds.cloneWithRows(savedData)
    });
  }

  componentDidMount() {
    console.log("in mounting function");
    this.fetchData().done();
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

    let content = <View></View>;
    let header;
    //if the header is just a DATE STAMP, then create a new kind of date header
    if(rowData.type == "DATEHEADER"){
      header = (
        <View style={styles.date_header}>
          <BoldAleoText style={{color: '#ffffff'}}>{rowData.date}</BoldAleoText>
        </View>
      );

      return (
        <Accordion
          type={rowData.type}
          header={header}
          content={content}
          activeOpacity={0}
          underlayColor={'#ffaf3f'}
          easing="easeOutCubic"
        />
      );
    }
    else{

      content = (
          <View style={{
            backgroundColor: '#ffffff'
          }}>
            <Text style={styles.content}>{rowData.description}</Text>
            <Text style={styles.content}>Company: {rowData.company}</Text>
            <Text style={styles.content}>Location: {rowData.location}</Text>
          </View>
      );

      // console.log('returning', toRet);
      return (
          <Accordion
            type={rowData.type}
            time={rowData.time}
            title={rowData.name}
            content={content}
            easing="easeOutCubic"
          />
        );
    }
  }

  _genRows() {
    //these are the data needed for schedule information.
    var dataBlob = [];

    // array of json objects to modify in firebase
    // format is as follows:
    // dateheader object has props type, date
    // event object has props type, time, name, location, description, company

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
