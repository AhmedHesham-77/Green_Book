import { useEffect, useState } from "react";
import AddProduct from "../../../screens/AddProduct";
import { getUser } from "../../../firebase/users";
import Loading from "../../../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
export default function index() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAccess = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const user = await AsyncStorage.getItem("user");
          const userUid = JSON.parse(user).uid;
          const userData = await getUser(userUid);
          if (userData.isAdmin === false) {
            router.replace("(tabs)");
          }
          setLoading(false);
        } else {
          AsyncStorage.removeItem("user");
          setLoading(true);
          router.replace("account/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAccess();
  }, []);
  if (loading) {
    return <Loading />;
  } else {
    return <AddProduct />;
  }
}
