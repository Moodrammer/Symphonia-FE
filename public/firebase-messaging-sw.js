importScripts('https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.5/firebase-messaging.js');

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

const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/s11.png'
//     };
  
//     return ServiceWorkerRegistration.showNotification(notificationTitle,
//       notificationOptions);
//   });