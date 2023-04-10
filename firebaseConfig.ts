// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwihs35P1m1jxJFePShfs03hNTBn_kX_E",
    authDomain: "overtimeclaims-c107d.firebaseapp.com",
    projectId: "overtimeclaims-c107d",
    storageBucket: "overtimeclaims-c107d.appspot.com",
    messagingSenderId: "154965751956",
    appId: "1:154965751956:web:a4cd33c1b01addaa0e5c81",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
