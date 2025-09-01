// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1LI1y7m9T-av1WW1sDQMSdqyaG6RtDFU",
    authDomain: "hortasesc-9b067.firebaseapp.com",
    databaseURL: "https://hortasesc-9b067-default-rtdb.firebaseio.com",
    projectId: "hortasesc-9b067",
    storageBucket: "hortasesc-9b067.firebasestorage.app",
    messagingSenderId: "892214843424",
    appId: "1:892214843424:web:189c891942a86138e4c445",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

/*
REACT_APP_FIREBASE_API_KEY="AIzaSyA1LI1y7m9T-av1WW1sDQMSdqyaG6RtDFU"
REACT_APP_FIREBASE_AUTH_DOMAIN="hortasesc-9b067.firebaseapp.com"
REACT_APP_FIREBASE_DATABASE_URL="https://hortasesc-9b067-default-rtdb.firebaseio.com"
REACT_APP_FIREBASE_PROJECT_ID="hortasesc-9b067"
REACT_APP_FIREBASE_STORAGE_BUCKET="hortasesc-9b067.firebasestorage.app"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="892214843424"
REACT_APP_FIREBASE_APP_ID="1:892214843424:web:189c891942a86138e4c445"
*/