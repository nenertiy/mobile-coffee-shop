import React, { FC } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MenuItem from "./MenuItem";
import { Product } from "@/types";

interface MenuListProps {
  data: Product[];
}

const MenuList: FC<MenuListProps> = ({ data }) => {
  return (
    <View style={styles.list}>
      {data?.map((item: Product) => (
        <MenuItem
          name={item.name}
          img={item.img}
          price={item.price}
          category={item.productCategory?.name}
          key={item.id}
        />
      ))}
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  list: {
    backgroundColor: "rgb(248, 248, 248)",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: width * 0.04,
    marginBottom: 80,
    marginTop: 20,
    marginHorizontal: width * 0.0399,
  },
});

export default MenuList;
