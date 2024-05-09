import { useLocalSearchParams } from "expo-router";
import Product from "../../../screens/Product";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
export default function Page() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        AsyncStorage.setItem("user", JSON.stringify(user));
        setLoading(false);
      } else {
        AsyncStorage.removeItem("user");
        setLoading(true);
        router.replace("account/login");
      }
    });

    return () => {
      unsub();
    };
  }, []);
  if (loading) {
    return <Loading />;
  } else {
    return <Product id={id} />;
  }
}
