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
    RecyclerViewBackedScrollView,
    Navigator,
    Button,
} from 'react-native';
import firebaseApp from '../shared/firebase'
import {
    colors
} from '../shared/styles';
import aleofy from '../shared/aleo';
const AleoText = aleofy(Text);
const BoldAleoText = aleofy(Text, 'Bold');
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
        fontSize: 20,
        flex: 2
    },

    // sections of the page
    blueSky: {
        alignItems: 'center',
        backgroundColor: colors.skyBlue,
        padding: 30
    },
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
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 64,
        height: 64,
    },
});



var UIExplorerPage = require('./dependencies/UIExplorerPage');
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
        if(this.state.pressed){
            body = this.state.body;
        }
        else{
            body = <UIExplorerPage
                    noSpacer={true}
                    noScroll={true}>

                    <ListView
                      dataSource={this.state.dataSource}
                      renderRow={this._renderRow}
                      renderSeparator={this._renderSeparator}
                    />
                  </UIExplorerPage>;
        }
        return (
            body
        );
    },


    _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        var param = this;
        var imgSource = THUMB_URLS[rowID];
        if(!this.state.loaded){
            return(<Text>Loading Data...</Text>);
        }
        else{
        return (
              <TouchableHighlight onPress={() => {
                this._pressRow(rowData, rowID);
                  highlightRow(sectionID, rowID);
                }}>
                <View>
                  <View style={styles.row}>
                    <Image style={styles.thumb} source={{uri:imgSource}} />
                    <Text style={styles.text}>
                      {rowData.name}
                    </Text>
                    <Text style={styles.text}>
                      {rowData.challenge}
                    </Text>
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
        <UIExplorerPage
            noSpacer={true}
            noScroll={true}>

            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              renderSeparator={this._renderSeparator}
            />
      </UIExplorerPage>
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
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var dataSource = ds.cloneWithRows(rowData.prizes);
        console.log(ds);
        this.setState({body:
           <View style={styles.scene}>
          <ScrollView>
            <View style={styles.blueSky}>
    <BoldAleoText style={styles.bigTitle}>{rowData.name}</BoldAleoText>
            </View>
                <View>
                  <View style={styles.row}>
                    <Text style={styles.text}>
                      {rowData.challenge}
                    </Text>
                  </View>
                  <ListView
                      dataSource={dataSource}
                      renderRow={this._renderPrizes}
                      renderSeparator={this._renderSeparator}
                    />
                  <TouchableHighlight onPress={() => {
                        this._revertPage();
                    }}>
                    <View style={styles.row}><Text>Back to Prizes</Text></View>
                </TouchableHighlight>
                </View>

            </ScrollView>
            </View>
    });

  },




    _renderSeparator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return ( < View key = { `${sectionID}-${rowID}` }
            style = {
                {
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
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
      <ScrollView>

        <View style={blueSky}>
          <BoldAleoText style={bigTitle}>Prizes!</BoldAleoText>
        </View>
        <List/>

      </ScrollView>
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
