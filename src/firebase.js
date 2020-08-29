import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyB5n2ouGsAebhGmFJozqWpekSRvVuBDS88",
    authDomain: "social-com-eb7a5.firebaseapp.com",
    databaseURL: "https://social-com-eb7a5.firebaseio.com",
    projectId: "social-com-eb7a5",
    storageBucket: "social-com-eb7a5.appspot.com",
    messagingSenderId: "607762573348",
    appId: "1:607762573348:web:513f8e745e1b3ac2c350b1",
    measurementId: "G-Z6C4Y5XVGT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;