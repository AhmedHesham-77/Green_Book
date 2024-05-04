import React, {useState} from "react";
import {View, StyleSheet, TextInput} from 'react-native';
import Button from "./Button";

export default function SearchBar({onPress}) {
    const [searchText, setSearchText] = useState("");
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for"
                value={searchText}
                onChangeText={(text) => {
                    setSearchText(text);
                    console.log(text);
                }}
            />
            <Button
                title={"search"}
                textColor="black"
                onPress={onPress}
                styles={styles.button}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: "100%",
    }
    , input: {
        backgroundColor: "white",
        fontSize: 28,
        width: "80%",
        paddingHorizontal: 5,


    }, button: {
        fontSize: 32,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        backgroundColor: "green",
        width: "20%",
        minWidth: 70,
        maxWidth: 100

    }
});
