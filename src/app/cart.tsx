import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, Text, View } from "react-native";
import { useCart } from "../providers/CartProvider";

const CartScreen = () => {
  const { items } = useCart();
  return (
    <View>
      <Text>CartScreen {items.length}</Text>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
