import React, { Component } from 'react';
import { ScrollView, Text, Image } from 'react-native';

function MapScene() {
  return (
    <ScrollView directionLockEnabled={false}
                horizontal={true}>
      <ScrollView>
        <Image 
          source={require('./images/floor_plan_2017.png')} 
        />
      </ScrollView>
    </ScrollView>
  );
}

export default MapScene;
