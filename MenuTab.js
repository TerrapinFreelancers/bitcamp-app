import React, { Component } from 'react';
import { Platform, View } from 'react-native';

import ScheduleScene from './scenes/ScheduleScene';
import ChallengesScene from './scenes/ChallengesScene';
import MapScene from './scenes/MapScene';
import MentorsScene from './scenes/MentorsScene';
import CountdownScene from './scenes/CountdownScene';

//credit to/documentation at
//https://github.com/skv-headless/react-native-scrollable-tab-view

import CustomTabBarOverlay from './CustomTabBarOverlay';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { colors } from './shared/styles';

export default function MenuTab(props) {

  // ios styles
  let menuTabPosition = 'bottom';
  let iconPrefix = 'ios';
  let style = { flex: 1 };
  let iOS = true;
  let topBar = <View style={{flex:0, backgroundColor:colors.lightBrown, height:20}}/>;

  if (Platform.OS === 'android') {
    menuTabPosition = 'top';
    iconPrefix = 'md';
    iOS = false;
  }
  //{!iOS && (<MentorsScene     tabLabel={`${iconPrefix}-help-circle`} />)}
  //<MentorsScene     tabLabel={`${iconPrefix}-help-circle`} />

  return (
    <View style={{flex:1}}>
      {iOS && topBar}
      <ScrollableTabView
        tabBarPosition={menuTabPosition}
        style={style}
        initialPage={0}
        renderTabBar={() => <CustomTabBarOverlay />}
      >
        <CountdownScene   tabLabel={`${iconPrefix}-home`} />
        <ScheduleScene    tabLabel={`${iconPrefix}-calendar`} />
        <MapScene         tabLabel={`${iconPrefix}-map`} />
        <ChallengesScene  tabLabel={`${iconPrefix}-trophy`} />
        <MentorsScene     tabLabel={`logo-twitter`} />
      </ScrollableTabView>
    </View>
  );
}
