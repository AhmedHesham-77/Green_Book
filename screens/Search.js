import { View, StyleSheet, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { getProducts } from "../firebase/products";
import ProductSearch from "../components/ProductSearch";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [Data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setData(productsData);
        setSearchData(productsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const searchItems = (searchFor) => {
    setSearchData(
      Data.filter((item) =>
        item.productName.toLowerCase().includes(searchFor.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <FontAwesome
          name="search"
          size={24}
          color="green"
          style={{ width: "10%", paddingVertical: "4%", marginRight: "3%" }}
        />
        <TextInput
          placeholder="Search for"
          style={styles.textInput}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            searchItems(text);
          }}
        />
      </View>
      <FlatList
        data={searchData}
        renderItem={({ item }) => <ProductSearch {...item} />}
        style={{ width: "100%" }}
        contentContainerStyle={styles.flatList}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    height: "100vh",
    width: "100%",
  },
  input: {
    flexDirection: "row",
    borderRadius: 20,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: "#fff",
    alignItems: "center",
    alignSelf: "center",
  },
  textInput: {
    paddingVertical: "4%",
    width: "70%",
    fontSize: 16,
  },
  searchBar: {
    width: "80%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "green",
    marginBottom: 25,
    marginTop: 15,
  },
  flatList: {
    width: "100%",
    alignItems: "center",
  },
});
