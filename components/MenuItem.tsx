import React from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

const MenuItem = ({ title, category, price, img }) => {
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
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{category}</Text>
      <Text style={styles.price}>${price}</Text>
      <Pressable
        style={styles.button}
        onPress={() => Alert.alert("Added to cart")}>
        <Text style={styles.button_text}>Add to cart</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(254, 254, 254)",
    width: 232,
    padding: 16,
    paddingBottom: 24,
    borderRadius: 18,
    shadowColor: "#00000020",
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 6,
  },

  img_container: {
    width: 200,
    height: 200,
    display: "flex",
    justifyContent: "center",
  },

  img: {
    width: 200,
    height: 200,
    marginHorizontal: "auto",
    borderRadius: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: "500",
    marginTop: 8,
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
    backgroundColor: colors.primary,
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
