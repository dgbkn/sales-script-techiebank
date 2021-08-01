import firebase from "firebase/app";
import 'firebase/messaging';

var firebaseConfig = {
    apiKey: "AIzaSyB4pjqDhHMflt3GHrx0uyUDOaLQBH2mDbg",
    authDomain: "scriptsfeel.firebaseapp.com",
    projectId: "scriptsfeel",
    storageBucket: "scriptsfeel.appspot.com",
    messagingSenderId: "557610588036",
    appId: "1:557610588036:web:5975597f7a0decbf0dafd1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();



export const registerServiceWorker = () => {
  const fire_base_token_name = 'FiReBaSe__ToKeN';
  const oldToken = window.localStorage.getItem(fire_base_token_name)  ? window.localStorage.getItem(fire_base_token_name) : false;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
      .register('/sw.js')
      .then(function (registration) {



         if(!oldToken){
        //firebase messager
        messaging.getToken({vapidKey: 'BMR7HeElKyjevPRjf08PL22ycRVW95GAkHekjNfd1NFxmoyscdiCaEZiZt4xAGN425oIAWrWw0zCQYwRF08mfr4',serviceWorkerRegistration:registration}).then((currentToken) => {
          if (currentToken) {
            console.log('current token for client: ', currentToken);
            window.localStorage.setItem(fire_base_token_name, currentToken);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
          } else {
            console.log('No registration token available. Request permission to generate one.');
            // window.localStorage.setItem(fire_base_token_name, false);
            // shows on the UI that permission is required 
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        //   window.localStorage.setItem(fire_base_token_name, false);
          // catch error while creating client token
        });
        //firebase messager
      }

          



          // eslint-disable-next-line no-console
          console.log('[SW]: SCOPE: ', registration.scope);
          return registration.scope;
        })
        .catch(function (err) {
            console.log(err);
          return err;
        });

        navigator.serviceWorker
        .ready
        .then(function(ev) {
            console.log('Service Worker Ready',ev);
        })
        .catch(function (err) {
            console.log(err);
          return err;
        });
    }
  };