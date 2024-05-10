import {db} from "./config";
import {
    getDocs,
    doc,
    deleteDoc,
    collection, setDoc, getDoc,

} from "firebase/firestore";

async function addToCart(uid, product , quantity) {
    try {

        const data = {
            productName: product.productName,
            price: product.price,
            counter: quantity,
            ImageUrl: product.ImageUrl
        }

        await setDoc(doc(db, `users/${uid}/myCart`, product.id), data);

    } catch (e) {
        console.error("Error adding document:", e);
    }
}

async function editFromCart(uid, product) {
    await setDoc(doc(db, `users/${uid}/myCart`, product.id), product);
}


async function getFromCart(uid, id) {
    const docRef = doc(db, `users/${uid}/myCart`, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {id: id, ...docSnap.data()};
    }
    return undefined
}


async function getMyCarts(uid) {
    const cartsCol = collection(db, `users/${uid}/myCart`);
    const cartSnapshot = await getDocs(cartsCol);
    const cartList = cartSnapshot.docs.map((doc) => {
        return {id: doc.id, uid, ...doc.data()};
    });
    return cartList;
}

async function deleteFromCart(product) {
    try {
        await deleteDoc(doc(db, `users/${product.uid}/myCart`, product.id));
        console.log("Document deleted with ID: ", product.id);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}

async function emptyCart(uid) {
    try {
        const cartRef = collection(db, `users/${uid}/myCart`);
        const cartSnapshot = await getDocs(cartRef);

        cartSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        console.log("All documents deleted from cart.");
    } catch (error) {
        console.error("Error deleting documents: ", error);
    }
}


export {addToCart, emptyCart, getFromCart, editFromCart, getMyCarts, deleteFromCart};