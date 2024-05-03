import { auth } from "./config";
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
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }
});
async function isSignedIn() {
  console.log("from isSignedIn method: ", authentication.currentUser);
  return (await authentication.currentUser) != null;
}

async function register(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
}

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

export { register, login, logout, reset, isSignedIn };
