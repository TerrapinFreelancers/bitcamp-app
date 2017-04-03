import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import { colors } from '../shared/styles';

// const DEFAULT_URL = 'https://mentorship.bitca.mp';
const DEFAULT_URL = 'https://mobile.twitter.com/bitcmp';

export default class MentorsScene extends Component {
  state = {
    url: DEFAULT_URL,
    status: 'No Page Loaded',
    loading: true,
    scalesPageToFit: true,
  };

  render() {

    return (
      <View style={styles.container}>
       <WebView
          ref={(view) => this.webview = view}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}
        />
      </View>
    );
  }

  onShouldStartLoadWithRequest = (event) => {
    return true;
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.midnightBLue,
  },
  webView: {
    backgroundColor: colors.BGWASH,
    height: 350,
  },
});
