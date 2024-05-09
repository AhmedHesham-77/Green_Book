import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "./Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import { router } from "expo-router";
import { addToCart } from "../firebase/cart";
import { getUser } from "../firebase/users";
import { Ionicons } from "@expo/vector-icons";

const ProductCard = ({ product, onDelete }) => {
  const [uid, setUid] = useState("");
  const [role, setRole] = useState(true);

  useEffect(() => {
    const getUid = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const userUid = JSON.parse(user).uid;
        const userData = await getUser(userUid);
        setRole(userData.isAdmin);

        setUid(userUid);
      } catch (error) {
        console.log(error);
      }
    };
    getUid();
  }, []);

  return (
    <Pressable
      onPress={() => router.navigate(`product/${product.id}`)}
      style={styles.parent}
    >
      <Image source={{ uri: product.ImageUrl }} style={styles.image} />
      <Text style={styles.title}>
        {product.productName.length > 30
          ? product.productName.substring(0, 12).concat("...")
          : product.productName}{" "}
      </Text>
      <View style={styles.buttonsParnet}>
        {role === true ? (
          <Pressable style={styles.icon} onPress={() => onDelete()}>
            <AntDesign name="delete" size={24} color="red" />
          </Pressable>
        ) : null}

        {role === true ? (
          <Pressable
            style={styles.icon}
            onPress={() => router.navigate(`product/editProduct/${product.id}`)}
          >
            <FontAwesome5 name="edit" size={24} color="black" />
          </Pressable>
        ) : null}

        <Pressable style={styles.icon} onPress={() => addToCart(uid, product)}>
          <Feather name="shopping-cart" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.textParant}>
        <Text style={styles.price}> ${product.price} </Text>
      </View>
      <View style={styles.textParant}>
        <Ionicons name="star" size={24} color="#FFD700" />

        <Text style={styles.price}>
          {product.NumberReviews
            ? Math.ceil((product.TotalReviews / product.NumberReviews) * 10) /
              10
            : 0}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  parent: {
    paddingBottom: 10,
    margin: 10,
    width: 150,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 175,
    resizeMode: "stretch",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    width: 150,
    paddingHorizontal: 5,
    color: "#333",
    textAlign: "left",
  },
  buttonsParnet: {
    width: 150,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 5,
    paddingTop: 5,
    paddingVertical: 5,
  },
  textParant: {
    width: 150,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 5,
  },
  icon: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  price: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#f0f0f0",
  },
});

export default ProductCard;
