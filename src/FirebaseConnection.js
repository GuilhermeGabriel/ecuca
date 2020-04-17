import firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyBVR9czGrnqPwEmfRNjHKwJvwuKPzGX9SU",
    authDomain: "ecuca-01.firebaseapp.com",
    databaseURL: "https://ecuca-01.firebaseio.com",
    projectId: "ecuca-01",
    storageBucket: "ecuca-01.appspot.com",
    messagingSenderId: "92718398150",
    appId: "1:92718398150:web:f9d2028899f5abbef575c7",
    measurementId: "G-XRNMBBQ7ZK"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;