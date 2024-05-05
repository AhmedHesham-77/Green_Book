import {
    View,

    StyleSheet,
    StatusBar,
    Pressable,
    SafeAreaView,
    Button,
    FlatList
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {useState, useEffect} from "react";
import SearchBar from "../components/SearchBar";
import AddProduct from "../components/AddProduct";
import {getProducts} from "../firebase/products";
import Product from "../components/Product";
import {router} from "expo-router";
import Loading from "../components/Loading";
import {logout} from "../firebase/auth";

export default function Home() {
    const [searchButton, setSearchButton] = useState(false);
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const handleLogout = async () => {
        await logout();
        router.navigate("/account/login");
    };

    const getAllProducts = async () => {
        const newProducts = await getProducts();
        setProducts(newProducts);
        setLoaded(true);
    }
    useEffect(() => {
        getAllProducts();

    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchbar}>
                <Pressable style={styles.search} onPress={() => {
                    setSearchButton(!searchButton);
                }}>
                    <FontAwesome name="search" size={24} color="black"></FontAwesome>
                </Pressable>

                {searchButton && <SearchBar onPress={() => console.log('searching')}/>}
            </View>
            <View style={styles.container2}>

                {!loaded ? (
                    <Loading/>
                ) : (
                    <FlatList
                        style={styles.list}
                        data={products}
                        renderItem={({item}) => (
                            < Product
                                product={item}

                            />
                        )
                        }
                    />
                )}
                <AddProduct/>

            </View>
            {/*should be removed it is just for test */}

            <Button title={"log out"} onPress={async () => {
                handleLogout();
            }}/>
            <StatusBar style="auto"/>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        paddingVertical: 24,
        paddingHorizontal: 15
    },
    container2: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    }, search: {
        margin: 5,
        justifyContent: "center"
    },
    searchbar: {
        padding: 5,
        height: "8%",
        minHeight: 50,
        width: "100%",

        flexDirection: "row",

    },
    list: {
        width: "80%",

    }

})