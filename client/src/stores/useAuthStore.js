import instance from "@/utils/baseUrl";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoading: false,
  error: null,
  isAuthenticated: false,
  user: null,

  getMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await instance.get("/auth/getMe");
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      set({ error, isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem("token");
  },
}));
