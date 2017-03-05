import React, { Component } from 'react';
import { Text, Image, View, Dimensions, StyleSheet, ScrollView } from 'react-native';

import { colors } from '../shared/styles';
import aleofy from '../shared/aleo';

const AleoText = aleofy(Text);
const BoldAleoText = aleofy(Text, 'Bold'); 
const window = Dimensions.get('window');

// A countdown to the event and then to end of hacking
class Timer extends Component {

  constructor(props) {
    super(props);
    var values = this._getTime();
    this.state = {
      days: values[0],
      hours: values[1],
      minutes: values[2],
      seconds: values[3],
      displayMessage: values[4],
    };
  };

  componentDidMount() {
    this.timer = setInterval(() => {

      var values = this._getTime();
      this.setState({
        days: values[0],
        hours: values[1],
        minutes: values[2],
        seconds: values[3],
        message: values[4],
      });

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  _getTime() {
    var time = new Date();
    var eventTime = new Date(2017, 3, 7, 22, 0, 0, 0);
    var message;
    if (time > eventTime) {
      eventTime = new Date(2017, 3, 9, 10, 0, 0, 0);
      message = 'Time until hacking ends!';
      if (time > eventTime) {
        return [0, 0, 0, 0, 'Hacking is over!'];
      }
    } else {
      message = 'Time until hacking begins!';
    }
    var remain = eventTime.getTime() - time.getTime();
    var numDays = Math.floor((remain / 86400000));
    var numHours = Math.floor((remain % 86400000) / 3600000);
    var numMinutes = Math.floor((remain % 86400000 % 3600000) / 60000);
    var numSeconds = Math.floor((remain % 86400000 % 3600000 % 60000) / 1000);
    return [numDays, numHours, numMinutes, numSeconds, message];
  }

  render() {
    return (
      <View style={styles.scene}>
       <Image
          source={require('./images/flame3.gif')} 
          style={styles.fire}
        />
        <Image
          source={require('./images/logs.png')} 
          style={styles.logs}
        />
        <View style={{ marginTop: 20, marginBottom: 20,}}>
          <BoldAleoText style={styles.message}>
            {this.state.displayMessage}
          </BoldAleoText>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <BoldAleoText style={styles.bigTitle}>{this.state.days}</BoldAleoText>
            <BoldAleoText style={styles.title}>D</BoldAleoText>
          </View>
          <View style={styles.col}>
            <BoldAleoText style={styles.bigTitle}>{this.state.hours}</BoldAleoText>
            <BoldAleoText style={styles.title}>H</BoldAleoText>
          </View>
          <View style={styles.col}>
            <BoldAleoText style={styles.bigTitle}>{this.state.minutes}</BoldAleoText>
            <BoldAleoText style={styles.title}>M</BoldAleoText>
          </View>
          <View style={styles.col}>
            <BoldAleoText style={styles.bigTitle}>{this.state.seconds}</BoldAleoText>
            <BoldAleoText style={styles.title}>S</BoldAleoText>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
  },
  fire: {
    marginTop: 80,
    width: 100,
    height: 100,
    alignItems: 'center',
  },
  logs: {
    width: 114,
    height: 50,
    marginBottom: 20,
    alignItems: 'center',
  },

  // text sizes
  bigTitle: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
    color: colors.cloudWhite,
    textShadowColor: '#000000',
    textShadowOffset: {width: 0.1, height: 0.1},
    textShadowRadius: 2,
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.cloudWhite,
    textShadowColor: '#000000',
    textShadowOffset: {width: 0.1, height: 0.1},
    textShadowRadius: 2,
  },
  message: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.cloudWhite,
    textShadowColor: '#000000',
    textShadowOffset: {width: 0.1, height: 0.1},
    textShadowRadius: 2,
  },
  text: {
    fontSize: 15,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Timer;
