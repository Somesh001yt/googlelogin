import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
      apiKey: "AIzaSyAYqyntXtFr569C2ZJ2JROOMBCeGZNZfOI",
      authDomain: "tutorial-18f4f.firebaseapp.com",
      projectId: "tutorial-18f4f",
      storageBucket: "tutorial-18f4f.appspot.com",
      messagingSenderId: "944640862123",
      appId: "1:944640862123:web:d42107317bc4c5528294ee",
      measurementId: "G-ZKW2RNGSYV"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
