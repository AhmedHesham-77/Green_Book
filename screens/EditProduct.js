import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Text, Alert, StyleSheet } from "react-native";
import Button from "../components/Button";
import { deleteProduct, editProduct, getProduct } from "../firebase/products";
import { uploadImage } from "../firebase/config";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

const EditProduct = ({ id }) => {
  const [productName, setProductName] = useState("");
  const [product, setProduct] = useState();
  const [loaded, setLoaded] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const imageHash = useRef(
    "https://www12.0zz0.com/2024/05/04/22/650784712.png"
  );
  const imageUrl = useRef("https://www12.0zz0.com/2024/05/04/22/650784712.png");
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

  const handleDeleteProduct = async () => {
    await deleteProduct(product.id);
    router.navigate("(tabs)");
  };
  const getProductById = async () => {
    setLoaded(false);
    const p = await getProduct(id);
    if (!p) {
      router.navigate("(tabs)");
    } else {
      setProduct(p);
      setProductName(p.productName);
      setPrice(p.price.toString());
      setDescription(p.description);
      setLoaded(true);
    }
  };

  const uploadImageToStorage = async () => {
    try {
      if (
        imageHash.current !==
        "https://www12.0zz0.com/2024/05/04/22/650784712.png"
      ) {
        const uri = imageHash.current;
        const filename = uri.split("/").pop();
        const folderName = "Products";
        const uploadResponse = await uploadImage(folderName, uri, filename);
        imageUrl.current = uploadResponse.downloadUrl;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleEditProduct = async () => {
    setError("");
    if (!productName) {
      setError("Please enter product name");
    } else if (!/^[a-zA-Z]/.test(productName)) {
      setError("Product name must start with a letter");
    } else if (productName.length < 4) {
      setError("Product name must be at least 6 characters");
    } else if (productName.length > 25) {
      setError("Product name must be at most 25 characters");
    } else if (!price) {
      setError("Please enter the price name");
    } else if (isNaN(price)) {
      setError("Price must be a number");
    } else if (price < 0) {
      setError("Price should be greater than 0");
    } else if (price > 99999) {
      setError("Price should be smaller than than 100000");
    } else {
      try {
        await uploadImageToStorage();
        const product0 = {
          productName: productName,
          price: Number(price),
          description: description,
          ImageUrl: imageUrl.current,
          id: product.id,
          NumberReviews: product.NumberReviews,
          TotalReviews: product.TotalReviews,
        };
        await editProduct(product0);
        setProduct(product0);
        Alert.alert(
          "Product Updated.",
          "The product has been successfully updated.",
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
              style: "default",
              color: "green",
            },
          ]
        );
        router.navigate("(tabs)");
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getProductById();
  }, [id]);

  return (
    loaded && (
      <View style={styles.container}>
        <Text style={styles.title}>Edit product</Text>
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
          inputMode="numeric"
        />
        <TextInput
          multiline
          placeholder="Enter full description"
          value={description}
          onChangeText={setDescription}
          style={styles.description}
        />
        <Button title="Add image" onPress={pickImage} />
        <Button
          title="Edit"
          textColor="white"
          onPress={handleEditProduct}
          styles={({ pressed }) => [
            { opacity: pressed ? 0.2 : 1 },
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
          title={"Delete Product"}
          onPress={handleDeleteProduct}
          styles={({ pressed }) => [
            { opacity: pressed ? 0.2 : 1 },
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
    )
  );
};
export default EditProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
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
  },
});
