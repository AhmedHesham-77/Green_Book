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
import { ActivityIndicator } from "react-native";

export default function Loading () {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#96df71", "#5dc87f", "#3da35d"]}
          start={{ x: 0.187, y: 0.378 }}
          end={{ x: 1, y: 1 }}
          style={styles.linearGradient}
        >
          <Image source={require("../assets/greenlogo.png")} />
          <Text style={styles.title}>Loading Now</Text>
          <ActivityIndicator size={"large"} color = 'white'/>
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
      fontSize: 45,
      marginBottom: 50,
      fontWeight: "bold",
      color: "#ffffff",
    },
  });
