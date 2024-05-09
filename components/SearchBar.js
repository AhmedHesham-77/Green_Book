import React, {useEffect, useState} from "react";
import {View, StyleSheet, TextInput} from 'react-native';
import Button from "./Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getProducts} from "../firebase/products";

export default function SearchBar({onPress, windowWidth}) {
    const [searchText, setSearchText] = useState("");
    const [Data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await getProducts();
                setData(productsData);
                setSearchData(productsData)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const searchItems = (searchFor) => {
        setSearchData(Data.filter((item) => item.productName.includes(searchFor) ));
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search For"
                value={searchText}
                onChangeText={(text) => {
                    setSearchText(text)
                    searchItems(text)
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        fontSize: 16,
        width: '75%',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#e8e8e8'
    },
    button: {
        justifyContent: "center",
        width: '25%',
        alignItems: "center",
        backgroundColor: "green",
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    }
});
