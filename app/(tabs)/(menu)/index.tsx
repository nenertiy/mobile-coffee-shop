import MenuList from "@/components/MenuList";
import { colors } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [searchValue, setSearchValue] = useState<string>("");

  const fetchProducts = async () => {
    const query = searchValue ? `?search=${searchValue}` : "";
    const response = await axios.get(
      `https://backend-coffee-shop.onrender.com/api/products${query}`
    );
    return response.data;
  };

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["products", searchValue],
    queryFn: fetchProducts,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <ScrollView>
        {isLoading || isFetching ? (
          <View style={styles.indicatorWrapper}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder="Search products"
            />
            <MenuList data={data} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(248, 248, 248)",
    width: width,
    height: height,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    letterSpacing: 4,
    marginTop: height * 0.05,
    marginHorizontal: width * 0.039,
  },
  list: {
    justifyContent: "space-evenly",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 20,
  },
  input: {
    height: height * 0.06,
    marginHorizontal: width * 0.039,
    marginTop: height * 0.025,
    width: width * 0.92,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0, 0.50)",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  indicatorWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: height * 0.4,
  },
});
