import axios from "axios";

const API_URL = "https://backend-coffee-shop.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//CART
export const addToCart = async (userId: number, productId: number, quantity: number = 1) => {
  const response = await apiClient.post(`cart/add`, {
    userId,
    productId,
    quantity,
  });
  return response.data;
};

export const fetchCart = async (userId: string | null) => {
  const response = await apiClient.get(`/cart/${userId}`);
  return response.data;
};

export const removeFromCart = async (userId: string, productId: number) => {
  const response = await apiClient.delete("cart/remove", {
    data: { userId, productId },
  });
  return response.data;
};

export const decreaseQuantity = async (userId: string, productId: number, quantity: number) => {
  const response = await apiClient.patch("cart/decrease", {
    userId,
    productId,
    quantity,
  });
  return response.data;
};
