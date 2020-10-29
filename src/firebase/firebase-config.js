import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyD3M77V9UdgsNQKlIORmn14mWgmfpQBTP8",
    authDomain: "react-app-cursos-7c6b3.firebaseapp.com",
    databaseURL: "https://react-app-cursos-7c6b3.firebaseio.com",
    projectId: "react-app-cursos-7c6b3",
    storageBucket: "react-app-cursos-7c6b3.appspot.com",
    messagingSenderId: "36096541164",
    appId: "1:36096541164:web:d54fd2cafb18c254c900c9"
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const googleAuthProvider    =    new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider  =    new firebase.auth.FacebookAuthProvider();
const githubAuthProvider    =    new firebase.auth.GithubAuthProvider()


export {
    db,
    googleAuthProvider,
    firebase,
    facebookAuthProvider,
    githubAuthProvider,
}
