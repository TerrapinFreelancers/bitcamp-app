import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MentorsScene extends Component {
  static get defaultProps() {
    return {
      title: 'Mentors'
    };
  }

  render() {
    return (
      <View>
        <Text>Hi! My name is {this.props.title}.</Text>
      </View>
    )
  }
}
