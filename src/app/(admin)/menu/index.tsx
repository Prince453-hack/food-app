import products from "@/assets/data/products";
import { useProductList } from "@/src/api/products";
import ProductListItem from "@/src/components/ProductListItem";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MenuScreen() {
  const { data: product, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <View>
      <FlatList
        data={product}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
