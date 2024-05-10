import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable} from "react-native";
import {editProduct, getProduct} from "../firebase/products";
import Loading from "../components/Loading";
import {Feather, FontAwesome, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {addToCart} from "../firebase/cart";
import {addReview, getReview} from "../firebase/products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "../components/BackButton";
import {getUser} from "../firebase/users";
import BottomSheet, {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Button from "../components/Button";

export default function Product({id}) {
    const [product, setProduct] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [uid, setUid] = useState("");
    const [review, setReview] = useState(1);

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

    useEffect(() => {
        const getUid = async () => {
            try {
                const user = await AsyncStorage.getItem("user");
                const userUid = JSON.parse(user).uid;
                console.log(userUid)
                const userData = await getUser(userUid)
                balance.current = userData.balance;
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
        handleCloseSheet()
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {loaded ? (
                    <View>
                        <BackButton/>
                        <Image source={{uri: product.ImageUrl}} style={styles.image}/>
                        <View style={styles.infoContainer}>
                            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                                <Text style={styles.title}>{product.productName}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={styles.priceContainer}>
                                        <Ionicons name="star" size={24} color="#FFD700"/>
                                        <Text style={styles.price}>
                                            {product.NumberReviews
                                                ? Math.ceil(
                                                (product.TotalReviews / product.NumberReviews) * 10
                                            ) / 10
                                                : 0}
                                            ({product.NumberReviews})
                                        </Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Ionicons
                                                name="logo-usd"
                                                size={18}
                                                color="green"
                                                style={styles.priceIcon}
                                            />
                                            <Text style={styles.price}>{product.price}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <FontAwesome5 name="coins" size={30} color="orange"/>
                                            <Text style={styles.price}>{balance.current}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.description}>
                            <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 5}}>Description</Text>
                            <Text style={styles.descriptionText}>{product.description}</Text>
                        </View>
                    </View>
                ) : (
                    <Loading/>
                )}
            </ScrollView>
            <BottomSheetModalProvider>
                <TouchableOpacity
                    onPress={handlePresentModalPress}
                    style={[styles.addToCartButton, {marginBottom: 10}]}
                >
                    <Text style={styles.addToCartButtonText}>Review</Text>
                </TouchableOpacity>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={true}
                    backgroundStyle={{backgroundColor: "white"}}
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
                        <Pressable onPress={() => handleCloseSheet()}>
                            <Text>Submit</Text>
                        </Pressable>
                    </BottomSheetView>
                </BottomSheetModal>
                <TouchableOpacity
                    onPress={() => addToCart(uid, product)}
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
        position: 'absolute',
        bottom: 120,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 15,
        paddingHorizontal: 30,
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: 'rgba(227,227,227,0.85)',
        borderRadius: 20,
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
        fontSize: 20,
        color: "green",
    },
    descriptionText: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },
    addToCartButton: {
        backgroundColor: "#246c3a",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        alignSelf: 'center',
        width: '90%',
        marginBottom: 10
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
    }, description: {
        paddingHorizontal: 10
    }, contentContainer: {
        alignItems: "center",
    },
    contentContainerText: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 10,
    }
});