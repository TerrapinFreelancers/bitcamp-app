import React, { Component } from 'react';
import { Platform } from 'react-native';

import ScheduleScene from './scenes/ScheduleScene';
import CompanyInfoScene from './scenes/CompanyInfoScene';
import MapScene from './scenes/MapScene';
import MentorsScene from './scenes/MentorsScene';
import CountdownScene from './scenes/CountdownScene';

//credit to/documentation at
//https://github.com/skv-headless/react-native-scrollable-tab-view

import CustomTabBarOverlay from './CustomTabBarOverlay';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default function MenuTab(props) {

  // ios styles
  let menuTabPosition = 'bottom';
  let iconPrefix = 'ios';
  let style = { marginTop: 20 };

  if (Platform.OS === 'android') {
    menuTabPosition = 'top';
    iconPrefix = 'md';
    style = {};
  }

  return (
    <ScrollableTabView
      tabBarPosition={menuTabPosition}
      style={style}
      initialPage={0}
      renderTabBar={() => <CustomTabBarOverlay />}
    >
      <CountdownScene   tabLabel={`${iconPrefix}-home`} />
      <ScheduleScene    tabLabel={`${iconPrefix}-calendar`} />
      <MapScene         tabLabel={`${iconPrefix}-map`} />
      <CompanyInfoScene tabLabel={`${iconPrefix}-trophy`} />
      <MentorsScene     tabLabel={`${iconPrefix}-help-circle`} />
    </ScrollableTabView>
  );
}
