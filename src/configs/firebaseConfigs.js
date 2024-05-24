import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCKSq8rDVcCMlAXvJS77FfZKENcAiIbDds",
    authDomain: "comuniplaza-76f35.firebaseapp.com",
    projectId: "comuniplaza-76f35",
    storageBucket: "comuniplaza-76f35.appspot.com",
    messagingSenderId: "466930125637",
    appId: "1:466930125637:web:35c2de06c76f083f0d4c2c"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export { db };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase