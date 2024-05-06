import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import Button from "./Button";
import { addToCart, deleteFromCart } from "../firebase/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductCard = ({ product }) => {

    const [uid , setUid] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
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
            <Image source={require('../assets/favicon.png')} style={styles.image} />
            <Text style={styles.text}>{product.productName}</Text>
            <Text style={styles.text}>${product.price}</Text>
            <Button title={"Add to Cart"} onPress={() => addToCart(uid, product)} styles = {{ backgroundColor: 'green'}} textColor = 'white' />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    addToCart: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
});

export default ProductCard;