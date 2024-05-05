import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {getProduct} from "../firebase/products";
import {useEffect, useState} from "react";
import Loading from "../components/Loading";
import Button from "../components/Button";

export default function Product({id}) {
    const [product, setProduct] = useState();
    const [loaded, setLoaded] = useState(false);
    const myId = id;
    const getProductById = async () => {
        setLoaded(false);
        const p = await getProduct(myId);
        setProduct(p);
        setLoaded(true);

    }
    useEffect(() => {
        getProductById();


    }, [myId]);

    return (loaded ? (<View style={styles.container}>
            <Text style={styles.title}>
                {myId}

            </Text>
            <Text style={styles.title}>
                {product.productName}

            </Text>
            <Text style={styles.title}>
                {product.price}

            </Text>
            <Text style={styles.title}>
                {product.description}

            </Text>
        </View>) : <Loading/>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
        justifyContent: "center",

    },
    testButton: {
        backgroundColor: "black"
    }
})