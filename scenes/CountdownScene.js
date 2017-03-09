import React, { Component } from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
import Timer from './Timer.js';

const window = Dimensions.get('window');

// Variable background image
class CountdownScene extends Component {

  _getOpacity(image) {
    var time = new Date().getTime();
    var seconds = Math.floor((time % 86400000) / 1000);
    var hour = 3600;
    if (seconds > 5 * hour) {
      seconds = seconds - 5 * hour;
    } else {
      seconds = 24 * hour - 5 * hour + seconds;
    }
    var opacity;
    switch(image) {
      case 'day':
        if (seconds < 8 * hour || seconds > 18 * hour) {
          opacity = 0;
        } else if (seconds > 10 * hour && seconds <= 16 * hour) {
            opacity = 1;
        } else if (seconds < 10 * hour) {
            opacity = (seconds - 8 * hour) / (2 * hour);
        } else {
            opacity = (18 * hour - seconds) / (2 * hour);
        }
        break;
      case 'dawn':
        if (seconds < 4 * hour || seconds > 10 * hour) {
          opacity = 0;
        } else if (seconds > 6 * hour && seconds <= 8 * hour) {
          opacity = 1;
        } else if (seconds < 6 * hour) {
          opacity = (seconds - 4 * hour) / (2 * hour);
        } else {
          opacity = (10 * hour - seconds) / (2 * hour);
        }
        break;
      case 'dusk':
        if (seconds < 16 * hour || seconds > 22 * hour) {
          opacity = 0;
        } else if (seconds > 18 * hour && seconds <= 20 * hour) {
          opacity = 1;
        } else if (seconds < 18 * hour) {
          opacity = (seconds - 16 * hour) / (2 * hour);
        } else {
          opacity = (22 * hour - seconds) / (2 * hour);
        }
        break;
      case 'night':
        if (seconds > 6 * hour && seconds < 20 * hour) {
          opacity = 0;
        } else if (seconds > 22 * hour || seconds <= 4 * hour) {
          opacity = 1;
        } else if (seconds < 6 * hour) {
          opacity = 1 - (seconds - 4 * hour) / (2 * hour);
        } else {
          opacity = 1 - ((22 * hour - seconds) / (2 * hour));
        }
        break;
    }
    return opacity;
  }

  render() {
    return (

      <View
        style={styles.container}>
        <Image
          source={require('./images/bg1dawn4.png')}
          style={[styles.background, { opacity: this._getOpacity('dawn') }]} />
        <Image
          source={require('./images/bg2day4.png')}
          style={[styles.background, { opacity: this._getOpacity('day') }]} />
        <Image
          source={require('./images/bg3dusk4.png')}
          style={[styles.background, { opacity: this._getOpacity('dusk') }]} />
        <Image
          source={require('./images/bg4night4.png')}
          style={[styles.background, { opacity: this._getOpacity('night') }]} />
        <Timer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: window.height,
    width: window.width,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  // common styles for the background - to be merged into each Image's styles
  background: {
    flex: 1,
    height: window.height,
    width: window.width,
    backgroundColor: 'transparent',
    position: 'absolute'
  }
});

export default CountdownScene;
