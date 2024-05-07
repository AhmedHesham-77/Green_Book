import {View, Text, StyleSheet} from 'react-native';
import {useCallback, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {deleteFromCart, getMyCarts} from '../firebase/cart';
import Loading from '../components/Loading';
import {FlatList} from 'react-native';
import CartItem from '../components/CartItem';
import {useFocusEffect} from 'expo-router';

export default function Cart() {

    const [uid, setUid] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [render, setRender] = useState([]);
    const [cart, setCart] = useState([]); // [ {product: {name: "name", price: 0, quantity: 0}, quantity: 0}
    //const cart = useRef([]);

    const fetchData = async () => {
        try {
            setLoaded(false);
            const user = await AsyncStorage.getItem('user');
            const userUid = JSON.parse(user).uid;
            setUid(userUid);
            const currentCart = await getMyCarts(userUid);
            setCart(currentCart);
            //cart.current = currentCart;
            // setRender(cart.current);
            console.log(currentCart);
            setLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };
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