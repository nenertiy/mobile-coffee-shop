import { defaultStyles } from "@/styles";
import { StyleSheet, Text, View } from "react-native";

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text>Cart</Text>
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
