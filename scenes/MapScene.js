import React, { Component } from 'react';
import { View, ScrollView, Text, Image, Dimensions, Platform } from 'react-native';
import PhotoView from 'react-native-photo-view';

const window = Dimensions.get('window');

function MapScene() {
  let styles = {};
  if (Platform.OS === 'android'){
    styles = {width: window.width, height: window.height}
  }
  return(
    <View>
      <PhotoView
        source={require('./images/floor_plan_2017.png')}
        minimumZoomScale={0.5}
        maximumZoomScale={3}
        androidScaleType="center"
        onLoad={() => console.log("Image loaded!")}
        style={styles} />
    </View>
  );
}

export default MapScene;
