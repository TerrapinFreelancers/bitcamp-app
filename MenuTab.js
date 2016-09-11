import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';

import ScheduleScene from './scenes/ScheduleScene';
import CompanyInfoScene from './scenes/CompanyInfoScene'
import MapScene from './scenes/MapScene'
import MentorsScene from './scenes/MentorsScene'

//credit to/documentation at
//https://github.com/skv-headless/react-native-scrollable-tab-view

var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class MenuTab extends Component {

  render() {
    var menuTabPosition;
    if (Platform.OS === 'android') {
      menuTabPosition = "top";
    }
    else {
      menuTabPosition = "bottom";
    }

    return (
      <ScrollableTabView tabBarPosition={menuTabPosition}>
        <ScheduleScene tabLabel="Schedule" />
        <MapScene tabLabel="Map" />
        <CompanyInfoScene tabLabel="Company Info" />
        <MentorsScene tabLabel="Mentors" />
      </ScrollableTabView>
    )
  }
}
