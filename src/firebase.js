import firebase from 'firebase'
const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyBz-qOzMHAe03R7DENVDurAYYAHWpos5Yc",
    authDomain: "instagram-clone-fe43e.firebaseapp.com",
    projectId: "instagram-clone-fe43e",
    storageBucket: "instagram-clone-fe43e.appspot.com",
    messagingSenderId: "934614835242",
    appId: "1:934614835242:web:d6c29016f91246449da353",
    measurementId: "G-PQDBE0S6GP"
  });

const db=firebaseApp.firestore();

  const auth = firebase.auth();
  const storage = firebase.storage();
  
  export { db, auth , storage};
