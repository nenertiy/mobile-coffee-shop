import { StyleSheet, Text, View } from "react-native";

export default function CategoryScreen() {
  return (
    <View style={styles.container}>
      <Text>Category</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
