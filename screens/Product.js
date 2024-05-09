import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { editProduct, getProduct } from "../firebase/products";
import Loading from "../components/Loading";
import { Ionicons } from "@expo/vector-icons";
import { addToCart } from "../firebase/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../components/BackButton";

export default function Product({ id }) {
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [uid, setUid] = useState("");
  const [review, setReview] = useState(1);

  useEffect(() => {
    const getUid = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const userUid = JSON.parse(user).uid;
        setUid(userUid);
      } catch (error) {
        console.log(error);
      }
    };
    getUid();
  }, []);

  useEffect(() => {
    const getProductById = async () => {
      setLoaded(false);
      const p = await getProduct(id);
      setProduct(p);
      setLoaded(true);
    };

    getProductById();
  }, [id]);

  const handleStarClick = (rating) => {
    setReview(rating);
  };

  const handleReview = async () => {
    const product0 = {
      productName: product.productName,
      price: Number(product.price),
      Quantity: Number(product.productQuantity),
      description: product.description,
      ImageUrl: product.ImageUrl,
      id: product.id,
      NumberReviews: product.NumberReviews + 1,
      TotalReviews: product.TotalReviews + review,
    };
    await editProduct(product0);
    setProduct(product0);
  };

  return loaded ? (
    <View style={styles.container}>
      <BackButton />
      <Image source={{ uri: product.ImageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.productName}</Text>
        <View style={styles.priceContainer}>
          <Ionicons
            name="logo-usd"
            size={18}
            color="green"
            style={styles.priceIcon}
          />
          <Text style={styles.price}>{product.price}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <Text style={styles.price}>
            {product.NumberReviews
              ? Math.ceil((product.TotalReviews / product.NumberReviews) * 10) /
                10
              : 0}
          </Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      <TouchableOpacity
        onPress={() => addToCart(uid, product)}
        style={styles.addToCartButton}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
      <View style={styles.reviewContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleStarClick(star)}
            style={styles.starButton}
          >
            <Ionicons
              name={star <= review ? "star" : "star-outline"}
              size={30}
              color={star <= review ? "#FFD700" : "#CCCCCC"}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => handleReview()}
        style={styles.addToCartButton}
      >
        <Text style={styles.addToCartButtonText}>Review</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
    zIndex: 1,
  },
  infoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  priceIcon: {
    marginRight: 5,
  },
  price: {
    fontSize: 20,
    color: "green",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: "#246c3a",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  reviewContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  starButton: {
    marginRight: 5,
  },
});
