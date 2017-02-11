//credit for some of code goes to https://github.com/naoufal/react-native-accordion/tree/master/examples/AccordionExample

'use strict';

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
const downIcon = (<Icon name="chevron-down"/>);
const upIcon = (<Icon name="chevron-up"/>);


class HeaderComponent extends Component{
  constructor(props){
    super(props);
    this.state = {on:false};
    console.log(this.state.on);
  }

  setNativeProps(nativeProps){
    this._root.setNativeProps(nativeProps);
  }

  render(){
    var icon;
    if (this.props.on) {
      icon = upIcon;
    } else {
      icon = downIcon;
    }

    return (
      <View style={styles.header} ref={component => this._root = component} {...this.props}>
          <View style = {{flex: 1}}>
            <Text style = {{fontFamily: 'Aleo'}}>{this.props.time}</Text>
          </View>
          <View style = {{flex: 1}}>
            <Text style = {{fontFamily: 'Aleo'}}>{this.props.title}</Text>
          </View>
          <View style = {{flex: 1}}>
            <Text style = {{textAlign: 'right'}}>{icon}</Text>
          </View>
      </View>
    );
  }
}

var Accordion = React.createClass({
  mixins: [tweenState.Mixin],

  propTypes: {
    activeOpacity: React.PropTypes.number,
    animationDuration: React.PropTypes.number,
    content: React.PropTypes.element.isRequired,
    easing: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    header: React.PropTypes.element,
    onPress: React.PropTypes.func,
    underlayColor: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      activeOpacity: 1,
      animationDuration: 300,
      easing: 'linear',
      expanded: false,
      underlayColor: '#000',
      style: {}
    };
  },

  getInitialState() {
    return {
      is_visible: false,
      height: 0,
      content_height: 0
    };
  },

  close() {
    this.state.is_visible && this.toggle();
  },

  open() {
    !this.state.is_visible && this.toggle();
  },

  toggle() {
    this.state.is_visible = !this.state.is_visible;

    this.tweenState('height', {
      easing: tweenState.easingTypes[this.props.easing],
      duration: this.props.animationDuration,
      endValue: this.state.height === 0 ? this.state.content_height : 0
    });
  },

  _onPress() {
    this.toggle();
    if (this.props.onPress) {
      this.props.onPress.call(this);
    }
  },

  _getContentHeight() {
    if (this.refs.AccordionContent) {
      this.refs.AccordionContent.measure((ox, oy, width, height, px, py) => {
        // Sets content height in state
        this.setState({
          height: this.props.expanded ? height : 0,
          content_height: height
        });
      });
    }
  },

  componentDidMount() {
    // Gets content height when component mounts
    // without setTimeout, measure returns 0 for every value.
    // See https://github.com/facebook/react-native/issues/953
    setTimeout(this._getContentHeight);
  },

  render() {
    let header;
    if (this.props.type === "EVENT"){
      header = (<TouchableHighlight
                  onPress={this._onPress}
                  underlayColor={this.props.underlayColor}
                  style={this.props.style}
                  >
                  <HeaderComponent
                    on={this.state.is_visible}
                    time={this.props.time}
                    title={this.props.title}
                    />
                </TouchableHighlight>);
    }else{
      header = (<View
                  underlayColor={this.props.underlayColor}
                  style={this.props.style}
                  >
                  {this.props.header}
                </View>);
    }

    return (
      /*jshint ignore:start */
      <View
        style={{
          overflow: 'hidden'
        }}
      >
        {header}
        <View
          ref="AccordionContentWrapper"
          style={{
            height: this.getTweeningValue('height')
          }}
        >
          <View ref="AccordionContent">
            {this.props.content}
          </View>
        </View>
      </View>
      /*jshint ignore:end */
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

module.exports = Accordion;
