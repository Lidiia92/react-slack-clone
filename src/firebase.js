import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";



var config = {
    apiKey: "AIzaSyBEI-5Ogn4QOrpfhdioVxNoU9FTaRkCK1I",
    authDomain: "react-slack-clone-90aab.firebaseapp.com",
    databaseURL: "https://react-slack-clone-90aab.firebaseio.com",
    projectId: "react-slack-clone-90aab",
    storageBucket: "react-slack-clone-90aab.appspot.com",
    messagingSenderId: "752184105809"
  };
firebase.initializeApp(config);

export default firebase;