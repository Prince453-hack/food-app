import { useMyOrderList } from "@/src/api/orders";
import OrderListItem from "@/src/components/OrderListItem";
import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";

const OrdersScreen = () => {
  const { data: orders, error, isLoading } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
  }

  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ padding: 10, gap: 10 }}
    />
  );
};

export default OrdersScreen;
