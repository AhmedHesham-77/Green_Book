import {View, Text, StyleSheet, StatusBar, Pressable, SafeAreaView} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {useState} from "react";
import SearchBar from "../components/SearchBar";

export default function Home() {
    const [searchButton, setSearchButton] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            {/*<View style={styles.container}>*/}

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
            </View>
            <StatusBar style="blue"/>

            {/*</View>*/}
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