import React from "react";
import { Pressable, Text } from "react-native";
import { router } from "expo-router";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from '@expo/vector-icons';

function BackButton() {
  return (
    <Pressable
      onPress={() => {
        router.back();
      }}
      style={{
        position: "absolute",
        top: 35,
        left: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'rgba(0,0,0,0.85)',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        zIndex: 100,
      }}
    >
      <Ionicons name="arrow-back-sharp" size={24} color="white" />
    </Pressable>
  );
}

export default BackButton;
