import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

const CartScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Cart",
            // headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
};

export default CartScreenLayout;
