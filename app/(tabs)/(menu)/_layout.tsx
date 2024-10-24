import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

const MenuScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Menu",
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
};

export default MenuScreenLayout;
