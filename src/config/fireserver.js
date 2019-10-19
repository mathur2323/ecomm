import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAE7mCmFw2e5zLZ4Er0c5YFuPKgv9W3rWk",
    authDomain: "e-commerce-38ba5.firebaseapp.com",
    databaseURL: "https://e-commerce-38ba5.firebaseio.com",
    projectId: "e-commerce-38ba5",
    storageBucket: "gs://e-commerce-38ba5.appspot.com/",
    messagingSenderId: "818316789962",
    appId: "1:818316789962:web:e92ac7ba16b3cb15b7cc33"
  };
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;