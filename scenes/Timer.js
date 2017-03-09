import React, { Component } from 'react';
import { Text, Image, View, Dimensions, StyleSheet, ScrollView } from 'react-native';

import { colors } from '../shared/styles';
import aleofy from '../shared/aleo';

const window = Dimensions.get('window');

// wraps a component with styles.shadow
function shadowify(Component) {
  return (props) => (
    <Component {...props} style={[styles.shadow, props.style]}>
      {props.children}
    </Component>
  );
}
const TimerText = shadowify(aleofy(Text, 'Bold'));

// A countdown to the event and then to end of hacking
class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: new Date()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const eventTime = new Date(2017, 3, 7, 22, 0, 0, 0); // when hacking begins
    const endHackingTime = new Date(2017, 3, 9, 10, 0, 0, 0);

    let remain;  // the time remaining until the next 'event' (either hacking begins or hacking ends)
    let message; // the message we want to display

    if (this.state.time <= eventTime) {
      remain = eventTime.getTime() - this.state.time.getTime();
      message = 'Time until hacking begins!';

    } else if (this.state.time > eventTime && this.state.time < endHackingTime) {
      remain = endHackingTime.getTime() - this.state.time.getTime();
      message = 'Time until hacking ends!';

    } else {
      remain = 0;
      message = 'Hacking is over!';
    }

    const days    = Math.floor((remain / 86400000));
    const hours   = Math.floor((remain % 86400000) / 3600000);
    const minutes = Math.floor((remain % 86400000 % 3600000) / 60000);
    const seconds = Math.floor((remain % 86400000 % 3600000 % 60000) / 1000);

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
          <TimerText style={[styles.shadow, styles.message]}>
            {message}
          </TimerText>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <TimerText style={styles.bigTitle}>{days}</TimerText>
            <TimerText style={styles.title}>D</TimerText>
          </View>
          <View style={styles.col}>
            <TimerText style={styles.bigTitle}>{hours}</TimerText>
            <TimerText style={styles.title}>H</TimerText>
          </View>
          <View style={styles.col}>
            <TimerText style={styles.bigTitle}>{minutes}</TimerText>
            <TimerText style={styles.title}>M</TimerText>
          </View>
          <View style={styles.col}>
            <TimerText style={styles.bigTitle}>{seconds}</TimerText>
            <TimerText style={styles.title}>S</TimerText>
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
  shadow: {
    textShadowColor: '#000000',
    textShadowOffset: {width: 0.1, height: 0.1},
    textShadowRadius: 5,
    color: colors.cloudWhite,
    textAlign: 'center',
  },
  bigTitle: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
  },
  message: {
    fontSize: 20,
    marginBottom: 10,
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
