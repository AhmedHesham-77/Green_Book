import {db} from "./config";
import {
    getDocs,
    doc,

    collection,
    query,
    where,
    updateDoc, getDoc,
} from "firebase/firestore";

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
        console.log("Document data:", docSnap.data());
        return {id: id, ...docSnap.data()};
    }

    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return undefined
}

async function updateUser(uid, user) {
    const usersColumn = doc(db, "users", uid);
    await updateDoc(usersColumn, {
        name: user.name,
        phone: user.phone,
    });
}

export {getUserByEmail, getUser, updateUser};
