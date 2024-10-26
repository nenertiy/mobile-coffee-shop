import { Stack, Tabs } from "expo-router";
import React from "react";
import { colors, fontSize } from "@/constants/Colors";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
