import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { reset } from "../firebase/auth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      await reset(email);
      console.log("Password reset");
      setError(""); // Clear error state
      Alert.alert("Email for resetting password sent");
    } catch (error) {
      console.log("error", JSON.stringify(error));
      setError(error.code); // Set error state
    }
  };

  return (
    <View style={[styles.container, styles.nightMode]}>
      <Text style={[styles.title]}>Forget Password</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input]}
      />
      <Button
        title="Reset"
        onPress={handlePress}
        color="#FF276C"
        style={styles.resetButton}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39d896",
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
    color: "#5E8B7E",
    textDecorationLine: "underline",
  },
  nightMode: {
    backgroundColor: "#39d896",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF276C",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center the buttons horizontally
    marginTop: 10,
  },
  button: {
    marginHorizontal: 5, // Add margin between buttons for spacing
  },
  resetButton: {
    marginTop: 10,
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
