import React, { Component } from 'react';
import { ScrollView, Text, Image, Dimensions } from 'react-native';

export default class MapScene extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var window = Dimensions.get('window');
    return (
      <ScrollView>
        <Image 
          source={require('./images/floor_plan_2017.png')} 
          style={{
            width: window.width,
            height: window.height
          }}
        />
      </ScrollView>
    )
  }
}
