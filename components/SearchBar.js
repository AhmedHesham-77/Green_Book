import React, {useState} from "react";
import MyButton from "./MyButton";
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';

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
            <MyButton style={styles.button} onPress={onPress}>
                <Text>search</Text>
            </MyButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    }
    , input: {
        backgroundColor: "white",
        fontSize: 32,
        height: "20%",
        width: "80%"

    }, button: {
        fontSize: 32,
        height: "20%",

    }
});
