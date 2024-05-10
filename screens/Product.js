import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable, Alert,
} from "react-native";
import { editProduct, getProduct } from "../firebase/products";
import Loading from "../components/Loading";
import { Ionicons } from "@expo/vector-icons";
import { addToCart, editFromCart, getFromCart } from "../firebase/cart";
import { addReview, getReview } from "../firebase/products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../components/BackButton";
import { getUser } from "../firebase/users";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {router, useFocusEffect} from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Product({ id }) {
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [uid, setUid] = useState("");
  const [review, setReview] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const renderBackdrop = useCallback(function (props) {
    return (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    );
  }, []);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["30%", "40%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleCloseSheet = bottomSheetModalRef.current?.close;

  const balance = useRef();

  useFocusEffect(
      React.useCallback(() => {
        const getUid = async () => {
          try {
            const user = await AsyncStorage.getItem("user");
            const userUid = JSON.parse(user).uid;
            setUid(userUid);
            const userData = await getUser(userUid);
            balance.current = userData.balance;
          } catch (error) {
            console.log(error);
          }
        };
        getUid();
      }, [])
  );

  useFocusEffect(
      React.useCallback(() => {
        const getProductById = async () => {
          setLoaded(false);
          const p = await getProduct(id);
          if (!p) {
            alert("Product not found");
            router.navigate("(tabs)");
            return;
          }
          setProduct(p);
          setLoaded(true);
        };
        getProductById();
        setReview(1);
      }, [id])
  );;

  const handleStarClick = (rating) => {
    setReview(rating);
  };

  const handleReview = async () => {
    const rev = await getReview(product.id);
    const ans = rev.find((cur) => {
      return cur.uid === uid;
    });
    if (ans != null) {
      alert("you are review");
    } else {
      const product0 = {
        productName: product.productName,
        price: Number(product.price),
        Quantity: Number(product.Quantity),
        description: product.description,
        ImageUrl: product.ImageUrl,
        id: product.id,
        NumberReviews: product.NumberReviews + 1,
        TotalReviews: product.TotalReviews + review,
      };
      await editProduct(product0);
      setProduct(product0);
      await addReview(product.id, uid);
    }
    handleCloseSheet();
  };

  const handleAddToCart = async () => {
    const item = await getFromCart(uid, product.id);
    if (item) {
      item.counter += quantity;
      await editFromCart(uid, item);
      setQuantity(1);
      Alert.alert('Product Added.' , 'The product has been successfully added.' , [{ text: 'OK'}] );
      return;
    }
    await addToCart(uid, product, quantity);
    Alert.alert('Product Added.' , 'The product has been successfully added.' , [{ text: 'OK'}] );
    setQuantity(1);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loaded ? (
          <View>
            <BackButton />
            <Image source={{ uri: product.ImageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <Text style={styles.title}>{product.productName}</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.priceContainer}>
                    <Ionicons name="star" size={24} color="#FFD700" />
                    <Text style={styles.price}>
                      {product.NumberReviews
                        ? Math.ceil(
                            (product.TotalReviews / product.NumberReviews) * 10
                          ) / 10
                        : 0}
                      ({product.NumberReviews})
                    </Text>
                  </View>

                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Ionicons
                        name="logo-usd"
                        size={25}
                        color="green"
                        style={styles.priceIcon}
                      />
                      <Text style={styles.price}>{product.price}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <AntDesign
                          name="minussquare"
                          size={24}
                          color="green"
                          onPress={() => {
                            quantity > 1 ? setQuantity(quantity - 1) : null;
                          }}
                        />
                        <Text
                          style={{
                            color: "black",
                            fontSize: 25,
                            marginLeft: 5,
                            marginRight: 5,
                          }}
                        >
                          {quantity}
                        </Text>
                        <AntDesign
                          name="plussquare"
                          size={24}
                          color="green"
                          onPress={() => {
                            setQuantity(quantity + 1);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.description}>
              <Text
                style={{ fontSize: 25, fontWeight: "bold", marginBottom: 5 }}
              >
                Description
              </Text>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
          </View>
        ) : (
          <Loading />
        )}
      </ScrollView>
      <BottomSheetModalProvider>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={[styles.ReviewButton, { marginBottom: 10 }]}
        >
          <Text style={styles.addToCartButtonText}>Review</Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: "white" }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.contentContainerText}>Review </Text>
            <BottomSheetView style={styles.reviewContainer}>
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
            </BottomSheetView>
            <Pressable onPress={() => handleReview()}>
              <Text style={{ fontSize: 16 }}>Submit</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheetModal>
        <TouchableOpacity
          onPress={() => handleAddToCart()}
          style={styles.addToCartButton}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#d9e4d9",
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "stretch",
    marginBottom: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    position: "absolute",
    top: 260,
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
    paddingHorizontal: 30,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "rgba(227,227,227,0.85)",
    borderRadius: 20,
    zIndex: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  priceIcon: {
    marginRight: 5,
  },
  price: {
    fontSize: 25,
    color: "green",
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  ReviewButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "#246c3a",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    marginBottom: 10,
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
  description: {
    paddingHorizontal: 10,
  },
  contentContainer: {
    alignItems: "center",
  },
  contentContainerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 5,
  },
});
