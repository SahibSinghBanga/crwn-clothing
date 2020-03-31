import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyArgPmfmfJb4zmrPP20qIf9XJc9juJmtQI",
  authDomain: "crwn-shop-fa1bf.firebaseapp.com",
  databaseURL: "https://crwn-shop-fa1bf.firebaseio.com",
  projectId: "crwn-shop-fa1bf",
  storageBucket: "crwn-shop-fa1bf.appspot.com",
  messagingSenderId: "775278210592",
  appId: "1:775278210592:web:088977451af554ffa69645",
  measurementId: "G-F2W2518KV2"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Store Path Reference in userRef
  const userRef = firestore.doc(`users/${userAuth.uid} `);

  // Stores Actual Data Of That Reference
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt, 
        ...additionalData
      })
    } catch (error) {
      console.log("Error creating user ", error.message);
    }
  }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google Authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
