import React, { Component } from 'react';
import { Platform } from 'react-native';

import ScheduleScene from './scenes/ScheduleScene';
import CompanyInfoScene from './scenes/CompanyInfoScene';
import MapScene from './scenes/MapScene';
import MentorsScene from './scenes/MentorsScene';
import IntroScene from './scenes/IntroScene';

//credit to/documentation at
//https://github.com/skv-headless/react-native-scrollable-tab-view

import CustomTabBarOverlay from './CustomTabBarOverlay';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default class MenuTab extends Component {

  render() {
    let menuTabPosition;
    let introIcon;
    let scheduleIcon;
    let mapIcon;
    let companyInfoIcon;
    let mentorsIcon;
    if (Platform.OS === 'android') {
      menuTabPosition = "top";
      scheduleIcon = "md-calendar";
      mapIcon = "md-map";
      introIcon = "md-home";
      mentorsIcon = "md-help-circle";
      companyInfoIcon = "md-trophy";
    }

    else {
      menuTabPosition = "bottom";
      scheduleIcon = "ios-calendar";
      mapIcon = "ios-map";
      introIcon = "ios-home"
      mentorsIcon = "ios-help-circle";
      companyInfoIcon = "ios-trophy";
    }

    return (
      <ScrollableTabView
        tabBarPosition={menuTabPosition}
        style={{marginTop: 20}}
        initialPage={0}
        renderTabBar={() => <CustomTabBarOverlay />}
      >
        <IntroScene tabLabel={introIcon}/>
        <ScheduleScene tabLabel={scheduleIcon} />
        <MapScene tabLabel={mapIcon} />
        <CompanyInfoScene tabLabel={companyInfoIcon} />
        <MentorsScene tabLabel={mentorsIcon} />
      </ScrollableTabView>
    )
  }
}
