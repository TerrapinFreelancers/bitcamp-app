import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDBhF1-PpgXUc2EA-ro4j0-XJq3zkf68Gw",
    authDomain: "bitcamp-2017.firebaseapp.com",
    databaseURL: "https://bitcamp-2017.firebaseio.com",
    storageBucket: "bitcamp-2017.appspot.com"
};
firebaseApp = firebase.initializeApp(firebaseConfig);
module.exports = firebaseApp;