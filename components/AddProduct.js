import { View, StyleSheet } from "react-native";
import Button from "./Button";
import { router } from "expo-router";

export default function AddProduct() {
  return (
    <View style={styles.container}>
      <Button
        title={"Add product"}
        textColor="black"
        onPress={() => router.navigate("(tabs)/product")}
        styles={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  input: {
    backgroundColor: "white",
    fontSize: 28,
    width: "80%",
    paddingHorizontal: 5,
  },
  button: {
    fontSize: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "green",
  },
});
