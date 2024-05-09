import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { reset } from "../firebase/auth";
import Button from "../components/Button";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      await reset(email);
      console.log("Password reset");
      setError("");
      Alert.alert("Email for resetting password sent");
    } catch (error) {
      console.log("error", JSON.stringify(error));
      setError(error.code);
    }
  };

  return (
    <LinearGradient
      colors={["#96df71", "#5dc87f", "#3da35d"]}
      start={{ x: 0.187, y: 0.378 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={[styles.title]}>Forget Password</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input]}
      />
      <Button
        title="Reset"
        textColor="white"
        onPress={handlePress}
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
            borderRadius: 10,
            backgroundColor: "#246c3a",
          },
        ]}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => router.navigate("/account/register")}
          style={styles.button}
        >
          <Text style={[styles.link]}>Register</Text>
        </Pressable>
        <Pressable
          onPress={() => router.navigate("/account/login")}
          style={styles.button}
        >
          <Text style={[styles.link]}>Login</Text>
        </Pressable>
      </View>
      {error ? <Text style={[styles.error]}>{error}</Text> : null}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#FFF",
    width: "100%",
  },
  link: {
    color: "#a4ed80",
    textDecorationLine: "underline",
  },
  title: {
    fontFamily: "Gabarito,cursive",
    fontSize: 45,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    marginHorizontal: 5,
  },
  resetButton: {
    marginTop: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ForgetPassword;
