import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import AleoText from '../shared/aleoText';

function IntroScene() {
  const { scene, blueSky, bitcampText, welcome } = styles;
  return (
    <View style={scene}>
      <View style={blueSky}>
        <AleoText aleoStyle="Bold" style={bitcampText}>bitcamp</AleoText>
        <Image source={require('./bitcamp.png')} />
      </View>
      <View style={welcome}>
        <AleoText>Welcome!</AleoText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  bitcampText: {
    fontFamily: 'Aleo-Bold',
    fontSize: 20
  },
  blueSky: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CBF2FF',
  },
  welcome: {
    flex: 1,
    alignItems: 'center'
  }
});

export default IntroScene;
