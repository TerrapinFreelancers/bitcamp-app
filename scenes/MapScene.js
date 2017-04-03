import React, { Component } from 'react';
import { View, ScrollView, Text, Image, Dimensions } from 'react-native';
import PhotoView from 'react-native-photo-view';

const window = Dimensions.get('window');

function MapScene() {
  let styles = {width: window.width, height: window.height, overflow:'visible'};

  return(
    <View>
      <PhotoView
        source={require('./images/floor_plan_final.png')}
        minimumZoomScale={1}
        maximumZoomScale={3.5}
        androidScaleType="fitCenter"
        onLoad={() => console.log("Image loaded!")}
        style={styles} />
    </View>
  );
}

export default MapScene;
