import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import CategoryItem from "./CategoryItem";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const CategoryList: FC = () => {
  const fetchCategories = async () => {
    const response = await axios.get(`https://backend-coffee-shop.onrender.com/api/categories`);
    return response.data;
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <View style={styles.container}>
      {categories.map(
        (category: {
          id: number;
          name: string;
          subCategory: { id: number; img: string; name: string }[];
        }) => (
          <View key={category.id}>
            <Text style={styles.category}>{category.name}</Text>
            <View style={styles.list}>
              {category?.subCategory?.map((subcategory) => (
                <CategoryItem
                  key={subcategory.id}
                  id={subcategory.id}
                  img={subcategory.img}
                  name={subcategory.name}
                />
              ))}
            </View>
          </View>
        )
      )}
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.025,
    marginHorizontal: width * 0.039,
  },

  category: {
    fontSize: 24,
    fontWeight: "500",
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0, 0.55)",
  },

  list: {
    backgroundColor: "rgb(248, 248, 248)",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: width * 0.04,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default CategoryList;
