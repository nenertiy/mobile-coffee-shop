import { Category } from "@/types";
import { Link } from "expo-router";
import React, { FC } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const CategoryItem: FC<Category> = ({ img, name, id }) => {
  return (
    <Link href={`/categories/${id}`}>
      <View style={styles.container}>
        <View style={styles.img_container}>
          <Image
            style={styles.img}
            source={{
              uri: img,
            }}
          />
        </View>
        <Text style={styles.title}>{name}</Text>
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
  },
});

export default CategoryItem;
