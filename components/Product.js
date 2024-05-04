import {Pressable, StyleSheet, View, Text, Image} from "react-native";
import React from "react";
import Button from "./Button";
import {router} from "expo-router";

export default function Product({product}) {

    return (
        <Pressable onPress={() => router.navigate(`product/${product.id}`)} style={styles.container}>
            <Image source={require('../assets/favicon.png')} style={styles.image}/>
            <Text style={styles.text}>{product.productName}</Text>
            <Text style={styles.text}>{product.price}</Text>
            <Button styles={styles.addToCart} title={"addToCart"} onPress={() => {
                console.log(product.id)
            }}/>
        </Pressable>
    );
};

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
        justifyContent: "center"

    },
    image: {
        height: "100%",
        width: 100

    }
});
