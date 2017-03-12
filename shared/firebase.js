import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyC98AMk0_v5qXGDmK9VvPvmfwJBrxOKXLI",
    authDomain: "bitcamp-2017-761ae.firebaseapp.com",
    databaseURL: "https://bitcamp-2017-761ae.firebaseio.com",
    storageBucket: "bitcamp-2017-761ae.appspot.com"
};
firebaseApp = firebase.initializeApp(firebaseConfig);
module.exports = firebaseApp;
