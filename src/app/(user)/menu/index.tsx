import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import { StatusBar } from "expo-status-bar";
import { FlatList, View } from "react-native";

export default function MenuScreen() {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
