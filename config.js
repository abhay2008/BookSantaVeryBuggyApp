import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC7Ek7O8-Z3kIM9vH7VIlG8m9quB_XC--s",
  authDomain: "booksanta-d4366.firebaseapp.com",
  projectId: "booksanta-d4366",
  storageBucket: "booksanta-d4366.appspot.com",
  messagingSenderId: "324472162178",
  appId: "1:324472162178:web:8d02529d4650a98b4cb19b"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

