import React, { Component } from 'react';
import { TouchableHighlight, ScrollView, View, Text } from 'react-native';

export default class ScheduleScene extends Component {
  static get defaultProps() {
    return {
      title: 'Schedule'
    };
  }

  render() {
    return (
      <ScrollView>
        <ScheduleElement eventName="Test1" eventTime={new Date()} />
        <ScheduleElement eventName="Test2" eventTime={new Date()} />
        <ScheduleElement eventName="Test3" eventTime={new Date()} />

      </ScrollView>
    )
  }
};

class ScheduleElement extends Component{

  constructor(props){
    super(props);
  }

  _onPressExpand() {
    console.log("you tapped the button!");
  }

  render(){
    return (
      <TouchableHighlight onPress={this._onPressExpand}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'row', height: 50,
                        backgroundColor: 'powderblue', borderColor:'black',
                        borderStyle: 'solid', borderWidth: 1, alignItems: 'center'}}>
              <View style={{flex:1}}>
                <Text>{this.props.eventTime.getMonth()}/
                {this.props.eventTime.getDate()} {this.props.eventTime.getHours()}:
                {this.props.eventTime.getMinutes()}
                </Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{textAlign: "center"}}>{this.props.eventName}
                </Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{textAlign: "right"}}>Dropdown
                </Text>
              </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
};

ScheduleElement.propTypes = {
  eventName: React.PropTypes.string.isRequired,
  eventTime: React.PropTypes.object.isRequired,
  eventInfo: React.PropTypes.string
};
