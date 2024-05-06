import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    FlatList,
    useWindowDimensions,
    Platform,
    Dimensions, Pressable
} from 'react-native';
import { getProducts } from '../firebase/products';
import { logout } from '../firebase/auth';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import {FontAwesome} from "@expo/vector-icons";
import {SearchBar} from "react-native-screens";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const windowWidth = useWindowDimensions().width;
    const [keyForForceUpdate, setKeyForForceUpdate] = useState(0);
    const [searchButton , setSearchButton] = useState(false);

    const handleLogout = async () => {
        await logout();
        // Assuming router is properly configured
        // router.navigate('/account/login');
    };

    const getAllProducts = async () => {
        const newProducts = await getProducts();
        setProducts(newProducts);
        setLoaded(true);
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const handleScreenResize = useCallback(() => {
        setKeyForForceUpdate((prevKey) => prevKey + 1);
    }, []);

    useEffect(() => {
        // Listen for screen size changes
        Dimensions.addEventListener('change', handleScreenResize);
        return () => {
            // Clean up the event listener
            Dimensions.removeEventListener('change', handleScreenResize);
        };
    }, [handleScreenResize]);

    if (!loaded) {
        return <Loading />;
    } else {
        const numColumns = Math.floor(windowWidth / 150);
        return (
            <SafeAreaView style={styles.container}>

                <View style = {styles.searchBar}>
                    <Pressable style = {styles.search} onPress={() => { setSearchButton(!searchButton); }}>
                        <FontAwesome name = 'search' size = {25} color = 'green' />
                    </Pressable>
                    {searchButton && <SearchBar onPress={() => console.log('searching')}/>}
                </View>


                <FlatList
                    key={keyForForceUpdate.toString()}
                    data={products}
                    renderItem={({ item }) => <ProductCard product={item} />}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.cardList}
                    numColumns={numColumns}
                />
                <StatusBar style="auto" />
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    cardList: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
});

export default Home;
