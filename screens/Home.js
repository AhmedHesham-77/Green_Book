import {View, Text, StyleSheet, StatusBar, Pressable, SafeAreaView, Button} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {useState, useEffect} from "react";
import SearchBar from "../components/SearchBar";
import AddProduct from "../components/AddProduct";
import {getProducts} from "../firebase/products";

export default function Home() {
    const [searchButton, setSearchButton] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllProducts = async () => {
        setLoading(true);
        const newProducts = await getProducts();
        setProducts(newProducts);
        setLoading(false);
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
                <Text style={styles.title}>
                    Home To Be edited.
                </Text>
                <AddProduct/>

            </View>
            {/*should be removed it is just for test */}

            <Button title={"print data"} onPress={() => {
                console.log(products)
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

    }

})