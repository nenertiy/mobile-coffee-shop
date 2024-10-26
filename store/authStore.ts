import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  auth: boolean;
  userId: string | null;
  login: (token: string, userId: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  auth: false,
  userId: null,

  login: async (token, userId) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userId", userId.toString());

    set({ token, userId, auth: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");

    set({ token: null, auth: false, userId: null });
  },

  initialize: async () => {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");

    set({
      token: token,
      auth: token !== null,
      userId: userId,
    });
  },
}));

const initializeAuthStore = async () => {
  await useAuthStore.getState().initialize();
};

initializeAuthStore();
