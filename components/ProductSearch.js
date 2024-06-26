import { Pressable, StyleSheet, View, Image, Text } from "react-native";
import { router } from "expo-router";

export default function ProductSearch({ id, ImageUrl, productName }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <Pressable
        style={[styles.container]}
        onPress={() => router.push(`product/${id}`)}
      >
        <Image style={styles.image} source={{ uri: ImageUrl }} />
        <Text style={[styles.title]}>{productName}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    flexDirection: "row",
    borderBottomColor: "green",
    borderBottomWidth: 1,
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "stretch",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 10,
    width: "100%",
    color: "#333",
    textAlign: "left",
  },
});
