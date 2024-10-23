import MenuItem from "@/components/MenuItem";
import MenuList from "@/components/MenuList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  // const fetchProducts = async () => {
  //   const response = await axios.get("http://localhost:3000/api/products");
  //   return response.data;
  // };

  // const { data, isSuccess } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  // console.log(data[0].name);

  return (
    <ScrollView style={styles.container}>
      <Text>Menu</Text>
      <MenuList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "rgb(248, 248, 248)" },
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
