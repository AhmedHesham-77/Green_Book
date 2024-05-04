import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from '../../components/Loading';
import Login from '../../screens/Login';
export default function login () {

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
    return <Login />
  }
}
