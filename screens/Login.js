import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { login } from "../firebase/auth";
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const credentials = await login(email, password);
      console.log(`credentials ${credentials}`);
      router.navigate("(tabs)");
    } catch (error) {
      console.log(`Error ${JSON.stringify(error)}`);
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "80%", marginBottom: 20 }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.inputStyles}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry = {!showPassword}
          style={styles.inputStyles}
        />
        <Pressable onPress = {() => { setShowPassword(!showPassword); }} style={{ padding: 10 }}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </Pressable>
        <Pressable onPress={handleLogin} style={styles.buttonStyles}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        {error ? (
          <Text
            style={{
              color: "red",
              marginTop: 10,
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {error.code}
          </Text>
        ) : null}
      </View>
      <View style={{ alignItems: "center" }}>
        <Pressable onPress={() => router.replace("/account/register")}>
          <Text
            style={{
              color: "#5E8B7E",
              textDecorationLine: "underline",
              marginTop: 10,
            }}
          >
            Register
          </Text>
        </Pressable>
        <Pressable onPress={() => router.replace("/account/reset")}>
          <Text
            style={{
              color: "#5E8B7E",
              textDecorationLine: "underline",
              marginTop: 10,
            }}
          >
            Forgot Password
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39d896",
  },
  inputStyles: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#FFF",
  },
  buttonStyles: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#5E8B7E",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
});
