import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAH-O3p7nXmFJ2FOmdsSAJnzrh8sqZ93Lw",
  authDomain: "projectbeta-d8272.firebaseapp.com",
  projectId: "projectbeta-d8272",
  storageBucket: "projectbeta-d8272.appspot.com",
  messagingSenderId: "193646924038",
  appId: "1:193646924038:web:d5a2d8ab82725e9b508e87"
};


if(!firebase.apps.length > 0){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};
