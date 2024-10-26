import { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";

interface SignInFormData {
  email: string;
  password: string;
}

const SignInForm: FC = () => {
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const auth = async (data: { email: string; password: string }) => {
    const response = await axios.post(
      `https://backend-coffee-shop.onrender.com/api/auth/login`,
      data
    );
    return response.data;
  };

  const signIn = async (data: SignInFormData) => {
    setLoading(true);
    try {
      const response = await auth({ email: data.email, password: data.password });
      console.log(response);
      login(response.access_token, response.id);
      reset(); // Reset the form only after a successful login
      router.push("/(menu)");
    } catch (error) {
      console.error(error); // Log error for debugging
      Alert.alert("Error"); // Show specific error message
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SignInFormData) => {
    await signIn(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              accessibilityLabel="Email input" // Accessibility label
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              accessibilityLabel="Password input" // Accessibility label
            />
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#ffffff"
            />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
        <Text
          style={styles.link}
          onPress={() => router.push("/registration")}>
          Don't have an account? Register
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
  },
  form: {
    width: "90%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#008000",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    color: "#008000",
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default SignInForm;
