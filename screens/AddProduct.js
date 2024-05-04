import React, {useState} from "react";
import {
    View,
    TextInput,
    Pressable,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import {router} from "expo-router";
import Button from "../components/Button";

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [error, setError] = useState("");

    const handleAddProduct = async () => {
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add product</Text>
            <TextInput
                placeholder="Enter product name"
                value={productName}
                onChangeText={setProductName}
                style={styles.input}
            />
            <TextInput
                placeholder="Enter price"
                value={price}
                onChangeText={setPrice}
                style={styles.input}
            />
            <TextInput
                placeholder="Enter quantity"
                value={productQuantity}
                onChangeText={setProductQuantity}
                style={styles.input}
            />
            <TextInput
                multiline
                placeholder="Enter full description"
                value={description}
                onChangeText={setDescription}
                style={styles.description}
            />
            <Button
                title="Add"
                textColor="white"
                onPress={handleAddProduct}
                styles={({pressed}) => [
                    {opacity: pressed ? 0.2 : 1},
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#a4ed80",
                        paddingVertical: 12,
                        paddingHorizontal: 20,
                        marginTop: 30,
                        marginBottom: 20,
                        width: "80%",
                        borderRadius: 10,
                        backgroundColor: "#246c3a",
                    },
                ]}
            />
            {error ? <Text style={styles.error}>{error.code}</Text> : null}
        </View>
    );
};

export default AddProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontFamily: "Gabarito,cursive",
        fontSize: 52,
        fontWeight: "bold",
        color: "#28803d",
        marginBottom: 20,
    },
    logoText: {
        color: "#FFF",
        fontSize: 40,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 20,
        width: "80%",
        borderRadius: 12,
        backgroundColor: "#FFF",
    },
    passwordInput: {
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        marginBottom: 20,
    },
    password: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: "#FFF",
    },
    togglePassword: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{translateY: -12}],
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 20,
        width: "80%",
        borderRadius: 12,
        backgroundColor: "#5E8B7E",
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
    },
    link: {
        color: "#a4ed80",
        textDecorationLine: "underline",
        marginTop: 10,
    },
    error: {
        color: "red",
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    description:{
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 20,
        width: "80%",
        height:150,
        borderRadius: 12,
        backgroundColor: "#FFF",
    }
});
