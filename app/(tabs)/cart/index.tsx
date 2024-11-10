import React, { FC } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "@/utils/api";
import { useAuthStore } from "@/store/authStore";
import CartCard from "@/components/CartCard";
import { RefreshControl } from "react-native-gesture-handler";

const CartPage: FC = () => {
  const userId = useAuthStore((state) => state.userId);

  const { data, isSuccess, refetch, isFetching } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchCart(userId),
    staleTime: 0,
  });

  let totalPrice: number = 0;

  data?.cartProduct?.forEach(
    (product: { quantity: number; product: { price: number } }) => {
      totalPrice += product.quantity * product.product.price;
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order</Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
          />
        }>
        <View style={styles.cart}>
          <View style={styles.cartList}>
            {isSuccess && data.cartProduct?.length > 0 ? (
              data.cartProduct?.map(
                (item: {
                  product: {
                    id: number;
                    img: string;
                    price: number;
                    name: string;
                  };
                  quantity: number;
                }) => (
                  <CartCard
                    key={item.product.id}
                    img={item.product.img}
                    price={item.product.price}
                    name={item.product.name}
                    quantity={item.quantity}
                    id={item.product.id}
                    userId={userId}
                    refetch={refetch}
                  />
                )
              )
            ) : (
              <Text style={styles.emptyMessage}>Your cart is empty.</Text>
            )}
          </View>
          <View style={styles.line}></View>
          <View style={styles.totalContainer}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.totalPrice}>
              ${Math.round(totalPrice * 10) / 10}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(248, 248, 248)",
    width: width,
    height: height,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    letterSpacing: 4,
    marginTop: height * 0.06,
    marginHorizontal: width * 0.039,
  },
  cart: {
    marginTop: height * 0.025,
    marginHorizontal: width * 0.039,
  },
  cartList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: width * 0.042,
  },

  emptyMessage: {
    textAlign: "center",
    fontSize: 18,
    color: "#a4a4a4",
    marginTop: 20,
  },
  line: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: height * 0.12,
  },
  total: {
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: "500",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "600",
  },
});

export default CartPage;
