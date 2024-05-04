import {initializeApp} from "firebase/app";
import {getReactNativePersistence} from "@firebase/auth/dist/rn/index.js";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
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
const storage = getStorage();

const uploadImage = async (folder,uri, name, onProgress) => {

    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), `${folder}/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress && onProgress(progress);
            },
            (error) => {
                reject(error);
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                resolve({downloadUrl, metadata: uploadTask.snapshot.metadata});
            }
        );
    })

}

export {app, db, auth, storage,uploadImage};
