import { Redirect, Tabs } from "expo-router";
import React, { useState, useEffect } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, fontSize } from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import { ActivityIndicator, View } from "react-native";

export default function TabsNavigation() {
  // const isLogged = useAuthStore((state) => state.auth);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(false);
  // }, [isLogged]);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator
  //         size="large"
  //         color={colors.primary}
  //       />
  //     </View>
  //   );
  // }

  // if (!isLogged) return <Redirect href={"/"} />;

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
          marginBottom: 6,
          paddingTop: 4,
          paddingBottom: 4,
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
