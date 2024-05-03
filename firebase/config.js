import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyDlQxo4NMf3F40tX3-_Qq5N2gBbbgOOUMg",
  authDomain: "greenbook-1be04.firebaseapp.com",
  projectId: "greenbook-1be04",
  storageBucket: "greenbook-1be04.appspot.com",
  messagingSenderId: "958604786352",
  appId: "1:958604786352:web:0a9e06482c620e9e365975",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, db, auth };
