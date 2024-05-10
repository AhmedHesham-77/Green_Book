import {db, auth, googleProvider} from "./config";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

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
    const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        username,
        phone,
        date
    );
    await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: username,
        email: email,
        phone: phone,
        birthOfDate: date,
        isAdmin: false,
        balance: 100,
    });

    return credentials;
}


async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}

async function reset(email) {
    console.log("begin the method reset with email=", email);
    await sendPasswordResetEmail(auth, email);
}

const signInWithGoogle = async () => {
    try {
        console.log(2222);

        const result = await signInWithPopup(auth, googleProvider)
        console.log(11111);
        GoogleAuthProvider.credentialFromResult(result);


        console.log("result", result);
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            name: result.user.displayName,
            email: result.user.email,
            phone: result.user.phoneNumber,
            profile_image: result.user.photoURL,
            birthOfDate: null,
            isAdmin: false,
            balance: 100,
        });

    } catch (error) {
        console.log(error);

    }
};

async function logout() {
    await signOut(auth);
}

export {register, signInWithGoogle, login, logout, reset, isSignedIn};