import {View, Image, Text, StyleSheet, Pressable, TextInput, Alert, TouchableOpacity} from 'react-native';
import SearchBar from "../components/SearchBar";
import BottomSheet, {
    BottomSheetModal, BottomSheetView,
    BottomSheetModalProvider, BottomSheetBackdrop, BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import React, {useCallback, useMemo, useRef} from "react";
import {Feather, FontAwesome} from "@expo/vector-icons";

export default function Search() {
    return (
        <View style={styles.container}>
            <SearchBar/>
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
        height: '100vh'
    },
    contentContainer: {
        alignItems: 'center',
    },
    contentContainerText: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10
    }
    ,
    buttonText: {
        color: "black", // White button text
        fontSize: 16,
        alignSelf: 'center'
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
    }
});