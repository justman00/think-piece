import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyA890g6BXw04Z_bW5RjKix0i2ODTMSRFb0',
  authDomain: 'think-piece-vlad.firebaseapp.com',
  databaseURL: 'https://think-piece-vlad.firebaseio.com',
  projectId: 'think-piece-vlad',
  storageBucket: 'think-piece-vlad.appspot.com',
  messagingSenderId: '350245086528'
}

firebase.initializeApp(config)

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

export const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(provider)

const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

// just for showing off
window.firebase = firebase

// for adding data when creating a user with email and password
export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return

  // get a reference to the place in the database where a user profile might be
  const userRef = firestore.doc(`users/${user.uid}`)

  // go and fetch the document from the location
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.error(error)
    }
  }

  return getUserDocument(user.uid)
}

export const getUserDocument = async uid => {
  if (!uid) return null

  try {
    return firestore.collection('users').doc(uid)
  } catch (error) {
    console.error(error.message)
  }
}

export default firebase
