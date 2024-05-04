import { db, auth } from "./config";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
async function getUserByEmail(email) {
  const usersColumn = collection(db, "users");
  const que = query(usersColumn, where("email", "==", email));
  const userSnapShot = await getDocs(que);
  const userObject = userSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return userObject[0];
}

async function updateUser(uid, user) {
  const usersColumn = doc(db, "users", uid);
  await updateDoc(usersColumn, {
    name: user.name,
    phone: user.phone,
  });
}
export { getUserByEmail, updateUser };
