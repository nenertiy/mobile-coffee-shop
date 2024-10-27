import React, { FC } from "react";
import {
  Image,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/constants/colors";
import { useQueryClient } from "@tanstack/react-query";
import { decreaseQuantity, removeFromCart } from "@/utils/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CartCardProps {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
  userId: string | null;
  refetch: () => void;
}

const CartCard: FC<CartCardProps> = ({ name, price, img, id, quantity, userId, refetch }) => {
  const queryClient = useQueryClient();

  const handleDecrease = async () => {
    if (userId) {
      if (quantity === 1) {
        await removeFromCart(userId, id);
      } else {
        await decreaseQuantity(userId, id, 1);
      }
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
      refetch();
    }
  };

  const handleIncrease = async () => {
    if (userId) {
      await decreaseQuantity(userId, id, -1);
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    }
  };

  return (
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
      <Text style={styles.price}>${(Math.round(price * quantity * 10) / 10).toFixed(2)}</Text>
      <View style={styles.countContainer}>
        <TouchableOpacity>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? "rgba(0, 107, 0, 0.7)" : colors.primary },
              styles.countButton,
            ]}
            onPress={handleDecrease}>
            <MaterialCommunityIcons
              name="minus"
              color={"#fff"}
              size={20}
            />
          </Pressable>
        </TouchableOpacity>
        <Text style={styles.countText}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncrease}>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? "rgba(0, 107, 0, 0.7)" : colors.primary },
              styles.countButton,
            ]}
            onPress={handleIncrease}>
            <MaterialCommunityIcons
              name="plus"
              color={"#fff"}
              size={20}
            />
          </Pressable>
        </TouchableOpacity>
      </View>
    </View>
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

  price: {
    fontWeight: "700",
    fontSize: 22,
    marginTop: 4,
  },

  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 16,
  },

  countButton: {
    borderRadius: 12,
    // backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  countButtonText: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "500",
  },

  countText: {
    fontSize: 20,
    fontWeight: "500",
    width: 40,
    textAlign: "center",
  },
});

export default CartCard;
