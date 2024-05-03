import { Pressable, Text } from "react-native";

function Button({ title, onPress, textColor, styles }) {
  return (
    <Pressable onPress={onPress} style={styles}>
      <Text style={{ color: textColor, fontWeight: "500" }}> {title} </Text>
    </Pressable>
  );
}

export default Button;
