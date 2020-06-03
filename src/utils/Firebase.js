import firebase from 'firebase'
import { store } from './../store'
import { ACTIONS } from './../actions'

require('firebase/functions')
require('firebase/firestore')

firebase.initializeApp({
	apiKey: 'AIzaSyCgfUBc3vnj4TPdphirV3IBI1JeiRDJ6Ok',
	authDomain: 'gamer-723b9.firebaseapp.com',
	databaseURL: 'https://gamer-723b9.firebaseio.com',
	projectId: 'gamer-723b9',
	storageBucket: 'gamer-723b9.appspot.com',
	messagingSenderId: '1050184581932'
})

// Inits
export const AUTH = firebase.auth()
export const DATABASE = firebase.database()
export const STORAGE = firebase.storage()
export const FUNCTIONS = firebase.functions()
export const FIRESTORE = firebase.firestore()
