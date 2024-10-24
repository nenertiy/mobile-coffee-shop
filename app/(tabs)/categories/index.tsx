import CategoryList from "@/components/CategoryList";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function CategoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category</Text>
      <ScrollView>
        <CategoryList />
      </ScrollView>
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { backgroundColor: "rgb(248, 248, 248)", width: width, height: height },
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
});
