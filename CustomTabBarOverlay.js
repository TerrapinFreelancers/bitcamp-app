import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';

import { colors } from './shared/styles';
import Icon from 'react-native-vector-icons/Ionicons';

class CustomTabBarOverlay extends Component {
  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const eachTabWidth = {
      width: containerWidth/numberOfTabs
    };
    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });

    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab}
          onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Icon
            name={tab}
            size={30}
            color={this.props.activeTab === i ?
              colors.bitcampOrange : 'rgb(204,204,204)'}
          />
        </TouchableOpacity>;
      })}
      <Animated.View style={[styles.tabUnderlineStyle, eachTabWidth, { left, }, ]} />
    </View>;
  }
}

CustomTabBarOverlay.propTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array
};

const styles = StyleSheet.create({
  tabUnderlineStyle: {
    position: 'absolute',
    height: 4,
    backgroundColor: colors.bitcampOrange,
    bottom: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});

export default CustomTabBarOverlay;
