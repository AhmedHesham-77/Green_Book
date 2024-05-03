import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {useState} from "react";
import SearchBar from "./SearchBar";

export default function MyHome() {
    const [searchButton, setSearchButton] = useState(false);

    return (
        <View style={styles.container}>

            <View style={styles.searchbar}>
                <Pressable style={styles.search} onPress={() => {
                    setSearchButton(!searchButton);
                }}>
                    <FontAwesome name="search" size={30} color="black"></FontAwesome>
                </Pressable>

                {searchButton ? (<SearchBar onPress={() => console.log("searching")}/>) : (<View></View>)}
            </View>
            <View style={styles.container2}>
                <Text style={styles.title}>
                    Home To Be edited.
                </Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,

    },
    container2: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    }, search: {
        marginRight: 20,
        alignItems: "flex-end",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "black",
    }, searchbar: {
        height: "30%",
        flexDirection: "row"
    }

})