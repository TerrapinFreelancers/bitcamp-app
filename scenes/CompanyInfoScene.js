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
    ListView
} from 'react-native';
import * as firebase from 'firebase';
import {
    colors
} from '../shared/styles';
import aleofy from '../shared/aleo';


class List extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };
        getData(this);
    }
    render() {
        return (
            <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
        );
    }
}

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

async function getJSON(url, callback) {
    try {
        let response = await fetch(url);
        let responseJson = await response.json();
        callback(responseJson);
    } catch (error) {
        console.error(error);
    }
}

function getData(param) {
    var dataBlob = [];
    parseJSON(function(returnValue) {
        responseJson = returnValue;
        for (var i = 0; i < responseJson.prize.companies.length; i++) {
            var company = responseJson.prize.companies[i].name;
            //console.log("Company Name: " + company);
            var challenge = responseJson.prize.companies[i].challenge;
            //console.log(company + "'s challenge: " + challenge);
            var imageURL = responseJson.prize.companies[i].image;
            //console.log("URL: " + imageURL);
            //console.log("Prizes:");
            for (var j = 0; j < responseJson.prize.companies[i].prizes.length; j++) {
                var prize = responseJson.prize.companies[i].prizes[j];
                //console.log(prize);
            }
        }

        for (var i = 0; i < responseJson.prize.companies.length; i++) {
            dataBlob.push(responseJson.prize.companies[i].name);
            console.log(dataBlob[i]);
        }
        param.setState({
            dataSource: param.state.dataSource.cloneWithRows(dataBlob)
        })
        return dataBlob;
    });
}


const styles = StyleSheet.create({
    scene: {
        flex: 1
    },

    // text sizes
    bigTitle: {
        fontSize: 40,
    },
    title: {
        fontSize: 20,
        marginBottom: 10
    },
    text: {
        fontSize: 15
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
    }
});

export default CompanyInfoScene;