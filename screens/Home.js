import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import React, { useState , useEffect , useCallback } from 'react';
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
    TextInput
} from 'react-native';
import { getProducts } from '../firebase/products';
import { FontAwesome } from '@expo/vector-icons';
import {router, useFocusEffect} from 'expo-router';
import { deleteProduct } from '../firebase/products';
import Search from "../app/(tabs)/search";

const Home = () => {

    const [products , setProducts] = useState([]);
    const [loaded , setLoaded] = useState(false);
    const windowWidth = useWindowDimensions().width;
    const [keyForForceUpdate , setKeyForForceUpdate] = useState(0);
    const [searchButton , setSearchButton] = useState(false);

    const getAllProducts = async () => {
        const newProducts = await getProducts();
        setProducts(newProducts);
        setLoaded(true);

    };

    const handleScreenResize = useCallback(() => {
        setKeyForForceUpdate((prevKey) => prevKey + 1);
    }, []);

    useEffect(() => {
        Dimensions.addEventListener('change' , handleScreenResize);
        return () => {
            Dimensions.removeEventListener('change' , handleScreenResize);
        };
    }, [handleScreenResize]);

    useFocusEffect(useCallback(() => {
        getAllProducts();
    }, []));

    if (!loaded) {
        return <Loading />;
    } else {
        const numColumns = Math.floor(windowWidth / 150);
        return (
            <SafeAreaView style = {[styles.parent , { width: windowWidth }]}>
                <View style = {styles.searchBar}>
                    <Pressable style = {{ padding: 15 }} onPress={() => router.navigate('/(tabs)/search')}>
                        <View style = {[styles.input , { width: windowWidth - 40}]}>
                            <FontAwesome name = 'search' size = {25} color = 'green' />
                            <TextInput
                                placeholder="Enter your wanted product"
                                editable={false}
                            />
                        </View>

                    </Pressable>
                </View>
                <FlatList
                    key = {keyForForceUpdate.toString()}
                    data = {products}
                    renderItem = { ({ item }) => <ProductCard product = {item} onDelete = {async () => {
                        await deleteProduct(item.id);
                        const newProductList = products.filter((curProduct) => curProduct.id !== item.id);
                        setProducts(newProductList);
                    }} />}
                    keyExtractor = {(item) => item.id}
                    contentContainerStyle = {styles.cardList}
                    numColumns = {numColumns}
                />
                <StatusBar style = 'auto' />
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    searchBar: {
        width: '45%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cardList: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    input: {
        fontSize: 16,
        width: '100%',
        paddingVertical: 8,
        // paddingHorizontal: 12,
        borderRadius:15,
        backgroundColor: '#e8e8e8',
        flexDirection: 'row',
    }
});

export default Home;






// import Button from '../components/Button';

{/* <View style={styles.buttonContainer}>
    <Button title={"Add Product"} onPress={() => router.navigate('/product')} styles={styles.button} />
</View> */}

// buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
// },
// button: {
//     backgroundColor: 'hotpink',
//     marginHorizontal: 10,
//     marginBottom: 20,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: 'center',
// }
// });