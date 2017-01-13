import React, { Component } from 'react';
import { AppRegistry, View, Text, ListView, StyleSheet } from 'react-native';
import Accordion from 'react-native-accordion';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../shared/styles';
import aleofy from '../shared/aleo';

const AleoText = aleofy(Text);
const BoldAleoText = aleofy(Text, 'Bold'); 
const downIcon = (<Icon name="chevron-down"/>);
const upIcon = (<Icon name="chevron-up"/>);

class AccordionMenu extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        dataSource: ds.cloneWithRows(this._genRows({})),
    };
  }
 
  render() {
    console.log(this.state.dataSource);
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  }
 
  _renderRow(rowData) {

    var header = (

      <View style={styles.header}>
        <View style = {{flex: 1}}>
          <Text style = {{fontFamily: 'Aleo'}}>{rowData[0]}</Text>
        </View>
        <View style = {{flex: 1}}>
          <Text style = {{fontFamily: 'Aleo'}}>{rowData[1]}</Text>
        </View>
        <View style = {{flex: 1}}>
          <Text style = {{textAlign: 'right'}}>{downIcon}</Text>
        </View>
      </View>
    );

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
        header={header}
        content={content}
        easing="easeOutCubic"
      />
    );
  }

  _genRows() {
    //these are the data needed for schedule information.
    var dataBlob = [];

    //array to modify in firebase [event time, event name, event description, event company, event location]
    var scheduleInfo = 
    [["DATEHEADER", "April xxth"],
    ["00:00 AM", "Intro", "introducing blah blah", "FINRA", "hi"], 
    ["00:00 PM", "Next One", "no one cares blah", "Google", "hello"],
    ["DATEHEADER", "April xxth"],
    ["00:00 PM", "Last", "generic content lol", "MITRE", "sohai"]];

    //arbitrary data blobs for accordion menu's sections
    for(var i = 0; i < scheduleInfo.length; i++){
      dataBlob.push(scheduleInfo[i]);
    }

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
  header: {
        paddingTop: 20,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#e5d8ce',
        flex: 1, 
        flexDirection: 'row'
  },
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