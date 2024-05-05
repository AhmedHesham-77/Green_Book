import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import Button from "../components/Button";

export default function GetStarted() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#96df71", "#5dc87f", "#3da35d"]}
        start={{ x: 0.187, y: 0.378 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      >
        <Image source={require("../assets/greenlogo.png")} />
        <Text style={styles.title}>GreenBook</Text>
        <Text style={styles.subtitle}>Your best book store</Text>
        <Button
          title="GET STARTED"
          textColor="white"
          onPress={() => {
            router.navigate("/account/login");
          }}
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
              width: "100%",
              borderRadius: 2,
              backgroundColor: "#246c3a",
            },
          ]}
        />
      </LinearGradient>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
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
    fontFamily: "Gabarito,cursive",
    fontSize: 52,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontFamily: "Gabarito,cursive",
    fontSize: 22,
    color: "#1c2e44",
  },
});
