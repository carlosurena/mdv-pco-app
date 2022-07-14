import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Initialize Firebase
var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "mdv-administration.firebaseapp.com",
    databaseURL: "https://mdv-administration.firebaseio.com",
    projectId: "mdv-administration",
    storageBucket: "",
    messagingSenderId: "374724907189"
  };
   firebase.initializeApp(config);
   export const auth = firebase.auth();
   export default firebase;