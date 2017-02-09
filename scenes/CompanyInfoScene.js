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
    Navigator
} from 'react-native';
import * as firebase from 'firebase';
import {
    colors
} from '../shared/styles';
import aleofy from '../shared/aleo';

var UIExplorerPage = require('./dependencies/UIExplorerPage');
var THUMB_URLS = [
];

var List = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        getData(this, function(returnValue, param) {
            ds._dataBlob = returnValue;
            param.setState({
                dataSource: param.state.dataSource.cloneWithRows(returnValue.prize.companies)
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
        return (
            <UIExplorerPage
        noSpacer={true}
        noScroll={true}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
        />
      </UIExplorerPage>
        );
    },

    _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        var param = this;
        var imgSource = THUMB_URLS[rowID];
        return (
      <TouchableHighlight onPress={() => {
          this._pressRow(rowID);
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
  },

    _genRows: function(pressData: {
        [key: number]: boolean }): Array < string > {
        var dataBlob = ['name':'Loading Data'];
        return dataBlob;
    },

    _pressRow: function(rowID: number) {
        this._pressData[rowID] = !this._pressData[rowID];
        this.forceUpdate();
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

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

const AleoText = aleofy(Text);
const BoldAleoText = aleofy(Text, 'Bold');
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCy09lKL33_wEdgE-lCp0zZTz89GwSuuxo",
    authDomain: "test-bitcamp.firebaseapp.com",
    databaseURL: "https://test-bitcamp.firebaseio.com",
    storageBucket: "test-bitcamp.appspot.com"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

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
    var storageRef = firebase.storage().ref('prizes.json');
    storageRef.getDownloadURL().then(function(url) {
        getJSON(url, function(returnValue) {
            callback(returnValue);
        });
    });
}

function getRealImageURL(fileName){
    return new Promise((resolve, reject) => {
        var storageRef = firebase.storage().ref();
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

export default CompanyInfoScene;
