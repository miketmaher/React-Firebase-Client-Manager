import  { createStore, combineReducers, compose } from 'redux';
import firebase from "firebase";
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

//Reducers @todo

const firebaseConfig = {
  apiKey: "AIzaSyBCuISvEc5hD79MAzMq_JGKTY34kiHosd0",
  authDomain: "reactclientpanel-b0263.firebaseapp.com",
  databaseURL: "https://reactclientpanel-b0263.firebaseio.com",
  projectId: "reactclientpanel-b0263",
  storageBucket: "reactclientpanel-b0263.appspot.com",
  messagingSenderId: "873148206782"
}

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfiles: true
}

firebase.initializeApp(firebaseConfig);

//const firestore = firebase.firestore();

const creatStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const initialState = {}

const store = creatStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;