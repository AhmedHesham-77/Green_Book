import React, { useState } from "react";
import { View, StyleSheet, TextInput } from 'react-native';
import Button from "./Button";

export default function SearchBar({ onPress , windowWidth }) {
    const [searchText, setSearchText] = useState("");

    return (
        <View style={[styles.container , { width: windowWidth - 60 }]}>
            <TextInput
                style={styles.input}
                placeholder="Search For"
                value={searchText}
                onChangeText={(text) => {
                    setSearchText(text);
                    console.log(text);
                }}
            />
            <Button
                title= 'Search'
                textColor="white"
                onPress={onPress}
                styles={styles.button}
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
        backgroundColor: "#fff",
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
