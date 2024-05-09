import { db } from "./config";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  getDoc,
} from "firebase/firestore";

// Get a list of cities from your database
async function getProducts() {
  const productsCol = collection(db, "products");
  const productSnapshot = await getDocs(productsCol);
  const productList = productSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return productList;
}

async function getProduct(id) {
  const docRef = doc(db, `products`, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return { id: id, ...docSnap.data() };
  }

  // docSnap.data() will be undefined in this case
  console.log("No such document!");
  return undefined;
}

async function editProduct(product) {
  console.log("at editProduct", product);
  await setDoc(doc(db, "products", product.id), product);
}

async function deleteProduct(productId) {
  try {
    await deleteDoc(doc(db, "products", productId));
    console.log("Document deleted with ID: ", productId);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

async function addProduct(product) {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
async function addReview(productId, userID) {
  try {
    const data = {
      uid: userID,
    };

    await setDoc(doc(db, `products/${productId}/reviewers`, userID), data);
  } catch (e) {
    console.error("Error adding document:", e);
  }
}

async function getReview(productId) {
  const revCol = collection(db, `products/${productId}/reviewers`);
  const revSnapshot = await getDocs(revCol);
  const revList = revSnapshot.docs.map((doc) => {
    return { ...doc.data() };
  });
  return revList;
}
// function subscribe(callback) {
//     const unsubscribe = onSnapshot(
//         query(collection(db, "cities")),
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

export {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
  addReview,
  getReview,
  // subscribe
};
