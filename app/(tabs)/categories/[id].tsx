import MenuList from "@/components/MenuList";
import { colors } from "@/constants/colors";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const CategoryPage = () => {
  const { id } = useLocalSearchParams();

  const categoryId = typeof id === "string" ? parseInt(id, 10) : null;

  const fetchProductsByCategory = async (categoryId: number) => {
    const response = await axios.get<Product[]>(
      `https://backend-coffee-shop.onrender.com/api/products/category/${categoryId}`
    );
    return response.data;
  };

  const {
    data: products,
    isSuccess,
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => fetchProductsByCategory(categoryId!),
    enabled: !!categoryId,
  });

  if (isLoading || isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
          />
        }>
        {isSuccess && products.length > 0 ? (
          <View style={styles.menu}>
            <MenuList data={products} />
          </View>
        ) : (
          <View style={styles.nothingContainer}>
            <Text style={styles.nothingText}>
              No products found for this category.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(248, 248, 248)",
    height: height,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    letterSpacing: 2,
    marginTop: height * 0.05,
    marginBottom: 12,
  },
  menu: {
    marginBottom: height * 0.12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },

  nothingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.35,
  },
  nothingText: {
    fontSize: 20,
    fontWeight: "400",
    letterSpacing: 1,
    color: "#888",
  },
});

export default CategoryPage;
