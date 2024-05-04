import { useEffect, useState } from "react";
import Register from "../../screens/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Loading from "../../components/Loading";
export default function register() {

  const [loading , setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        AsyncStorage.setItem("user", JSON.stringify(user));
        setLoading(true);
        router.replace("(tabs)");
      } else {
        AsyncStorage.removeItem("user");
        setLoading(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <Loading />
  } else {
    return <Register />
  }
}
