//credit for some of code goes to https://github.com/naoufal/react-native-accordion/tree/master/examples/AccordionExample

import React, { Component, PropTypes } from 'react';
import tweenState from 'react-tween-state';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../shared/styles';
import aleofy from '../shared/aleo';
const AleoText = aleofy(Text);
const downIcon = (<Icon name="chevron-down"/>);
const upIcon = (<Icon name="chevron-up"/>);

class HeaderComponent extends Component {

  setNativeProps(nativeProps){
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <View style={styles.header} ref={component => this._root = component}
            {...this.props} >
        <View style = {{flex: 1}}>
          <AleoText>{this.props.time}</AleoText>
        </View>
        <View style = {{flex: 1}}>
          <AleoText>{this.props.title}</AleoText>
        </View>
        <View style = {{flex: 1}}>
          <Text style = {{textAlign: 'right'}}>
            {this.props.on ? upIcon : downIcon}
          </Text>
        </View>
      </View>
    );
  }
}

const Accordion = React.createClass({
  mixins: [tweenState.Mixin],

  propTypes: {
    children: React.PropTypes.element.isRequired,
    time: React.PropTypes.string,
    title: React.PropTypes.string
  },

  getInitialState() {
    return {
      height: 0,
      contentHeight: 0 // need to measure this after mounting
    };
  },

  toggle() {
    this.tweenState('height', {
      easing: tweenState.easingTypes.easeOutCubic,
      duration: 300,
      endValue: this.state.height === 0 ? this.state.contentHeight : 0
    });
  },

  _onLayout(nativeEvent){
    //onLayout called after rendering. Need to set height
    //or else height is zero, and animation does not occur
    if (this.state.contentHeight === 0){
      this.setState({contentHeight: nativeEvent.nativeEvent.layout.height});
    }
  },

  render() {
    const header = (
      <TouchableHighlight
        onPress={this.toggle}
        underlayColor='#000000'
      >
        <HeaderComponent
          on={this.state.height > 0}
          time={this.props.time}
          title={this.props.title}
        />
      </TouchableHighlight>
    );

    return (
      <View style={{ overflow: 'hidden' }} >
        {header}
        <View style={{ height: this.getTweeningValue('height') }} >
          <View
            collapsable={false} // https://github.com/facebook/react-native/issues/3282
            onLayout={this._onLayout}
          >
            {this.props.children}
          </View>
        </View>
      </View>
    );
  }
});

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
  }
});

export default Accordion;
