import React from 'react';
import { Text, Image, View, StyleSheet, ScrollView } from 'react-native';

import { colors } from '../shared/styles';
import aleofy from '../shared/aleo';

const AleoText = aleofy(Text);
const BoldAleoText = aleofy(Text, 'Bold'); 

// The intro page has the bitcamp logo and some nice text
function IntroScene() {

  const { scene, bigTitle, title, text, blueSky, welcome, sponsors } = styles;

  return (
    <View style={scene}>
      <ScrollView>

        <View style={blueSky}>
          <BoldAleoText style={bigTitle}>bitcamp</BoldAleoText>
          <Image source={require('./images/bitcamp.png')} />
        </View>

        <View style={welcome}>
          <AleoText style={title}>Welcome!</AleoText>
          <Text style={text}>
            Minions ipsum ti aamoo! Wiiiii hahaha tulaliloo. Jiji bee do
            bee do bee do wiiiii po kass hahaha jeje bananaaaa gelatooo
            aaaaaah hana dul sae me want bananaaa! Jeje baboiii gelatooo
            butt tank yuuu! La bodaaa. Hana dul sae tatata bala tu tank
            yuuu! La bodaaa po kass wiiiii. Uuuhhh tank yuuu! Baboiii
            gelatooo para tu uuuhhh pepete.         
          </Text> 
        </View>

        <View style={sponsors}>
          <AleoText style={title}>Sponsors</AleoText>
          <Image source={require('./images/finra.png')} />
          <Image source={require('./images/cmns.png')} />
        </View>

      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },

  // text sizes
  bigTitle: {
    fontSize: 40,
  },
  title: {
    fontSize: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 15
  },

  // sections of the page
  blueSky: {
    alignItems: 'center',
    backgroundColor: colors.skyBlue,
    padding: 30
  },
  welcome: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  sponsors: {
    alignItems: 'center'
  }
});

export default IntroScene;
