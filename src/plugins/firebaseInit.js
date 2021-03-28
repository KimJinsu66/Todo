import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-database'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig);