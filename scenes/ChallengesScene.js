
import React, {
    Component
} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    ListView,
    TouchableHighlight,
    Dimensions,
    TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native';
import firebaseApp from '../shared/firebase'
import {colors} from '../shared/styles';
import aleofy from '../shared/aleo';
import RNFetchBlob from "react-native-fetch-blob";
const SHA1 = require("crypto-js/sha1");
const AleoText = aleofy(Text);
const BoldAleoText = aleofy(Text, 'Bold');
const defaultImage = require('./images/no_image_available.png');

const STORAGE_KEY = '@bitcampapp:challenges'

class ChallengesScene extends Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
        dataSource: this.ds.cloneWithRows([]),
        loaded: false,
        pressed: false,
        info: null,
        thumbnailSource: null,
    };
    this.itemsRef = firebaseApp.database().ref();
    this._renderRow = this._renderRow.bind(this);
    this.shadowGenerator = this.shadowGenerator.bind(this);
  }

  componentDidMount(){
    console.log("INSIDE OF componentDidMount");
    this.fetchData().then(this.listenForItems.bind(this));
  }

  listenForItems(){
    console.log("INSIDE LISTEN FOR ITEMS");
    var thisBinded = this;
    this.itemsRef.on('value', async function(snap){

      const jsonDataBlob = snap.exportVal();
      try {
          var challenges = jsonDataBlob.Challenges;
          var size = 0, key;
          for (key in challenges) {
              if (challenges.hasOwnProperty(key)) size++;
          }
          var promises = [];
          for(var i = 0; i < size; i++){
              var image = challenges[i].image;
              promises.push(thisBinded.getRealImageURL(image));
          }
          var realURLS = await Promise.all(promises);
          promises = [];
          for(var i = 0; i < size; i++){
              promises.push(thisBinded.getCacheURL(realURLS[i]));
          }
          let THUMB_URLS = await Promise.all(promises);
          for(var i = 0; i < size; i++){
            challenges[i].image = THUMB_URLS[i];
          }
      } catch (error) {
          console.error(error);
      }

      console.log("GOT ITEMS:" + challenges);

      thisBinded.setState({
        loaded: true,
        dataSource: thisBinded.ds.cloneWithRows(challenges)
      });
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(challenges), function(error){
        if (error){
          console.log("Error: " + error);
        }
      });
    });
  }

  getRealImageURL(fileName){
      return new Promise((resolve, reject) => {
          var storageRef = firebaseApp.storage().ref();
          var imagesRef = storageRef.child('/');
          var ref = imagesRef.child(fileName);
          ref.getDownloadURL().then(function(url) {
              resolve(url);
          });
      });
  }

  parseJSON(callback){
      var storageRef = firebaseApp.storage().ref('prizes.json');
      storageRef.getDownloadURL().then(function(url) {
          getJSON(url, function(returnValue) {
              callback(returnValue);
          });
      });
  }

  getCacheURL(uri){
    const path = RNFetchBlob.fs.dirs.CacheDir + "_immutable_images/" + SHA1(uri) + ".jpg";
    return RNFetchBlob.fs.exists(path).then(exists => {
      if(exists) {
        return path;
      } else {
        return RNFetchBlob.config({ path })
                .fetch("GET", uri, {})
                .then(() => path);
      }
    });
  }

  async fetchData(){
    let savedData = [];
    let defaultData = [{
                        challenge:"Coming soon!",
                        image:defaultImage,
                        name:"Challenges",
                        prizes:""
                      }];
    try{
      savedData = await AsyncStorage.getItem(STORAGE_KEY);
      savedData = JSON.parse(savedData);
      if (savedData === null) {
        savedData = defaultData;
      }
    }catch(error){
      console.log('Error grabbing item from storage');
      console.log(error);
      savedData = defaultData;
    }
    console.log("SAVED DATA IS " + JSON.stringify(savedData));
    this.setState({
      loaded:true,
      dataSource: this.ds.cloneWithRows(savedData)
    });
  }

  shadowGenerator(size, onTouchExit){
    return (
      <View style={{flex:size, flexDirection:'row'}}>
        {onTouchExit}
      </View>);
  }

  render(){
    let overlay;
    if (this.state.pressed){
    onTouchExit = (
      <TouchableWithoutFeedback style={{flex:1}} onPress={() => this.setState({pressed:false})}>
        <View style={styles.shadow}/>
      </TouchableWithoutFeedback>);
    shadowTop = this.shadowGenerator(1, onTouchExit);
    shadowBottom = this.shadowGenerator(2, onTouchExit);
    overlay = (<View style={styles.overlayVertical}>
                  {shadowTop}

                  <View style={{flex:0, flexDirection:'row'}}>
                    {onTouchExit}
                    <View style={styles.overlayVertical2}>
                      <View style={styles.modalBackground}>
                        <View style={styles.modal}>

                          <View style={styles.modalText}>
                            <BoldAleoText style = {{fontSize:26}}>
                              {this.state.info && this.state.info.name}
                            </BoldAleoText>

                            <Text style = {{fontSize:14, fontFamily: 'Arial', paddingTop:10}}>
                              {this.state.info && this.state.info.challenge}
                            </Text>
                            <Text style = {{fontSize:14, fontStyle: 'italic', fontFamily: 'Arial', paddingTop:10}}>
                              Prize(s): {this.state.info && this.state.info.prizes}
                            </Text>

                          </View>
                          <View style={styles.modalImage}>
                            <Image style={styles.thumb} source={{uri:this.state.thumbnailSource}} />
                          </View>

                        </View>
                      </View>
                      {onTouchExit}
                    </View>
                    {onTouchExit}
                  </View>

                  {shadowBottom}
                </View>);
    }
    return(
      <View style = {{flex:1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          enableEmptySections
        />
        {this.state.pressed && overlay}
      </View>
    );
  }

  _renderRow(rowData) {
    var thisBinded = this;
    let image = (<Image style={styles.thumb} source={defaultImage} />);
    console.log("ROWDATA" + JSON.stringify(rowData));
    let clippedChallenge = rowData.challenge;
    let clippedPrizes = "Prize(s): " + rowData.prizes;
    if (clippedPrizes.length > 40){
      clippedPrizes = clippedPrizes.substring(0, 37) + "...";
    }
    if (clippedChallenge.length > 40){
      clippedChallenge = clippedChallenge.substring(0,37) + "...";
    }
    if (rowData.image !== defaultImage){
      image = (<Image style={styles.thumb} source={{uri:rowData.image}} />);
    }
    return (
        <TouchableHighlight onPress={() => {
            thisBinded.setState({
                pressed: true,
                info: rowData,
                thumbnailSource:rowData.image
            });
          }}>
          <View>
            <View style={styles.row}>
              {image}
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

  _renderSeparator(sectionID, rowID) {
      return ( < View key = { `${sectionID}-${rowID}` } style = {{height: 1,backgroundColor:'#444444',}}/>
      );
  }
}
const styles = StyleSheet.create({
    description:{
      paddingLeft:15,
      paddingRight:8,
      flex:2
    },
    overlayVertical:{
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    },
    overlayVertical2:{
      flex:0
    },
    overlayHorizontal:{
      flex: 1,
      flexDirection:'row'
    },
    shadow:{
      flex: 1,
      opacity: .5,
      backgroundColor:'black'
    },
    shadow2:{
      flex: 0,
      opacity: .5,
      backgroundColor:'black'
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
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor:'white',
    },
    thumb: {
        width: 64,
        height: 64,
    },
});

export default ChallengesScene;
