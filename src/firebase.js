import firebase from 'firebase/app'
import 'firebase/firestore'

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

const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

// just for showing off
window.firebase = firebase

export default firebase
