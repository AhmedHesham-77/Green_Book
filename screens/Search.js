import {View, Image, Text, StyleSheet, Pressable, TextInput, Alert, TouchableOpacity, FlatList} from 'react-native';
import BottomSheet, {
    BottomSheetModal, BottomSheetView,
    BottomSheetModalProvider, BottomSheetBackdrop, BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Feather, FontAwesome} from "@expo/vector-icons";
import ProductCard from "../components/ProductCard";
import {deleteProduct, getProducts} from "../firebase/products";
import ProductSearch from "../components/ProductSearch";
import BackButton from "../components/BackButton";

export default function Search() {
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
        setSearchData(Data.filter((item) => item.productName.toLowerCase().includes(searchFor.toLowerCase())));
    };

    return (
        <View style={styles.container}>
            <BackButton/>
            <TextInput
                style={styles.input}
                placeholder="Search For"
                value={searchText}
                onChangeText={(text) => {
                    setSearchText(text)
                    searchItems(text)
                }}
            />
            <FlatList
                data={searchData}
                renderItem={({item}) => <ProductSearch {...item}/>}
                style={{width: '100%'}}
                contentContainerStyle={styles.flatList}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: "center",
        height: '100vh',
        width: '100%'
    },
    input: {
        flexDirection: "row",
        borderRadius: 20,
        height: 50,
        borderColor: "#ccc", // Light gray border
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: "80%",
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: 'center',
    },
    flatList: {
        width: '100%',
        alignItems: 'center',
        // paddingHorizontal: 10,
    },
});