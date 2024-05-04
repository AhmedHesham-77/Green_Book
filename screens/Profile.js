import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { logout } from "../firebase/auth";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByEmail, updateUser } from "../firebase/users";
import Loading from "../components/Loading";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const userEmail = JSON.parse(user).email;
        const userData = await getUserByEmail(userEmail);
        setUserData(userData);
        setName(userData.name);
        setPhone(userData.phone);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.navigate("/account/login");
  };

  const handleUpdate = async () => {
    try {
      const user = { name: name, phone: phone };
      await updateUser(userData.id, user);
    } catch (error) {
      console.log(error);
    }
  };

  if (!userData) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Text>Email: {userData.email}</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
      />
      <Pressable
        onPress={handleUpdate}
        style={{ backgroundColor: "white", padding: 10, borderRadius: 8 }}
      >
        <Text style={{ color: "#5E8B7E" }}>Save Changes</Text>
      </Pressable>
      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        <AntDesign name="logout" size={24} color="#5E8B7E" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
});
