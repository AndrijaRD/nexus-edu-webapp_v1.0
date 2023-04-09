import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyASWE19JL4_LR1JkCoffu0YvnbY636kXAw",
    authDomain: "nexusonlineschool-f50cf.firebaseapp.com",
    projectId: "nexusonlineschool-f50cf",
    storageBucket: "nexusonlineschool-f50cf.appspot.com",
    messagingSenderId: "122129019296",
    appId: "1:122129019296:web:54e2c6554b626f2e1834c5",
    measurementId: "G-2WXMPE5E7G"
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
