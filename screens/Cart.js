import {View, Text, StyleSheet} from 'react-native';
import {useCallback, useEffect, useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteFromCart, getMyCarts } from '../firebase/cart';
import Loading from '../components/Loading';
import { FlatList } from 'react-native';
import CartItem from '../components/CartItem';
import Product from '../components/Product';
import { useFocusEffect } from 'expo-router';

export default function Cart() {

    const [uid , setUid] = useState('');
    const [loaded , setLoaded] = useState(false);
    const [render , setRender] = useState([]);

    const cart = useRef([]);

    const fetchData = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            const userUid = JSON.parse(user).uid;
            setUid(userUid);
            const currentCart = await getMyCarts(userUid);
            cart.current = currentCart;
            setRender(cart.current);
            setLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

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
                        data={cart.current}
                        renderItem={({item}) => (
                        <CartItem product = {item} onDelete = {() => {deleteFromCart(item); fetchData();}} />
                        )
                        }
                    />
                )}





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