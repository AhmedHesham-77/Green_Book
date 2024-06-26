import {db} from "./config";
import {
  getDocs,
  doc,
  collection,
  query,
  where,
  updateDoc, getDoc,
} from "firebase/firestore";

async function getUsers() {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map((doc) => {
    return {id: doc.id, ...doc.data()};
  });
  return usersList;
}

async function getUserByEmail(email) {
  const usersColumn = collection(db, "users");
  const que = query(usersColumn, where("email", "==", email));
  const userSnapShot = await getDocs(que);
  const userObject = userSnapShot.docs.map((doc) => {
    return {id: doc.id, ...doc.data()};
  });
  return userObject[0];
}

async function getUser(id) {
  const docRef = doc(db, `users`, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {id: id, ...docSnap.data()};
  }
  console.log("No such document!");
  return undefined
}

async function updateUser(uid, user) {
  const usersColumn = doc(db, "users", uid);
  await updateDoc(usersColumn, {
    name: user.name,
    phone: user.phone
  });
}

async function updateUserBalance(uid, newBalance) {
  const usersColumn = doc(db, "users", uid);
  await updateDoc(usersColumn, {
    balance: newBalance
  });
}

async function updateUserImage(uid, image) {
  const usersColumn = doc(db, "users", uid);
  await updateDoc(usersColumn, {
    profile_image: image
  });
}

export {getUserByEmail, updateUserBalance, getUser, updateUser, updateUserImage, getUsers};
