import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import Button from "./Button";

class TabMenu extends Component{

  static get defaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    };
  }

  renderTab(name, page, active, onPressHandler){
      // const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
      // const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = active ? 'bold' : 'normal';

    return <Button
      style={{flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
   </Button>;

   },

   render() {
   const containerWidth = this.props.containerWidth;
   const numberOfTabs = this.props.tabs.length;
   const tabUnderlineStyle = {
     position: 'absolute',
     width: containerWidth / numberOfTabs,
     height: 4,
     backgroundColor: 'navy',
     bottom: 0,
   };

   const left = this.props.scrollValue.interpolate({
     inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
   });
   return (
     <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
       {this.props.tabs.map((name, page) => {
         const isTabActive = this.props.activeTab === page;
         const renderTab = this.props.renderTab || this.renderTab;
         return renderTab(name, page, isTabActive, this.props.goToPage);
       })}
       <Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]} />
     </View>
   );
  },
}


TabMenu.propTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array,
  backgroundColor: React.PropTypes.string,
  activeTextColor: React.PropTypes.string,
  inactiveTextColor: React.PropTypes.string,
  textStyle: Text.propTypes.style,
  tabStyle: View.propTypes.style,
  renderTab: React.PropTypes.func,
  underlineStyle: View.propTypes.style,
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});
