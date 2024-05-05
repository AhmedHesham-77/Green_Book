import React, {useState} from "react";
import {View, TextInput, Pressable, Text, StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {router} from "expo-router";
import {login} from "../firebase/auth";
import {Ionicons} from "@expo/vector-icons";
import Button from "../components/Button";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !password) return setError("Email and password are required");
        else if (password.length < 6)
            return setError("Password must be at least 6 characters");
        else if (!emailRegex.test(email))
            return setError("Invalid email");
        try {
            const credentials = await login(email, password);
            console.log(`credentials ${credentials}`);
            router.navigate("(tabs)");
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                setError("Wrong email format");
            } else if (error.code === "auth/invalid-credential") {
                setError("Wrong email or password");
            } else if (error.code === "auth/invalid-login-credentials") {
                setError("Wrong email or password");
            } else {
                setError("An error occurred");
                console.log(error.code);
            }
        }
    };

    return (
        <LinearGradient
            colors={["#96df71", "#5dc87f", "#3da35d"]}
            start={{x: 0.187, y: 0.378}}
            end={{x: 1, y: 1}}
            style={styles.container}
        >
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
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
                title="Login"
                textColor="white"
                onPress={handleLogin}
                styles={({pressed}) => [
                    {opacity: pressed ? 0.2 : 1},
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
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.linksContainer}>
                <Pressable onPress={() => router.replace("/account/register")}>
                    <Text style={styles.link}>Register</Text>
                </Pressable>
                <Pressable onPress={() => router.replace("/account/reset")}>
                    <Text style={styles.link}>Forgot Password</Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
};

export default Login;

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
        transform: [{translateY: -12}],
    },
    link: {
        color: "#a4ed80",
        textDecorationLine: "underline",
        marginTop: 10,
        marginRight: 20,
    },
    error: {
        color: "red",
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    linksContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});