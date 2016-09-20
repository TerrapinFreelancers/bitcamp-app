import React, { Component } from 'react';
import { Animated,TouchableHighlight, ScrollView, View, Text } from 'react-native';

export default class ScheduleScene extends Component {
  static get defaultProps() {
    return {
      title: 'Schedule'
    };
  }

  render() {
    return (
      <ScrollView>
        <ScheduleElement eventName="Test1" eventTime={new Date()}
          eventInfo = "lsjl eljk  dmm,xnv iowe k lsf wl ksjdfjio"/>
        <ScheduleElement eventName="Test2" eventTime={new Date()}
          eventInfo = "alsjljio elkj ew lksd kmx,cvo wlks djweio"/>
        <ScheduleElement eventName="Test3" eventTime={new Date()}
          eventInfo = "something alkjd adlkajfadkdkkflle ldjsf oiwe"/>
      </ScrollView>
    )
  }
};

class ScheduleElement extends Component{

  constructor(props){
    super(props);
    this.icons = {
      up: "UP",
      down: "DOWN"
    };
    this.elementHeight = 50;
    this.state = {
      expanded: true,
      animation: new Animated.Value()
    };
  }

  static get defaultProps() {
    return {
      eventName: "N/A",
      eventTime: new Date(),
      eventInfo: ""
    };
  }

  toggle(){
    let initialValue, finalValue;
    if (this.state.expanded){
      initialValue = this.state.maxHeight + this.state.minHeight;
      finalValue = this.state.minHeight;
    }else{
      finalValue = this.state.maxHeight + this.state.minHeight;
      initialValue = this.state.minHeight;
    }
    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();


  }

  setMaxHeight(event){
    this.setState({
        maxHeight: event.nativeEvent.layout.height
    });
  }

  setMinHeight(event){
    this.setState({
        minHeight: event.nativeEvent.layout.height
    });
  }

  render(){
    let icon = this.icons.down;
    if (this.state.expanded){
      icon = this.icons.up;
    }
    return (
      <Animated.View style={{height:this.state.animation, overflow:'hidden'}}>
        <TouchableHighlight onPress={this.toggle.bind(this)}>
          <View style={{flex: 1, flexDirection: 'row', height: this.elementHeight,
                        backgroundColor: 'powderblue', borderColor:'black',
                        borderStyle: 'solid', borderWidth: 1, alignItems: 'center'}}
                        onLayout={this.setMinHeight.bind(this)}>
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
                <Text style={{textAlign: "right"}}>{icon}
                </Text>
              </View>
          </View>
        </TouchableHighlight>
        <View onLayout={this.setMaxHeight.bind(this)}>
          <Text>{this.props.eventInfo}</Text>
        </View>
      </Animated.View>
    );
  }
};

ScheduleElement.propTypes = {
  eventName: React.PropTypes.string.isRequired,
  eventTime: React.PropTypes.object.isRequired,
  eventInfo: React.PropTypes.string
};
