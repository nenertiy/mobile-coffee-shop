import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

const CategoriesScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Category",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            headerTitle: "Products",
            headerShown: true,
          }}
        />
      </Stack>
    </View>
  );
};

export default CategoriesScreenLayout;
