import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account/login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account/register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
