import { Pressable, StyleSheet, View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "./BackButton";

import { router } from "expo-router";
import { addToCart, deleteFromCart } from "../firebase/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByEmail } from "../firebase/users";

export default function Product({ product }) {
  const [uid, setUid] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const userUid = JSON.parse(user).uid;
        setUid(userUid);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
      <Pressable
        onPress={() => router.navigate(`product/${product.id}`)}
        style={styles.container}
      >
        <Image source={require("../assets/favicon.png")} style={styles.image} />
        <Text style={styles.text}>{product.productName}</Text>
        <Text style={styles.text}>{product.price}</Text>
        <Button
          styles={styles.addToCart}
          title={"addToCart"}
          onPress={() => {
            addToCart(uid, product);
          }}
        />
      </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgreen",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
    height: 100,
    alignItems: "center",
  },
  text: {
    fontSize: 40,
  },
  addToCart: {
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 20,
    justifyContent: "center",
  },
  deleteFromCart: {
    backgroundColor: "red",
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 20,
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: 100,
  },
});
