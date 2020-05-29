import firebase from 'firebase/app'
import 'firebase/messaging'

var firebaseConfig = {
    apiKey: "AIzaSyDtte9lo36h31PQtQ7pyNARjtD9EcbMpbQ",
    authDomain: "symphonia-272211.firebaseapp.com",
    databaseURL: "https://symphonia-272211.firebaseio.com",
    projectId: "symphonia-272211",
    storageBucket: "symphonia-272211.appspot.com",
    messagingSenderId: "754151405785",
    appId: "1:754151405785:web:d8ec59665a01ab4b39e6c8",
    measurementId: "G-HLSS7VBYQJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Define messaging object to deal with firebase messaging
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BMYNPQ0uCQkuxm2W88vCff5mfzSZbS7JeD_-D0nk5_uLP9DgMvsJXVUNRXR0FhQ3Sy5U_mAAnR-42-16Q8YtXXk")

export{
    messaging
}
