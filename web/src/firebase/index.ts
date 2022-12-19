// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFunctions} from 'firebase/functions';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'rbc-app-dbaa4.firebaseapp.com',
    projectId: 'rbc-app-dbaa4',
    storageBucket: 'rbc-app-dbaa4.appspot.com',
    messagingSenderId: '794426229688',
    appId: '1:794426229688:web:d7454676e81d527441854d'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const functions = getFunctions(app)
