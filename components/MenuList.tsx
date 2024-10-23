import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import MenuItem from "./MenuItem";

const MenuList = () => {
  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:3000/api/products");
    return response.data;
  };

  const { data } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  return (
    <View style={styles.list}>
      {data?.map((item) => (
        <MenuItem
          title={item.name}
          img={item.img}
          price={item.price}
          category={item.productCategory?.name}
          key={item.id}
        />
      ))}
      {data?.map((item) => (
        <MenuItem
          title={item.name}
          img={item.img}
          price={item.price}
          category={item.productCategory?.name}
          key={item.id}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    justifyContent: "space-evenly",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 20,
    marginBottom: 80,
    marginTop: 20,
  },
});

export default MenuList;
