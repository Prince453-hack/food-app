import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function Menu() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Menu (Admin)",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Link href="/(user)/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="users"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
