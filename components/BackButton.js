import React from "react";
import { Pressable, Text } from "react-native";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

function BackButton() {
  return (
    <Pressable
      onPress={() => {
        router.back();
      }}
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#a4ed80",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 2,
        zIndex: 100,
      }}
    >
      <MaterialCommunityIcons name="backburger" size={30} color="black" />
    </Pressable>
  );
}

export default BackButton;
