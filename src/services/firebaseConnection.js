import firebase from "firebase";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCKX7eZyrI3-Wjai3C1eKwYvYCmD6gF1Hk",
    authDomain: "my-desk-1f797.firebaseapp.com",
    projectId: "my-desk-1f797",
    storageBucket: "my-desk-1f797.appspot.com",
    messagingSenderId: "41407850767",
    appId: "1:41407850767:web:d8a4015adda4c9ef04f67a",
    measurementId: "G-TNCB77QV1X"
  };
  
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } 
  export default firebase;