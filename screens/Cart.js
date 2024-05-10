import CartItem from '../components/CartItem';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    FlatList,
    useWindowDimensions,
    Platform,
    Dimensions,
    Pressable,
    TextInput,
    Alert
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {emptyCart, deleteFromCart, getMyCarts} from '../firebase/cart';
import {router, useFocusEffect} from 'expo-router';
import {getUser, updateUserBalance} from '../firebase/users';
import {LinearGradient} from 'expo-linear-gradient';
import {getProduct} from "../firebase/products";

export default function Cart() {

    const [uid, setUid] = useState('');
    const [user, setUser] = useState();
    const [loaded, setLoaded] = useState(false);
    const [cart, setCart] = useState([]);
    const [keyForForceUpdate, setKeyForForceUpdate] = useState(0);
    const windowWidth = useWindowDimensions().width;

    const fetchMyCart = async () => {
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

    const handleScreenResize = useCallback(() => {
        setKeyForForceUpdate((prevKey) => prevKey + 1);
    }, []);

    useEffect(() => {
        Dimensions.addEventListener('change', handleScreenResize);
        return () => {
            Dimensions.removeEventListener('change', handleScreenResize);
        };
    }, [handleScreenResize]);

    useFocusEffect(useCallback(() => {
        fetchMyCart();
    }, []));

    if (!loaded) {
        return <Loading/>;
    } else {
        const numColumns = Math.floor(windowWidth / 300);
        return (
            <SafeAreaView style={[styles.parent, {width: windowWidth}]}>
                <LinearGradient style={[styles.parent, {width: windowWidth}]} colors={['#96df71', '#5dc87f', '#3da35d']}
                                start={{x: 0.187, y: 0.378}} end={{x: 1, y: 1}}>
                    <FlatList
                        key={keyForForceUpdate.toString()}
                        data={cart}
                        renderItem={({item}) => <CartItem product={item} onDelete={async () => {
                            await deleteFromCart(item);
                            const newCart = cart.filter((curItem) => curItem.id !== item.id);
                            setCart(newCart);
                        }}/>}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.myCartList}
                        numColumns={numColumns}
                    />
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Button title='CHECKOUT' textColor='white' onPress={handleCheckout} styles={({pressed}) => [
                            {opacity: pressed ? 0.2 : 1},
                            {
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: '#a4ed80',
                                paddingVertical: 12,
                                paddingHorizontal: 20,
                                marginTop: 30,
                                marginBottom: 20,
                                width: '50%',
                                borderRadius: 10,
                                backgroundColor: '#246c3a'
                            }
                        ]}/>
                    </View>
                    <StatusBar style='auto'/>
                </LinearGradient>
            </SafeAreaView>
        );
    }
    ;
};

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    myCartList: {
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
});