import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { register } from "../firebase/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

	const handlePress = async () => {
		try {
			const credentials = await register(username , email , phone , password);
			// console.log(`credentials ${credentials}`);
			router.navigate('/account/login');
		} catch (error) {
			console.log(`Error ${JSON.stringify(error)}`);
			setError(error);
		}
	};

	return (
		<View style={styles.container}>
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
			<TextInput
			placeholder="Password"
			value={password}
			onChangeText={setPassword}
			secureTextEntry = {!showPassword}
			style={styles.input}
			/>
			<Pressable onPress = {() => { setShowPassword(!showPassword); }} style={{ padding: 10 }}>
		        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
			</Pressable>
			<Pressable onPress={handlePress} style={styles.button}>
			<Text style={styles.buttonText}>Register</Text>
			</Pressable>
			<Pressable onPress={() => router.replace("/account/login")}>
			<Text style={styles.link}>Already have an account? Login</Text>
			</Pressable>
			{error ? <Text style={styles.error}>{error.code}</Text> : null}
		</View>
	);
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39d896",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF276C",
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
    color: "#5E8B7E",
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
