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
import firebaseApp from '../shared/firebase';

/*// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCDA47vn27sRJVu575IcduceK7ahZsWrJA",
  authDomain: "bitcamp-app.firebaseapp.com",
  databaseURL: "https://bitcamp-app.firebaseio.com/",
  storageBucket: ""
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
*/
const AleoText = aleofy(Text);
const BoldAleoText = aleofy(Text, 'Bold');
const downIcon = (<Icon name="chevron-down"/>);
const upIcon = (<Icon name="chevron-up"/>);
const STORAGE_KEY = '@bitcampapp:schedule'; // the @ may need to be modified...

class ScheduleScene extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
    };
    console.log(firebaseApp);
    this.itemsRef = firebaseApp.database().ref();
  }

  listenForItems() {
    this.itemsRef.on('value', (snap) => {
      const jsonDataBlob = snap.exportVal();
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
    // make sure we aren't overwriting Firebase data with locally cached data
    this.fetchData().then(this.listenForItems.bind(this));
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        enableEmptySections // consider using section headers for each day
      />
    );
  }

  _renderRow(rowData) {
    //if the header is just a DATEHEADER, then create a new kind of date header
    if (rowData.type === 'DATEHEADER') {
      return (
        <View style={styles.dateHeader}>
          <BoldAleoText style={{color: '#ffffff'}}>{rowData.date}</BoldAleoText>
        </View>
      );
    } else {
      return (
        <Accordion time={rowData.time} title={rowData.name} >
          <View style={{
            backgroundColor: '#ffffff'
          }}>
            <Text style={styles.content}>{rowData.description}</Text>
            <Text style={styles.content}>Company: {rowData.company}</Text>
            <Text style={styles.content}>Location: {rowData.location}</Text>
          </View>
        </Accordion>
      );
    }
  }
}

const styles = StyleSheet.create({

  dateHeader: {
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#a9a9a9',
    backgroundColor: '#ffaf3f',
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

export default ScheduleScene;
