import { colors } from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import { Pressable, StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function AccountScreen() {
  const logout = useAuthStore((state) => state.logout);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push("/(auth)/sign-in");
    } catch (error) {
      Alert.alert("Error", "Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <Pressable
        style={styles.button}
        onPress={() => handleLogout()}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.button_text}>Logout</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginTop: 16,
    borderRadius: 12,
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