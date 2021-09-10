import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formattedDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
};
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, database, storage, timeStamp };
