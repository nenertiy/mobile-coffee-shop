import React, { FC } from "react";
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { Product } from "@/types";
import { Link } from "expo-router";
import { addToCart } from "@/utils/api";
import { useAuthStore } from "@/store/authStore";

const MenuItem: FC<Product> = ({ name, category, price, img, id }) => {
  const userId = useAuthStore((state) => state.userId);
  return (
    <Link href={`/(menu)/${id}`}>
      <View style={styles.container}>
        <View style={styles.img_container}>
          <Image
            style={styles.img}
            source={{
              uri: img,
            }}
          />
        </View>
        <Text
          style={styles.title}
          numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.subtitle}>{category}</Text>
        <Text style={styles.price}>${price}</Text>
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? "rgba(0, 107, 0, 0.9)" : colors.primary },
            styles.button,
          ]}
          onPress={() => addToCart(Number(userId), Number(id))}>
          <Text style={styles.button_text}>Add to cart</Text>
        </Pressable>
      </View>
    </Link>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(254, 254, 254)",
    padding: width * 0.02,
    paddingBottom: 16,
    borderRadius: 18,
    shadowColor: "#00000020",
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 6,
    elevation: 10,
  },

  img_container: {
    width: width * 0.4,
    display: "flex",
    justifyContent: "center",
  },

  img: {
    width: width * 0.4,
    aspectRatio: 1,
    marginHorizontal: "auto",
    borderRadius: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: "500",
    marginTop: 8,
    maxWidth: width * 0.4,
    overflow: "hidden",
  },

  subtitle: {
    fontSize: 14,
    color: "#a2a2a2",
    marginTop: 4,
  },
  price: {
    fontWeight: "700",
    fontSize: 22,
    marginTop: 6,
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

export default MenuItem;
