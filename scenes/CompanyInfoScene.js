/*
 * GO TO http://www.objgen.com/json/models/irgV FOR JSON SCHEMA
 */
import React, {
    Component
} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableHighlight,
    Dimensions,
    Navigator,
    TouchableWithoutFeedback,
    Button
} from 'react-native';
import firebaseApp from '../shared/firebase'
import {
    colors
} from '../shared/styles';
import aleofy from '../shared/aleo';
const AleoText = aleofy(Text);
const BoldAleoText = aleofy(Text, 'Bold');

// import RNFetchBlob from "react-native-fetch-blob"
/*// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCy09lKL33_wEdgE-lCp0zZTz89GwSuuxo",
    authDomain: "test-bitcamp.firebaseapp.com",
    databaseURL: "https://test-bitcamp.firebaseio.com",
    storageBucket: "test-bitcamp.appspot.com"
};
firebase.initializeApp(firebaseConfig);
*/
const styles = StyleSheet.create({
    scene: {
        flex: 1
    },
    bigTitle: {
        fontSize: 40,
    },
    title: {
        fontSize: 20,
        marginBottom: 10
    },
    text: {
        fontSize: 20
    },
    description:{
      paddingLeft:15,
      paddingRight:8,
      flex:2
    },
    overlay: {
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: .5,
      backgroundColor:'black',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    },
    overlayTestVertical:{
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    },
    overlayTestVertical2:{
      flex:0
    },
    overlayTestHorizontal:{
      flex: 1,
      flexDirection:'row'
    },
    blackPart:{
      flex: 1,
      opacity: .5,
      backgroundColor:'black'
    },
    blackPart2:{
      flex: 0,
      opacity: .5,
      backgroundColor:'black'
    },
    container:{
      alignItems:'center',
      position: 'absolute',
      flexDirection:'row',
      flex: 1
    },
    modalOverlay:{
      flex: 1,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      left: 0,
      top: 0,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    },
    modal:{
      flex:0,
      alignItems:'center',
      padding: 5,
      maxWidth: Dimensions.get('window').width * 4 / 5,
      minHeight: 100,
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      backgroundColor:'white',
      flexDirection:'row'
    },
    modalBackground:{
      flex:0,
      alignItems:'center',
      backgroundColor: 'rgba(0,0,0,.5)'
    },
    modalImage:{
      flex:0,
      padding:5
    },
    modalText:{
      padding:8,
      flex:1
    },

    // sections of the page
    welcome: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    sponsors: {
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        // backgroundColor: '#F6F6F6',
        // backgroundColor: '#FFAF3F'
        backgroundColor:'#E5D8CE',
    },
    thumb: {
        width: 64,
        height: 64,
        // backgroundColor: 'white'
    },
});

const defaultImage = "./images/no_image_available.png"
// var UIExplorerPage = require('./dependencies/UIExplorerPage');
var THUMB_URLS = [
];

