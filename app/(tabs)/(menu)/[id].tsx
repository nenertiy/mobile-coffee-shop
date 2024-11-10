import React, { FC } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { colors } from "@/constants/colors";
import { useLocalSearchParams } from "expo-router";
import { Product } from "@/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { addToCart } from "@/utils/api";

const ProductPage: FC = () => {
  const { id } = useLocalSearchParams();

  const userId = useAuthStore((state) => state.userId);

  const productId = typeof id === "string" ? parseInt(id, 10) : null;

  const fetchProduct = async (productId: number) => {
    const response = await axios.get<Product>(
      `https://backend-coffee-shop.onrender.com/api/products/${productId}`
    );
    return response.data;
  };

  const {
    data: product,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId!),
    enabled: !!productId,
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

  if (!product) {
    return <Text style={styles.errorText}>Product not found</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: product.img }}
          style={styles.image}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.category}>{product?.productCategory?.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? "rgba(0, 107, 0, 0.7)"
                : colors.primary,
            },
            styles.button,
          ]}
          onPress={() => addToCart(Number(userId), Number(id))}>
          <Text style={styles.button_text}>Add to cart</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    marginHorizontal: width * 0.039,
    marginBottom: height * 0.09,
  },
  loadingContainer: {
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
  image: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 12,
  },
  category: {
    fontSize: 18,
    color: "#888",
    marginBottom: 8,
    marginTop: 4,
  },
  description: {
    fontSize: 18,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 16,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 12,
    width: "100%",
    // backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button_text: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default ProductPage;
