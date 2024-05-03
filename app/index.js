import { StyleSheet, Text, View } from "react-native";
import MyButton from "../Componenet/MyButton";
import {router} from "expo-router";

export default function Page() {
  const handleGetStarted = async () => {
    router.navigate('/Home')
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <MyButton onPress={handleGetStarted}>
          <Text
          >Get start</Text>
        </MyButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
