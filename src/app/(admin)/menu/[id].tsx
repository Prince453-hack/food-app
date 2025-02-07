import { useProduct } from "@/src/api/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsPage = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();
  const router = useRouter();

  const addToCard = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerTitleAlign: "center",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
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

      <Stack.Screen options={{ title: product?.name }} />

      <Image
        source={{ uri: product?.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.title}>{product?.name}</Text>
      <Text style={styles.price}>${product?.price}</Text>
    </View>
  );
};

export default ProductDetailsPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
