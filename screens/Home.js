import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
    SafeAreaView,
    ActivityIndicator,
    Button,
    FlatList
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {useState, useEffect} from "react";
import SearchBar from "../components/SearchBar";
import AddProduct from "../components/AddProduct";
import {getProducts, getProduct} from "../firebase/products";
import Product from "../components/Product";
import {router} from "expo-router";
import Loading from "../components/Loading";

export default function Home() {
    const [searchButton, setSearchButton] = useState(false);
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

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

            <Button title={"print data"} onPress={async () => {
                console.log(await getProduct("46DrWBg2ygLlzr7fVauL"));
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