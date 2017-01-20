import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PDFView from 'react-native-pdf-view';

export default class MapScene extends Component {

  constructor(props) {
    super(props);
  }

  static get defaultProps() {
    return {
      title: 'Map'
    };
  }

  render() {
    return (
      <View>
        <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
          path={"images/floor_plan_2017.pdf"}
          onLoadComplete = {(pageCount)=>{
            this.pdfView.setNativeProps({
              zoom: 1.5
            });
          }}
          style={styles.pdf}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pdf: {
    flex:1
  }
});
