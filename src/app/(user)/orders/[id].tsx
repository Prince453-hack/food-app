import { useOrderDetails } from "@/src/api/orders";
import { useUpdateOrdersListener } from "@/src/api/orders/subscriptions";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const OrdersDetailsPage = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);

  useUpdateOrdersListener(id);

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
  }

  if (error || !order) {
    return <Text>Failed to fetch data</Text>;
  }

  return (
    <View style={{ padding: 10, gap: 20 }}>
      <Stack.Screen
        options={{ headerTitle: `Orders #${id}`, headerTitleAlign: "center" }}
      />
      {order && <OrderListItem order={order} />}

      <FlatList
        data={order.order_item}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default OrdersDetailsPage;
