import React, {useState} from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
} from "react-native";
import Button from "../components/Button";

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [error, setError] = useState("");

    const handleAddProduct = async () => {
        if (!productName) {
            setError("Please enter product name");
        } else if (!/^[a-zA-Z]/.test(productName)) {
            setError("Product name must start with a letter");
        } else if (productName.length < 6) {
            setError("Product name must be at least 6 characters");
        } else if (!productQuantity) {
            setError("Please enter quantity");

        } else if (productQuantity < 0) {
            setError("quantity should be greater than 0");
        } else if (price < 0) {
            setError("Price should be greater than 0");
        }
            // else if (!productImage) {
            //     setError("Please add image to your product");
            //
        // }
        else {
            try {
                //push into firestore

            } catch (err) {
                console.log(err);
            }
        }


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
            {error ? <Text style={styles.error}>{error}</Text> : null}
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

    error: {
        color: "red",
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 20,
        width: "80%",
        height: 150,
        borderRadius: 12,
        backgroundColor: "#FFF",
    }
});
