import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useCallback, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {emptyCart, deleteFromCart, getMyCarts} from '../firebase/cart';
import Loading from '../components/Loading';
import {FlatList} from 'react-native';
import CartItem from '../components/CartItem';
import {router, useFocusEffect} from 'expo-router';
import Button from "../components/Button";
import {getUser, updateUserBalance} from "../firebase/users";
import {getProduct} from "../firebase/products";

export default function Cart() {

    const [uid, setUid] = useState('');
    const [user, setUser] = useState();
    const [loaded, setLoaded] = useState(false);
    //const [render, setRender] = useState([]);
    const [cart, setCart] = useState([]); // [ {product: {name: "name", price: 0, quantity: 0}, quantity: 0}
    //const cart = useRef([]);

    const fetchData = async () => {
        try {
            setLoaded(false);
            const user = await AsyncStorage.getItem('user');
            const userUid = JSON.parse(user).uid;
            setUid(userUid);
            const myUser = await getUser(userUid);
            setUser(myUser);
            const currentCart = await getMyCarts(userUid);
            setCart(currentCart);
            setLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };
    const handleCheckout = async () => {
        console.log("cart");
        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        }
        let total = 0;
        for (const item of cart) {
            const productCheck = await getProduct(item.id);
            console.log(productCheck);
            if (!productCheck) {
                await deleteFromCart(item);
                const newCart = cart.filter((cartItem) => cartItem.id !== item.id); // Filter based on item.id
                setCart(newCart);
            } else {
                total += item.price * item.counter;
                console.log(item);
            }
        }

        if (total > user.balance) {
            Alert.alert("Dont have much balance", "you dont have enough balance to buy these products");
            return;
        }
        const newBalance = user.balance - total;
        await updateUserBalance(uid, newBalance);
        setUser({...user, balance: newBalance});
        console.log(user)
        Alert.alert("Successfully", "Your receipt is : " + total.toString() + " $");

        await emptyCart(uid);
        router.navigate('(tabs)');

    }
    const handleDeleteFromCart = async () => {

    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, []));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>

                {!loaded ? (
                    <Loading/>
                ) : (
                    <FlatList
                        style={styles.list}
                        data={cart}
                        renderItem={({item}) => (
                            <CartItem product={item} onDelete={async () => {
                                await deleteFromCart(item);
                                const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
                                setCart(newCart);
                            }}/>
                        )
                        }
                    />
                )}

                <Button
                    title="Checkout"
                    textColor="white"
                    onPress={handleCheckout}
                    styles={({pressed}) => [
                        {opacity: pressed ? 0.2 : 1},
                        {
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#a4ed80",
                            paddingVertical: 12,
                            paddingHorizontal: 20,
                            marginTop: 30,
                            marginBottom: 20,
                            width: "80%",
                            borderRadius: 10,
                            backgroundColor: "#246c3a",
                        },
                    ]}
                />

            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
        justifyContent: "center",

    },
    list: {
        width: "80%",

    }
})