var List = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var data = ds.cloneWithRows(['name':'Loading Data']);
        state = {
            dataSource: data,
            loaded: false,
            pressed: false,
            info: null,
            thumbnailSource: null,
            body: <Text>Loading</Text>,
        };
        getData(this, function(returnValue, param) {
            ds._dataBlob = returnValue;
            param.setState({
                loaded: true,
                pressed: false,
                dataSource: param.state.dataSource.cloneWithRows(returnValue.prize.companies),
                body: <Text>Loading</Text>,
            })
        });
        return {
            dataSource: ds.cloneWithRows(this._genRows({})),
        };
    },

    _pressData: ({}: {
        [key: number]: boolean }),

    componentWillMount: function() {
        this._pressData = {};
    },

    render: function() {
      let overlay;
      if (this.state.pressed){
      overlay = <View style={styles.overlayTestVertical}>
                    <View style={styles.overlayTestHorizontal}>
                      <TouchableWithoutFeedback style={{flex:1}} onPress={() => this.setState({pressed:false})}>
                        <View style={styles.blackPart}/>
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={{flex:0, flexDirection:'row'}}>
                      <TouchableWithoutFeedback style={{flex:1}} onPress={() => this.setState({pressed:false})}>
                        <View style={styles.blackPart}/>
                      </TouchableWithoutFeedback>


                      <View style={styles.overlayTestVertical2}>
                        <View style={styles.modalBackground}>
                          <View style={styles.modal}>

                            <View style={styles.modalText}>
                              <BoldAleoText style = {{fontSize:26}}>
                                {this.state.info && this.state.info.name}
                              </BoldAleoText>


                              <Text style = {{fontSize:13, fontFamily: 'Arial', paddingTop:10}}>
                                {this.state.info && this.state.info.challenge}
                              </Text>
                              <Text style = {{fontSize:13, fontFamily: 'Arial'}}>
                                Prize(s): {this.state.info && this.state.info.prizes[0]}
                              </Text>

                            </View>
                            <View style={styles.modalImage}>
                              <Image style={styles.thumb} source={{uri:this.state.thumbnailSource}} />
                            </View>

                          </View>
                        </View>
                        <View style={styles.overlayTestHorizontal}>
                          <TouchableWithoutFeedback style={{flex:1}} onPress={() => this.setState({pressed:false})}>
                            <View style={styles.blackPart}/>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>


                      <TouchableWithoutFeedback style={{flex:1}} onPress={() => this.setState({pressed:false})}>
                        <View style={styles.blackPart}/>
                      </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.overlayTestHorizontal}>
                      <TouchableWithoutFeedback style={{flex:1}} onPress={() => this.setState({pressed:false})}>
                        <View style={styles.blackPart}/>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>;
      }
      return(
        <View style = {{flex:1}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderSeparator={this._renderSeparator}
          />
          {this.state.pressed && overlay}
        </View>
      );
    },

    _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        var param = this;
        var imgSource = THUMB_URLS[rowID];
        if(!this.state.loaded){
          return(<Text>Loading Data...</Text>);
        }
        else{
          let clippedChallenge = rowData.challenge;
          let clippedPrizes = "Prize(s): " + rowData.prizes[0];
          if (clippedPrizes.length > 40){
            clippedPrizes = clippedPrizes.substring(0, 37) + "...";
          }
          if (clippedChallenge.length > 40){
            clippedChallenge = clippedChallenge.substring(0,37) + "...";
          }
        return (
              <TouchableHighlight onPress={() => {
                  var imgSource = THUMB_URLS[rowID];
                  this.setState({
                      pressed: true,
                      info: rowData,
                      thumbnailSource:THUMB_URLS[rowID]
                  });
                  //highlightRow(sectionID, rowID);
                }}>
                <View>
                  <View style={styles.row}>
                    <Image style={styles.thumb} source={{uri:THUMB_URLS[rowID]}} />
                    <View style={styles.description}>
                      <BoldAleoText style = {{fontSize:18}}>{rowData.name}</BoldAleoText>
                      <AleoText style = {{fontSize:14, color:'#444444', paddingTop:5}}>{clippedChallenge}</AleoText>
                      <AleoText style = {{fontSize:14, color:'#444444', fontStyle:'italic'}}>{clippedPrizes}</AleoText>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            );
        }
  },

  _renderPrizes: function(rowData){
    return(
      <View>
        <View style={styles.row}>
          <Text style={styles.text}>
            {rowData}
          </Text>
        </View>
      </View>
      );
  },

   _revertPage: function(){
     this.setState({body:
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              renderSeparator={this._renderSeparator}
            />
      });
  },

    _genRows: function(pressData: {
        [key: number]: boolean }): Array < string > {
        var dataBlob = ['name':'Loading Data'];
        return dataBlob;
    },

     _pressRow: function(rowData, rowID) {
        var imgSource = THUMB_URLS[rowID];
        this.setState({
            pressed: true
        });
  },

    _renderSeparator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return ( < View key = { `${sectionID}-${rowID}` }
            style = {
                {
                    height: adjacentRowHighlighted ? 4 : 1,
                    // backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                    backgroundColor: adjacentRowHighlighted ? '#7F6C5F' : '#7F6C5F',

                }
            }
            />
        );
    }
});

// The intro page has the bitcamp logo and some nice text
function CompanyInfoScene() {
    const {
        scene,
        bigTitle,
        title,
        text,
        blueSky,
        welcome,
        sponsors
    } = styles;
    return (
        <View style={scene}>
          <List/>
        </View>
    );
}

function parseJSON(callback) {
    var storageRef = firebaseApp.storage().ref('prizes.json');
    storageRef.getDownloadURL().then(function(url) {
        getJSON(url, function(returnValue) {
            callback(returnValue);
        });
    });
}

function getRealImageURL(fileName){
    return new Promise((resolve, reject) => {
        var storageRef = firebaseApp.storage().ref();
        var imagesRef = storageRef.child('/');
        var ref = imagesRef.child(fileName);
        ref.getDownloadURL().then(function(url) {
            resolve(url);
        });
    });
}

async function getJSON(url, callback) {
    try {
        let response = await fetch(url);
        let responseJson = await response.json();
        var companies = responseJson.prize.companies;
        var promises = []
        for(var i = 0; i < companies.length; i++){
            var image = companies[i].image;
            promises.push(getRealImageURL(image));
        }
        var realURLS = await Promise.all(promises);
        THUMB_URLS = realURLS;
        callback(responseJson);
    } catch (error) {
        console.error(error);
    }
}

function getData(param, callback) {
    var dataBlob = [];
    parseJSON(function(returnValue) {
        responseJson = returnValue;
        callback(returnValue, param);
        return returnValue;
    });
}

export default CompanyInfoScene;
