import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { register } from "../firebase/auth";
import Button from "../components/Button";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      const credentials = await register(username, email, phone, password);
      router.navigate("/account/login");
    } catch (error) {
      console.log(`Error ${JSON.stringify(error)}`);
      setError(error);
    }
  };

  return (
    <LinearGradient
      colors={["#96df71", "#5dc87f", "#3da35d"]}
      start={{ x: 0.187, y: 0.378 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <View style={styles.passwordInput}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.password}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.togglePassword}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      <Button
        title="Register"
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
            width: "80%",
            borderRadius: 10,
            backgroundColor: "#246c3a",
          },
        ]}
      />
      <Pressable onPress={() => router.replace("/account/login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error.code}</Text> : null}
    </LinearGradient>
  );
};

export default Register;

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
    color: "#ffffff",
    marginBottom: 20,
  },
  logoText: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "bold",
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
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  password: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#FFF",
  },
  togglePassword: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
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
  link: {
    color: "#a4ed80",
    textDecorationLine: "underline",
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
