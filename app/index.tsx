import { colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import {
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Welcome = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/sign-up")}
        >
          <Text style={styles.button_text}>Registration</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    marginHorizontal: width * 0.039,
  },

  button: {
    marginTop: 16,
    borderRadius: 12,
    width: "60%",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button_text: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default Welcome;
