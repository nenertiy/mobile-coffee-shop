import { colors } from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import { Redirect, router } from "expo-router";
import React, { useState, useEffect, FC } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

const Welcome: FC = () => {
  const isLogged = useAuthStore((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [isLogged]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </SafeAreaView>
    );
  }

  if (isLogged) return <Redirect href={"/(menu)"} />;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>CA</Text>
          <Text style={styles.title}>FE</Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/sign-up")}>
          <Text style={styles.button_text}>Continue</Text>
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
    paddingTop: height * 0.2,
    backgroundColor: "#1e3932",
  },
  box: {
    display: "flex",
    alignItems: "center",
    marginBottom: height * 0.3,
  },
  title: {
    fontSize: 60,
    fontWeight: "500",
    color: "#feba3e",
    marginTop: -18,
  },
  button: {
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
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
