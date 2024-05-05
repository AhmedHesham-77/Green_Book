import {db, auth} from "./config";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    confirmPasswordReset,
    signInWithCredential,
    FacebookAuthProvider,
    signOut,
} from "firebase/auth";
import {addDoc, collection, doc, setDoc} from 'firebase/firestore';

onAuthStateChanged(auth, (user) => {
    if (user != null) {
        console.log("We are authenticated now!");
    }
});

async function isSignedIn() {
    console.log("from isSignedIn method: ", authentication.currentUser);
    return (await authentication.currentUser) != null;
}

async function register(username, email, phone, password, date) {
    const credentials = await createUserWithEmailAndPassword(auth, email, password, username, phone, date);
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
        Name: username,
        Email: email,
        Phone: phone,
        BirthOfDate: date,
    });

    return credentials; // return some 'credentials' of the created user.
};

async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}

async function reset(email) {
    console.log("begin the method reset with email=", email);
    sendPasswordResetEmail(authentication, email);
}

async function logout() {
    await signOut(auth);
}

export {register, login, logout, reset, isSignedIn};
