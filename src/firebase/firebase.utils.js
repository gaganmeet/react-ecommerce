import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDTAMQ31qCQGumGl12xxaI2j8qbDmARyO8",
    authDomain: "crwn-db-44282.firebaseapp.com",
    databaseURL: "https://crwn-db-44282.firebaseio.com",
    projectId: "crwn-db-44282",
    storageBucket: "crwn-db-44282.appspot.com",
    messagingSenderId: "892012638558",
    appId: "1:892012638558:web:7b3dc635ac630de3ba5fcf",
    measurementId: "G-19ZJZ2227G"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
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
            console.log('error creating user', error.message);
        }
    }
    return userRef;

}
  
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;