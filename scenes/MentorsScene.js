import React, { Component } from 'react';
import { View, Text, WebView, ScrollView } from 'react-native';

export default class MentorsScene extends Component {
  static get defaultProps() {
    return {
      title: 'Mentors'
    };
  }

  render() {
    return (
      <WebView
        source={{uri: 'http://mentorship.bitca.mp/'}} 

      />
    );
  }
}
