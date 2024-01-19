import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBSURhjfvsM5QdJKBekltNdN8_qkvewsH8",
    authDomain: "muso-ninjas-f8010.firebaseapp.com",
    projectId: "muso-ninjas-f8010",
    storageBucket: "muso-ninjas-f8010.appspot.com",
    messagingSenderId: "454476103187",
    appId: "1:454476103187:web:29eeae4b1c863aa9a689e6"
  };
// init firebase
  firebase.initializeApp(firebaseConfig)

  // services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  // 
  const timeStamp = firebase.firestore.FieldValue.serverTimestamp

  export {projectAuth, timeStamp, projectStorage}