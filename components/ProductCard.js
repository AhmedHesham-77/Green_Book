import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, Pressable, Image} from 'react-native';
import {router} from 'expo-router';
import Button from "./Button";
import {addToCart} from "../firebase/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {deleteProduct} from "../firebase/products";

const ProductCard = ({product}) => {

    const [uid, setUid] = useState('');

    const handleDeleteProduct = async () => {
        await deleteProduct(product.id);
    }
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
            <Image source={require('../assets/favicon.png')} style={styles.image}/>
            <Text style={styles.text}>{product.productName}</Text>
            <Text style={styles.text}>${product.price}</Text>
            <Button title={"Add to Cart"} styles={styles.button} onPress={() => addToCart(uid, product)}
                    textColor='white'/>
            <Button title={"Delete Product"} styles={styles.button} onPress={handleDeleteProduct}
                    textColor='white'/>
            <Button title={"Edit Product"} styles={styles.button}
                    onPress={() => router.navigate(`product/editProduct/${product.id}`)}
                    textColor='white'/>

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
        shadowOffset: {width: 0, height: 2},
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
    button: {
        backgroundColor: 'green'
        , margin: 5
    }
});

export default ProductCard;