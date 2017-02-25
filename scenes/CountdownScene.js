import React, { Component } from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
import Timer from './Timer.js';

const window = Dimensions.get('window');

// Variable background image
class CountdownScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      day: {
        flex: 1,
        height: window.height,
        width: window.width,
        backgroundColor: 'transparent',
        opacity: this._getOpacity('day'),
        position: 'absolute',
      },
      dawn: {
        flex: 1,
        height: window.height,
        width: window.width,
        backgroundColor: 'transparent',
        opacity: this._getOpacity('dawn'),
        position: 'absolute',
      },
      dusk: {
        flex: 1,
        height: window.height,
        width: window.width,
        backgroundColor: 'transparent',
        opacity: this._getOpacity('dusk'),
        position: 'absolute',
      },
      night: {
        flex: 1,
        height: window.height,
        width: window.width,
        backgroundColor: 'transparent',
        opacity: this._getOpacity('night'),
        position: 'absolute',
      },
    };
  };

  componentDidMount() {
    this.timer = setInterval(() => {

      this.setState({
        day: {
          flex: 1,
          height: window.height,
          width: window.width,
          backgroundColor: 'transparent',
          opacity: this._getOpacity('day'),
          position: 'absolute',
        },
        dawn: {
          flex: 1,
          height: window.height,
          width: window.width,
          backgroundColor: 'transparent',
          opacity: this._getOpacity('dawn'),
          position: 'absolute',
        },
        dusk: {
          flex: 1,
          height: window.height,
          width: window.width,
          backgroundColor: 'transparent',
          opacity: this._getOpacity('dusk'),
          position: 'absolute',
        },
        night: {
          flex: 1,
          height: window.height,
          width: window.width,
          backgroundColor: 'transparent',
          opacity: this._getOpacity('night'),
          position: 'absolute',
        },
      });

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  _getOpacity(image) {
    var time = new Date();
    var time = time.getTime();
    var seconds = Math.floor((time % 86400000) / 1000);
    var hour = 3600;
    if (seconds > 18000) {
      seconds = seconds - 18000;
    } else {
      seconds = 864000 - 18000 + seconds;
    }
    var opacity;
    switch(image) {
      case 'day':
        if (seconds < 8 * hour || seconds > 18 * hour) {
          opacity = 0;
        } else {
          if (seconds > 11 * hour && seconds < 16 * hour) {
            opacity = 1;
          } else {
            opacity = Math.abs(21600 - seconds + 21600) / 21600;
          }
        }
        break;
      case 'dawn':
        if (seconds > 11 * hour) {
          opacity = 0;
        } else {
          if (seconds > 5 * hour && seconds < 8 * hour) {
            opacity = 1;
          } else {
            opacity = Math.abs(21600 - seconds) / 21600;
          }
        }
        break;
      case 'dusk':
        if (seconds < 18 * hour) {
          opacity = 0;
        } else {
          if (seconds > 17 * hour && seconds < 20 * hour) {
            opacity = 1;
          } else {
            opacity = Math.abs(21600 - seconds + 43200) / 21600;
          }
        }
        break;
      case 'night':
        if (seconds > 4 * hour && seconds < 19 * hour) {
          opacity = 0;
        } else {
          if (seconds > 21 * hour ||  seconds < 2 * hour) {
            opacity = 1;
          } else {
            opacity = Math.abs(21600 - seconds + 64800) / 21600;
          }
        }
        break;
    }
    console.log(seconds);
    console.log(image);
    console.log(opacity);
    return opacity;
  }

  render() {
    return (

      <View
        style={styles.container}>
        <Image
          source={require('./images/bg1dawn4.png')}
          style={this.state.dawn} />
        <Image
          source={require('./images/bg2day4.png')}
          style={this.state.day} />
        <Image
          source={require('./images/bg3dusk4.png')}
          style={this.state.dusk} />
        <Image
          source={require('./images/bg4night4.png')}
          style={this.state.night} />
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
});

export default CountdownScene;
