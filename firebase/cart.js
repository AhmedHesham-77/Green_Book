import { db } from "./config";
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
    getDoc,
} from "firebase/firestore";

async function addToCart(uid , product) {
    try {
        const docRef = await addDoc(collection(db, `users/${uid}/myCart`), {
            productName: product.productName,
            price: product.price
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function getMyCarts (uid) {
    const cartsCol = collection(db, `users/${uid}/myCart`);
    const cartSnapshot = await getDocs(cartsCol);
    const cartList = cartSnapshot.docs.map((doc) => {
        return { id: doc.id, uid, ...doc.data() };
    });
    return cartList;
}

async function deleteFromCart (product) {
    try {
        await deleteDoc(doc(db, `users/${product.uid}/myCart`, product.id));
        console.log("Document deleted with ID: ", product.id);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}








export { addToCart , getMyCarts , deleteFromCart };













//
// async function getTodo(uid, id) {
//     const docRef = doc(db, `users/${uid}/todos`, id);
//     const docSnap = await getDoc(docRef);
//
//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//         return { id: id, uid, ...docSnap.data()};
//     }
//
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
//     return undefined
// }
//
// async function editTodo(todo) {
//     console.log("at editTodo", todo);
//     await setDoc(doc(db, `users/${todo.uid}/todos`, todo.id), todo);
// }
//

//
// async function addUser({uid,email}) {
//     try {
//         await setDoc(doc(db, "users", uid), {uid,email})
//         // const docRef = await addDoc(collection(db, uid), {uid,email});
//         console.log("Document written with ID: ", uid);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }
//

//
// function subscribe(uid,callback) {
//     const unsubscribe = onSnapshot(
//         query(collection(db, `users/${uid}/todos`)),
//         (snapshot) => {
//             const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
//             snapshot.docChanges().forEach((change) => {
//                 // console.log("changes", change, snapshot.metadata);
//                 if (callback) callback({ change, snapshot });
//             });
//             // console.log(source, " data: ", snapshot.data());
//         }
//     );
//     return unsubscribe;
// }
//
// export { getTodos, addTodo, editTodo, deleteTodo, getTodo, subscribe, addUser };