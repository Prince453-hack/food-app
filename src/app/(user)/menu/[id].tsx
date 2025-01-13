import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { useProduct } from "@/src/api/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";

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
      <Stack.Screen options={{ title: product?.name }} />

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text>Select Size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize === size ? "black" : "gray" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product?.price}</Text>
      <Button text="Add to Cart" onPress={addToCard} />
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
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
