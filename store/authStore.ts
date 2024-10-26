import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  auth: boolean;
  isAdmin: boolean;
  role: string | null;
  userId: string | null;
  login: (token: string, role: string, userId: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  auth: false,
  isAdmin: false,
  role: null,
  userId: null,

  login: async (token, role, userId) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("role", role);
    await AsyncStorage.setItem("userId", userId);

    set({ token, auth: true, role, userId, isAdmin: role === "admin" });
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("userId");

    set({ token: null, auth: false, role: null, userId: null, isAdmin: false });
  },

  rehydrate: async () => {
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");
    const userId = await AsyncStorage.getItem("userId");

    if (token) {
      set({ token, auth: true, role, userId, isAdmin: role === "admin" });
    }
  },
}));
