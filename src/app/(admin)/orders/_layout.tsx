import { Stack } from "expo-router";

export default function Menu() {
  return (
    <Stack>
      {/* <Stack.Screen
        name="index"
        options={{ title: "Orders", headerShown: false }}
      /> */}
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  );
}
