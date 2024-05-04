import React, {useEffect, useState, useRef} from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet, Image,
} from "react-native";
import Button from "../components/Button";
import {addProduct} from "../firebase/products";
import {app, uploadImage} from "../firebase/config";
import * as ImagePicker from "expo-image-picker";

const AddProduct = () => {
        const [productName, setProductName] = useState("");
        const [price, setPrice] = useState("");
        const [description, setDescription] = useState("");
        const [productQuantity, setProductQuantity] = useState("");
        const [error, setError] = useState("");


        const imageHash = useRef('https://www12.0zz0.com/2024/05/04/22/650784712.png');
        const imageUrl = useRef('https://www12.0zz0.com/2024/05/04/22/650784712.png');
        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                imageHash.current = result.assets[0].uri;
            }
        };

        const uploadImageToStorage = async () => {
            try {
                if (imageHash.current !== 'https://www12.0zz0.com/2024/05/04/22/650784712.png') {
                    const uri = imageHash.current;
                    const filename = uri.split("/").pop();
                    const folderName = "Products";
                    const uploadResponse = await uploadImage(folderName, uri, filename);
                    imageUrl.current = uploadResponse.downloadUrl;
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }


        const clearData = () => {
            setProductName("");
            setPrice("");
            setProductQuantity("");
            setDescription("");
            // imageHash.current = '../assets/favicon.jpg';
            // imageUrl.current = '../assets/favicon.jpg';
        }
        const handleAddProduct = async () => {
            setError("");
            if (!productName) {
                setError("Please enter product name");
            } else if (!/^[a-zA-Z]/.test(productName)) {
                setError("Product name must start with a letter");
            } else if (productName.length < 4) {
                setError("Product name must be at least 6 characters");
            } else if (!productQuantity) {
                setError("Please enter quantity");
            } else if (productQuantity < 0) {
                setError("quantity should be greater than 0");
            } else if (price < 0) {
                setError("Price should be greater than 0");
            } else {
                try {
                    await uploadImageToStorage();
                    const product = {
                        productName: productName,
                        price: price,
                        Quantity: productQuantity,
                        description: description,
                        ImageUrl: imageUrl.current,
                    };
                    const ref = await addProduct(product);
                    if (!ref) {
                        throw Error("could not add product");
                    }
                    alert("Product added successfully.");
                    clearData();
                } catch (err) {
                    setError(err.message);
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
                {/*<AddMedia/>*/}
                <Button title="Add image" onPress={pickImage}/>
                {/*{image && <Image source={{uri: image}} style={styles.image}/>}*/}
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
                <Button
                    title="Clear"
                    textColor="white"
                    onPress={clearData}
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
                            width: "40%",
                            borderRadius: 10,
                            backgroundColor: "#bd0e13",
                        },
                    ]}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
        );
    }
;

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
    },
    image: {
        width: 200,
        height: 200,
    }
});
