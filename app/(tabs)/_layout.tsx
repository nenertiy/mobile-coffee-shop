import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, fontSize } from "@/constants/colors";

export default function TabsNavigation() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: "500",
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgb(255,255,255)",
          position: "absolute",
          borderTopWidth: 0,
          borderRadius: 14,
          marginHorizontal: 6,
          marginBottom: 4,
          paddingTop: 4,
          // paddingBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="(menu)"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          title: "Category",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="cube"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="cart"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="person-circle"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
